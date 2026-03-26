export const postResolvers = {
  Post: {
    user: async (post, args, { services }) => {
      return services.userService.getUserById(post.user_id);
    },
  },
  RootQuery: {
    posts: (_, __, { services }) => {
      return services.postService.getAllPosts();
    },
  },

  RootMutation: {
    addPost: async (_, { post, user }, { services }) => {
      const existingUser = await services.userService.getUserByUsername(
        user.username,
      );

      const targetUser =
        existingUser ?? (await services.userService.createUser(user));

      return services.postService.createPost({
        text: post.text,
        user_id: targetUser.id,
      });
    },
  },
};
