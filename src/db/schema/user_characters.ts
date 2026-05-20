import db from "../db";

// Mirrors the on-wire Cannae.Protocol.MsgUserCharacter shape (proto field 1..41).
//
// Two distinct identifiers per row, both required by genuine-server capture
// (astridtraffic/misc/myinfomaybe/RESPONSE_Haiko_26.json:userCharacters[*]):
//   - character_id  (proto field 1, uint64): per-user INSTANCE id, server-issued
//                   monotonic sequence (e.g. "13014631"). NOT the master hash.
//   - character_uid (proto field 3, fixed32): master character hash, doubles as
//                   the dictionary lookup key used by
//                   `UserDataManager.GetUserCharacterByUid` (RVA 0x41146F8) when
//                   the tutorial battle iterates `MsgTutorialBattleCharacter+0x10`.
// Using the master hash for both fields (the session-022 shape) caused the
// recruit cutscene to render with master defaults (e.g. star count = 7) and
// no live stat panel, because the client treats `character_id == master hash`
// as an unowned/preview record. Allocating a fresh INTEGER PRIMARY KEY for
// character_id matches the genuine layout and lets the cutscene resolve the
// owned-character codepath.
export interface UserCharacterRow {
    character_id: number;   // per-user instance id (INTEGER PRIMARY KEY)
    user_id: string;
    character_uid: number;  // master character hash, uint32
    grade: number;
    awaken: number;
    lev: number;
    exp: number;
    skill1_lev: number;
    skill2_lev: number;
    skill3_lev: number;
    passive1_lev: number;
    passive2_lev: number;
    weapon_uid: number;
    last_battle_date: number;
}

export function createUserCharactersTable(): void {
    db.exec(`
        CREATE TABLE IF NOT EXISTS user_characters (
            character_id     INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id          TEXT    NOT NULL,
            character_uid    INTEGER NOT NULL,
            grade            INTEGER NOT NULL DEFAULT 1,
            -- awaken is an awakening phase: 1 = base (no awakening star),
            -- 2 = one awaken star, 3 = two awaken stars (max). awaken=0 is
            -- invalid: the recruit-cutscene star widget at
            -- CannaeUIImageStar.SetStar (RVA 0x438F2F1) computes
            -- (awakenStep - 1) and indexes a sprite array with an unsigned
            -- compare, so awaken=0 underflows to 0xFFFFFFFF and throws
            -- IndexOutOfRangeException, which strands the
            -- DlgFSCharacterResult dialog at the end of the cutscene.
            awaken           INTEGER NOT NULL DEFAULT 1,
            lev              INTEGER NOT NULL DEFAULT 1,
            exp              INTEGER NOT NULL DEFAULT 0,
            skill1_lev       INTEGER NOT NULL DEFAULT 1,
            skill2_lev       INTEGER NOT NULL DEFAULT 1,
            skill3_lev       INTEGER NOT NULL DEFAULT 1,
            passive1_lev     INTEGER NOT NULL DEFAULT 1,
            passive2_lev     INTEGER NOT NULL DEFAULT 1,
            weapon_uid       INTEGER NOT NULL DEFAULT 0,
            last_battle_date INTEGER NOT NULL DEFAULT 0,
            UNIQUE (user_id, character_uid)
        );
    `);
}

createUserCharactersTable();

const selectByUser = db.prepare(
    `SELECT * FROM user_characters WHERE user_id = ?`,
);
const insertOrIgnore = db.prepare(
    `INSERT OR IGNORE INTO user_characters
        (user_id, character_uid,
         grade, awaken, lev, exp,
         skill1_lev, skill2_lev, skill3_lev,
         passive1_lev, passive2_lev, weapon_uid)
     VALUES
        (@user_id, @character_uid,
         @grade, @awaken, @lev, @exp,
         @skill1_lev, @skill2_lev, @skill3_lev,
         @passive1_lev, @passive2_lev, @weapon_uid)`,
);

export function listByUser(userId: string): UserCharacterRow[] {
    return selectByUser.all(userId) as UserCharacterRow[];
}

// Master starter list. Source: master `character.f106_StartCharacter` — every
// row lands in the user's roster at registration. FramW + JohannL satisfy the
// tutorial.battle.step01 party lookup; CharlotteE gates
// `<WaitForRecruit>d__58.MoveNext` (RVA 0x41C04A2) — without her the cutscene
// is skipped. MuL (0xA1D7096E) is intentionally absent: the client synthesises
// it inside `CommandTutorialBattle_d54.MoveNext` (RVA 0x41BE808) via
// `UserDataManager.UpdateUserCharacter`.
//
// grade is the per-character base from master `character.f101_Character.f5:grade_vi`
// (all three starters happen to be grade 3). The recruit cutscene reads
// MsgUserCharacter.grade directly to draw the star count, so any value other
// than the master base mis-renders.
export const STARTER_CHARACTERS: ReadonlyArray<{ uid: number; grade: number; weapon: number }> = [
    { uid: 0x96FA0CA1, grade: 3, weapon: 0 }, // FramW      (Guardian, Water)
    { uid: 0x8C0BF19C, grade: 3, weapon: 0 }, // JohannL    (Warrior,  Light)
    { uid: 0x6700B8C8, grade: 3, weapon: 0 }, // CharlotteE (Priest,   Earth)
];

export function grantStarterCharacters(userId: string): void {
    const tx = db.transaction(() => {
        for (const { uid, grade, weapon } of STARTER_CHARACTERS) {
            insertOrIgnore.run({
                user_id:       userId,
                character_uid: uid,
                grade,
                awaken:        1,
                lev:           1,
                exp:           0,
                skill1_lev:    1,
                skill2_lev:    1,
                skill3_lev:    1,
                passive1_lev:  1,
                passive2_lev:  1,
                weapon_uid:    weapon,
            });
        }
    });
    tx();
}
