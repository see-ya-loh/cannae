import { findByAccessToken, buildMsgUser, type UserRow } from "../db/schema/users";
import { applyEnergyCharge } from "../core/energy";
import { issueBattleId, registerBattle } from "../core/battle";
import { upsertSlots } from "../db/schema/user_character_slot_data";
import {
    getSubStageRounds,
    getStageMonsterUids,
    type MasterRound,
} from "../db/master";

// HTTP /api binary battleStartReq (protocolId=301). Dispatch entry for every
// in-game battle: story stages, arena, raids, sea battle, etc. Today we only
// answer BT_Story — the chapter 1-1 entry from the tutorial idx-3 path — so
// the loading screen can move past 40%. Other battle types fall back to a
// minimal echo (battleType + user + characterSlotData) that keeps the wire
// envelope well-formed; downstream rendering will fail in mode-specific ways
// when those modes are exercised, which we'll address as they come up.
//
// IMPORTANT: in production, energy is debited on stage CLEAR, not on battle
// start — force-quitting mid-load leaves energy untouched. So this handler
// does NOT decrement user.energy; the substage's required_energy cost is the
// client-side gating value (the player can't even tap the entry button
// without it), but the server only refreshes regen (applyEnergyCharge) so
// the response shows the current banked total. The actual spend happens
// when battleEnd / battleResult arrives — separate handler, separate plan.
//
// Wire shape (cannae_protocol.proto:3857, 6244):
//
//   message ReqBattleStart {
//       Cannae.GameData.BattleType battle_type = 1;
//       MsgCharacterSlotData character_slot_data = 2;
//       MsgReqBattleStartStory story = 3;
//       ...one of: dungeon / arena / clan_raid / proof_dungeon / ...
//       MsgBattleSkip battle_skip = 1000;
//   }
//   message RspBattleStart {
//       Cannae.GameData.BattleType battle_type = 1;
//       MsgUser user = 2;
//       MsgCharacterSlotData character_slot_data = 3;
//       MsgRspBattleStartStory story = 5;
//       ...
//   }
//   message MsgReqBattleStartStory { fixed32 substage_uid = 1; }
//   message MsgRspBattleStartStory {
//       uint64 battle_id = 1;
//       fixed32 substage_uid = 2;
//       repeated MsgBattleData battles = 3;
//   }
//
// Round / enemy data is pulled from the master tables DB at request time —
// these are the same rows the client downloads via the manifest, so a
// server-side lookup keeps round_uid + stageMonsterUid in lockstep with
// whatever the client renders.

function buildStoryRounds(substageUid: number) {
    const rounds: MasterRound[] = getSubStageRounds(substageUid);
    return rounds.map(r => {
        const stageMonsterUids = getStageMonsterUids(r.monster_group_uid);
        // Trim to the visible-line size declared on the round. Genuine
        // wire (Haiko_33 et al.) sends one MsgEnemyMonster per enemy slot,
        // with a per-slot speed-gauge offset jittered around 0. We zero
        // those out — the client treats 0 as "no head-start" and the
        // tutorial expects deterministic ordering anyway.
        const enemies = stageMonsterUids.slice(0, r.monster_count).map(uid => ({
            stageMonsterUid: uid,
            initSpeedGaugeRatio: 0,
        }));
        return {
            uid: r.uid,
            round: r.round_index,
            enemies,
            roundBattleDataType: "RBDT_General",
        };
    });
}

export function handleBattleStart(req: any): any {
    const accessToken: string = req?.token ?? "";
    const inner = req?.battleStartReq ?? {};
    const battleType: string = inner?.battleType ?? "BT_Story";
    const reqSlotData = inner?.characterSlotData;

    const userRaw = findByAccessToken(accessToken);
    if (!userRaw) {
        console.warn(`battleStartReq: unknown token ${accessToken.slice(0, 16)}...`);
        return { protocolId: 301, result: "ErrorPacketTokenInvalid", battleStartRsp: {} };
    }
    const user: UserRow = applyEnergyCharge(userRaw);

    if (battleType === "BT_Story") {
        const substageUid: number = (inner?.story?.substageUid ?? 0) >>> 0;
        const battleId = issueBattleId();
        registerBattle({
            battleId,
            userId:            user.user_id,
            battleType,
            substageUid,
            characterSlotData: reqSlotData,
            startedAt:         Math.floor(Date.now() / 1000),
        });
        if (reqSlotData?.slotType && Array.isArray(reqSlotData?.slots)) {
            upsertSlots(user.user_id, reqSlotData.slotType, reqSlotData.slots);
        }
        return {
            protocolId: 301,
            battleStartRsp: {
                battleType,
                user: buildMsgUser(user),
                // Echo whatever party the client posted so the formation/slot
                // assignment survives round-trip; the client uses this back as
                // the source of truth for which roster ids participate.
                characterSlotData: reqSlotData,
                story: {
                    battleId,
                    substageUid,
                    battles:     buildStoryRounds(substageUid),
                },
            },
        };
    }

    // Fallback for not-yet-implemented battle types. Returning ResultOk with
    // only the universal fields (battleType + user) avoids the empty-body NRE
    // pattern in ServerConnection.ProcessResponsePacket; the mode-specific
    // rendering will still fail downstream, which is where we'll catch it
    // when those modes start being exercised.
    console.warn(`battleStartReq: battleType=${battleType} not implemented; returning minimal echo`);
    return {
        protocolId: 301,
        battleStartRsp: {
            battleType,
            user: buildMsgUser(user),
            characterSlotData: reqSlotData,
        },
    };
}
