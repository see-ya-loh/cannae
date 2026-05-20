import db from "../db";

// Per-user mission progress. The on-wire counterpart is MsgUserMission
// (cannae_protocol.proto:3251) with the same four fields. The client stores
// these in `UserDataManager.mUserMissions` (Dictionary<uint, MsgUserMission>,
// +0x418) and reads them from two places:
//   1. `TutorialManager.CheckSkipCondition` (RVA 0x41BBBAC) — checks for entry
//      existence (`completed_mission`) and `count >= goal_count`
//      (`complete_mission`) on every tutorial step, so a missing row makes
//      the corresponding tutorial branch evaporate.
//   2. The mission card UI in the lobby, which renders count / goalCount and
//      offers the "receive reward" button when count >= goal_count and
//      receive_reward is false.
//
// `quest_uid` is the FNV-1a 32 of the master "uid.mission.chapter.NN.MMM"
// string — same hash the client applies via
// `Cannae.Library.Util.GameDataHelper.GetUidByString` (RVA 0x42E7127).
export interface UserMissionRow {
    user_id:        string;
    quest_uid:      number;
    count:          number;
    goal_count:     number;
    receive_reward: number;  // SQLite BOOLEAN → 0/1
}

export function createUserMissionsTable(): void {
    db.exec(`
        CREATE TABLE IF NOT EXISTS user_missions (
            user_id        TEXT    NOT NULL,
            quest_uid      INTEGER NOT NULL,
            count          INTEGER NOT NULL DEFAULT 0,
            goal_count     INTEGER NOT NULL DEFAULT 1,
            receive_reward INTEGER NOT NULL DEFAULT 0,
            PRIMARY KEY (user_id, quest_uid)
        );
    `);
}

createUserMissionsTable();

const selectByUser = db.prepare(
    `SELECT * FROM user_missions WHERE user_id = ?`,
);
const selectOne = db.prepare(
    `SELECT * FROM user_missions WHERE user_id = ? AND quest_uid = ?`,
);
const insertOrIgnore = db.prepare(
    `INSERT OR IGNORE INTO user_missions
        (user_id, quest_uid, count, goal_count, receive_reward)
     VALUES
        (@user_id, @quest_uid, @count, @goal_count, @receive_reward)`,
);
const updateCount = db.prepare(
    `UPDATE user_missions SET count = ? WHERE user_id = ? AND quest_uid = ?`,
);
const updateReceived = db.prepare(
    `UPDATE user_missions SET receive_reward = 1 WHERE user_id = ? AND quest_uid = ?`,
);

export function listByUser(userId: string): UserMissionRow[] {
    return selectByUser.all(userId) as UserMissionRow[];
}

export function findOne(userId: string, questUid: number): UserMissionRow | undefined {
    return selectOne.get(userId, questUid >>> 0) as UserMissionRow | undefined;
}

// Seeded baseline that mirrors fix N's STARTER_USER_MISSIONS literal. Counts
// model "tutorial 0 cleared, no stage played, no gear equipped yet", which is
// the user state right after the Charlotte recruit cutscene closes. Each
// row's existence is what `completed_mission: chapter.01.00X` checks for in
// CheckSkipCondition (entry exists = don't skip).
const STARTER_MISSIONS: ReadonlyArray<Omit<UserMissionRow, "user_id">> = [
    { quest_uid: 0xD975578A, count: 1, goal_count: 1, receive_reward: 0 }, // chapter.01.001 tutorial-battle completion (reward unclaimed)
    { quest_uid: 0xD87555F7, count: 0, goal_count: 1, receive_reward: 0 }, // chapter.01.002 win stage 1-1
    { quest_uid: 0xD7755464, count: 0, goal_count: 1, receive_reward: 0 }, // chapter.01.003 equip 1 gear on Fram
    { quest_uid: 0xD67552D1, count: 0, goal_count: 3, receive_reward: 0 }, // chapter.01.004 enhance gear 3x
];

// Idempotent — INSERT OR IGNORE leaves rows that already carry user-driven
// state (count, receive_reward) alone. Safe to call on every login, which is
// how pre-existing users (registered before this table existed) pick up the
// baseline without an explicit migration script.
export function grantStarterMissions(userId: string): void {
    const tx = db.transaction(() => {
        for (const m of STARTER_MISSIONS) {
            insertOrIgnore.run({
                user_id:        userId,
                quest_uid:      m.quest_uid,
                count:          m.count,
                goal_count:     m.goal_count,
                receive_reward: m.receive_reward,
            });
        }
    });
    tx();
}

// Bumps `count` by `delta`, clamped at `goal_count`. Returns the post-update
// row so callers can ship the new value on the next response without an
// extra SELECT round-trip. No-op (returns the existing row) if the mission is
// not seeded for this user; callers responsible for ensuring seed first.
export function incrementCount(userId: string, questUid: number, delta: number): UserMissionRow | undefined {
    const row = findOne(userId, questUid);
    if (!row) return undefined;
    const nextCount = Math.min(row.count + delta, row.goal_count);
    if (nextCount === row.count) return row;
    updateCount.run(nextCount, userId, questUid >>> 0);
    return { ...row, count: nextCount };
}

export function markReceived(userId: string, questUid: number): UserMissionRow | undefined {
    updateReceived.run(userId, questUid >>> 0);
    return findOne(userId, questUid);
}

// On-wire MsgUserMission (proto field naming = camelCase via protobufjs).
export function buildMsgUserMission(row: UserMissionRow): any {
    return {
        questUid:      row.quest_uid >>> 0,
        count:         row.count,
        goalCount:     row.goal_count,
        receiveReward: row.receive_reward === 1,
    };
}
