import db from "../db";

// Per-user story-mode substage clear history. Mirrors the on-wire shape of
// Cannae.Protocol.MsgUserStoryBattleClearHistory (proto 3477-3483) one-to-one
// — the wire is what RspUserLogin.story_clear_histories carries on every
// cold start, and what the world-map UI uses to gate the next substage's
// lock state (e.g. 1-2 stays locked until a 1-1 clear row exists with
// clear_count >= 1).
//
// battleEnd persists into this table on BT_Story + BERT_Win; without that
// write, surviving a force-close re-locks 1-2 because the next userLogin
// ships zero clear histories and the client treats absence as "never won".
export interface UserStoryClearRow {
    user_id:         string;
    substage_uid:    number;
    challenge_count: number;
    clear_count:     number;
    clear_grade:     number;
    update_date:     number;   // Unix sec
}

export function createUserStoryClearsTable(): void {
    db.exec(`
        CREATE TABLE IF NOT EXISTS user_story_clears (
            user_id         TEXT    NOT NULL,
            substage_uid    INTEGER NOT NULL,
            challenge_count INTEGER NOT NULL DEFAULT 0,
            clear_count     INTEGER NOT NULL DEFAULT 0,
            clear_grade     INTEGER NOT NULL DEFAULT 0,
            update_date     INTEGER NOT NULL DEFAULT 0,
            PRIMARY KEY (user_id, substage_uid)
        );
    `);
}

createUserStoryClearsTable();

const selectByUser = db.prepare(
    `SELECT * FROM user_story_clears WHERE user_id = ?`,
);
const upsertClear = db.prepare(
    `INSERT INTO user_story_clears
        (user_id, substage_uid, challenge_count, clear_count, clear_grade, update_date)
     VALUES
        (@user_id, @substage_uid, @challenge_count, @clear_count, @clear_grade, @update_date)
     ON CONFLICT(user_id, substage_uid) DO UPDATE SET
        challenge_count = excluded.challenge_count + user_story_clears.challenge_count,
        clear_count     = excluded.clear_count     + user_story_clears.clear_count,
        clear_grade     = MAX(excluded.clear_grade, user_story_clears.clear_grade),
        update_date     = excluded.update_date`,
);
const selectOne = db.prepare(
    `SELECT * FROM user_story_clears WHERE user_id = ? AND substage_uid = ?`,
);

export function listByUser(userId: string): UserStoryClearRow[] {
    return selectByUser.all(userId) as UserStoryClearRow[];
}

// One row per (user, substage). The delta semantics:
//   challengeDelta: bumped on every attempt (typically 1 per battleEnd).
//   clearDelta:     bumped only on BERT_Win (0 on loss).
//   clearGrade:     monotonic max — clearing a stage at lower grade later
//                   never downgrades the recorded best.
// Returns the post-update row so callers can echo it on the response.
export function recordAttempt(
    userId: string,
    substageUid: number,
    challengeDelta: number,
    clearDelta: number,
    clearGrade: number,
    nowSec: number,
): UserStoryClearRow {
    upsertClear.run({
        user_id:         userId,
        substage_uid:    substageUid >>> 0,
        challenge_count: challengeDelta,
        clear_count:     clearDelta,
        clear_grade:     clearGrade,
        update_date:     nowSec,
    });
    return selectOne.get(userId, substageUid >>> 0) as UserStoryClearRow;
}

export function buildMsgUserStoryClearHistory(row: UserStoryClearRow): any {
    return {
        substageUid:    row.substage_uid >>> 0,
        challengeCount: row.challenge_count,
        clearCount:     row.clear_count,
        clearGrade:     row.clear_grade,
        updateDate:     String(row.update_date),
    };
}
