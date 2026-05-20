import { config } from "../config";
import { findByAccessToken, touchLastLogin, buildMsgUser } from "../db/schema/users";
import { applyEnergyCharge } from "../core/energy";
import { listByUser, type UserCharacterRow } from "../db/schema/user_characters";
import {
    grantStarterMissions,
    listByUser as listMissionsByUser,
    buildMsgUserMission,
} from "../db/schema/user_missions";
import {
    listByUser as listGearsByUser,
    listEquippedByCharacter,
    buildMsgUserGear,
} from "../db/schema/user_gears";
import { computeCombatPower } from "../core/combat_power";
import {
    listByUser as listItemsByUser,
    buildMsgUserItem,
} from "../db/schema/user_items";
import {
    listByUser as listStoryClearsByUser,
    buildMsgUserStoryClearHistory,
} from "../db/schema/user_story_clears";
import { listSlotsByUserAndType } from "../db/schema/user_character_slot_data";

const HOST = config.advertised.host;
const PORT = config.server.http_port;
const BASE_URL = `http://${HOST}:${PORT}`;

// FNV-1a 32 of "uid.formation.basic" — the master starter formation. Sent
// once in `userLoginRsp.user_formations` so it appears in the player's
// available-formations list, and reused as the `formation_uid` on every
// `MsgCharacterSlotData` below (a fresh user has not chosen anything else).
const BASIC_FORMATION_UID = 0x0D299078;

// Slot count per Cannae.GameData.CharacterSlotType in enum-declaration order,
// excluding CST_Count. Counts come from a full read of the genuine wire
// reference (Haiko_26 RESPONSE_userLoginRsp.characterSlotDatas, lv 54 user
// Artoriae) — see [../cannae-docs/context/game-flow.md] for the capture.
// The client populates a Dictionary<CharacterSlotType, MsgCharacterSlotData>
// inside UserDataManager.OnPacketRspUserLogin; lobby UIs preload thumbnails
// for many slot types before the player ever opens those menus, so we ship
// the full 43-entry envelope to avoid silent NREs on absent keys.
const STARTER_SLOT_TYPE_COUNTS: ReadonlyArray<readonly [string, number]> = [
    ["CST_Story", 5], ["CST_ArenaAttack", 5], ["CST_ArenaDefense", 5],
    ["CST_Dungeon", 5], ["CST_ProofDungeon", 5],
    ["CST_ClanRaidDark1", 10], ["CST_ClanRaidDark2", 10],
    ["CST_ClanRaidFire1", 10], ["CST_ClanRaidFire2", 10],
    ["CST_ClanRaidWater1", 10], ["CST_ClanRaidWater2", 10],
    ["CST_ClanRaidEarth1", 10], ["CST_ClanRaidEarth2", 10],
    ["CST_ClanRaidLight1", 10], ["CST_ClanRaidLight2", 10],
    ["CST_ClanRaidCommon1", 10], ["CST_ClanRaidCommon2", 10],
    ["CST_ClanRaidVRDark", 10], ["CST_ClanRaidVRFire", 10],
    ["CST_ClanRaidVRWater", 10], ["CST_ClanRaidVREarth", 10],
    ["CST_ClanRaidVRLight", 10],
    ["CST_FriendlyMatch", 5], ["CST_MercenaryTraining", 5],
    ["CST_PartyDungeon", 12], ["CST_SeaBattle", 5], ["CST_TyrantWar", 5],
    ["CST_ClanPartyDungeon", 5], ["CST_FamineRaid", 7],
    ["CST_SeaBattleDark", 5], ["CST_SeaBattleFire", 5],
    ["CST_SeaBattleWater", 5], ["CST_SeaBattleEarth", 5],
    ["CST_SeaBattleLight", 5], ["CST_SideStory", 5],
    ["CST_ElementProofDark", 5], ["CST_ElementProofFire", 5],
    ["CST_ElementProofWater", 5], ["CST_ElementProofEarth", 5],
    ["CST_ElementProofLight", 5],
    ["CST_ClanDoubleClashParty1", 5], ["CST_ClanDoubleClashParty2", 5],
    ["CST_Memorial", 5],
];

function buildCharacterSlotDatas(userId: string, characters: UserCharacterRow[]): any[] {
    const savedStorySlots = listSlotsByUserAndType(userId, "CST_Story");

    return STARTER_SLOT_TYPE_COUNTS.map(([slotType, n]) => {
        let slots: any[];
        if (slotType === "CST_Story" && savedStorySlots.length > 0) {
            const byIndex = new Map(savedStorySlots.map(r => [r.slot_index, r.user_character_id]));
            slots = Array.from({ length: n }, (_, i) => {
                const ucId = byIndex.get(i);
                if (ucId) return { userCharacterId: String(ucId), slotUserType: "COT_Owner" };
                return { userCharacterId: "0", slotUserType: "COT_None" };
            });
        } else if (slotType === "CST_Story") {
            // Client renders slots[0] at the back, slots[N-1] at the front.
            // Reverse so Fram (first inserted) appears at the front position.
            const starterIds = characters.map(c => String(c.character_id)).reverse();
            slots = Array.from({ length: n }, (_, i) => {
                if (i < starterIds.length) {
                    return { userCharacterId: starterIds[i], slotUserType: "COT_Owner" };
                }
                return { userCharacterId: "0", slotUserType: "COT_None" };
            });
        } else {
            slots = Array.from({ length: n }, () => ({
                userCharacterId: "0", slotUserType: "COT_None",
            }));
        }
        return { slotType, formationUid: BASIC_FORMATION_UID, slots };
    });
}

// HTTP /api binary userLoginReq (protocolId=203). The game has already
// acquired an access token via the WS idPLogin/tokenLogin step; here we
// look up the user by that token and return a minimal RspUserLogin
// sufficient to dismiss the "Please retry" Gamebase popup and reach the
// next protocol step. All keys are camelCase (see plan §6).
export function handleUserLogin(req: any): any {
    const accessToken: string = req?.userLoginReq?.accessToken ?? "";
    const platformDataArr: any[] = req?.userLoginReq?.userPlatformData ?? [];
    const now = Date.now();

    const userRaw = findByAccessToken(accessToken);
    if (!userRaw) {
        console.warn(`userLoginReq: unknown accessToken ${accessToken.slice(0, 16)}...`);
        return {
            protocolId: 203,
            result: "ErrorPacketTokenInvalid",
            // ServerConnection.ProcessResponsePacket (RVA 0x3DF9558) does a
            // reflection GetValue on the inner *Rsp field even on the error
            // path; returning null there NREs upstream in ResumeResponseDequeue.
            // Empty object is fine because the error-handler branch ignores
            // body content.
            userLoginRsp: {},
        };
    }
    // Recompute time-based energy regen against the DB checkpoint before
    // building the wire response. The helper persists when the value
    // advances, so the next login / poll picks up from the new anchor.
    const user = applyEnergyCharge(userRaw);
    touchLastLogin(user.user_id, now);

    // Mission baseline. INSERT OR IGNORE: idempotent for users registered
    // after fix V2 (already seeded at userRegister), and a one-shot
    // migration for the dev user 962159181 which predates the user_missions
    // table. CheckSkipCondition treats a missing entry as SKIP=true, so the
    // tutorial idx 3-6 branches would silently evaporate without this seed.
    grantStarterMissions(user.user_id);

    // TitleSceneRoot.OnPacketRspUserLogin (IL2CPP dump RVA 0x3F316BC) branches
    // on the resCode field alone — body is ignored on the error branches. For
    // a guest that has not yet picked a nickname (DB row .name is empty), the
    // correct answer is resCode=100 ErrorUserNotRegistered, which drives the
    // client into CoLoadUserRegisterScene (nickname + character creation).
    // Returning ResultOk + a synthetic body sends the client down the lobby
    // path inside UserDataManager.OnPacketRspUserLogin, which calls 50+ Set*
    // helpers on nested rsp fields and NREs silently on the first empty list,
    // leaving the loader spinning forever (this matches what we observed
    // across name="" vs Lord<last4> + master=None vs Female/Skin1/Hair1/Color1
    // permutations).
    if (!user.name) {
        console.log(`userLoginReq: new guest user_id=${user.user_id} — ErrorUserNotRegistered`);
        return {
            protocolId: 203,
            result: "ErrorUserNotRegistered",
            userLoginRsp: {},
        };
    }

    const platformData =
        platformDataArr.find((p: any) => p?.platformCode === "PC_Gamebase") ??
        platformDataArr[0] ??
        { platformCode: "PC_Gamebase", platformId: user.idp_user_key };

    // userCharacters layout follows Cannae.Protocol.MsgUserCharacter (proto
    // fields 1..41). Shape mirrors the genuine-server capture in
    // astridtraffic/misc/myinfomaybe/RESPONSE_Haiko_26.json:
    //   - characterId (proto field 1, uint64) is a per-user INSTANCE id
    //     (server-issued sequence), sent as a JSON string. NOT the master hash.
    //   - characterUid (proto field 3, fixed32) is the master character hash —
    //     this is what the tutorial battle lookup matches against.
    // Zero-value uint64 fields are emitted as the literal string "0" to match
    // the genuine wire (protobufjs accepts numbers too, but staying with the
    // observed shape avoids accidental Long/BigInt branches in the encoder).
    // gear/costume/beauty slots default to "0" because the recruit-cutscene
    // panel reads them eagerly when rendering the new character.
    const characters = listByUser(user.user_id);
    const userCharacters = characters.map((c: UserCharacterRow) => ({
        characterId:   String(c.character_id),
        userId:        user.user_id,
        characterUid:  c.character_uid,
        grade:         c.grade,
        awaken:        c.awaken,
        lev:           c.lev,
        exp:           c.exp,
        lastBattleDate: String(c.last_battle_date),
        skill1Lev:     c.skill1_lev,
        skill2Lev:     c.skill2_lev,
        skill3Lev:     c.skill3_lev,
        passive1Lev:   c.passive1_lev,
        passive2Lev:   c.passive2_lev,
        gearSlotId1:   String(c.gear_slot_id1),
        gearSlotId2:   String(c.gear_slot_id2),
        gearSlotId3:   String(c.gear_slot_id3),
        gearSlotId4:   String(c.gear_slot_id4),
        gearSlotId5:   String(c.gear_slot_id5),
        gearSlotId6:   String(c.gear_slot_id6),
        awakenCostumeUid: 0,
        userCostumeId: "0",
        userBeautyId:  "0",
        userBeautyId2: "0",
        userBeautyId3: "0",
        userBeautyId4: "0",
        weaponUid:     c.weapon_uid,
        potential:     0,
        trainingRoomUid: 0,
        useGearPresetIdx: 0,
        combatPower:   computeCombatPower(c, listEquippedByCharacter(c.character_id)),
        assistSkillLev: 1,
        memorialGearId: "0",
        isBeautyView1: true,
        isBeautyView2: true,
        isBeautyView3: true,
        isBeautyView4: true,
        potentialPowerSkill1Lev: 0,
        potentialPowerSkill2Lev: 0,
        potentialPowerSkill3Lev: 0,
        updateTimestamp: Math.floor(now / 1000),
    }));

    const userLoginRsp = {
        serverConfig: {
            chatServer:      `${BASE_URL}/chat/socket.io/`,
            boardServer:     `${BASE_URL}/board/v1/u-api/`,
            translateServer: `${BASE_URL}/translate/`,
            relayServer:     `${BASE_URL}/relay/fs`,
            seaBattleServer: `${BASE_URL}/sb/socket.io/`,
        },
        token: user.access_token,
        ticket: Math.floor(Math.random() * 0xffffffff),
        account: {
            accountId: user.account_id,
            accountType: "AT_User",
            accountState: "AS_Normal",
            unregDate: "0",
            country: "US",
            checkPurchasable: true,
        },
        platformData,
        user: buildMsgUser(user),
        // Remaining repeated fields the client expects but cannae hasn't
        // wired up yet (userCostumes, userBeauties, userWeapons, ...) are
        // omitted — protobufjs encodes absent repeateds as an empty array on
        // the wire, which the client treats as "no items in this category".
        userCharacters,
        userMissions:  listMissionsByUser(user.user_id).map(buildMsgUserMission),
        userGears:     listGearsByUser(user.user_id).map(buildMsgUserGear),
        userItems:     listItemsByUser(user.user_id).map(buildMsgUserItem),
        // RspUserLogin.story_clear_histories (proto 8372). World-map lock
        // gating reads this on every cold start; omitting it re-locks the
        // just-cleared substage after a force-close because the client
        // treats absence as "never won". battleEnd persists into
        // user_story_clears on BERT_Win so this echo is consistent.
        storyClearHistories: listStoryClearsByUser(user.user_id).map(buildMsgUserStoryClearHistory),
        userFormations: [{ formationUid: BASIC_FORMATION_UID }],
        characterSlotDatas: buildCharacterSlotDatas(user.user_id, characters),
    };

    return {
        protocolId: 203,
        userLoginRsp,
    };
}
