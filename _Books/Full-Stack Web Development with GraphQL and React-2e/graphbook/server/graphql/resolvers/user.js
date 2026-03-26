export const userResolvers = {
  RootQuery: {
    users: async (_, __, { services }) => {
      return services.userService.getAllUsers();
    },

    user: async (_, { id }, { services }) => {
      return services.userService.getUserById(id);
    },
  },
};
