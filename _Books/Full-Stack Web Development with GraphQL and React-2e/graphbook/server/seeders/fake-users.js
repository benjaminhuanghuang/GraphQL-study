import { db } from "../db/index.js";
import { users } from "../db/schema.js";

export const up = async () => {
  await db.insert(users).values([
    {
      avatar: "/uploads/avatar1.png",
      username: "TestUser",
    },
    {
      avatar: "/uploads/avatar2.png",
      username: "TestUser2",
    },
  ]);
};

export const down = async () => {
  await db.delete(users).where(() => true);
};

await up();
