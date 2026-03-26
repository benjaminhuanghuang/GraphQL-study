import { posts } from "../db/schema.js";
import { desc, eq } from "drizzle-orm";

/*
  Easier for testing: new PostService(mockDb)
*/
export class PostService {
  constructor(db) {
    this.db = db;
  }

  async getAllPosts() {
    return this.db.select().from(posts);
  }

  async findAll({ offset = 0, limit } = {}) {
    let query = this.db
      .select()
      .from(posts)
      .orderBy(desc(posts.id))
      .offset(offset);

    if (typeof limit === "number") {
      query = query.limit(limit);
    }

    return query;
  }

  async createPost({ text, userId }) {
    const [post] = await this.db
      .insert(posts)
      .values({ text, user_id: userId })
      .returning();

    return post;
  }

  async deletePost(postId) {
    const result = await this.db.delete(posts).where(eq(posts.id, postId));

    return { success: result.rowCount > 0 };
  }
}
