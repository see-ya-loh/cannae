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

