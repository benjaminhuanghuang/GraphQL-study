import { users } from "../db/schema.js";
import { eq } from "drizzle-orm";

export class UserService {
  constructor(db) {
    this.db = db;
  }

  async getAllUsers() {
    return this.db.select().from(users);
  }

  async getUserById(id) {
    const [user] = await this.db.select().from(users).where(eq(users.id, id));

    return user;
  }

  async getUserByUsername(username) {
    const [user] = await this.db
      .select()
      .from(users)
      .where(eq(users.username, username));

    return user;
  }

  async createUser({ username, avatar }) {
    const [user] = await this.db
      .insert(users)
      .values({ username, avatar })
      .returning();

    return user;
  }
}
