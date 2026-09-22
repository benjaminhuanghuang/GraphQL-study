import type { BaseContext } from "@apollo/server";
import type { StandaloneServerContextFunctionArgument } from "@apollo/server/standalone";
import { verifyToken, type AppJwtPayload } from "./auth.js";

export interface GraphQLContext extends BaseContext {
  user: AppJwtPayload | null;
}

export const createContext = async ({
  req,
}: StandaloneServerContextFunctionArgument): Promise<GraphQLContext> => {
  const authHeader = req.headers.authorization ?? "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice("Bearer ".length)
    : null;

  return { user: token ? verifyToken(token) : null };
};
