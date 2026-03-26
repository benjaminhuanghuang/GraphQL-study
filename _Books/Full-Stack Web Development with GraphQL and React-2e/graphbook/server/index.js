import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const typeDefs = `#graphql
  type Query {
    hello: String
    add(x: Int!, y: Int!): Int
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello world!",
    add: (_, { x, y }) => x + y,
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(apolloServer, {
  listen: { port: 4000 },
});

console.log(`🚀 Server listening at: ${url}`);
