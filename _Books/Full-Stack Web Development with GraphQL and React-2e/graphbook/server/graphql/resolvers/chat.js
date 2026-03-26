export const chatResolvers = {
  RootQuery: {
    messages(chat, args, context) {
      return chat.getMessages({
        order: [["id", "ASC"]],
      });
    },
    users(chat, args, context) {
      return chat.getUsers();
    },
  },
};
