import { ApolloServer } from "@apollo/server";
import typeDefs from "./schema.js";
import resolvers from "./resolvers.js";
import { startStandaloneServer } from "@apollo/server/standalone";

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4040 },
});
