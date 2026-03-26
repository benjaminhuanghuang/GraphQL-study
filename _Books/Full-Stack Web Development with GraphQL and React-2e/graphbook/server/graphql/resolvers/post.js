export const postResolvers = {
  Post: {
    user: async (post, args, { db }) => {
      return db
        .select()
        .from(db.users)
        .where(eq(db.users.id, post.userId))
        .get();
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
        userId: targetUser.id,
      });
    },
  },
};
