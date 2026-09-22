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

export interface Task {
  id: number;
  userId: number;
  title: string;
  description: string | null;
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
db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
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

interface TaskRow {
  id: number;
  user_id: number;
  title: string;
  description: string | null;
  created_at: string;
}

const toTask = (row: TaskRow): Task => ({
  id: row.id,
  userId: row.user_id,
  title: row.title,
  description: row.description,
  createdAt: row.created_at,
});

const findTasksByUserIdStmt = db.prepare(
  "SELECT * FROM tasks WHERE user_id = ? ORDER BY id DESC",
);
const findTaskByIdForUserStmt = db.prepare(
  "SELECT * FROM tasks WHERE id = ? AND user_id = ?",
);
const insertTaskStmt = db.prepare(
  "INSERT INTO tasks (user_id, title, description) VALUES (?, ?, ?) RETURNING *",
);
const deleteTaskStmt = db.prepare(
  "DELETE FROM tasks WHERE id = ? AND user_id = ?",
);

export const findTasksByUserId = (userId: number): Task[] => {
  const rows = findTasksByUserIdStmt.all(userId) as unknown as TaskRow[];
  return rows.map(toTask);
};

export const findTaskByIdForUser = (
  id: number,
  userId: number,
): Task | null => {
  const row = findTaskByIdForUserStmt.get(id, userId) as
    | TaskRow
    | undefined;
  return row ? toTask(row) : null;
};

export const insertTask = (
  userId: number,
  title: string,
  description: string | null,
): Task => {
  const row = insertTaskStmt.get(
    userId,
    title,
    description,
  ) as unknown as TaskRow;
  return toTask(row);
};

export const deleteTaskForUser = (id: number, userId: number): boolean => {
  const result = deleteTaskStmt.run(id, userId);
  return result.changes > 0;
};
