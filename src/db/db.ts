import sqlite from 'better-sqlite3';

const db = sqlite('cannae.db');
db.pragma('journal_mode = WAL');

export default db;