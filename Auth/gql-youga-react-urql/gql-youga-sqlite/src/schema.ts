import { GraphQLError } from "graphql";
import { createSchema } from "graphql-yoga";
import { z } from "zod";
import type { AppJwtPayload } from "./auth.js";
import { hashPassword, signToken, verifyPassword } from "./auth.js";
import type { GraphQLContext } from "./context.js";
import {
  deleteTaskForUser,
  findTaskByIdForUser,
  findTasksByUserId,
  findUserById,
  findUserByUsername,
  insertTask,
  insertUser,
} from "./db/client.js";

const credentialsSchema = z.object({
  username: z.string().trim().min(3).max(32),
  password: z.string().min(8).max(100),
});

const parseCredentials = (args: unknown) => {
  const result = credentialsSchema.safeParse(args);
  if (!result.success) {
    throw new GraphQLError(z.prettifyError(result.error), {
      extensions: { code: "BAD_USER_INPUT" },
    });
  }
  return result.data;
};

const taskInputSchema = z.object({
  title: z.string().trim().min(1).max(200),
  description: z.string().trim().max(2000).optional(),
});

const parseTaskInput = (args: unknown) => {
  const result = taskInputSchema.safeParse(args);
  if (!result.success) {
    throw new GraphQLError(z.prettifyError(result.error), {
      extensions: { code: "BAD_USER_INPUT" },
    });
  }
  return result.data;
};

const requireAuth = (ctx: GraphQLContext): AppJwtPayload => {
  if (!ctx.user) {
    throw new GraphQLError("Not authenticated", {
      extensions: { code: "UNAUTHENTICATED" },
    });
  }
  return ctx.user;
};

export const schema = createSchema<GraphQLContext>({
  typeDefs: /* GraphQL */ `
    type User {
      id: ID!
      username: String!
      createdAt: String!
    }

    type AuthPayload {
      token: String!
      user: User!
    }

    type Task {
      id: ID!
      title: String!
      description: String
      createdAt: String!
    }

    type Query {
      me: User
      tasks: [Task!]!
      task(id: ID!): Task
    }

    type Mutation {
      signup(username: String!, password: String!): AuthPayload!
      login(username: String!, password: String!): AuthPayload!
      createTask(title: String!, description: String): Task!
      deleteTask(id: ID!): Boolean!
    }
  `,
  resolvers: {
    Query: {
      me: (_parent, _args, ctx) => {
        const auth = ctx.user;
        if (!auth) return null;

        return findUserById(auth.sub);
      },
      tasks: (_parent, _args, ctx) => {
        const auth = requireAuth(ctx);
        return findTasksByUserId(auth.sub);
      },
      task: (_parent, args: { id: string }, ctx) => {
        const auth = requireAuth(ctx);
        return findTaskByIdForUser(Number(args.id), auth.sub);
      },
    },
    Mutation: {
      signup: async (_parent, args: { username: string; password: string }) => {
        const { username, password } = parseCredentials(args);

        const existing = findUserByUsername(username);
        if (existing) {
          throw new GraphQLError("Username is already taken", {
            extensions: { code: "BAD_USER_INPUT" },
          });
        }

        const passwordHash = await hashPassword(password);
        const user = insertUser(username, passwordHash);

        return { token: signToken({ sub: user.id, username: user.username }), user };
      },
      login: async (_parent, args: { username: string; password: string }) => {
        const { username, password } = parseCredentials(args);

        const user = findUserByUsername(username);
        if (!user || !(await verifyPassword(password, user.passwordHash))) {
          throw new GraphQLError("Invalid username or password", {
            extensions: { code: "UNAUTHENTICATED" },
          });
        }

        return { token: signToken({ sub: user.id, username: user.username }), user };
      },
      createTask: (
        _parent,
        args: { title: string; description?: string | null },
        ctx,
      ) => {
        const auth = requireAuth(ctx);
        const { title, description } = parseTaskInput(args);
        return insertTask(auth.sub, title, description ?? null);
      },
      deleteTask: (_parent, args: { id: string }, ctx) => {
        const auth = requireAuth(ctx);
        return deleteTaskForUser(Number(args.id), auth.sub);
      },
    },
  },
});
