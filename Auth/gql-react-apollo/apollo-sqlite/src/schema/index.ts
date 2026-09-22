import { authResolvers, authTypeDefs } from "./auth.schema.js";
import { taskResolvers, taskTypeDefs } from "./task.schema.js";

export const typeDefs = [authTypeDefs, taskTypeDefs];

export const resolvers = {
  Query: {
    ...authResolvers.Query,
    ...taskResolvers.Query,
  },
  Mutation: {
    ...authResolvers.Mutation,
    ...taskResolvers.Mutation,
  },
};
