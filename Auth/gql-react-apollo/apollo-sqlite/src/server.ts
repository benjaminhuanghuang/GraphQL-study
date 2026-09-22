import "dotenv/config";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { createContext, type GraphQLContext } from "./context.js";
import { resolvers, typeDefs } from "./schema/index.js";

const port = Number(process.env.PORT ?? 4001);

const server = new ApolloServer<GraphQLContext>({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  context: createContext,
  listen: { port },
});

console.log(`Apollo Server listening at ${url}`);
