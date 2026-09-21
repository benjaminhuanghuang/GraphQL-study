import type { YogaInitialContext } from "graphql-yoga";
import { verifyToken, type AppJwtPayload } from "./auth.js";

export interface GraphQLContext extends YogaInitialContext {
  user: AppJwtPayload | null;
}

export const createContext = ({
  request,
  ...rest
}: YogaInitialContext): GraphQLContext => {
  const authHeader = request.headers.get("authorization") ?? "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice("Bearer ".length)
    : null;

  return {
    request,
    ...rest,
    user: token ? verifyToken(token) : null,
  };
};
