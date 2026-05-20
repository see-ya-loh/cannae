import { findByAccessToken, buildMsgUser, updateResources } from "../db/schema/users";
import {
    findById as findGearById,
    setLev,
    buildMsgUserGear,
} from "../db/schema/user_gears";
import { getGearUpgrade } from "../db/master";
import { applyEnergyCharge } from "../core/energy";
import {
    incrementCount as incrementMissionCount,
    buildMsgUserMission,
} from "../db/schema/user_missions";

// HTTP /api binary upgradeGearReq (protocolId=505). Sent each time the
// player taps "Normal Enhance" inside DlgGearEnhance — the idx-7 tutorial
// drives Fram's weapon through three of these calls (action `extra`:
// `check_gear_slot,Fram,1,enhance,3`).
//
// Wire shape (cannae_protocol.proto):
//   message ReqUpgradeGear {
//       uint64 gear_id = 1;
//   }
//   message RspUpgradeGear {
//       MsgUser user = 1;
//       MsgUserGear user_gear = 2;
//       bool success = 3;
//   }
//
// Master `gear__f209_GearUpgrade` keys cost / success_prob by
// (gear.rare, current lev). Chapter-1 rare-1 lev 0->1/1->2/2->3 all roll
// success_prob 1.0, so V1 forces success=true and skips the probability
// branch entirely; weighted random would only matter for higher-rarity
// gear, which the tutorial never exercises.
//
// Mission 01.004 (chapter.01.004 "Upgrade equipment 3 times",
// QMC_UpgradeGear goal_count=3) bumps once per successful upgrade with no
// sub_condition gating — every gear upgrade qualifies. The delta ships in
// a sibling updateQuestRsp ahead of upgradeGearRsp, same pattern as
// battleEnd / autoEquipGear.

const CHAPTER_01_004_MISSION_UID = 0xD67552D1;

export function handleUpgradeGear(req: any): any {
    const accessToken: string = req?.token ?? "";
    const inner = req?.upgradeGearReq ?? {};
    const gearId = Number(inner?.gearId ?? 0) || 0;

    const userRaw = findByAccessToken(accessToken);
    if (!userRaw) {
        console.warn(`upgradeGearReq: unknown token ${accessToken.slice(0, 16)}...`);
        return { protocolId: 505, result: "ErrorPacketTokenInvalid", upgradeGearRsp: {} };
    }

    const gear = findGearById(gearId);
    if (!gear || gear.user_id !== userRaw.user_id) {
        console.warn(`upgradeGearReq: gear_id=${gearId} not owned by user_id=${userRaw.user_id}`);
        return { protocolId: 505, result: "ErrorInternalServerError", upgradeGearRsp: {} };
    }

    const upgrade = getGearUpgrade(gear.rare, gear.lev);
    if (!upgrade) {
        console.warn(`upgradeGearReq: no master upgrade row for rare=${gear.rare} lev=${gear.lev}`);
        return { protocolId: 505, result: "ErrorInternalServerError", upgradeGearRsp: {} };
    }

    let user = applyEnergyCharge(userRaw);
    if (user.gold < upgrade.gold_cost) {
        console.warn(`upgradeGearReq: insufficient gold (${user.gold} < ${upgrade.gold_cost})`);
        return {
            protocolId: 505,
            result: "ErrorInternalServerError",
            upgradeGearRsp: {
                user: buildMsgUser(user),
                userGear: buildMsgUserGear(gear),
                success: false,
            },
        };
    }

    // V1: success_prob is always 1.0 for chapter-1 rare-1 gear, so the
    // lev bump is unconditional. Once higher-rare gear enters scope, the
    // prob branch should pick a Math.random() roll against
    // upgrade.success_prob and skip the lev / mission updates on miss.
    user = { ...user, gold: user.gold - upgrade.gold_cost };
    updateResources.run(
        user.gold, user.cash_gem, user.free_gem,
        user.fame, user.cube, user.summon_stone,
        user.user_id,
    );
    setLev(gearId, gear.lev + 1);
    const upgradedGear = findGearById(gearId)!;

    const upgradeGearRsp = {
        protocolId: 505,
        upgradeGearRsp: {
            user:     buildMsgUser(user),
            userGear: buildMsgUserGear(upgradedGear),
            success:  true,
        },
    };

    const missionUpdate = incrementMissionCount(user.user_id, CHAPTER_01_004_MISSION_UID, 1);
    if (!missionUpdate) {
        return upgradeGearRsp;
    }
    return [
        { protocolId: 651, updateQuestRsp: { missions: [buildMsgUserMission(missionUpdate)] } },
        upgradeGearRsp,
    ];
}
