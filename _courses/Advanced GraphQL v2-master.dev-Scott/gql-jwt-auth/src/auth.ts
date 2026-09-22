import jwt from "jsonwebtoken";
import { GraphQLError } from "graphql";
import type { GraphQLFieldResolver } from "graphql";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("Missing JWT_SECRET environment variable");
}

const TOKEN_TTL = "7d";

export interface AuthUser {
  id: string;
}

export const createToken = (user: AuthUser): string =>
  jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: TOKEN_TTL });

export const getUserFromToken = (token?: string | null): AuthUser | null => {
  if (!token) return null;

  try {
    return jwt.verify(token, JWT_SECRET) as AuthUser;
  } catch {
    return null;
  }
};

/**
 * checks if the user is on the context object
 * continues to the next resolver if true
 * @param {Function} next next resolver function ro run
 */
export const authenticated =
  <TSource, TContext extends { user: unknown }, TArgs>(
    next: GraphQLFieldResolver<TSource, TContext, TArgs>,
  ): GraphQLFieldResolver<TSource, TContext, TArgs> =>
  (root, args, context, info) => {
    if (!context.user) {
      throw new GraphQLError("must authenticate", {
        extensions: { code: "UNAUTHENTICATED" },
      });
    }

    return next(root, args, context, info);
  };

/**
 * checks if the user on the context has the specified role.
 * continues to the next resolver if true
 * @param {String} role enum role to check for
 * @param {Function} next next resolver function to run
 */
export const authorized =
  <TSource, TContext extends { user: { role?: string } | null }, TArgs>(
    role: string,
    next: GraphQLFieldResolver<TSource, TContext, TArgs>,
  ): GraphQLFieldResolver<TSource, TContext, TArgs> =>
  (root, args, context, info) => {
    if (context.user?.role !== role) {
      throw new GraphQLError(`you must have ${role} role`, {
        extensions: { code: "FORBIDDEN" },
      });
    }

    return next(root, args, context, info);
  };
