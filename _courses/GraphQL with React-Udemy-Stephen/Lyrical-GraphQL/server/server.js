import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import mongoose from "mongoose";

//
import schema from "./graphql/schema.js";
import resolvers from "./graphql/resolvers.js";

// connect to mongoDB
await mongoose.connect("mongodb://localhost:27017/lyrical-graphql");
console.log("MongoDB connected");

// server setup
const server = new ApolloServer({
  typeDefs: schema,
  resolvers: resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4444 },
});

console.log(`Server ready at: ${url}`);
