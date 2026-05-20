import { findByAccessToken } from "../db/schema/users";
import {
    findById as findCharacterById,
    setGearSlots,
    type UserCharacterRow,
} from "../db/schema/user_characters";
import {
    findById as findGearById,
    setEquip,
    buildMsgUserGear,
    listEquippedByCharacter,
} from "../db/schema/user_gears";
import { getGearMaster } from "../db/master";
import {
    incrementCount as incrementMissionCount,
    buildMsgUserMission,
} from "../db/schema/user_missions";
import { computeCombatPower } from "../core/combat_power";

// HTTP /api binary autoEquipGearReq (protocolId=502). Sent when the player
// taps the "Auto Equip" confirm button inside DlgCharacterInfoRemake — the
// idx-6 tutorial walks Fram (Water) through this exact flow.
//
// Wire shape (cannae_protocol.proto):
//   message ReqAutoEquipGear {
//       uint64 user_character_id = 1;
//       repeated uint64 equip_gear_ids = 2;  // client-side candidate set
//       uint32 preset_idx = 3;
//   }
//   message RspAutoEquipGear {
//       MsgUserCharacter user_character = 1;
//       repeated MsgUserGear user_equipped_gears = 2;
//       repeated MsgUserGear user_unequipped_gears = 3;
//       MsgUserGearPreset user_gear_preset = 4;
//   }
//
// The client picks "best fit per slot" locally and ships the candidate ids;
// the server is gatekeeper, not selector. Implementation per gear_id:
//   1. Validate ownership (gear.user_id matches the authed user).
//   2. Resolve master → GearSlotType (1=Weapon..6=Accessory2).
//   3. If the target slot is already occupied on this character, unequip
//      that gear (becomes part of user_unequipped_gears).
//   4. Equip the candidate (equip_yn=1, equip_to_*).
//   5. Update the character's gear_slot_id{N} = candidate id.
//
// Mission 01.003 (chapter.01.003 "Equip Fram (Water) with an item",
// QMC_EquipGear + QSC_CharacterUid character.fram.water = 0x96FA0CA1)
// progresses once per autoEquip call against FramW — the master mission row
// is goal_count=1, so the increment is idempotent: re-equipping later does
// not bump beyond goal. The mission delta ships in a sibling updateQuestRsp
// ahead of the autoEquipGearRsp so UserDataManager.UpdateUserMissions sees
// the new count before any downstream handler reads it.

const GEAR_SLOT_TYPE_BY_ENUM: Record<string, number> = {
    GST_None:       0,
    GST_Weapon:     1,
    GST_Armor:      2,
    GST_Glove:      3,
    GST_Shoes:      4,
    GST_Accessory1: 5,
    GST_Accessory2: 6,
};

// FNV-1a 32 of "character.fram.water" — chapter.01.003's QSC_CharacterUid
// resolves to this hash via GameDataHelper.GetUidByString. Hardcoded for
// V1 (only one chapter-1 mission uses this condition); generalise into a
// FNV helper once a second mission needs the same lookup.
const CHAPTER_01_003_TARGET_CHARACTER_UID = 0x96FA0CA1;
const CHAPTER_01_003_MISSION_UID         = 0xD7755464;

function characterSlots(row: UserCharacterRow): number[] {
    return [
        row.gear_slot_id1, row.gear_slot_id2, row.gear_slot_id3,
        row.gear_slot_id4, row.gear_slot_id5, row.gear_slot_id6,
    ];
}

function buildMsgUserCharacterWire(c: UserCharacterRow, now: number): any {
    const equipped = listEquippedByCharacter(c.character_id);
    return {
        characterId:    String(c.character_id),
        userId:         c.user_id,
        characterUid:   c.character_uid,
        grade:          c.grade,
        awaken:         c.awaken,
        lev:            c.lev,
        exp:            c.exp,
        lastBattleDate: String(c.last_battle_date),
        skill1Lev:      c.skill1_lev,
        skill2Lev:      c.skill2_lev,
        skill3Lev:      c.skill3_lev,
        passive1Lev:    c.passive1_lev,
        passive2Lev:    c.passive2_lev,
        gearSlotId1:    String(c.gear_slot_id1),
        gearSlotId2:    String(c.gear_slot_id2),
        gearSlotId3:    String(c.gear_slot_id3),
        gearSlotId4:    String(c.gear_slot_id4),
        gearSlotId5:    String(c.gear_slot_id5),
        gearSlotId6:    String(c.gear_slot_id6),
        awakenCostumeUid: 0,
        userCostumeId:  "0",
        userBeautyId:   "0",
        userBeautyId2:  "0",
        userBeautyId3:  "0",
        userBeautyId4:  "0",
        weaponUid:      c.weapon_uid,
        potential:      0,
        trainingRoomUid: 0,
        useGearPresetIdx: 0,
        combatPower:    computeCombatPower(c, equipped),
        assistSkillLev: 1,
        memorialGearId: "0",
        isBeautyView1:  true,
        isBeautyView2:  true,
        isBeautyView3:  true,
        isBeautyView4:  true,
        potentialPowerSkill1Lev: 0,
        potentialPowerSkill2Lev: 0,
        potentialPowerSkill3Lev: 0,
        updateTimestamp: now,
    };
}

export function handleAutoEquipGear(req: any): any {
    const accessToken: string = req?.token ?? "";
    // Wire wrapper field is `autoEquipGear` (no Req suffix), per
    // cannae_protocol.proto's `autoEquipGear?: ReqAutoEquipGear` declaration.
    // Router dispatches via protocol_ids.json fallback for this protocolId.
    const inner = req?.autoEquipGear ?? {};
    const userCharacterId = Number(inner?.userCharacterId ?? 0) || 0;
    const candidateIds: number[] = Array.isArray(inner?.equipGearIds)
        ? inner.equipGearIds.map((id: any) => Number(id) || 0).filter((id: number) => id > 0)
        : [];
    const presetIdx = Number(inner?.presetIdx ?? 0) || 0;

    const user = findByAccessToken(accessToken);
    if (!user) {
        console.warn(`autoEquipGearReq: unknown token ${accessToken.slice(0, 16)}...`);
        return { protocolId: 502, result: "ErrorPacketTokenInvalid", autoEquipGearRsp: {} };
    }

    const character = findCharacterById(userCharacterId);
    if (!character || character.user_id !== user.user_id) {
        console.warn(`autoEquipGearReq: character_id=${userCharacterId} not owned by user_id=${user.user_id}`);
        return { protocolId: 502, result: "ErrorInternalServerError", autoEquipGearRsp: {} };
    }

    const slots = characterSlots(character);
    const equippedIds: number[] = [];
    const unequippedIds: number[] = [];

    for (const gearId of candidateIds) {
        const gear = findGearById(gearId);
        if (!gear || gear.user_id !== user.user_id) {
            console.warn(`autoEquipGearReq: gear_id=${gearId} not owned by user_id=${user.user_id}`);
            continue;
        }
        const master = getGearMaster(gear.gear_uid);
        if (!master) {
            console.warn(`autoEquipGearReq: gear_uid=0x${gear.gear_uid.toString(16)} master missing`);
            continue;
        }
        const slotType = GEAR_SLOT_TYPE_BY_ENUM[master.gear_slot_type] ?? 0;
        if (slotType <= 0 || slotType > 6) {
            console.warn(`autoEquipGearReq: gear_uid=0x${gear.gear_uid.toString(16)} slot=${master.gear_slot_type} not equipable`);
            continue;
        }

        const previousGearId = slots[slotType - 1];
        if (previousGearId !== 0 && previousGearId !== gearId) {
            setEquip(previousGearId, 0, 0);
            unequippedIds.push(previousGearId);
        }

        setEquip(gearId, userCharacterId, slotType);
        slots[slotType - 1] = gearId;
        equippedIds.push(gearId);
    }

    setGearSlots(userCharacterId, slots);

    // Re-read mutated rows so the wire reflects post-update equip state.
    const equippedRows = equippedIds
        .map(findGearById)
        .filter((g): g is NonNullable<typeof g> => !!g)
        .map(buildMsgUserGear);
    const unequippedRows = unequippedIds
        .map(findGearById)
        .filter((g): g is NonNullable<typeof g> => !!g)
        .map(buildMsgUserGear);

    const updatedCharacter = findCharacterById(userCharacterId)!;
    const now = Math.floor(Date.now() / 1000);

    const userGearPreset = {
        userCharacterId: String(userCharacterId),
        presetIdx,
        gearSlotId1: String(updatedCharacter.gear_slot_id1),
        gearSlotId2: String(updatedCharacter.gear_slot_id2),
        gearSlotId3: String(updatedCharacter.gear_slot_id3),
        gearSlotId4: String(updatedCharacter.gear_slot_id4),
        gearSlotId5: String(updatedCharacter.gear_slot_id5),
        gearSlotId6: String(updatedCharacter.gear_slot_id6),
        weaponUid:      updatedCharacter.weapon_uid,
        memorialGearId: "0",
    };

    const autoEquipGearRsp = {
        protocolId: 502,
        autoEquipGearRsp: {
            userCharacter:       buildMsgUserCharacterWire(updatedCharacter, now),
            userEquippedGears:   equippedRows,
            userUnequippedGears: unequippedRows,
            userGearPreset,
        },
    };

    // Mission 01.003 progression — bump only when the equip target is
    // FramW. incrementMissionCount clamps at goal_count, so re-equipping
    // later (or already-claimed state) does not re-bump.
    const missionUpdates =
        updatedCharacter.character_uid === CHAPTER_01_003_TARGET_CHARACTER_UID && equippedIds.length > 0
            ? [incrementMissionCount(user.user_id, CHAPTER_01_003_MISSION_UID, 1)]
                .filter((m): m is NonNullable<typeof m> => m !== undefined)
                .map(buildMsgUserMission)
            : [];

    if (missionUpdates.length === 0) {
        return autoEquipGearRsp;
    }
    return [
        { protocolId: 651, updateQuestRsp: { missions: missionUpdates } },
        autoEquipGearRsp,
    ];
}
