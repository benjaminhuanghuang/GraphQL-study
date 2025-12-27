import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
//
import schema from "./graphql/schema.js";
import resolvers from "./graphql/resolvers.js";

// server setup
const server = new ApolloServer({
  typeDefs: schema,
  resolvers: resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4444 },
});

console.log(`Server ready at: ${url}`);
