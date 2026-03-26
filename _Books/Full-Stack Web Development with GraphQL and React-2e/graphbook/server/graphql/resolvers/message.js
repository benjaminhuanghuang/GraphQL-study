export const messageResolvers = {
  Message: {
    user: async (message, _args, { services }) => {
      return services.userService.getUserById(message.user_id);
    },
    chat: async (message, _args, { services }) => {
      return services.chatService.getChatById(message.chat_id);
    },
  },

  RootMutation: {
    addMessage: async (_root, { message }, { services, user }) => {
      if (!user?.id) {
        throw new Error("Authentication required to add a message");
      }

      const newMessage = await services.messageService.createMessage({
        text: message.text,
        chatId: message.chatId,
        userId: user.id,
      });
      return newMessage;
    },
  },
};
