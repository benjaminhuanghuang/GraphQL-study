import "dotenv/config";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import typeDefs from "./typedefs";
import resolvers from "./resolvers";
import { createToken, getUserFromToken } from "./auth";
import * as db from "./db/index";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => {
    // get token
    const token = req.headers.authorization;
    const user = getUserFromToken(token);
    return { ...db, user, createToken };
  },
  listen: { port: 4000 },
});

console.log(`🚀 Server ready at ${url}`);
