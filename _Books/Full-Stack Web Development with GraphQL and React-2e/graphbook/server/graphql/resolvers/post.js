export const postResolvers = {
  Query: {
    posts: (_, __, { services }) => {
      return services.postService.getAllPosts();
    },
  },

  Mutation: {
    addPost: async (_, { text }, { services, user }) => {
      if (!user) throw new Error("Unauthorized");

      return services.postService.createPost({
        text,
        userId: user.id,
      });
    },
  },
};
