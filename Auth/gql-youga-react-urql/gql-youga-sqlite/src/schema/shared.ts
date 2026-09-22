import { GraphQLError } from "graphql";
import type { AppJwtPayload } from "../auth.js";
import type { GraphQLContext } from "../context.js";

export const badUserInput = (message: string) =>
  new GraphQLError(message, { extensions: { code: "BAD_USER_INPUT" } });

export const unauthenticated = (message: string) =>
  new GraphQLError(message, { extensions: { code: "UNAUTHENTICATED" } });

export const requireAuth = (ctx: GraphQLContext): AppJwtPayload => {
  if (!ctx.user) {
    throw unauthenticated("Not authenticated");
  }
  return ctx.user;
};
