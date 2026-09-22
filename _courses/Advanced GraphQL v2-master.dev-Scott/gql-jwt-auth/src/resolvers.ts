import type { AuthUser } from "./auth";
import type { db as Database, models as Models } from "./db/index";

interface Context {
  user: AuthUser | null;
  models: typeof Models;
  db: typeof Database;
  createToken: (user: AuthUser) => string;
}

const resolvers = {
  Query: {
    me(_: unknown, __: unknown, { user }: Context) {
      return user;
    },
    posts(_: unknown, __: unknown, { user, models }: Context) {
      return models.Post.findMany({ author: user!.id });
    },
    post(_: unknown, { id }: { id: string }, { user, models }: Context) {
      return models.Post.findOne({ id, author: user!.id });
    },
    userSettings(_: unknown, __: unknown, { user, models }: Context) {
      return models.Settings.findOne({ user: user!.id });
    },
    // public resolver
    feed(_: unknown, __: unknown, { models }: Context) {
      return models.Post.findMany();
    },
  },
  Mutation: {
    updateSettings(
      _: unknown,
      { input }: { input: Record<string, unknown> },
      { user, models }: Context,
    ) {
      return models.Settings.updateOne({ user: user!.id }, input);
    },

    createPost(
      _: unknown,
      { input }: { input: Record<string, unknown> },
      { user, models }: Context,
    ) {
      return models.Post.createOne({ ...input, author: user!.id });
    },

    updateMe(
      _: unknown,
      { input }: { input: Record<string, unknown> },
      { user, models }: Context,
    ) {
      return models.User.updateOne({ id: user!.id }, input);
    },
    // admin role
    invite(
      _: unknown,
      { input }: { input: { email: string; role: string } },
      { user }: Context,
    ) {
      return {
        from: user!.id,
        role: input.role,
        createdAt: Date.now(),
        email: input.email,
      };
    },

    signup(
      _: unknown,
      { input }: { input: { email: string; password: string; role: string } },
      { models, createToken }: Context,
    ) {
      const existing = models.User.findOne({ email: input.email });

      if (existing) {
        throw new Error("nope");
      }
      const user = models.User.createOne({
        ...input,
        verified: false,
        avatar: "http",
      });
      const token = createToken(user);
      return { token, user };
    },
    signin(
      _: unknown,
      { input }: { input: { email: string; password: string } },
      { models, createToken }: Context,
    ) {
      const user = models.User.findOne(input);

      if (!user) {
        throw new Error("nope");
      }

      const token = createToken(user);
      return { token, user };
    },
  },
  User: {
    posts(root: { id: string }, _: unknown, { user, models }: Context) {
      if (root.id !== user!.id) {
        throw new Error("nope");
      }

      return models.Post.findMany({ author: root.id });
    },
    settings(
      root: { settings: string },
      __: unknown,
      { user, models }: Context,
    ) {
      return models.Settings.findOne({ id: root.settings, user: user!.id });
    },
  },
  Settings: {
    user(settings: { id: string }, _: unknown, { user, models }: Context) {
      return models.Settings.findOne({ id: settings.id, user: user!.id });
    },
  },
  Post: {
    author(post: { author: string }, _: unknown, { models }: Context) {
      return models.User.findOne({ id: post.author });
    },
  },
};

export default resolvers;
