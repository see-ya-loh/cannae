import { findByAccessToken, buildMsgUser } from "../db/schema/users";
import { applyEnergyCharge } from "../core/energy";

// HTTP /api binary updateUserAutoSequenceReq (protocolId=205). Sent by the
// client to commit an auto-progression checkpoint (most commonly fires during
// tutorial-driven battle flow — e.g. between battleStart and battleEnd, when
// the tutorial step records that the player has reached a particular
// in-battle waypoint).
//
// Wire shape (cannae_protocol.proto:5198, :8199, :2631):
//   message ReqUpdateUserAutoSequence {
//       fixed32 auto_sequence_uid = 1;
//       fixed32 check_uid = 2;
//       bool taken = 3;
//   }
//   message RspUpdateUserAutoSequence {
//       MsgUserAutoSequence user_auto_sequence = 1;
//       MsgUser user = 2;
//       MsgUserCharacter user_character = 3;
//       repeated MsgStuffReward stuff_rewards = 4;
//   }
//   message MsgUserAutoSequence {
//       fixed32 auto_sequence_uid = 1;
//       bool taken = 2;
//       fixed32 check_uid = 3;
//       uint64 update_date = 4;
//   }
//
// Without an explicit handler this protocol was returning NO_HANDLER's empty
// `updateUserAutoSequenceRsp:{}` envelope mid-battle (api_trace.log: seqNo=8
// between battleStart and battleEnd). The dump.cs analysis suggested the
// post-battle tutorial-progress coroutine in TutorialManager.HandleBattleStep
// can be gated on the auto-sequence commit having returned a populated
// MsgUserAutoSequence — empty inner = client treats the checkpoint as
// never-committed, post-battle tutorial advance loop stalls, no follow-up
// tutorialProgressReq fires, and the result screen hangs after the boss
// kill. Echoing the request fields back as MsgUserAutoSequence is the
// minimal fix: nothing to persist server-side because the client owns the
// auto-sequence state (server is just the round-trip endpoint that confirms
// the checkpoint was recorded).
//
// user_character + stuff_rewards are not populated — there is no
// per-checkpoint reward in the tutorial path. When non-tutorial auto-
// sequence flows surface their own per-checkpoint reward semantics, those
// can be added without breaking the current contract.

export function handleUpdateUserAutoSequence(req: any): any {
    const inner = req?.updateUserAutoSequenceReq ?? {};
    const autoSequenceUid: number = (inner?.autoSequenceUid ?? 0) >>> 0;
    const checkUid:        number = (inner?.checkUid        ?? 0) >>> 0;
    const taken:           boolean = Boolean(inner?.taken);

    const accessToken: string = req?.token ?? "";
    const userRaw = findByAccessToken(accessToken);
    if (!userRaw) {
        console.warn(`updateUserAutoSequenceReq: unknown token ${accessToken.slice(0, 16)}...`);
        return { protocolId: 205, result: "ErrorPacketTokenInvalid", updateUserAutoSequenceRsp: {} };
    }
    const user = applyEnergyCharge(userRaw);

    return {
        protocolId: 205,
        updateUserAutoSequenceRsp: {
            userAutoSequence: {
                autoSequenceUid,
                taken,
                checkUid,
                updateDate: String(Math.floor(Date.now() / 1000)),
            },
            user: buildMsgUser(user),
        },
    };
}
