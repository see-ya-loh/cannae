import {
    findByAccessToken,
    updateProfileForRegistration,
} from "../db/schema/users";
import { grantStarterCharacters } from "../db/schema/user_characters";
import { grantStarterMissions } from "../db/schema/user_missions";

// HTTP /api binary userRegisterReq (protocolId=202). Sent when the player
// confirms the nickname-input screen. Persists name + master visuals onto
// the user row that idPLogin already created; the response message itself is
// empty (RspUserRegister has no fields). hello_message and agree_* fields
// are ignored for now — wire them up only once a follow-up protocol turns
// out to depend on them.
export function handleUserRegister(req: any): any {
    const body = req?.userRegisterReq ?? {};
    const accessToken: string = body.accessToken ?? "";

    const user = findByAccessToken(accessToken);
    if (!user) {
        console.warn(`userRegisterReq: unknown accessToken ${accessToken.slice(0, 16)}...`);
        return {
            protocolId: 202,
            result: "ErrorPacketTokenInvalid",
            userRegisterRsp: {},
        };
    }

    updateProfileForRegistration(
        user.user_id,
        String(body.name ?? ""),
        String(body.masterGenderType ?? ""),
        {
            skin:      String(body.masterSkinType      ?? ""),
            hair:      String(body.masterHairType      ?? ""),
            hairColor: String(body.masterHairColorType ?? ""),
        },
    );

    // First tutorial battle (`tutorial.battle.step01`, master uid 0x23B9602C)
    // iterates its party list and calls `UserDataManager.GetUserCharacterByUid`
    // for each member. Without FramW + JohannL in the user's roster the lookup
    // returns null and `TutorialManager.Error` fires — the client raises a
    // generic system-error toast and `_tutorialError=1`, stuck on action 0.
    grantStarterCharacters(user.user_id);

    // Seed the four chapter-1 mission rows that gate tutorial idx 3-6's
    // skipCondition checks. INSERT OR IGNORE keeps user-driven state
    // (count / receive_reward) intact across reruns; the same call also runs
    // on every userLogin so users registered before the table existed pick
    // up the baseline without an explicit migration.
    grantStarterMissions(user.user_id);

    return {
        protocolId: 202,
        userRegisterRsp: {},
    };
}
