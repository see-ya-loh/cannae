import { findByAccessToken, buildMsgUser } from "../db/schema/users";
import { applyEnergyCharge } from "../core/energy";
import { applyMissionRewards } from "../core/rewards";
import { getMissionRewards } from "../db/master";
import { markReceived, buildMsgUserMission } from "../db/schema/user_missions";

// HTTP /api binary getQuestClearRewardReq (protocolId=652). The client fires
// this when the tutorial-3 mission card (chapter.01.001 reward,
// QMC_ProgressTutorial) is tapped — and for every other quest reward claim
// afterwards. The wire shape (cannae_protocol.proto):
//
//   message ReqGetQuestClearReward {
//       Cannae.GameData.QuestType quest_type = 1;
//       fixed32 quest_uid = 2;
//   }
//   message RspGetQuestClearReward {
//       Cannae.GameData.QuestType quest_type = 1;
//       MsgUser user = 2;
//       repeated MsgStuffReward stuff_rewards = 3;
//       MsgUserAchievement achievement = 4;
//       MsgUserMission mission = 5;
//       MsgUserChallengeAchievement challenge_achievement = 6;
//   }
//
// Client path: `UserDataManager.OnPacketRspGetQuestClearReward` updates the
// MsgUserMission entry inside `mUserMissions` (dict +0x418) with the returned
// `mission` field, so flipping `receive_reward = true` is what tells the
// tutorial sequencer the claim succeeded. With the dict still populated, the
// next `TutorialManager.CheckSkipCondition` evaluation for idx 4+ stays on
// the don't-skip path (entry exists), so the chapter-1-1 battle guide can
// continue.
//
// Mission state is now DB-backed (user_missions table). The static seed at
// register time matches the previous STARTER_USER_MISSIONS literal, but the
// `receive_reward` bit persists across logins, so a player who has already
// claimed chapter.01.001's reward sees `receiveReward: true` on subsequent
// userLoginRsp.userMissions entries. That keeps the mission card grayed out
// in the lobby instead of re-offering the same fame payout every login.
export function handleGetQuestClearReward(req: any): any {
    const accessToken: string = req?.token ?? "";
    const questType: string   = req?.getQuestClearRewardReq?.questType ?? "QT_Story";
    const questUid: number    = (req?.getQuestClearRewardReq?.questUid ?? 0) >>> 0;

    const userRaw = findByAccessToken(accessToken);
    if (!userRaw) {
        console.warn(`getQuestClearRewardReq: unknown token ${accessToken.slice(0, 16)}...`);
        return {
            protocolId: 652,
            result: "ErrorPacketTokenInvalid",
            getQuestClearRewardRsp: {},
        };
    }

    // Pull master rewards (quest__f502_Mission_f9_Reward) and apply them
    // to the user row. The reward type varies per mission — tutorial idx 3
    // (chapter.01.001) grants GDT_Fame, later missions hand out gold / cube
    // / gems / etc — so the helper switches on type and updates the
    // matching MsgUser column. Energy regen is folded in via applyEnergyCharge
    // so the response stays consistent with what userLoginRsp would return
    // at the same instant.
    const chargedUser = applyEnergyCharge(userRaw);
    const masterRewards = getMissionRewards(questUid);
    const { user, stuffRewards } = applyMissionRewards(chargedUser, masterRewards);

    // Persist the claim. markReceived returns the post-update row so we ship
    // accurate count / goal_count to the client instead of the hardcoded
    // 1/1 the V1 path used.
    const updatedMission = markReceived(user.user_id, questUid);
    const missionWire = updatedMission
        ? buildMsgUserMission(updatedMission)
        // Mission row missing (e.g. a reward claim for a mission that was
        // never seeded). Echo the request uid with receiveReward=true so the
        // client UI still flips state, without inventing count / goal.
        : { questUid, count: 1, goalCount: 1, receiveReward: true };

    return {
        protocolId: 652,
        getQuestClearRewardRsp: {
            questType,
            user: buildMsgUser(user),
            stuffRewards,
            mission: missionWire,
        },
    };
}
