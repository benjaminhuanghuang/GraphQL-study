export const postResolvers = {
  Post: {
    user: async (post, _args, { services }) => {
      return services.userService.getUserById(post.user_id);
    },
  },

  RootQuery: {
    posts: (_, __, { services }) => {
      return services.postService.getAllPosts();
    },

    postsFeed(_root, { page, limit }, { services }) {
      var skip = 0;

      if (page && limit) {
        skip = page * limit;
      }

      var query = {
        order: [["createdAt", "DESC"]],
        offset: skip,
      };

      if (limit) {
        query.limit = limit;
      }

      return {
        posts: services.postService.findAll(query),
      };
    },
  },

  RootMutation: {
    async addPost(_root, { post }, { services, user }) {
      const userId = user?.id ?? 2;

      return services.postService.createPost({
        text: post.text,
        userId,
      });
    },
  },
};
