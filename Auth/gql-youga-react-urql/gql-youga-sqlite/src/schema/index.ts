import { createSchema } from "graphql-yoga";
import type { GraphQLContext } from "../context.js";
import { authResolvers, authTypeDefs } from "./auth.schema.js";
import { taskResolvers, taskTypeDefs } from "./task.schema.js";

export const schema = createSchema<GraphQLContext>({
  typeDefs: [authTypeDefs, taskTypeDefs],
  resolvers: {
    Query: {
      ...authResolvers.Query,
      ...taskResolvers.Query,
    },
    Mutation: {
      ...authResolvers.Mutation,
      ...taskResolvers.Mutation,
    },
  },
});
