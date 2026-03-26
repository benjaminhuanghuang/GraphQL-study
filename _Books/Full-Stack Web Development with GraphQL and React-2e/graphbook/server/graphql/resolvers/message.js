export const messageResolvers = {
  Message: {
    user: async (message, _args, { services }) => {
      return services.userService.getUserById(message.user_id);
    },
    chat: async (message, _args, { db }) => {
      return services.chatService.getChatById(message.chat_id);
    },
  },

  RootMutation: {
    addMessage: async (_root, { message }, { services }) => {
      const newMessage = await services.messageService.createMessage(message);
      return newMessage;
    },
  },
};
