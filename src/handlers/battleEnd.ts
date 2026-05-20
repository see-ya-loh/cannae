import { findByAccessToken, buildMsgUser, type UserRow } from "../db/schema/users";
import { listByUser, applyExpGain, type UserCharacterRow, type ExpGainResult } from "../db/schema/user_characters";
import { listEquippedByCharacter } from "../db/schema/user_gears";
import { computeCombatPower } from "../core/combat_power";
import { applyEnergyCharge, spendEnergy } from "../core/energy";
import { consumeBattle } from "../core/battle";
import { applyMissionRewards, type MsgStuffRewardWire } from "../core/rewards";
import {
    getSubStage,
    getSubStageFirstClearRewards,
    type MasterMissionReward,
} from "../db/master";
import { incrementCount as incrementMissionCount, buildMsgUserMission } from "../db/schema/user_missions";
import { recordAttempt as recordStoryAttempt } from "../db/schema/user_story_clears";

// substage clear → mission count++ mapping. V1 covers only the chapter 1-1
// path because that's the only substage the tutorial actually exercises;
// downstream substages need their own master condition lookup (the master
// row carrying clear-count requirements lives in a sub-table we haven't
// mapped yet). The handoff D hypothesis — "tutorial idx 4 stalls after
// battleEnd because the server never advances chapter.01.002" — needs only
// this single mapping to clear.
const SUBSTAGE_CLEAR_MISSIONS: Record<number, number[]> = {
    0x6A8DC690: [0xD87555F7], // stage 1-1 → chapter.01.002 "win stage 1-1"
};

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
        updateTimestamp: now,
    }));
}

function buildCharacterDeltas(
    requestSlots: any[] | undefined,
    expDeltas: Map<string, ExpGainResult & { gainExp: number }>,
): any[] {
    const slots: { userCharacterId?: string }[] = Array.isArray(requestSlots) ? requestSlots : [];

    return slots
        .filter(s => s && s.userCharacterId && s.userCharacterId !== "0")
        .map(s => {
            const id = String(s.userCharacterId);
            const delta = expDeltas.get(id);
            if (delta) {
                return {
                    isMaxLev: false,
                    userCharacterId: id,
                    prevLev: delta.prevLev,
                    prevExp: delta.prevExp,
                    afterLev: delta.afterLev,
                    afterExp: delta.afterExp,
                    gainExp: delta.gainExp,
                };
            }
            return {
                isMaxLev: false,
                userCharacterId: id,
                prevLev: 1,
                prevExp: 0,
                afterLev: 1,
                afterExp: 0,
                gainExp: 0,
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
): RewardWire[] {
    // Echo every stuffReward applyMissionRewards produced — currency entries
    // (deltaAmount only), GDT_Gear entries (userGear populated), and
    // GDT_Item / GDT_ExpItem entries (userItem populated). Phase B1 made
    // applyMissionRewards inventory-aware, so non-currency entries now ship
    // with their sub-message attached and no longer trigger the CoBattleEnd
    // NRE that fix X worked around by dropping them entirely.
    return appliedFirstClearStuff.map(s => ({
        type:        s.type,
        amount:      s.deltaAmount,
        grade:       "RG_Normal",
        stuffReward: s,
    }));
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

    // 2) Reward application. Gold from the per-clear baseline (master f14)
    //    plus the full first-clear list (master f21_Reward). Phase B1's
    //    inventory-aware applyMissionRewards grants GDT_Gear instances and
    //    GDT_Item / GDT_ExpItem stacks, with each stuffReward carrying its
    //    own userGear / userItem sub-message — so the firstClearAll list no
    //    longer needs the currency-only filter fix X introduced.
    const baselineRewards: MasterMissionReward[] =
        resultEnum === "BERT_Win"
            ? [{ type: "GDT_Gold", uid: 0, value: substage.reward_gold }]
            : [];

    const firstClearAll = resultEnum === "BERT_Win"
        ? getSubStageFirstClearRewards(session.substageUid)
        : [];

    const baselineApplied   = applyMissionRewards(user, baselineRewards);
    user = baselineApplied.user;
    const firstClearApplied = applyMissionRewards(user, firstClearAll);
    user = firstClearApplied.user;

    // 3) EXP distribution to battle participants.
    const characterSlotData = session.characterSlotData ?? {};
    const requestSlots: any[] = Array.isArray(characterSlotData?.slots) ? characterSlotData.slots : [];

    const monsterExpDelta = resultEnum === "BERT_Win" ? substage.monster_exp : 0;
    const goldDelta       = resultEnum === "BERT_Win" ? substage.reward_gold : 0;

    const expDeltas = new Map<string, ExpGainResult & { gainExp: number }>();
    if (monsterExpDelta > 0) {
        const activeSlots = requestSlots.filter(
            s => s?.userCharacterId && s.userCharacterId !== "0",
        );
        const n = activeSlots.length;
        if (n > 0) {
            const base = Math.floor(monsterExpDelta / n);
            let remainder = monsterExpDelta - base * n;
            for (const s of activeSlots) {
                const share = base + (remainder > 0 ? 1 : 0);
                if (remainder > 0) remainder--;
                const delta = applyExpGain(Number(s.userCharacterId), share);
                expDeltas.set(String(s.userCharacterId), { ...delta, gainExp: share });
            }
        }
    }

    // Re-read characters after EXP application so the wire reflects updated lev/exp.
    const characters = listByUser(user.user_id);

    // 4) Mission progress. Increment any mission whose completion is gated
    //    on clearing this substage (V1 = chapter.01.002 / stage 1-1). The
    //    deltas ship in a sibling updateQuestRsp ahead of battleEndRsp so
    //    UserDataManager.UpdateUserMissions has the new count when
    //    TutorialManager.HandleBattleStep evaluates its next-step
    //    skipCondition. Without this push the tutorial idx-4 actions stall
    //    after the battle resolves: the post-battle tutorialProgressReq
    //    only fires once the mission card reads count=goal.
    const missionUpdates = resultEnum === "BERT_Win"
        ? (SUBSTAGE_CLEAR_MISSIONS[session.substageUid] ?? [])
            .map(uid => incrementMissionCount(user.user_id, uid, 1))
            .filter((m): m is NonNullable<typeof m> => m !== undefined)
            .map(buildMsgUserMission)
        : [];

    // Persist the attempt before the wire echo so the row we ship in
    // `story.clearHistory` matches what the next userLogin will replay.
    // Without this write, surviving a force-close (re-login before the next
    // battleEnd) re-locks the just-cleared stage — login response would
    // ship zero clear histories and the world map UI treats absence as
    // "never won". challengeCount bumps on every attempt; clearCount only
    // on BERT_Win (matches genuine wire from Haiko_35).
    const clearGradeFromClient = Number(inner?.story?.clearGrade ?? 3) || 0;
    const persistedClear = recordStoryAttempt(
        user.user_id,
        session.substageUid,
        1,
        resultEnum === "BERT_Win" ? 1 : 0,
        clearGradeFromClient,
        now,
    );

    const battleEndRsp = {
        protocolId: 302,
        battleEndRsp: {
            battleType,
            result: resultEnum,
            user: buildMsgUser(user),
            story: {
                clearHistory: {
                    substageUid:    persistedClear.substage_uid >>> 0,
                    challengeCount: persistedClear.challenge_count,
                    clearCount:     persistedClear.clear_count,
                    clearGrade:     persistedClear.clear_grade,
                    updateDate:     String(persistedClear.update_date),
                },
                userCharacters:      buildUserCharactersWire(user.user_id, characters, now),
                userCharacterDeltas: buildCharacterDeltas(requestSlots, expDeltas),
                rewardDeltas:        buildRewardDeltas(goldDelta, monsterExpDelta),
                firstClearRewards:   buildFirstClearRewards(firstClearApplied.stuffRewards),
                characterSlotData,
                userSupportCharacterUseRecord: { updateDate: String(now) },
            },
        },
    };

    if (missionUpdates.length === 0) {
        return battleEndRsp;
    }

    // Multi-response envelope. The captured stage 1-1 traffic
    // (astridtraffic Haiko_35) puts updateQuestRsp ahead of battleEndRsp;
    // mirror that order so the client applies mission state before the
    // tutorial state machine reads it inside the battle-end handler.
    return [
        {
            protocolId: 651,
            updateQuestRsp: {
                missions: missionUpdates,
            },
        },
        battleEndRsp,
    ];
}
