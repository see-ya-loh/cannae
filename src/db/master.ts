import sqlite from "better-sqlite3";
import { config } from "../config";

// Read-only handle to the master tables — the same schema the client
// downloads via /cdn/* at cold-launch. The server reads the SQLite snapshot
// directly so gameplay handlers (battleStart, etc.) can resolve substage /
// monster / reward definitions instead of hardcoding them. Path is taken
// from `paths.master_db` in cannae_config.toml.
//
// `f1:uid_u32` style columns are stored as HEX STRINGS in the table (e.g.
// "0x6A8DC690"), not numbers — selectors below convert via toHexString() so
// callers can pass plain numbers and read back numbers.
const masterDb = sqlite(config.paths.master_db, { readonly: true });
masterDb.pragma("query_only = ON");

function toHexString(uid: number): string {
    return "0x" + (uid >>> 0).toString(16).toUpperCase();
}

function parseHexCol(v: unknown): number {
    if (typeof v === "string") {
        if (v.startsWith("0x") || v.startsWith("0X")) return parseInt(v, 16) >>> 0;
        const n = Number(v);
        if (!Number.isNaN(n)) return n >>> 0;
    }
    if (typeof v === "number") return v >>> 0;
    return 0;
}

export interface MasterSubStage {
    uid: number;
    stage_uid: number;
    substage_index: number;
    difficulty: number;
    required_energy: number;
    reward_gold: number;
    monster_exp: number;
}

const selectSubStage = masterDb.prepare(`
    SELECT
        "f1:uid_u32"             AS uid,
        "f2:stage_uid_u32"       AS stage_uid,
        "f3:substage_index_vi"   AS substage_index,
        "f8:difficulty_vi"       AS difficulty,
        "f31:required_energy_vi" AS required_energy,
        "f14:reward_gold_vi"     AS reward_gold,
        "f13:monster_exp_vi"     AS monster_exp
    FROM stage__f153_SubStage
    WHERE "f1:uid_u32" = ?
`);

export function getSubStage(uid: number): MasterSubStage | undefined {
    const row = selectSubStage.get(toHexString(uid)) as Record<string, unknown> | undefined;
    if (!row) return undefined;
    return {
        uid:              parseHexCol(row.uid),
        stage_uid:        parseHexCol(row.stage_uid),
        substage_index:   Number(row.substage_index) || 0,
        difficulty:       Number(row.difficulty) || 0,
        required_energy:  Number(row.required_energy) || 0,
        reward_gold:      Number(row.reward_gold) || 0,
        monster_exp:      Number(row.monster_exp) || 0,
    };
}

export interface MasterRound {
    uid: number;
    round_index: number;       // 1-based round number within the substage
    monster_count: number;     // size of the visible enemy line
    monster_group_uid: number; // foreign key into stage__f156_StageMonsterGroup
}

const selectRounds = masterDb.prepare(`
    SELECT
        "f1:uid_u32"           AS uid,
        "f3:round_vi"          AS round_index,
        "f4:monster_count_vi"  AS monster_count,
        "f6:monster_group_u32" AS monster_group_uid
    FROM stage__f154_SubStageRound
    WHERE "f2:substage_uid_u32" = ?
    ORDER BY CAST("f3:round_vi" AS INTEGER) ASC
`);

export function getSubStageRounds(substageUid: number): MasterRound[] {
    const rows = selectRounds.all(toHexString(substageUid)) as Record<string, unknown>[];
    return rows.map(r => ({
        uid:               parseHexCol(r.uid),
        round_index:       Number(r.round_index) || 0,
        monster_count:     Number(r.monster_count) || 0,
        monster_group_uid: parseHexCol(r.monster_group_uid),
    }));
}

const selectMonsterGroupMembers = masterDb.prepare(`
    SELECT mg._idx AS parent_idx, sm."f1:uid_stage_monster_u32" AS stage_monster_uid
    FROM stage__f156_StageMonsterGroup AS mg
    JOIN stage__f156_StageMonsterGroup_f2_StageMonster AS sm
      ON sm."_parent_idx" = mg."_idx"
    WHERE mg."f1:uid_u32" = ?
    ORDER BY CAST(sm."_child_idx" AS INTEGER) ASC
`);

// Returns the per-StageMonster uids belonging to a StageMonsterGroup. These
// are what the wire calls `stageMonsterUid` inside MsgEnemyMonster — the
// client looks them up to resolve monster art / stats / loot tables.
export function getStageMonsterUids(monsterGroupUid: number): number[] {
    const rows = selectMonsterGroupMembers.all(toHexString(monsterGroupUid)) as Record<string, unknown>[];
    return rows.map(r => parseHexCol(r.stage_monster_uid));
}

export interface MasterMissionReward {
    type:  string;   // GlobalDataType enum string (GDT_Fame, GDT_Gold, ...)
    uid:   number;   // master uid for item-flavoured rewards (0 for currencies)
    value: number;   // amount granted
}

// Look up the reward rows attached to a quest__f502_Mission entry. The schema
// stores rewards as a child sub-table (f9_Reward) keyed by the parent row's
// `_idx`, so we first resolve the mission's `_idx`, then pull its children.
// Returns an empty array if the mission uid is not known to master — caller
// can treat that as "no rewards" without failing the request.
const selectMissionParentIdx = masterDb.prepare(`
    SELECT "_idx" AS idx FROM quest__f502_Mission WHERE "f1:uid_u32" = ?
`);
const selectMissionRewards = masterDb.prepare(`
    SELECT
        "f1:type_enum" AS type,
        "f2:uid_u32"   AS uid,
        "f3:value_vi"  AS value
    FROM quest__f502_Mission_f9_Reward
    WHERE "_parent_idx" = ?
    ORDER BY CAST("_child_idx" AS INTEGER) ASC
`);

export function getMissionRewards(questUid: number): MasterMissionReward[] {
    const parent = selectMissionParentIdx.get(toHexString(questUid)) as { idx: string | number } | undefined;
    if (!parent) return [];
    const rows = selectMissionRewards.all(parent.idx) as Record<string, unknown>[];
    return rows.map(r => ({
        type:  String(r.type ?? ""),
        uid:   parseHexCol(r.uid),
        value: Number(r.value) || 0,
    }));
}

// First-clear bonus rows attached to a stage__f153_SubStage entry. Shape
// matches MasterMissionReward (type/uid/value) so callers can pipe the
// result straight through applyMissionRewards for currency-flavoured
// entries (GDT_Fame, GDT_Gold, ...) — non-currency entries (GDT_Gear,
// GDT_ExpItem) are surfaced for wire-shape echo but skipped by the apply
// pass until inventory systems land.
const selectSubStageParentIdx = masterDb.prepare(
    `SELECT "_idx" AS idx FROM stage__f153_SubStage WHERE "f1:uid_u32" = ?`,
);
const selectSubStageFirstClearRewards = masterDb.prepare(`
    SELECT
        "f1:type_enum" AS type,
        "f2:uid_u32"   AS uid,
        "f3:value_vi"  AS value
    FROM stage__f153_SubStage_f21_Reward
    WHERE "_parent_idx" = ?
    ORDER BY CAST("_child_idx" AS INTEGER) ASC
`);

export function getSubStageFirstClearRewards(substageUid: number): MasterMissionReward[] {
    const parent = selectSubStageParentIdx.get(toHexString(substageUid)) as { idx: string | number } | undefined;
    if (!parent) return [];
    const rows = selectSubStageFirstClearRewards.all(parent.idx) as Record<string, unknown>[];
    return rows.map(r => ({
        type:  String(r.type ?? ""),
        uid:   parseHexCol(r.uid),
        value: Number(r.value) || 0,
    }));
}

// Gear master lookup. Powers the reward pipeline's GDT_Gear branch: when a
// mission / first-clear reward grants gear, the helper resolves the master
// row to pick effect pool keys and slot type, then grantGear (core/inventory)
// rolls effects and inserts the instance.
//
// `gear__f201_Gear` schema (20 columns, all TEXT):
//   _idx, f1:uid_u32, f2:name_*, f3:gear_set_uid_u32, f4:gear_slot_type_*,
//   f5:icon_str, f6:main_effect_random_uid_u32, f7:optional_effect_random_uid_u32,
//   f8:gear_type_*, f9:equip_limit_*, f10:exclusive_effect_random_uid_u32,
//   f11:gear_material_u32, f12:ignore_gacha_vi, f13:gear_sub_type_*
//
// Notably absent: a `rare` column. Gear rarity is derived from the rolled
// main effect's rare_vi (in gear__f203_..._Item.f3:rare_vi). Phase B1 stub
// just defaults to 1 because the V1 effect picker always returns the first
// pool row, which is rare 1 for the chapter-1 tutorial gear.
export interface MasterGear {
    uid:                          number;
    name_en:                      string;
    gear_set_uid:                 number;
    gear_slot_type:               string;   // "GST_Weapon" / "GST_Armor" / ...
    gear_type:                    string;   // "GT_Common" / ...
    equip_limit:                  string;   // "CT_None" / ...
    main_effect_random_uid:       number;
    optional_effect_random_uid:   number;
    exclusive_effect_random_uid:  number;
}

const selectGear = masterDb.prepare(`
    SELECT
        "f1:uid_u32"                          AS uid,
        "f2:name_en"                          AS name_en,
        "f3:gear_set_uid_u32"                 AS gear_set_uid,
        "f4:gear_slot_type_enum"              AS gear_slot_type,
        "f8:gear_type_enum"                   AS gear_type,
        "f9:equip_limit_enum"                 AS equip_limit,
        "f6:main_effect_random_uid_u32"       AS main_effect_random_uid,
        "f7:optional_effect_random_uid_u32"   AS optional_effect_random_uid,
        "f10:exclusive_effect_random_uid_u32" AS exclusive_effect_random_uid
    FROM gear__f201_Gear
    WHERE "f1:uid_u32" = ?
`);

export function getGearMaster(gearUid: number): MasterGear | undefined {
    const row = selectGear.get(toHexString(gearUid)) as Record<string, unknown> | undefined;
    if (!row) return undefined;
    return {
        uid:                          parseHexCol(row.uid),
        name_en:                      String(row.name_en ?? ""),
        gear_set_uid:                 parseHexCol(row.gear_set_uid),
        gear_slot_type:               String(row.gear_slot_type ?? "GST_None"),
        gear_type:                    String(row.gear_type ?? "GT_Common"),
        equip_limit:                  String(row.equip_limit ?? "CT_None"),
        main_effect_random_uid:       parseHexCol(row.main_effect_random_uid),
        optional_effect_random_uid:   parseHexCol(row.optional_effect_random_uid),
        exclusive_effect_random_uid:  parseHexCol(row.exclusive_effect_random_uid),
    };
}

// Item master lookup. Used by the reward pipeline's GDT_Item / GDT_ExpItem
// branch to validate uids before stacking — the table itself isn't joined
// onto the wire (MsgUserItem is just (item_uid, item_count)), but the lookup
// keeps unknown uids from polluting user_items.
export interface MasterItem {
    uid:     number;
    name_en: string;
    type:    string;   // "GDT_ExpItem" / "GDT_Item" / ...
    grade:   number;
    value:   number;
}

const selectItem = masterDb.prepare(`
    SELECT
        "f1:uid_u32"      AS uid,
        "f2:name_en"      AS name_en,
        "f4:type_enum"    AS type,
        "f5:grade_vi"     AS grade,
        "f6:value_vi"     AS value
    FROM item__f51_Item
    WHERE "f1:uid_u32" = ?
`);

export function getItemMaster(itemUid: number): MasterItem | undefined {
    const row = selectItem.get(toHexString(itemUid)) as Record<string, unknown> | undefined;
    if (!row) return undefined;
    return {
        uid:     parseHexCol(row.uid),
        name_en: String(row.name_en ?? ""),
        type:    String(row.type ?? ""),
        grade:   Number(row.grade) || 0,
        value:   Number(row.value) || 0,
    };
}

// Gear effect pools (gear__f203 main / gear__f205 optional). Both share the
// same parent / child schema:
//   parent: _idx, f1:uid_u32 (the random pool key sitting on a Gear row's f6/f7)
//   child:  _parent_idx, _child_idx, f1:effect_uid_u32, f2:type_enum,
//           f3:rare_vi, f4:prob_u32 (IEEE 754 float hex, e.g. 0x42C80000=100.0)
//
// The picker filters by rare so a gear granted at grade N receives an
// effect of matching tier. For chapter-1 Verdant Sword the main pool
// holds one effect per rare 1..5; the optional pool holds four rare-1
// entries and one rare-2 entry. Picking by rare keeps the wire stats
// consistent with the gear's rare field — without that filter, granting
// a grade-2 gear with rare-1 effects renders as 2 stars but with rare-1
// stat lines, which is what tipped the client's auto-equip to skip it.
//
// V1 stub still deterministic: among rows matching `rare`, pick the
// first. Once weighted random lands, switch to a prob_u32-weighted draw
// over the matching subset.
const selectMainPoolIdx = masterDb.prepare(
    `SELECT "_idx" AS idx FROM gear__f203_GearEffectRandomUid WHERE "f1:uid_u32" = ?`,
);
const selectMainPoolByRare = masterDb.prepare(`
    SELECT "f1:effect_uid_u32" AS effect_uid
    FROM gear__f203_GearEffectRandomUid_f2_GearEffectRandomUidItem
    WHERE "_parent_idx" = ?
      AND "f3:rare_vi"  = ?
    ORDER BY CAST("_child_idx" AS INTEGER) ASC
`);
const selectMainPoolAny = masterDb.prepare(`
    SELECT "f1:effect_uid_u32" AS effect_uid
    FROM gear__f203_GearEffectRandomUid_f2_GearEffectRandomUidItem
    WHERE "_parent_idx" = ?
    ORDER BY CAST("_child_idx" AS INTEGER) ASC
`);
const selectOptionalPoolIdx = masterDb.prepare(
    `SELECT "_idx" AS idx FROM gear__f205_GearEffectRandomUid WHERE "f1:uid_u32" = ?`,
);
const selectOptionalPoolByRare = masterDb.prepare(`
    SELECT "f1:effect_uid_u32" AS effect_uid
    FROM gear__f205_GearEffectRandomUid_f2_GearEffectRandomUidItem
    WHERE "_parent_idx" = ?
      AND "f3:rare_vi"  = ?
    ORDER BY CAST("_child_idx" AS INTEGER) ASC
`);

export function pickGearMainEffect(randomUid: number, rare: number): number {
    if (!randomUid) return 0;
    const parent = selectMainPoolIdx.get(toHexString(randomUid)) as { idx: string | number } | undefined;
    if (!parent) return 0;
    const matching = selectMainPoolByRare.all(parent.idx, String(rare)) as Record<string, unknown>[];
    if (matching.length > 0) return parseHexCol(matching[0].effect_uid);
    // Fallback: master pools that never carried a row for this rare (e.g.
    // a pool with only rare 1 entries asked for rare 3) — pick the first
    // available row so the gear ships with *some* main effect rather than
    // mainEffectUid=0, which the client treats as a malformed gear and
    // hides from auto-equip / inventory lists.
    const any = selectMainPoolAny.all(parent.idx) as Record<string, unknown>[];
    if (any.length === 0) return 0;
    return parseHexCol(any[0].effect_uid);
}

export function pickGearOptionalEffects(randomUid: number, rare: number, count: number): number[] {
    if (!randomUid || count <= 0) return [];
    const parent = selectOptionalPoolIdx.get(toHexString(randomUid)) as { idx: string | number } | undefined;
    if (!parent) return [];
    const rows = selectOptionalPoolByRare.all(parent.idx, String(rare)) as Record<string, unknown>[];
    return rows.slice(0, count).map(r => parseHexCol(r.effect_uid));
}

// Gear upgrade lookup. `gear__f209_GearUpgrade` is keyed by (rare, current
// upgrade_level) and supplies the gold cost (parsed from the f5 sub-message
// JSON), the success probability, and an optional-upgrade flag. cost rows
// for chapter-1 reward gear (rare 1):
//   lev 0->1: gold 500,  prob 1.0
//   lev 1->2: gold 600,  prob 1.0
//   lev 2->3: gold 700,  prob 1.0
//
// f5:upgrade_price_msg is a JSON-encoded {type, uid, price} blob — the same
// schema used elsewhere in master for cost descriptors. Phase B3 reads
// `price` directly; type/uid are GDT_Gold/0 for every chapter-1 entry so
// hardcoding the currency target is safe for V1.
export interface MasterGearUpgrade {
    gold_cost:    number;
    success_prob: number;
}

const selectGearUpgrade = masterDb.prepare(`
    SELECT
        "f4:success_prob_u32"   AS success_prob,
        "f5:upgrade_price_msg"  AS upgrade_price_msg
    FROM gear__f209_GearUpgrade
    WHERE "f2:rare_vi"          = ?
      AND "f3:upgrade_level_vi" = ?
`);

function parseFloatHex(hex: unknown): number {
    if (typeof hex !== "string") return 0;
    const trimmed = hex.startsWith("0x") || hex.startsWith("0X") ? hex.slice(2) : hex;
    const n = parseInt(trimmed, 16);
    if (Number.isNaN(n)) return 0;
    const buf = new ArrayBuffer(4);
    new DataView(buf).setUint32(0, n >>> 0);
    return new DataView(buf).getFloat32(0);
}

// Character master row — base stats used as the seed for the server-side
// combat_power computation. The schema stores hp/atk/def as integer strings
// and `f15:speed_u32` as an IEEE 754 float in hex (e.g. "0x42CA0000" = 101.0).
export interface MasterCharacter {
    uid:   number;
    hp:    number;
    atk:   number;
    def:   number;
    spd:   number;
    grade: number;   // base grade from master (separate from per-user grade)
}

const selectCharacter = masterDb.prepare(`
    SELECT
        "f1:uid_u32"    AS uid,
        "f8:hp_vi"      AS hp,
        "f9:attack_vi"  AS atk,
        "f10:defence_vi" AS def,
        "f15:speed_u32" AS spd_hex,
        "f5:grade_vi"   AS grade
    FROM character__f101_Character
    WHERE "f1:uid_u32" = ?
`);

export function getCharacterMaster(characterUid: number): MasterCharacter | undefined {
    const row = selectCharacter.get(toHexString(characterUid)) as Record<string, unknown> | undefined;
    if (!row) return undefined;
    return {
        uid:   parseHexCol(row.uid),
        hp:    Number(row.hp)  || 0,
        atk:   Number(row.atk) || 0,
        def:   Number(row.def) || 0,
        spd:   parseFloatHex(row.spd_hex),
        grade: Number(row.grade) || 1,
    };
}

// Per-grade XP curve: `f4:exp_vi` is the XP required at lev N to advance to
// lev N+1 (delta, not cumulative — empirically verified against grade 3 row 0
// = lev 1 needs 340 XP, row 1 = lev 2 needs 720 XP). Master only covers
// grade 3..7; grade 1/2 rows do not exist (starter characters are seeded at
// grade 3, the lowest grade that can level up).
const selectCharLevExp = masterDb.prepare(`
    SELECT "f4:exp_vi" AS exp_to_next
    FROM character__f103_CharacterLevel
    WHERE "f2:grade_vi" = ? AND "f3:lev_vi" = ?
`);

const selectMaxLevForGrade = masterDb.prepare(`
    SELECT MAX(CAST("f3:lev_vi" AS INTEGER)) AS max_lev
    FROM character__f103_CharacterLevel
    WHERE "f2:grade_vi" = ?
`);

export function getCharacterLevelXpToNext(grade: number, lev: number): number {
    const row = selectCharLevExp.get(String(grade), String(lev)) as { exp_to_next: unknown } | undefined;
    if (!row) return 0;
    return Number(row.exp_to_next) || 0;
}

export function getMaxLevForGrade(grade: number): number {
    const row = selectMaxLevForGrade.get(String(grade)) as { max_lev: unknown } | undefined;
    return Number(row?.max_lev) || 1;
}

export function getGearUpgrade(rare: number, level: number): MasterGearUpgrade | undefined {
    const row = selectGearUpgrade.get(String(rare), String(level)) as Record<string, unknown> | undefined;
    if (!row) return undefined;
    let goldCost = 0;
    try {
        const parsed = JSON.parse(String(row.upgrade_price_msg ?? "{}"));
        goldCost = Number(parsed.price) || 0;
    } catch {
        goldCost = 0;
    }
    return {
        gold_cost:    goldCost,
        success_prob: parseFloatHex(row.success_prob),
    };
}

