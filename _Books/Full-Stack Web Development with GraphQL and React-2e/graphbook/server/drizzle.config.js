import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";
dotenv.config();

export default defineConfig({
  dialect: "postgresql",
  schema: "./db/schema.js",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  out: "./drizzle",
});
