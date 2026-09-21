import { GraphQLError } from "graphql";
import { createSchema } from "graphql-yoga";
import { z } from "zod";
import { hashPassword, signToken, verifyPassword } from "./auth.js";
import type { GraphQLContext } from "./context.js";
import { findUserById, findUserByUsername, insertUser } from "./db/client.js";

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

    type Query {
      me: User
    }

    type Mutation {
      signup(username: String!, password: String!): AuthPayload!
      login(username: String!, password: String!): AuthPayload!
    }
  `,
  resolvers: {
    Query: {
      me: (_parent, _args, ctx) => {
        const auth = ctx.user;
        if (!auth) return null;

        return findUserById(auth.sub);
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
    },
  },
});
