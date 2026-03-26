export const messageResolvers = {
  Message: {
    user: async (message, _args, { db }) => {
      return db
        .select()
        .from(db.users)
        .where(eq(db.users.id, message.userId))
        .get();
    },
    chat: async (message, _args, { db }) => {
      return db
        .select()
        .from(db.chats)
        .where(eq(db.chats.id, message.chatId))
        .get();
    },
  },
  RootMutation: {
    addMessage: async (_root, { message }, { db }) => {
      const [newMessage] = await db
        .insert(db.messages)
        .values(message)
        .returning();
      return newMessage;
    },
  },
};
