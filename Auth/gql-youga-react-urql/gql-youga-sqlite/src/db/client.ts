import "dotenv/config";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { DatabaseSync } from "node:sqlite";

export interface User {
  id: number;
  username: string;
  passwordHash: string;
  createdAt: string;
}

const path = (process.env.DATABASE_URL ?? "file:./data/auth.db").replace(
  /^file:/,
  "",
);
mkdirSync(dirname(path), { recursive: true });

const db = new DatabaseSync(path);
db.exec("PRAGMA journal_mode = WAL");
db.exec("PRAGMA foreign_keys = ON");
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP)
  )
`);

interface UserRow {
  id: number;
  username: string;
  password_hash: string;
  created_at: string;
}

const toUser = (row: UserRow): User => ({
  id: row.id,
  username: row.username,
  passwordHash: row.password_hash,
  createdAt: row.created_at,
});

const findByUsernameStmt = db.prepare(
  "SELECT * FROM users WHERE username = ?",
);
const findByIdStmt = db.prepare("SELECT * FROM users WHERE id = ?");
const insertStmt = db.prepare(
  "INSERT INTO users (username, password_hash) VALUES (?, ?) RETURNING *",
);

export const findUserByUsername = (username: string): User | null => {
  const row = findByUsernameStmt.get(username) as UserRow | undefined;
  return row ? toUser(row) : null;
};

export const findUserById = (id: number): User | null => {
  const row = findByIdStmt.get(id) as UserRow | undefined;
  return row ? toUser(row) : null;
};

export const insertUser = (username: string, passwordHash: string): User => {
  const row = insertStmt.get(username, passwordHash) as unknown as UserRow;
  return toUser(row);
};
