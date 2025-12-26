import { ApolloServer } from "@apollo/server";
import { typeDefs } from "./schema";
import * as resolvers from "./resolvers";
import { createContext } from "./context";
import { startStandaloneServer } from "@apollo/server/standalone";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4040 },
  context: async () => {
    return await createContext();
  },
});

console.log(`🚀 Server ready at ${url}`);
