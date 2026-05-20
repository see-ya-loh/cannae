import { v4 as uuidv4 } from "uuid";
import db from "../db";
import { generateAccessToken } from "../../core/session";

export interface UserRow {
    user_id: string;
    account_id: string;
    idp_code: string;
    idp_user_key: string;
    access_token: string;
    access_token_secret: string;
    name: string;
    create_date: number;
    last_login_date: number;
    master_gender_type: string;
    master_appearance: string;
    tutorial_step_uid: number;
    energy: number;
    // Unix seconds at which the server last recomputed `energy`. Sent on the
    // wire as MsgUser.energy_charge_time so the client knows the reference
    // point for its inter-poll extrapolation. 0 = uninitialised; the
    // recharge helper treats that as "now" on first read.
    energy_update_date: number;
    max_energy: number;
    // Common stuff-reward currencies. Each one mirrors the field of the same
    // name in MsgUser (proto 2513). Server-authoritative: handlers that grant
    // rewards (getQuestClearReward, future battleEnd, ...) increment these
    // through `applyStuffReward` and persist via `updateResources`. New users
    // start at zero so quest-reward deltas are visible to the player.
    //
    // cash_gem (paid) and free_gem (in-game-earned) are stored separately to
    // mirror MsgUser fields 7 and 8: the client UI sums them for display, but
    // spending logic prefers one over the other depending on the storefront
    // path, so the on-wire shape keeps them split (Haiko_26 reference user
    // ships e.g. cashGem=0 + freeGem=33519).
    gold: number;
    cash_gem: number;
    free_gem: number;
    fame: number;
    cube: number;
    summon_stone: number;
}

const DEFAULT_MAX_ENERGY = 12000;

export function createUsersTable(): void {
    db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            user_id             TEXT    PRIMARY KEY,
            account_id          TEXT    NOT NULL,
            idp_code            TEXT    NOT NULL,
            idp_user_key        TEXT    NOT NULL,
            access_token        TEXT    NOT NULL,
            access_token_secret TEXT    NOT NULL,
            name                TEXT    NOT NULL DEFAULT '',
            create_date         INTEGER NOT NULL,
            last_login_date     INTEGER NOT NULL,
            master_gender_type  TEXT    NOT NULL DEFAULT '',
            master_appearance   TEXT    NOT NULL DEFAULT '{}',
            tutorial_step_uid   INTEGER NOT NULL DEFAULT 0,
            energy              INTEGER NOT NULL DEFAULT ${DEFAULT_MAX_ENERGY},
            energy_update_date  INTEGER NOT NULL DEFAULT 0,
            max_energy          INTEGER NOT NULL DEFAULT ${DEFAULT_MAX_ENERGY},
            gold                INTEGER NOT NULL DEFAULT 0,
            cash_gem            INTEGER NOT NULL DEFAULT 0,
            free_gem            INTEGER NOT NULL DEFAULT 0,
            fame                INTEGER NOT NULL DEFAULT 0,
            cube                INTEGER NOT NULL DEFAULT 0,
            summon_stone        INTEGER NOT NULL DEFAULT 0
        );
        CREATE UNIQUE INDEX IF NOT EXISTS users_idp_lookup
            ON users(idp_code, idp_user_key);
        CREATE UNIQUE INDEX IF NOT EXISTS users_access_token
            ON users(access_token);
    `);

    // Idempotent migration for DBs created before the energy columns existed.
    // `CREATE TABLE IF NOT EXISTS` above only runs on a fresh file, so the
    // dev DB (user 962159181) keeps its old schema across restarts. Inspect
    // the current column set and add any missing column with its default,
    // matching what a fresh CREATE would produce.
    const existing = new Set<string>(
        (db.prepare(`PRAGMA table_info(users)`).all() as { name: string }[])
            .map(r => r.name),
    );
    const additions: ReadonlyArray<readonly [string, string]> = [
        ["energy",             `INTEGER NOT NULL DEFAULT ${DEFAULT_MAX_ENERGY}`],
        ["energy_update_date", `INTEGER NOT NULL DEFAULT 0`],
        ["max_energy",         `INTEGER NOT NULL DEFAULT ${DEFAULT_MAX_ENERGY}`],
        ["gold",               `INTEGER NOT NULL DEFAULT 0`],
        ["cash_gem",           `INTEGER NOT NULL DEFAULT 0`],
        ["free_gem",           `INTEGER NOT NULL DEFAULT 0`],
        ["fame",               `INTEGER NOT NULL DEFAULT 0`],
        ["cube",               `INTEGER NOT NULL DEFAULT 0`],
        ["summon_stone",       `INTEGER NOT NULL DEFAULT 0`],
    ];
    for (const [col, type] of additions) {
        if (!existing.has(col)) {
            db.exec(`ALTER TABLE users ADD COLUMN ${col} ${type};`);
        }
    }
}

// Run before the prepared statements below: requiring this module from any
// handler must leave the table ready, otherwise `db.prepare` throws
// "no such table". initDb() re-invokes this; the CREATE IF NOT EXISTS keeps
// the second call a no-op.
createUsersTable();

const selectByIdp = db.prepare(
    `SELECT * FROM users WHERE idp_code = ? AND idp_user_key = ?`,
);
const selectByToken = db.prepare(
    `SELECT * FROM users WHERE access_token = ?`,
);
const selectByUserId = db.prepare(
    `SELECT * FROM users WHERE user_id = ?`,
);
const selectMostRecentGuest = db.prepare(
    `SELECT * FROM users WHERE idp_code = 'guest'
       ORDER BY last_login_date DESC LIMIT 1`,
);
const updateLastLogin = db.prepare(
    `UPDATE users SET last_login_date = ? WHERE user_id = ?`,
);
const insertUser = db.prepare(
    `INSERT INTO users (user_id, account_id, idp_code, idp_user_key,
                        access_token, access_token_secret,
                        name, create_date, last_login_date,
                        energy, energy_update_date, max_energy,
                        gold, cash_gem, free_gem, fame, cube, summon_stone)
     VALUES (@user_id, @account_id, @idp_code, @idp_user_key,
             @access_token, @access_token_secret,
             @name, @create_date, @last_login_date,
             @energy, @energy_update_date, @max_energy,
             @gold, @cash_gem, @free_gem, @fame, @cube, @summon_stone)`,
);
const updateProfile = db.prepare(
    `UPDATE users
       SET name               = ?,
           master_gender_type = ?,
           master_appearance  = ?
     WHERE user_id = ?`,
);
const updateTutorialStepUid = db.prepare(
    `UPDATE users SET tutorial_step_uid = ? WHERE user_id = ?`,
);
export const updateEnergyState = db.prepare(
    `UPDATE users SET energy = ?, energy_update_date = ? WHERE user_id = ?`,
);
export const updateResources = db.prepare(
    `UPDATE users
       SET gold         = ?,
           cash_gem     = ?,
           free_gem     = ?,
           fame         = ?,
           cube         = ?,
           summon_stone = ?
     WHERE user_id = ?`,
);

export function findByIdp(idpCode: string, idpUserKey: string): UserRow | undefined {
    return selectByIdp.get(idpCode, idpUserKey) as UserRow | undefined;
}

export function findByAccessToken(accessToken: string): UserRow | undefined {
    return selectByToken.get(accessToken) as UserRow | undefined;
}

export function findByUserId(userId: string): UserRow | undefined {
    return selectByUserId.get(userId) as UserRow | undefined;
}

// Adoption fallback for guest reinstall. Gamebase's per-install UUID is wiped
// when shared_prefs disappear (uninstall + install), so an unrecognised guest
// uuid often just means the same human reinstalled the APK. Falling back to
// the most recently active guest row lets the dev workflow survive that
// without leaking a fresh user row each cycle.
export function findMostRecentGuest(): UserRow | undefined {
    return selectMostRecentGuest.get() as UserRow | undefined;
}

export function touchLastLogin(userId: string, now: number): void {
    updateLastLogin.run(now, userId);
}

export function setTutorialStepUid(userId: string, tutorialStepUid: number): void {
    updateTutorialStepUid.run(tutorialStepUid, userId);
}

// Builds the on-wire `MsgUser` (proto 2513) sub-message from a UserRow.
// Both `userLoginRsp.user` and `tutorialProgressRsp.user` need the same shape;
// keeping the construction here means a new MsgUser field only has to be wired
// up in one place. Energy fields are read straight from the row; callers must
// pass a row that has already been run through `applyEnergyCharge` so the
// values reflect time-based regen since the last server-side update.
export function buildMsgUser(user: UserRow): any {
    const createSec = Math.floor(user.create_date / 1000);
    const appearance = user.master_appearance ? JSON.parse(user.master_appearance) : {};
    const userMaster = {
        gender:    user.master_gender_type || "MGT_Male",
        skin:      appearance.skin         || "MST_Skin1",
        hair:      appearance.hair         || "MHT_Hair1",
        hairColor: appearance.hairColor    || "MHCT_Color1",
    };
    return {
        userId: user.user_id,
        accountId: user.account_id,
        name: user.name,
        lev: 1,
        exp: 0,
        gold: user.gold,
        cashGem: user.cash_gem,
        freeGem: user.free_gem,
        energy: user.energy,
        energyChargeTime: user.energy_update_date,
        fame: user.fame,
        clanPoint: 0,
        helloMessage: "",
        maxEnergy: user.max_energy,
        tutorialStepUid: user.tutorial_step_uid ?? 0,
        timezone: -14400,
        userMaster,
        arenaEnergy: 0,
        createDate: String(createSec),
        lastReviewDate: String(createSec),
        profileIconUid: 0,
    };
}

// Persists the fields submitted via userRegisterReq (proto 202). Gender is a
// stand-alone column because the game reads it directly in many places (voice
// pack selection etc.); skin / hair / hairColor always travel together as the
// master visual triple, so they are serialised into a single JSON column to
// avoid schema sprawl.
export function updateProfileForRegistration(
    userId: string,
    name: string,
    masterGender: string,
    appearance: { skin: string; hair: string; hairColor: string },
): void {
    updateProfile.run(name, masterGender, JSON.stringify(appearance), userId);
}

// Allocates a new persistent user. user_id is a 31-bit positive integer
// rendered as decimal string, matching the magnitude of captured Gamebase
// userId values while staying inside JS Number precision. The proto field
// is uint64, also serialized as JS string.
export function createUser(idpCode: string, idpUserKey: string, name = ""): UserRow {
    const now = Date.now();
    const userId = String(Math.floor(Math.random() * 0x7fffffff));
    const row: UserRow = {
        user_id: userId,
        account_id: userId,
        idp_code: idpCode,
        idp_user_key: idpUserKey,
        access_token: generateAccessToken(),
        access_token_secret: uuidv4(),
        name,
        create_date: now,
        last_login_date: now,
        // The INSERT below does not list these columns, so SQLite fills the
        // DEFAULTs ('' / '{}') from the CREATE TABLE schema; mirror those
        // values into the returned row so callers see the same shape.
        master_gender_type: "",
        master_appearance: "{}",
        tutorial_step_uid: 0,
        energy: DEFAULT_MAX_ENERGY,
        energy_update_date: Math.floor(now / 1000),
        max_energy: DEFAULT_MAX_ENERGY,
        gold: 0,
        cash_gem: 0,
        free_gem: 0,
        fame: 0,
        cube: 0,
        summon_stone: 0,
    };
    insertUser.run(row);
    return row;
}
