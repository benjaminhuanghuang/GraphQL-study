import {
  pgTable,
  serial,
  varchar,
  integer,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  avatar: varchar("avatar", { length: 255 }),
  username: varchar("username", { length: 255 }).notNull(),
});

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  text: text("text").notNull(),

  user_id: integer("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
});

export const chats = pgTable("chats", {
  id: serial("id").primaryKey(),
  first_name: varchar("first_name"),
  last_name: varchar("last_name"),
  email: varchar("email"),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  text: varchar("text", { length: 255 }).notNull(),
  user_id: integer("user_id")
    .references(() => users.id)
    .notNull(),
  chat_id: integer("chat_id")
    .references(() => chats.id)
    .notNull(),
});

export const usersChats = pgTable("users_chats", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
  chat_id: integer("chat_id")
    .notNull()
    .references(() => chats.id, { onDelete: "cascade", onUpdate: "cascade" }),
});
