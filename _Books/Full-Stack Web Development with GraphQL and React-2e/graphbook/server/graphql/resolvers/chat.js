export const chatResolvers = {
  Chat: {
    messages: async (chat, _args, { db }) => {
      return db
        .select()
        .from(db.messages)
        .where(eq(db.messages.chatId, chat.id));
    },
    users: async (chat, _args, { db }) => {
      return db
        .select()
        .from(db.users)
        .innerJoin(db.usersChats, eq(db.users.id, db.usersChats.userId))
        .where(eq(db.usersChats.chatId, chat.id));
    },
  },
  RootQuery: {
    chats: async (_root, _args, { db }) => {
      return db.select().from(db.chats);
    },
    chat: async (_root, { chatId }, { db }) => {
      return db.select().from(db.chats).where(eq(db.chats.id, chatId)).get();
    },
  },
  RootMutation: {
    addChat: async (_root, { chat }, { db }) => {
      const [newChat] = await db.insert(db.chats).values({}).returning();
      // 插入多对多关联
      await Promise.all(
        chat.users.map((userId) =>
          db.insert(db.usersChats).values({ userId, chatId: newChat.id }),
        ),
      );
      return newChat;
    },
  },
};
