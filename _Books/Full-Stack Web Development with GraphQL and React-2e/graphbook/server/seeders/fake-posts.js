import { db } from "../db/index.js";
import { posts, users } from "../db/schema.js";

export const up = async () => {
  const allUsers = await db.select({ id: users.id }).from(users);

  await db.insert(posts).values([
    {
      text: "Post 1",
      user_id: allUsers[0].id,
    },
    {
      text: "Post 2",
      user_id: allUsers[1].id,
    },
  ]);
};

export const down = async () => {
  await db.delete(posts).where(() => true);
};

await up();
