import { posts } from "../db/schema.js";

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

  async createPost({ text, userId }) {
    const [post] = await this.db
      .insert(posts)
      .values({ text, user_id: userId })
      .returning();

    return post;
  }
}
