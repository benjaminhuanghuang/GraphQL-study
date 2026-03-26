const {
  pgTable,
  serial,
  varchar,
  integer,
  text,
} = require("drizzle-orm/pg-core");

// Define the users table
const users = pgTable("users", {
  id: serial("id").primaryKey(),
  avatar: varchar("avatar", { length: 255 }),
  username: varchar("username", { length: 255 }).notNull(),
});

const chats = pgTable("chats", {
  id: serial("id").primaryKey(),
  first_name: varchar("first_name", { length: 255 }).notNull(),
  last_name: varchar("last_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
});

const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  text: varchar("text", { length: 255 }).notNull(),
  user_id: integer("user_id")
    .references(() => users.id)
    .notNull(),
  chat_id: integer("chat_id")
    .references(() => chats.id)
    .notNull(),
});

const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  text: text("text").notNull(),
  user_id: integer("user_id")
    .references(() => users.id)
    .notNull(),
});

export { users, messages, posts, chats };
