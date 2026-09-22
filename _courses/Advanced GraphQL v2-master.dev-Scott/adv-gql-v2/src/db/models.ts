import { nanoid } from "nanoid";
import type { LowSync } from "lowdb";

export interface Entity {
  id: string;
  createdAt: number;
  [key: string]: unknown;
}

export type DbSchema = Record<string, Entity[]>;

type Filter = Partial<Entity>;

const matches = (item: Entity, filter: Filter) =>
  Object.entries(filter).every(([key, value]) => item[key] === value);

const createModel = (db: LowSync<DbSchema>, table: string) => ({
  findOne(filter: Filter = {}) {
    const rows = db.data[table];
    return Object.keys(filter).length
      ? rows.find((item) => matches(item, filter))
      : rows[0];
  },
  findMany(filter?: Filter) {
    const rows = filter
      ? db.data[table].filter((item) => matches(item, filter))
      : db.data[table];
    return [...rows].sort((a, b) => b.createdAt - a.createdAt);
  },
  updateOne(filter: Filter, update: Partial<Entity>) {
    const match = db.data[table].find((item) => matches(item, filter));
    if (!match) return undefined;
    Object.assign(match, update);
    db.write();
    return match;
  },
  remove(filter: Filter) {
    db.data[table] = db.data[table].filter((item) => !matches(item, filter));
    db.write();
  },
  createOne(fields: Omit<Entity, "id" | "createdAt">) {
    const item: Entity = { ...fields, createdAt: Date.now(), id: nanoid() };
    db.data[table].push(item);
    db.write();
    return item;
  },
  createMany(toCreate: Omit<Entity, "id" | "createdAt">[]) {
    const items: Entity[] = toCreate.map((entry) => ({
      ...entry,
      createdAt: Date.now(),
      id: nanoid(),
    }));
    db.data[table].push(...items);
    db.write();
    return items;
  },
});

export default createModel;
