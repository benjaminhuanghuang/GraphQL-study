import { db } from "../../db/index.js";
import { posts } from "../../db/schema.js";
import { sql } from "drizzle-orm";

import logger from "../helpers/logger.js";

const resolvers = {
  RootQuery: {
    posts: async () => await db.select().from(posts),
  },
  RootMutation: {
    addPost: async (root, { post, userId }) => {
      try {
        // Insert the new post into the database
        const [newPost] = await db
          .insert(posts)
          .values({
            text: post.text,
            user_id: userId,
          })
          .returning(); // Drizzle returns the inserted row

        logger.info("Post was created");

        // Optionally attach the user info if needed
        return {
          ...newPost,
          user: { id: userId },
        };
      } catch (error) {
        logger.error("Failed to create post", { error });
        throw new Error("Failed to create post");
      }
    },
  },
};

export default resolvers;
