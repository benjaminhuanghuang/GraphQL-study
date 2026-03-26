import { ApolloServer } from "apollo-server-express";
import { makeExecutableSchema } from "@graphql-tools/schema";
import Resolvers from "./resolvers.js";
import Schema from "./schema.js";

const executableSchema = makeExecutableSchema({
  typeDefs: Schema,
  resolvers: Resolvers,
});
const server = new ApolloServer({
  schema: executableSchema,
  context: ({ req }) => req,
});

export default server;
