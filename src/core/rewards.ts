import { updateResources, type UserRow } from "../db/schema/users";
import type { MasterMissionReward } from "../db/master";

// One on-wire MsgStuffReward (proto 2394): used to tell the client which
// resource changed and by how much when the server grants a reward. Field
// `no_apply` is left false — the server has already mutated `user`, so the
// client should NOT also apply the delta locally (proto3 default = false).
export interface MsgStuffRewardWire {
    type:         string;  // GlobalDataType enum string (GDT_Fame, GDT_Gold, ...)
    deltaAmount:  number;
}

// Map a GlobalDataType (cannae_gamedata.proto:1557) to the corresponding
// UserRow column. Only the currency-style types live on the user row today;
// item / character / gear rewards (GDT_Item, GDT_Character, ...) need their
// own inventory rows and are not implemented yet.
const RESOURCE_COLUMN_BY_TYPE: Record<string, keyof UserRow> = {
    GDT_Gold:        "gold",
    GDT_CashGem:     "cash_gem",
    GDT_FreeGem:     "free_gem",
    GDT_Fame:        "fame",
    GDT_Cube:        "cube",
    GDT_Gem:         "summon_stone",  // GDT_Gem in master = summon stone in MsgUser
    GDT_SummonStone: "summon_stone",
};

// Applies a list of MasterMissionReward entries to a user row, returning the
// updated row plus the on-wire MsgStuffReward[] the client expects to see in
// the reward response. Currency rewards are folded into the user state and
// persisted in a single UPDATE; unrecognised types are logged and surfaced as
// no_apply=true (deltaAmount still set) so the client can render the icon
// without the server pretending to have stored anything.
export function applyMissionRewards(
    user: UserRow,
    rewards: MasterMissionReward[],
): { user: UserRow; stuffRewards: MsgStuffRewardWire[] } {
    const next = { ...user };
    const stuffRewards: MsgStuffRewardWire[] = [];
    let mutated = false;

    for (const r of rewards) {
        const col = RESOURCE_COLUMN_BY_TYPE[r.type];
        if (col) {
            (next as any)[col] = ((next as any)[col] as number) + r.value;
            mutated = true;
            stuffRewards.push({ type: r.type, deltaAmount: r.value });
        } else {
            console.warn(`applyMissionRewards: unhandled reward type=${r.type} value=${r.value}`);
            stuffRewards.push({ type: r.type || "GDT_None", deltaAmount: r.value });
        }
    }

    if (mutated) {
        updateResources.run(
            next.gold, next.cash_gem, next.free_gem,
            next.fame, next.cube, next.summon_stone,
            next.user_id,
        );
    }
    return { user: next, stuffRewards };
}
