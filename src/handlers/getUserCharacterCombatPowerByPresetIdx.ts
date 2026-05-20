import { findByAccessToken } from "../db/schema/users";
import { findById as findCharacterById } from "../db/schema/user_characters";
import { findById as findGearById } from "../db/schema/user_gears";
import { computeCombatPower } from "../core/combat_power";

// HTTP /api binary getUserCharacterCombatPowerByPresetIdxReq (protocolId=513).
// Sent by the auto-equip and gear-preset dialogs to ask the server "what
// would my combat_power be if I equipped this loadout?" — the client uses
// the returned uint to pick the highest-power loadout from candidate sets.
// Without this handler, the auto-equip flow gets 0 for every option and
// can't make a selection, leaving the tutorial idx-6 dialog deadlocked.
//
// Wire shape (cannae_protocol.proto):
//   message ReqGetUserCharacterCombatPowerByPresetIdx {
//       uint64 user_character_id = 1;
//       uint32 preset_idx = 2;
//       repeated uint64 equip_gear_ids = 3;
//   }
//   message RspGetUserCharacterCombatPowerByPresetIdx {
//       uint64 user_character_id = 1;
//       uint32 preset_idx = 2;
//       repeated uint64 equip_gear_ids = 3;
//       uint32 combat_power = 4;
//   }
//
// The request enumerates a HYPOTHETICAL loadout — no DB mutation. We resolve
// each gear_id to its row to feed the computeCombatPower heuristic; unknown
// or unowned ids are skipped so a malformed candidate set doesn't NRE the
// reply (the client may probe with ids it briefly saw and lost).
export function handleGetUserCharacterCombatPowerByPresetIdx(req: any): any {
    const accessToken: string = req?.token ?? "";
    const inner = req?.getUserCharacterCombatPowerByPresetIdxReq ?? {};
    const userCharacterId = Number(inner?.userCharacterId ?? 0) || 0;
    const presetIdx       = Number(inner?.presetIdx ?? 0) || 0;
    const candidateIds: string[] = Array.isArray(inner?.equipGearIds)
        ? inner.equipGearIds.map((id: any) => String(id))
        : [];

    const user = findByAccessToken(accessToken);
    if (!user) {
        console.warn(`getUserCharacterCombatPowerByPresetIdxReq: unknown token ${accessToken.slice(0, 16)}...`);
        return {
            protocolId: 513,
            result: "ErrorPacketTokenInvalid",
            getUserCharacterCombatPowerByPresetIdxRsp: {},
        };
    }

    const character = findCharacterById(userCharacterId);
    if (!character || character.user_id !== user.user_id) {
        console.warn(`getUserCharacterCombatPowerByPresetIdxReq: character_id=${userCharacterId} not owned by user_id=${user.user_id}`);
        return {
            protocolId: 513,
            result: "ErrorInternalServerError",
            getUserCharacterCombatPowerByPresetIdxRsp: {},
        };
    }

    const hypotheticalGears = candidateIds
        .map(idStr => findGearById(Number(idStr) || 0))
        .filter((g): g is NonNullable<typeof g> => !!g && g.user_id === user.user_id);

    const combatPower = computeCombatPower(character, hypotheticalGears);

    return {
        protocolId: 513,
        getUserCharacterCombatPowerByPresetIdxRsp: {
            userCharacterId: String(userCharacterId),
            presetIdx,
            equipGearIds: candidateIds,
            combatPower,
        },
    };
}
