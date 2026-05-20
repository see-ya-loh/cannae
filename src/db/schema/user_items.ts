import db from "../db";

// One row per (user, item_uid) — items are stackable, so the table is
// keyed by the pair rather than per-instance like user_gears. Mirrors
// MsgUserItem (cannae_protocol.proto:3156-3159), which is just (item_uid,
// item_count).
//
// `item_uid` is the master hash (uint32) from item__f51_Item. The reward
// pipeline grants by += delta; the (yet-unbuilt) consume path will -= delta.
export interface UserItemRow {
    user_id:    string;
    item_uid:   number;
    item_count: number;
}

export function createUserItemsTable(): void {
    db.exec(`
        CREATE TABLE IF NOT EXISTS user_items (
            user_id    TEXT    NOT NULL,
            item_uid   INTEGER NOT NULL,
            item_count INTEGER NOT NULL DEFAULT 0,
            PRIMARY KEY (user_id, item_uid)
        );
    `);
}

createUserItemsTable();

const selectByUser = db.prepare(`SELECT * FROM user_items WHERE user_id = ?`);
const selectOne    = db.prepare(`SELECT * FROM user_items WHERE user_id = ? AND item_uid = ?`);
const upsertItem   = db.prepare(
    `INSERT INTO user_items (user_id, item_uid, item_count) VALUES (?, ?, ?)
     ON CONFLICT(user_id, item_uid) DO UPDATE SET item_count = item_count + excluded.item_count`,
);
const decrementItem = db.prepare(
    `UPDATE user_items SET item_count = MAX(0, item_count - ?) WHERE user_id = ? AND item_uid = ?`,
);

export function listByUser(userId: string): UserItemRow[] {
    return selectByUser.all(userId) as UserItemRow[];
}

export function findOne(userId: string, itemUid: number): UserItemRow | undefined {
    return selectOne.get(userId, itemUid >>> 0) as UserItemRow | undefined;
}

// INSERT-or-add: idempotent in the sense that subsequent grants accumulate
// onto the existing row. Returns the post-update row for wire echo.
export function addItem(userId: string, itemUid: number, delta: number): UserItemRow {
    upsertItem.run(userId, itemUid >>> 0, delta);
    return findOne(userId, itemUid)!;
}

export function consumeItem(userId: string, itemUid: number, delta: number): UserItemRow | undefined {
    decrementItem.run(delta, userId, itemUid >>> 0);
    return findOne(userId, itemUid);
}

// On-wire MsgUserItem. fixed32 + uint32, no string fields.
export function buildMsgUserItem(row: UserItemRow): any {
    return {
        itemUid:   row.item_uid >>> 0,
        itemCount: row.item_count,
    };
}
