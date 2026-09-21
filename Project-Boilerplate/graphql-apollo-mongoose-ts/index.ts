import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import mongoose from "mongoose";

import schema from "./graghql/schema.js";
import resolvers from "./graghql/resolvers.js";

await mongoose.connect("mongodb://localhost:27018/nodejs-study");

// server setup
const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`Server ready at: ${url}`);
