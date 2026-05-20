import sqlite from "better-sqlite3";
import path from "path";
import fs from "fs";
import { repoRoot } from "../config";

const dbFile = path.join(repoRoot, "db", "cannae.db");
fs.mkdirSync(path.dirname(dbFile), { recursive: true });

const db = sqlite(dbFile);
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

export default db;
