export const chatResolvers = {
  Chat: {
    messages: async (chat, _args, { services }) => {
      return services.messageService.getMessagesByChatId(chat.id);
    },
    users: async (chat, _args, { services }) => {
      return services.userService.getUsersByChatId(chat.id);
    },
    lastMessage(chat, _args, { services }) {
      return services.messageService.getLastMessageByChatId(chat.id);
    },
  },

  RootQuery: {
    chats: async (_root, _args, { services }) => {
      return services.chatService.getAllChats();
    },
    chat: async (_root, { chatId }, { services }) => {
      return services.chatService.getChatById(chatId);
    },
  },

  RootMutation: {
    addChat: async (_root, { chat }, { services }) => {
      const newChat = await services.chatService.createChat(chat);
      await Promise.all(
        chat.users.map((userId) =>
          services.chatService.addUserToChat(userId, newChat.id),
        ),
      );
      return newChat;
    },
  },
};
