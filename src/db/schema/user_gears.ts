import db from "../db";

// One row per gear instance the user owns. Mirrors MsgUserGear
// (cannae_protocol.proto:3094-3110). The wire shape carries an instance id
// (`gearId`, uint64 string) plus the master hash (`gearUid`, fixed32) — same
// instance-vs-master split as user_characters: each pickup of "Verdant Sword"
// produces a new gear_id but shares the same gear_uid.
//
// Reference capture for the wire shape (a shop-grant entry from a lv 54
// account, since the lv-1 starters in misc/myinfomaybe never owned any gear):
//   L:/cannae/traffic/astridtraffic/alchemy/RESPONSE_Haiko_32.json
//     responses[0].purchaseShopItemRsp.stuffRewards[0].userGear
//
// `optional_effects` is stored as a JSON-encoded uint32 array because the
// born count is small (1-3 in master pools we've seen so far) and stuffing
// a child table for one tutorial reward would dwarf the call-site code. If
// a later feature needs to query individual effects, swap to a child table.
//
// `equip_to_user_character_id` / `equip_to_slot_type` are persistence-side
// only — they back-fill MsgUserGear.userCharacterId / equipYn when listing
// equipped gear. Both are 0 until Phase B2 introduces the equip handlers.
export interface UserGearRow {
    gear_id:                          number;
    user_id:                          string;
    gear_uid:                         number;   // master hash, uint32
    equip_yn:                         number;   // 0 / 1
    rare:                             number;
    lev:                              number;
    main_effect_uid:                  number;
    born_optional_effect_count:       number;
    optional_effects:                 string;   // JSON array of uint32
    exclusive_effect_character_uid:   number;
    exclusive_effect_uid:             number;
    lock_yn:                          number;   // 0 / 1
    update_timestamp:                 number;   // epoch_sec
    equip_to_user_character_id:       number;   // 0 = unequipped
    equip_to_slot_type:               number;   // GearSlotType int, 0 = GST_None
}

export function createUserGearsTable(): void {
    db.exec(`
        CREATE TABLE IF NOT EXISTS user_gears (
            gear_id                        INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id                        TEXT    NOT NULL,
            gear_uid                       INTEGER NOT NULL,
            equip_yn                       INTEGER NOT NULL DEFAULT 0,
            rare                           INTEGER NOT NULL DEFAULT 1,
            lev                            INTEGER NOT NULL DEFAULT 0,
            main_effect_uid                INTEGER NOT NULL DEFAULT 0,
            born_optional_effect_count     INTEGER NOT NULL DEFAULT 0,
            optional_effects               TEXT    NOT NULL DEFAULT '[]',
            exclusive_effect_character_uid INTEGER NOT NULL DEFAULT 0,
            exclusive_effect_uid           INTEGER NOT NULL DEFAULT 0,
            lock_yn                        INTEGER NOT NULL DEFAULT 0,
            update_timestamp               INTEGER NOT NULL DEFAULT 0,
            equip_to_user_character_id     INTEGER NOT NULL DEFAULT 0,
            equip_to_slot_type             INTEGER NOT NULL DEFAULT 0
        );
    `);
}

createUserGearsTable();

const selectByUser = db.prepare(`SELECT * FROM user_gears WHERE user_id = ?`);
const selectById   = db.prepare(`SELECT * FROM user_gears WHERE gear_id = ?`);
const selectByEquippedCharacter = db.prepare(
    `SELECT * FROM user_gears WHERE equip_to_user_character_id = ?`,
);
const insertGearStmt = db.prepare(
    `INSERT INTO user_gears
        (user_id, gear_uid, equip_yn, rare, lev,
         main_effect_uid, born_optional_effect_count, optional_effects,
         exclusive_effect_character_uid, exclusive_effect_uid,
         lock_yn, update_timestamp,
         equip_to_user_character_id, equip_to_slot_type)
     VALUES
        (@user_id, @gear_uid, @equip_yn, @rare, @lev,
         @main_effect_uid, @born_optional_effect_count, @optional_effects,
         @exclusive_effect_character_uid, @exclusive_effect_uid,
         @lock_yn, @update_timestamp,
         @equip_to_user_character_id, @equip_to_slot_type)`,
);
const updateEquipStmt = db.prepare(
    `UPDATE user_gears
        SET equip_yn                   = ?,
            equip_to_user_character_id = ?,
            equip_to_slot_type         = ?
        WHERE gear_id = ?`,
);
const updateLevStmt = db.prepare(`UPDATE user_gears SET lev = ? WHERE gear_id = ?`);

export function listByUser(userId: string): UserGearRow[] {
    return selectByUser.all(userId) as UserGearRow[];
}

export function findById(gearId: number): UserGearRow | undefined {
    return selectById.get(gearId) as UserGearRow | undefined;
}

export function listEquippedByCharacter(characterId: number): UserGearRow[] {
    return selectByEquippedCharacter.all(characterId) as UserGearRow[];
}

// Inserts a new instance and returns the persisted row (with the
// auto-generated gear_id). Callers fill `equip_to_*` only when granting an
// already-equipped instance (the reward path never does this — newly
// granted gear is always unequipped).
export function insertGear(row: Omit<UserGearRow, "gear_id">): UserGearRow {
    const info = insertGearStmt.run(row);
    return { ...row, gear_id: Number(info.lastInsertRowid) };
}

export function setEquip(gearId: number, userCharacterId: number, slotType: number): void {
    updateEquipStmt.run(userCharacterId > 0 ? 1 : 0, userCharacterId, slotType, gearId);
}

export function setLev(gearId: number, lev: number): void {
    updateLevStmt.run(lev, gearId);
}

// On-wire MsgUserGear. Field names follow protobufjs camelCase. uint64 fields
// (gear_id, user_character_id, preset_user_character_id) ship as JSON
// strings — matching every other instance-id field cannae emits and the
// shop-grant capture. `userCharacterId` / `presetUserCharacterId` ride along
// even when the gear is unequipped: protobufjs encodes "0" as the proto3
// default and the client treats that as "no character" without NREing on a
// missing field.
export function buildMsgUserGear(row: UserGearRow): any {
    let optionalEffects: number[] = [];
    try {
        const parsed = JSON.parse(row.optional_effects);
        if (Array.isArray(parsed)) optionalEffects = parsed.map(v => (Number(v) >>> 0));
    } catch {
        optionalEffects = [];
    }
    return {
        gearId:                       String(row.gear_id),
        gearUid:                      row.gear_uid >>> 0,
        equipYn:                      row.equip_yn === 1,
        rare:                         row.rare,
        lev:                          row.lev,
        mainEffectUid:                row.main_effect_uid >>> 0,
        bornOptionalEffectCount:      row.born_optional_effect_count,
        optionalEffects,
        exclusiveEffectCharacterUid:  row.exclusive_effect_character_uid >>> 0,
        exclusiveEffectUid:           row.exclusive_effect_uid >>> 0,
        lockYn:                       row.lock_yn === 1,
        updateTimestamp:              row.update_timestamp,
        isAuctionRegistered:          false,
        userCharacterId:              String(row.equip_to_user_character_id),
        presetUserCharacterId:        "0",
    };
}
