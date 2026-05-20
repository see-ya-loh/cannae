import { findByAccessToken } from "../db/schema/users";
import {
    findById as findCharacterById,
    applyExpGain,
} from "../db/schema/user_characters";
import {
    findOne as findUserItem,
    consumeItem,
    buildMsgUserItem,
} from "../db/schema/user_items";
import { listEquippedByCharacter } from "../db/schema/user_gears";
import { getItemMaster } from "../db/master";
import { computeCombatPower } from "../core/combat_power";

// HTTP /api binary useCharacterExpItemReq (protocolId=406). Sent when the
// player taps DlgCharacterLevelUp's "Level Up" confirm button — the idx-8
// tutorial walks Fram (Water) through this exact flow (lev 1 → some lev via
// 1 Elixir of Insight from 1-1 firstClear).
//
// Wire shape (capture levelup/REQUEST_Haiko_11.json + proto 5234):
//   message ReqUseCharacterExpItem {
//     uint64 user_character_id = 1;
//     repeated MsgRequiredItem use_exp_items = 2;
//   }
//   message MsgRequiredItem { uint32 item_uid = 1; uint32 amount = 2; }
//
// Response (capture levelup/RESPONSE_Haiko_12.json):
//   - MsgUserCharacter user_character  (lev/exp/combatPower refreshed)
//   - repeated MsgUserItem user_items  (post-decrement count for each consumed uid)
//
// Level-up math (master character__f103_CharacterLevel):
//   `f4:exp_vi` at (grade, lev) = XP delta to advance from lev → lev+1.
//   Algorithm: new_exp += sum(item.value × amount); while new_lev<maxLev and
//   new_exp >= xpToNext(grade,new_lev): new_exp -= xpToNext; new_lev++. At
//   max lev, exp is clamped to 0 (no overflow display per capture pattern).
//
// Mission 01.005 (chapter.01.005 = "level up Fram") would attach here, but
// chapter-1 master has only 01.001..01.004; the level-up tutorial step
// (idx 8) advances purely on `enhance_completed`-style client-side timer
// post-response. No mission delta in V1.

function buildMsgUserCharacterWire(c: any, now: number): any {
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

export function handleUseCharacterExpItem(req: any): any {
    const accessToken: string = req?.token ?? "";
    const inner = req?.useCharacterExpItemReq ?? {};
    const userCharacterId = Number(inner?.userCharacterId ?? 0) || 0;
    const useExpItems: Array<{ itemUid: number; amount: number }> = Array.isArray(inner?.useExpItems)
        ? inner.useExpItems.map((e: any) => ({
              itemUid: Number(e?.itemUid ?? 0) >>> 0,
              amount:  Number(e?.amount ?? 0) || 0,
          }))
        : [];

    const user = findByAccessToken(accessToken);
    if (!user) {
        console.warn(`useCharacterExpItemReq: unknown token ${accessToken.slice(0, 16)}...`);
        return { protocolId: 406, result: "ErrorPacketTokenInvalid", useCharacterExpItemRsp: {} };
    }

    const character = findCharacterById(userCharacterId);
    if (!character || character.user_id !== user.user_id) {
        console.warn(`useCharacterExpItemReq: character_id=${userCharacterId} not owned by user_id=${user.user_id}`);
        return { protocolId: 406, result: "ErrorInternalServerError", useCharacterExpItemRsp: {} };
    }

    // Validate + sum XP gain across all consumed ExpItem entries. Skip unknown
    // master uids, non-ExpItem types, and entries the user doesn't own enough
    // of — same defensive pattern as autoEquipGear (warn + continue, never
    // throw, so a partial bad request still produces a usable response).
    let xpGain = 0;
    const consumedItems: Array<{ itemUid: number }> = [];
    for (const { itemUid, amount } of useExpItems) {
        if (amount <= 0) continue;
        const master = getItemMaster(itemUid);
        if (!master) {
            console.warn(`useCharacterExpItemReq: item_uid=0x${itemUid.toString(16)} master missing`);
            continue;
        }
        if (master.type !== "GDT_ExpItem") {
            console.warn(`useCharacterExpItemReq: item_uid=0x${itemUid.toString(16)} type=${master.type} not ExpItem`);
            continue;
        }
        const owned = findUserItem(user.user_id, itemUid);
        if (!owned || owned.item_count < amount) {
            console.warn(`useCharacterExpItemReq: item_uid=0x${itemUid.toString(16)} insufficient (own=${owned?.item_count ?? 0} need=${amount})`);
            continue;
        }
        consumeItem(user.user_id, itemUid, amount);
        xpGain += master.value * amount;
        consumedItems.push({ itemUid });
    }

    const { afterLev: newLev, afterExp: newExp } = applyExpGain(userCharacterId, xpGain);

    const updatedCharacter = findCharacterById(userCharacterId)!;
    const now = Math.floor(Date.now() / 1000);

    // Echo every uid the request touched, even if a row's count went to 0.
    // protobufjs encodes count=0 as the proto3 default (omitted), but the
    // client still needs the itemUid present so it can clear the local cache
    // entry — without the echo, the next mission popup would still see a
    // stale "1 ExpItem available" row.
    const userItems = consumedItems
        .map(({ itemUid }) => findUserItem(user.user_id, itemUid))
        .filter((row): row is NonNullable<typeof row> => !!row)
        .map(buildMsgUserItem);

    return {
        protocolId: 406,
        useCharacterExpItemRsp: {
            userCharacter: buildMsgUserCharacterWire(updatedCharacter, now),
            userItems,
        },
    };
}
