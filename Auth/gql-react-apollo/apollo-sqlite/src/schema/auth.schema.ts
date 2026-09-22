import { z } from "zod";
import { hashPassword, signToken, verifyPassword } from "../auth.js";
import type { GraphQLContext } from "../context.js";
import { findUserById, findUserByUsername, insertUser } from "../db/client.js";
import { badUserInput, unauthenticated } from "./shared.js";

const credentialsSchema = z.object({
  username: z.string().trim().min(3).max(32),
  password: z.string().min(8).max(100),
});

const parseCredentials = (args: unknown) => {
  const result = credentialsSchema.safeParse(args);
  if (!result.success) {
    throw badUserInput(z.prettifyError(result.error));
  }
  return result.data;
};

export const authTypeDefs = /* GraphQL */ `
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
`;

export const authResolvers = {
  Query: {
    me: (_parent: unknown, _args: unknown, ctx: GraphQLContext) => {
      if (!ctx.user) return null;
      return findUserById(ctx.user.sub);
    },
  },
  Mutation: {
    signup: async (
      _parent: unknown,
      args: { username: string; password: string },
    ) => {
      const { username, password } = parseCredentials(args);

      const existing = findUserByUsername(username);
      if (existing) {
        throw badUserInput("Username is already taken");
      }

      const passwordHash = await hashPassword(password);
      const user = insertUser(username, passwordHash);

      return {
        token: signToken({ sub: user.id, username: user.username }),
        user,
      };
    },
    login: async (
      _parent: unknown,
      args: { username: string; password: string },
    ) => {
      const { username, password } = parseCredentials(args);

      const user = findUserByUsername(username);
      if (!user || !(await verifyPassword(password, user.passwordHash))) {
        throw unauthenticated("Invalid username or password");
      }

      return {
        token: signToken({ sub: user.id, username: user.username }),
        user,
      };
    },
  },
};
