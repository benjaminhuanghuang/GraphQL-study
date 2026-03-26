export const messageResolvers = {
  RootQuery: {
    user(message, args, context) {
      return message.getUser();
    },
    chat(message, args, context) {
      return message.getChat();
    },
  },
};
