import { messages } from "../db/schema.js";
import { desc, eq } from "drizzle-orm";

export class MessageService {
  constructor(db) {
    this.db = db;
  }

  async getMessagesByChatId(chatId) {
    return this.db
      .select()
      .from(messages)
      .where(eq(messages.chat_id, chatId))
      .orderBy(desc(messages.id));
  }

  async getLastMessageByChatId(chatId) {
    const [message] = await this.db
      .select()
      .from(messages)
      .where(eq(messages.chat_id, chatId))
      .orderBy(desc(messages.id))
      .limit(1);

    return message;
  }

  async createMessage({ text, chatId, userId }) {
    const [message] = await this.db
      .insert(messages)
      .values({ text, chat_id: chatId, user_id: userId })
      .returning();

    return message;
  }

  async addMessage(payload) {
    return this.createMessage(payload);
  }
}
