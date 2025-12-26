import { ApolloServer } from "@apollo/server";
import typeDefs from "./schema";
import resolvers from "./resolvers";
import { startStandaloneServer } from "@apollo/server/standalone";
import mongoose from "mongoose";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Connect to MongoDB
await mongoose.connect("mongodb://localhost:27018/petsdb");
console.log("Connected to MongoDB");

const { url } = await startStandaloneServer(server, {
  listen: { port: 4040 },
});

console.log(`Server ready at: ${url}`);
