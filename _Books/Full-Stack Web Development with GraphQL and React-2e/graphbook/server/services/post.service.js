import { posts } from "../db/schema.js";
import { desc } from "drizzle-orm";

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

  async createPost({ text, user_id, userId }) {
    const authorId = user_id ?? userId;

    const [post] = await this.db
      .insert(posts)
      .values({ text, user_id: authorId })
      .returning();

    return post;
  }
}
