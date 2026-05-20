import type { UserCharacterRow } from "../db/schema/user_characters";
import type { UserGearRow } from "../db/schema/user_gears";
import { getCharacterMaster, type MasterCharacter } from "../db/master";

// Server-authoritative combat power computation.
//
// The client side just reads MsgUserCharacter.combat_power (offset 0xC8) as a
// cached field — confirmed by ARM64 disasm of UserCharacterInfo$$get_BattlePower
// @ 0x3B21EB0:
//   str x30, [sp, #-0x10]!
//   ldr x8, [x0, #0x20]      ; this->_userCharacter
//   cbz x8, throw
//   ldr w0, [x8, #0xc8]      ; return userCharacter._combat_power
//   ret
// (dump.cs line 582689 confirms _combat_power at offset 0xC8.)
//
// Auto-equip and gear-preset dialogs ask the server for hypothetical
// combat_power per loadout via `getUserCharacterCombatPowerByPresetIdxReq`
// (proto 513). Real LOH's formula is private to the server; without source
// the V1 here uses a transparent heuristic that:
//   1. Is always > 0 for a starter character with no gear (auto-equip math
//      breaks when current == 0).
//   2. Is monotonically increasing with equipped gear count / rare / lev so
//      the client picks "more gear" over "less gear" and "higher rare" over
//      "lower rare" — the only behaviour the tutorial actually depends on.
//   3. Scales with grade/awaken/lev so higher-tier characters land in the
//      right magnitude window observed across astridtraffic captures
//      (lv 50 g5 aw2 → ~30 000; lv 70 g7 aw3 → ~95 000).
// Exact numeric parity with live LOH is out of scope; refining the formula
// is a separate evidence-driven sub-track.

const BASE_HP_WEIGHT  = 1;
const BASE_ATK_WEIGHT = 10;
const BASE_DEF_WEIGHT = 10;
const BASE_SPD_WEIGHT = 10;
const GRADE_STEP      = 0.30;
const AWAKEN_STEP     = 0.15;
const LEV_STEP        = 0.05;
const GEAR_RARE_BONUS = 50;
const GEAR_LEV_BONUS  = 30;

export function computeCombatPower(
    character: UserCharacterRow,
    equippedGears: ReadonlyArray<UserGearRow>,
    masterOverride?: MasterCharacter,
): number {
    const master = masterOverride ?? getCharacterMaster(character.character_uid);
    if (!master) {
        // Unknown character master — emit a stable nonzero so the UI math
        // doesn't deadlock on "delta vs zero" comparisons.
        return 1;
    }
    const baseSum =
        master.hp * BASE_HP_WEIGHT +
        master.atk * BASE_ATK_WEIGHT +
        master.def * BASE_DEF_WEIGHT +
        master.spd * BASE_SPD_WEIGHT;
    const gradeMult  = 1 + Math.max(0, character.grade - 1) * GRADE_STEP;
    const awakenMult = 1 + Math.max(0, character.awaken - 1) * AWAKEN_STEP;
    const levMult    = 1 + Math.max(0, character.lev - 1) * LEV_STEP;
    let gearBonus = 0;
    for (const g of equippedGears) {
        gearBonus += g.rare * GEAR_RARE_BONUS + g.lev * GEAR_LEV_BONUS;
    }
    const cp = baseSum * gradeMult * awakenMult * levMult + gearBonus;
    return Math.max(1, Math.floor(cp));
}
