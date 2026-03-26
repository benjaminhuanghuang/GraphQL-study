import { db } from "../db/index.js";
import { chats } from "../db/schema.js";

export const up = async () => {
  await db.insert(chats).values([
    {
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
};

export const down = async () => {
  await db.delete(chats).where(() => true);
};

await up();
