import {
    findByAccessToken,
    setTutorialStepUid,
    buildMsgUser,
} from "../db/schema/users";
import { applyEnergyCharge } from "../core/energy";
import { config } from "../config";
import fs from "fs";
import path from "path";

const PROGRESS_LOG = path.join(config.paths.logs_dir, "tutorial_progress.log");

// HTTP /api binary tutorialProgressReq (protocolId=204). The client fires this
// each time a save=1 tutorial finishes — `<ReqTutorialProgress>d__63.MoveNext`
// (RVA 0x41BC85B) sends the just-completed tutorial uid. The response shape is
// `RspTutorialProgress { MsgUser user = 1 }`; the client's
// `TutorialManager.OnPacketRspTutorial` (RVA 0x41BC8D9) reads the new
// `user.tutorial_step_uid` from there to advance its internal pointer and
// flips `_isCompletedReqTutorialProgress`. Returning the previous empty
// buildErrorResponse left the field unset, which is what was forcing the
// next-tutorial branch to start in a corrupted state (Charlotte recruit
// skipped, gear-enhancement dialog forced).
//
// User identity comes from the outer Request envelope's `token` field
// (cannae's `access_token`), because the inner ReqTutorialProgress only
// carries `tutorial_step_uid`.
export function handleTutorialProgress(req: any): any {
    const accessToken: string = req?.token ?? "";
    const stepUid: number = req?.tutorialProgressReq?.tutorialStepUid ?? 0;

    const userRaw = findByAccessToken(accessToken);
    if (!userRaw) {
        console.warn(`tutorialProgressReq: unknown token ${accessToken.slice(0, 16)}...`);
        return {
            protocolId: 204,
            result: "ErrorPacketTokenInvalid",
            tutorialProgressRsp: {},
        };
    }
    // Refresh server-side energy so the MsgUser shipped back is consistent
    // with what userLoginRsp / checkEnergyChargeTimeRsp would return at the
    // same instant — the client trusts whichever envelope arrives last.
    const user = applyEnergyCharge(userRaw);

    setTutorialStepUid(user.user_id, stepUid);

    // Append each progress call so we can correlate the rapid burst of
    // tutorialProgressReq fired after a save=1 tutorial ends with the master
    // sequence (tutorial__f401_Tutorial _idx order). Format keeps the uid as
    // an unsigned 32-bit hex for easy cross-reference.
    const hex = "0x" + ((stepUid >>> 0).toString(16).toUpperCase().padStart(8, "0"));
    fs.appendFileSync(PROGRESS_LOG,
        `${new Date().toISOString()} user=${user.user_id} stepUid=${hex}\n`);

    return {
        protocolId: 204,
        tutorialProgressRsp: {
            user: buildMsgUser({ ...user, tutorial_step_uid: stepUid }),
        },
    };
}
