import { updateResources, type UserRow } from "../db/schema/users";
import type { MasterMissionReward } from "../db/master";
import { grantGear, grantItem } from "./inventory";
import { buildMsgUserGear } from "../db/schema/user_gears";
import { buildMsgUserItem } from "../db/schema/user_items";

// One on-wire MsgStuffReward (proto 2394). Used to tell the client which
// resource changed and by how much when the server grants a reward.
//
// - Currency entries (gold / fame / ...) carry deltaAmount only. The
//   wire's refreshed MsgUser already reflects the post-grant totals;
//   matches the fix-U baseline that chapter.01.001 fame claim verified
//   against (deltaAmount without noApply).
// - GDT_Gear entries populate userGear with a fully-built MsgUserGear from
//   the newly-inserted user_gears row; the client adds the instance to its
//   gear dict from this sub-message.
// - GDT_Item / GDT_ExpItem entries populate userItem with the post-stack
//   total (matching the user_items row).
// - noApply is reserved for callers that want the client to skip its local
//   delta calculation (battleEnd's rewardDeltas uses it for GDT_Gold/GDT_Exp).
export interface MsgStuffRewardWire {
    type:         string;
    deltaAmount:  number;
    noApply?:     boolean;
    userGear?:    any;
    userItem?:    any;
}

// Map a GlobalDataType (cannae_gamedata.proto:1557) to the corresponding
// UserRow column. Only currency-flavoured types live on the user row;
// inventory-flavoured types (GDT_Gear, GDT_Item, GDT_ExpItem) route into
// the inventory helpers below.
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
// the reward response.
//
// - Currency rewards fold into the user state and persist in one UPDATE.
// - GDT_Gear inserts one user_gears row per `value` count (a `value=2`
//   reward yields two MsgStuffReward entries, each carrying its own
//   freshly-issued gear instance) — matches the shop-grant capture pattern
//   where one stuffReward = one instance.
// - GDT_Item / GDT_ExpItem stack on a single user_items row and emit one
//   stuffReward entry with the deltaAmount the master specified.
// - Unknown types log a warning and emit a deltaAmount-only echo so the
//   client renders the icon without server-side state changing.
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
            continue;
        }
        if (r.type === "GDT_Gear") {
            // master `value` is the gear's grade (star rating), not a count.
            // Real LOH ships one star-N gear per reward entry; granting N
            // copies of a star-1 gear is the wrong shape and tipped the
            // tutorial idx-6 auto-equip picker to skip the items.
            const row = grantGear(next.user_id, r.uid, r.value);
            if (!row) {
                console.warn(`applyMissionRewards: GDT_Gear uid=0x${r.uid.toString(16)} master missing`);
                continue;
            }
            stuffRewards.push({
                type:        "GDT_Gear",
                deltaAmount: 1,
                userGear:    buildMsgUserGear(row),
            });
            continue;
        }
        if (r.type === "GDT_Item" || r.type === "GDT_ExpItem") {
            const row = grantItem(next.user_id, r.uid, r.value);
            if (!row) {
                console.warn(`applyMissionRewards: ${r.type} uid=0x${r.uid.toString(16)} master missing`);
                continue;
            }
            stuffRewards.push({
                type:        r.type,
                deltaAmount: r.value,
                userItem:    buildMsgUserItem(row),
            });
            continue;
        }
        console.warn(`applyMissionRewards: unhandled reward type=${r.type} value=${r.value}`);
        stuffRewards.push({ type: r.type || "GDT_None", deltaAmount: r.value });
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
