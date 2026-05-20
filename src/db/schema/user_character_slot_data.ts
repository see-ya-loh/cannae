import db from "../db";

export interface SlotDataRow {
    user_id: string;
    slot_type: string;
    slot_index: number;
    user_character_id: number;
}

export function createUserCharacterSlotDataTable(): void {
    db.exec(`
        CREATE TABLE IF NOT EXISTS user_character_slot_data (
            user_id           TEXT    NOT NULL,
            slot_type         TEXT    NOT NULL,
            slot_index        INTEGER NOT NULL,
            user_character_id INTEGER NOT NULL,
            PRIMARY KEY (user_id, slot_type, slot_index)
        );
    `);
}

createUserCharacterSlotDataTable();

const deleteByUserAndType = db.prepare(
    `DELETE FROM user_character_slot_data WHERE user_id = ? AND slot_type = ?`,
);
const insertSlot = db.prepare(
    `INSERT INTO user_character_slot_data (user_id, slot_type, slot_index, user_character_id)
     VALUES (?, ?, ?, ?)`,
);
const selectByUserAndType = db.prepare(
    `SELECT slot_index, user_character_id
     FROM user_character_slot_data
     WHERE user_id = ? AND slot_type = ?
     ORDER BY slot_index ASC`,
);

const upsertSlotsTx = db.transaction(
    (userId: string, slotType: string, slots: Array<{ userCharacterId?: string }>) => {
        deleteByUserAndType.run(userId, slotType);
        for (let i = 0; i < slots.length; i++) {
            const id = Number(slots[i]?.userCharacterId ?? 0) || 0;
            if (id !== 0) {
                insertSlot.run(userId, slotType, i, id);
            }
        }
    },
);

export function upsertSlots(
    userId: string,
    slotType: string,
    slots: Array<{ userCharacterId?: string }>,
): void {
    upsertSlotsTx(userId, slotType, slots);
}

export function listSlotsByUserAndType(
    userId: string,
    slotType: string,
): SlotDataRow[] {
    return selectByUserAndType.all(userId, slotType) as SlotDataRow[];
}
