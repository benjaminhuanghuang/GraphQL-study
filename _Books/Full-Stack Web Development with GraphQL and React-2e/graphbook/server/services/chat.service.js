import { chats, messages, users, usersChats } from "../db/schema.js";
import { desc, eq } from "drizzle-orm";

/*
  Easier for testing: new ChatService(mockDb)
*/
export class ChatService {
  constructor(db) {
    this.db = db;
  }

  async getAllChats() {
    return this.db.select().from(chats);
  }

  async getChatById(id) {
    const [chat] = await this.db.select().from(chats).where(eq(chats.id, id));
    return chat;
  }

  async createChat() {
    const [chat] = await this.db.insert(chats).values({}).returning();
    return chat;
  }

  async addUserToChat(userId, chatId) {
    const [record] = await this.db
      .insert(usersChats)
      .values({ user_id: userId, chat_id: chatId })
      .returning();

    return record;
  }

  async lastMessage(chatId) {
    const [message] = await this.db
      .select()
      .from(messages)
      .where(eq(messages.chat_id, chatId))
      .orderBy(desc(messages.id))
      .limit(1);

    return message;
  }

  async messages(chatId) {
    return this.db.select().from(messages).where(eq(messages.chat_id, chatId));
  }

  async users(chatId) {
    return this.db
      .select({
        id: users.id,
        avatar: users.avatar,
        username: users.username,
      })
      .from(usersChats)
      .innerJoin(users, eq(usersChats.user_id, users.id))
      .where(eq(usersChats.chat_id, chatId));
  }
}
