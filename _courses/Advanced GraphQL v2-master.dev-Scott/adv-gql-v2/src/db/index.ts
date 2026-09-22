import { JSONFileSyncPreset } from "lowdb/node";
import createModel, { type DbSchema } from "./models";

const db = JSONFileSyncPreset<DbSchema>("src/db/db.json", {
  posts: [],
  users: [],
  settings: [],
});

export const models = {
  Settings: createModel(db, "settings"),
  Post: createModel(db, "posts"),
  User: createModel(db, "users"),
};

export { db };
