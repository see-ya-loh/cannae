import { findByAccessToken, buildMsgUser, type UserRow } from "../db/schema/users";
import { listByUser, type UserCharacterRow } from "../db/schema/user_characters";
import { applyEnergyCharge, spendEnergy } from "../core/energy";
import { consumeBattle } from "../core/battle";
import { applyMissionRewards, type MsgStuffRewardWire } from "../core/rewards";
import {
    getSubStage,
    getSubStageFirstClearRewards,
    type MasterMissionReward,
} from "../db/master";

// HTTP /api binary battleEndReq (protocolId=302). Sent by the client after a
// battle resolves (win or lose). Counterpart to battleStart (301): the request
// only carries battleId + clear_round + clear_grade, so we look up the
// in-flight session captured by battleStart and use its substageUid to drive
// reward / energy logic.
//
// Scope (V1): BT_Story only — chapter 1-1 tutorial path. Other battle types
// (arena, dungeon, raid, ...) fall back to a minimal echo until those modes
// are exercised.
//
// Wire shape (cannae_protocol.proto:3808, 6188, 1842, 2100):
//
//   message ReqBattleEnd {
//       BattleType battle_type = 1;
//       BattleEndResultType result = 2;
//       MsgReqBattleEndStory story = 3;
//       ...one of: dungeon / arena / clan_raid / ...
//   }
//   message MsgReqBattleEndStory {
//       uint64 battle_id = 1;
//       repeated MsgReward drop_items = 2;
//       uint32 clear_round = 3;
//       uint32 clear_grade = 4;
//       bool kill_event_monster = 5;
//   }
//   message RspBattleEnd {
//       BattleType battle_type = 1;
//       BattleEndResultType result = 2;
//       MsgUser user = 3;
//       MsgRspBattleEndStory story = 4;
//       ...
//   }
//   message MsgRspBattleEndStory {
//       MsgUserStoryBattleClearHistory clear_history = 1;
//       repeated MsgUserCharacter user_characters = 2;
//       repeated MsgBattleUserCharacterLevInfo user_character_deltas = 3;
//       repeated MsgBattleRewardInfo reward_deltas = 4;
//       repeated MsgBattleRewardInfo first_clear_rewards = 5;
//       ...
//   }
//
// Reward sources (master DB, stage 1-1 = 0x6A8DC690):
//   - reward_gold (f14) and monster_exp (f13) on the parent SubStage row are
//     the per-clear baseline. Gold is credited to user.gold; monster_exp is
//     surfaced on the wire as the GDT_Exp delta but not yet persisted into
//     user_characters.exp (V1 deferred — character XP system arrives later).
//   - stage__f153_SubStage_f21_Reward is the first-clear bonus list. We do
//     not yet persist clear history per user, so V1 always emits the
//     first-clear rewards; downstream batches will gate on a clear-history
//     table. Currency-flavoured entries (GDT_Fame) are applied via the
//     existing applyMissionRewards pipeline; gear/expItem entries are
//     surfaced on the wire with deltaAmount but no actual inventory mutation
//     (inventory systems not implemented).
//   - stage__f153_SubStage_f26_Reward is GDT_Display-only (UI hints, no
//     server-side state change), so it never enters the reward pipeline.

function buildUserCharactersWire(userId: string, characters: UserCharacterRow[], now: number): any[] {
    // Mirrors the userCharacters shape from handlers/user.ts:163 — must stay
    // in sync since the client builds the same MsgUserCharacter dict from
    // either feed and a shape divergence between login and battle-end would
    // re-trigger the recruit-cutscene IndexOutOfRange class of failure.
    return characters.map(c => ({
        characterId:   String(c.character_id),
        userId,
        characterUid:  c.character_uid,
        grade:         c.grade,
        awaken:        c.awaken,
        lev:           c.lev,
        exp:           c.exp,
        lastBattleDate: String(now),
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
        updateTimestamp: now,
    }));
}

function buildCharacterDeltas(
    characters: UserCharacterRow[],
    requestSlots: any[] | undefined,
): any[] {
    // Echo one entry per slot the request fielded. V1 does not yet grant
    // character XP, so prev/after are equal and gainExp is omitted (proto3
    // default is 0 — protobufjs will skip the field on the wire). The
    // client uses this list to drive the per-character XP-bar animation in
    // the result screen; same-lev / same-exp / 0 gain produces a no-op
    // animation that still keeps the wire shape well-formed.
    const slots: { userCharacterId?: string }[] = Array.isArray(requestSlots) ? requestSlots : [];
    const byId = new Map<string, UserCharacterRow>();
    for (const c of characters) byId.set(String(c.character_id), c);

    return slots
        .filter(s => s && s.userCharacterId && s.userCharacterId !== "0")
        .map(s => {
            const c = byId.get(String(s.userCharacterId));
            if (!c) {
                // Slot references a userCharacterId that does not exist on
                // this user. Should not happen — battleStart already echoed
                // the slot from the same source. Emit a minimal entry so
                // the wire stays well-formed.
                return {
                    isMaxLev: false,
                    userCharacterId: String(s.userCharacterId),
                    prevLev: 1,
                    prevExp: 0,
                    afterLev: 1,
                    afterExp: 0,
                };
            }
            return {
                isMaxLev: false,
                userCharacterId: String(c.character_id),
                prevLev: c.lev,
                prevExp: c.exp,
                afterLev: c.lev,
                afterExp: c.exp,
            };
        });
}

interface RewardWire {
    type:        string;
    amount:      number;
    grade:       string;
    stuffReward: MsgStuffRewardWire & { noApply?: boolean };
}

function buildRewardDeltas(goldAmount: number, monsterExp: number): RewardWire[] {
    const deltas: RewardWire[] = [];
    if (monsterExp > 0) {
        // V1 surfaces character XP on the wire only; user_characters.exp is
        // not yet incremented, so flag noApply so the client does not double-
        // apply against its local state.
        deltas.push({
            type:        "GDT_Exp",
            amount:      monsterExp,
            grade:       "RG_Normal",
            stuffReward: { type: "GDT_Exp", deltaAmount: monsterExp, noApply: true },
        });
    }
    if (goldAmount > 0) {
        deltas.push({
            type:        "GDT_Gold",
            amount:      goldAmount,
            grade:       "RG_Normal",
            // user.gold has been incremented in the server state already, but
            // the genuine wire (Haiko_35 et al.) ships GDT_Gold with
            // noApply=true: the client mirrors the user-state mutation from
            // the refreshed MsgUser in the same response, not from the
            // reward delta entry. Flagging matches that contract.
            stuffReward: { noApply: true, type: "GDT_Gold", deltaAmount: goldAmount },
        });
    }
    return deltas;
}

function buildFirstClearRewards(
    appliedFirstClearStuff: MsgStuffRewardWire[],
    skippedFirstClear: MasterMissionReward[],
): RewardWire[] {
    const out: RewardWire[] = [];
    for (const s of appliedFirstClearStuff) {
        out.push({
            type:        s.type,
            amount:      s.deltaAmount,
            grade:       "RG_Normal",
            stuffReward: { type: s.type, deltaAmount: s.deltaAmount },
        });
    }
    for (const r of skippedFirstClear) {
        // Non-currency rewards (GDT_Gear, GDT_ExpItem, ...) — surfaced on the
        // wire so the client renders the bonus card, but flagged noApply
        // because no inventory row has been created. The card will look
        // populated in the UI without lying to the client about state.
        out.push({
            type:        r.type,
            amount:      r.value,
            grade:       "RG_Normal",
            stuffReward: { noApply: true, type: r.type, deltaAmount: r.value },
        });
    }
    return out;
}

export function handleBattleEnd(req: any): any {
    const accessToken: string = req?.token ?? "";
    const inner = req?.battleEndReq ?? {};
    const battleType: string = inner?.battleType ?? "BT_Story";
    const resultEnum: string = inner?.result ?? "BERT_Win";

    const userRaw = findByAccessToken(accessToken);
    if (!userRaw) {
        console.warn(`battleEndReq: unknown token ${accessToken.slice(0, 16)}...`);
        return { protocolId: 302, result: "ErrorPacketTokenInvalid", battleEndRsp: {} };
    }

    if (battleType !== "BT_Story") {
        // Other battle modes: minimal echo, refresh energy regen, no reward
        // application. Same pattern as battleStart's fallback — keeps the
        // wire envelope well-formed for client paths that don't depend on
        // the mode-specific story sub-message.
        console.warn(`battleEndReq: battleType=${battleType} not implemented; returning minimal echo`);
        const refreshed = applyEnergyCharge(userRaw);
        return {
            protocolId: 302,
            battleEndRsp: {
                battleType,
                result: resultEnum,
                user: buildMsgUser(refreshed),
            },
        };
    }

    const battleId: string = String(inner?.story?.battleId ?? "");
    const session = consumeBattle(battleId);
    if (!session) {
        // Stale / forged battleId. The client should not be sending battleEnd
        // without a matching battleStart, so surface an error rather than
        // pretending the clear succeeded.
        console.warn(`battleEndReq: unknown battleId=${battleId}`);
        return { protocolId: 302, result: "ErrorInternalServerError", battleEndRsp: {} };
    }
    if (session.userId !== userRaw.user_id) {
        console.warn(`battleEndReq: battleId=${battleId} owned by ${session.userId}, requested by ${userRaw.user_id}`);
        return { protocolId: 302, result: "ErrorInternalServerError", battleEndRsp: {} };
    }

    const now = Math.floor(Date.now() / 1000);
    const substage = getSubStage(session.substageUid);
    if (!substage) {
        console.warn(`battleEndReq: substageUid=0x${session.substageUid.toString(16)} not in master`);
        return { protocolId: 302, result: "ErrorInternalServerError", battleEndRsp: {} };
    }

    // 1) Energy regen + spend. Production debits on clear, not on start —
    //    consistent with battleStart's deliberate non-debit.
    let user: UserRow = applyEnergyCharge(userRaw);
    if (resultEnum === "BERT_Win") {
        user = spendEnergy(user, substage.required_energy);
    }

    // 2) Currency rewards. Gold from the per-clear baseline (master f14),
    //    plus first-clear currency entries (GDT_Fame from f21_Reward).
    //    Non-currency first-clear entries (GDT_Gear / GDT_ExpItem) are
    //    surfaced on the wire but not applied — see buildFirstClearRewards.
    const baselineCurrency: MasterMissionReward[] =
        resultEnum === "BERT_Win"
            ? [{ type: "GDT_Gold", uid: 0, value: substage.reward_gold }]
            : [];

    const firstClearAll = resultEnum === "BERT_Win" ? getSubStageFirstClearRewards(session.substageUid) : [];
    const CURRENCY_TYPES = new Set(["GDT_Gold", "GDT_CashGem", "GDT_FreeGem", "GDT_Fame", "GDT_Cube", "GDT_Gem", "GDT_SummonStone"]);
    const firstClearCurrency = firstClearAll.filter(r => CURRENCY_TYPES.has(r.type));
    const firstClearSkipped  = firstClearAll.filter(r => !CURRENCY_TYPES.has(r.type));

    const baselineApplied   = applyMissionRewards(user, baselineCurrency);
    user = baselineApplied.user;
    const firstClearApplied = applyMissionRewards(user, firstClearCurrency);
    user = firstClearApplied.user;

    // 3) Wire shape.
    const characters = listByUser(user.user_id);
    const characterSlotData = session.characterSlotData ?? {};
    const requestSlots: any[] = Array.isArray(characterSlotData?.slots) ? characterSlotData.slots : [];

    const monsterExpDelta = resultEnum === "BERT_Win" ? substage.monster_exp : 0;
    const goldDelta       = resultEnum === "BERT_Win" ? substage.reward_gold : 0;

    return {
        protocolId: 302,
        battleEndRsp: {
            battleType,
            result: resultEnum,
            user: buildMsgUser(user),
            story: {
                clearHistory: {
                    substageUid:    session.substageUid,
                    challengeCount: 1,
                    clearCount:     resultEnum === "BERT_Win" ? 1 : 0,
                    clearGrade:     Number(inner?.story?.clearGrade ?? 3) || 0,
                    updateDate:     String(now),
                },
                userCharacters:      buildUserCharactersWire(user.user_id, characters, now),
                userCharacterDeltas: buildCharacterDeltas(characters, requestSlots),
                rewardDeltas:        buildRewardDeltas(goldDelta, monsterExpDelta),
                firstClearRewards:   buildFirstClearRewards(firstClearApplied.stuffRewards, firstClearSkipped),
                characterSlotData,
                userSupportCharacterUseRecord: { updateDate: String(now) },
            },
        },
    };
}
