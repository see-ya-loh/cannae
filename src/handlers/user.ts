import { config } from "../config";
import { findByAccessToken, touchLastLogin, buildMsgUser } from "../db/schema/users";
import { applyEnergyCharge } from "../core/energy";
import { listByUser, type UserCharacterRow } from "../db/schema/user_characters";

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

// Builds the 43 MsgCharacterSlotData entries that ship in RspUserLogin.
// Only CST_Story carries live data: the starter roster (Fram, Johann,
// Charlotte) occupies slots 0..2 in listByUser INSERT order, matching the
// front-row positions of the hexagon formation widget on the stage-select
// screen. Every other slot type ships a fully-empty 5/7/10/12-slot vector
// so the client dictionary has the expected keys even before the player
// touches each game mode. MsgCharacterSlot in genuine CST_Story carries
// only userCharacterId + slotUserType; isCommanderCharacter / isBurstPosition
// are ClanRaid-only and supportCharacterUid is COT_Support-only (confirmed
// across Haiko_26's 43 entries).
function buildStarterCharacterSlotDatas(characters: UserCharacterRow[]): any[] {
    const starterIds = characters.map(c => String(c.character_id));
    return STARTER_SLOT_TYPE_COUNTS.map(([slotType, n]) => {
        const slots = Array.from({ length: n }, (_, i) => {
            if (slotType === "CST_Story" && i < starterIds.length) {
                return { userCharacterId: starterIds[i], slotUserType: "COT_Owner" };
            }
            return { userCharacterId: "0", slotUserType: "COT_None" };
        });
        return { slotType, formationUid: BASIC_FORMATION_UID, slots };
    });
}

// MsgUserMission entries seeded into RspUserLogin.user_missions (proto field
// 19). The client's `OnPacketRspUserLogin` hands the list to
// `UserDataManager.UpdateUserMissions` (IL2CPP dump RVA 0x410D334 for the
// matching GetUserMission lookup), which populates the
// `Dictionary<uint, MsgUserMission> mUserMissions` field. `TutorialManager.
// CheckSkipCondition` (RVA 0x41BBBAC) reads that dictionary for the
// `completed_mission` / `complete_mission` JSON keys on every tutorial step's
// skipCondition; a dictionary miss returns TRUE = skip-the-tutorial, which is
// what made tutorial idx 3-6 evaporate and forced idx 7 (gear-enhancement) to
// play right after the Charlotte recruit cutscene.
//
// `quest_uid` is FNV-1a 32 (offset basis 0x811c9dc5, prime 0x01000193) of the
// master "uid.mission.chapter.01.00X" string — same hash the client applies
// via GameDataHelper.GetUidByString. Counts model "tutorial 0 cleared, no
// stage played, no gear equipped yet", which is the user state right after
// the recruit cutscene closes.
const STARTER_USER_MISSIONS = [
    { questUid: 0xD975578A, count: 1, goalCount: 1, receiveReward: false }, // chapter.01.001 tutorial-battle completion (reward unclaimed)
    { questUid: 0xD87555F7, count: 0, goalCount: 1, receiveReward: false }, // chapter.01.002 win stage 1-1
    { questUid: 0xD7755464, count: 0, goalCount: 1, receiveReward: false }, // chapter.01.003 equip 1 gear on Fram
    { questUid: 0xD67552D1, count: 0, goalCount: 3, receiveReward: false }, // chapter.01.004 enhance gear 3x
];

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
        gearSlotId1:   "0",
        gearSlotId2:   "0",
        gearSlotId3:   "0",
        gearSlotId4:   "0",
        gearSlotId5:   "0",
        gearSlotId6:   "0",
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
        combatPower:   0,
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
        // Other repeated fields (userItems, userGears, userCostumes, ...) are
        // still empty by default — protobufjs encodes absent repeateds as an
        // empty array on the wire, which is what the client expects until the
        // corresponding game systems get wired up.
        userCharacters,
        userMissions: STARTER_USER_MISSIONS,
        userFormations: [{ formationUid: BASIC_FORMATION_UID }],
        characterSlotDatas: buildStarterCharacterSlotDatas(characters),
    };

    return {
        protocolId: 203,
        userLoginRsp,
    };
}
