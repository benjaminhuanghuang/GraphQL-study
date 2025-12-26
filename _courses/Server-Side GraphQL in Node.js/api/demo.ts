import { ApolloServer } from "@apollo/server";
import { gql } from "graphql-tag";
import { startStandaloneServer } from "@apollo/server/standalone";

const typeDefs = gql`
  type User {
    email: String!
    avatar: String
    friends: [User]!
  }

  type Query {
    me: User!
  }
`;

const resolvers = {
  Query: {
    me: () => ({
      email: "test@gmail.com",
      avatar: "https://i.pravatar.cc/300",
      friends: [],
    }),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4040 },
});

console.log(`🚀 Server ready at ${url}`);
