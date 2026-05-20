import {
    insertGear,
    type UserGearRow,
} from "../db/schema/user_gears";
import {
    addItem,
    type UserItemRow,
} from "../db/schema/user_items";
import {
    getGearMaster,
    getItemMaster,
    pickGearMainEffect,
    pickGearOptionalEffects,
} from "../db/master";

// How many optional-effect slots to try to fill at grant time. The picker
// returns fewer when the rare-matching pool runs short (e.g. Verdant Sword
// optional pool has only one rare-2 row), and born_optional_effect_count
// on the wire mirrors what we actually picked — over-claiming would have
// the client render slots for effects that aren't there.
const OPTIONAL_EFFECT_ROLL_COUNT = 2;

// Insert a single new gear instance at the requested grade. `grade` is the
// gear's star rating (1-5+) — comes straight from the master reward row's
// `value` for GDT_Gear entries (e.g. chapter.01.002 reward = value 2 ⇒
// 2-star Verdant Sword). It sets MsgUserGear.rare and steers the effect
// pickers so a grade-N gear ships with rare-N effects, matching how live
// LOH presents the reward: one star-2 sword, not two star-1 swords.
//
// Returns undefined when the gear_uid isn't in master — caller logs a
// warning and skips the wire entry rather than emitting a half-built
// MsgUserGear that would NRE the client (lesson #11: a stuffReward of
// type GDT_Gear without a populated userGear sub-message silently halts
// the CoBattleEnd coroutine).
export function grantGear(userId: string, gearUid: number, grade: number): UserGearRow | undefined {
    const master = getGearMaster(gearUid);
    if (!master) return undefined;

    const safeGrade = grade > 0 ? grade : 1;
    const mainEffectUid = pickGearMainEffect(master.main_effect_random_uid, safeGrade);
    const optionalEffects = pickGearOptionalEffects(
        master.optional_effect_random_uid,
        safeGrade,
        OPTIONAL_EFFECT_ROLL_COUNT,
    );

    return insertGear({
        user_id:                        userId,
        gear_uid:                       gearUid >>> 0,
        equip_yn:                       0,
        rare:                           safeGrade,
        lev:                            0,
        main_effect_uid:                mainEffectUid >>> 0,
        born_optional_effect_count:     optionalEffects.length,
        optional_effects:               JSON.stringify(optionalEffects.map(e => e >>> 0)),
        exclusive_effect_character_uid: 0,
        exclusive_effect_uid:           0,
        lock_yn:                        0,
        update_timestamp:               Math.floor(Date.now() / 1000),
        equip_to_user_character_id:     0,
        equip_to_slot_type:             0,
    });
}

// Add `delta` of item_uid to the user's stack. Used for both GDT_Item and
// GDT_ExpItem rewards — they share the same wire shape (MsgUserItem) and
// the same underlying table; the type tag just steers the client UI's
// category bucket. Master lookup gates unknown uids so a typo in a master
// row doesn't pollute user_items with phantom rows.
export function grantItem(userId: string, itemUid: number, delta: number): UserItemRow | undefined {
    if (delta <= 0) return undefined;
    const master = getItemMaster(itemUid);
    if (!master) return undefined;
    return addItem(userId, itemUid, delta);
}
