import { DatabaseSync } from "node:sqlite";

export type User = {
  id: number;
  name: string;
  email: string;
};

export function createDatabase(filename = "data.sqlite"): DatabaseSync {
  const database = new DatabaseSync(filename);

  database.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE
    )
  `);

  return database;
}

export function listUsers(database: DatabaseSync): User[] {
  return database
    .prepare("SELECT id, name, email FROM users ORDER BY id")
    .all() as unknown as User[];
}

export function createUser(
  database: DatabaseSync,
  name: string,
  email: string,
): User {
  const result = database
    .prepare("INSERT INTO users (name, email) VALUES (?, ?)")
    .run(name, email);

  return database
    .prepare("SELECT id, name, email FROM users WHERE id = ?")
    .get(result.lastInsertRowid) as unknown as User;
}
