import { db } from "../db/index.js";
import { usersChats, users, chats } from "../db/schema.js";

export const up = async () => {
  const allUsers = await db.select({ id: users.id }).from(users);
  const allChats = await db.select({ id: chats.id }).from(chats);

  await db.insert(usersChats).values([
    {
      user_id: allUsers[0].id,
      chat_id: allChats[0].id,
    },
    {
      user_id: allUsers[1].id,
      chat_id: allChats[0].id,
    },
  ]);
};

export const down = async () => {
  await db.delete(usersChats).where(() => true);
};

await up();
