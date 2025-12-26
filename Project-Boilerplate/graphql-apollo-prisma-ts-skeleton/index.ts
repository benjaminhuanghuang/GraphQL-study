import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { prisma } from "./lib/prisma";

// Define your GraphQL schema
const typeDefs = `
  type Book {
    id: Int!
    title: String!
    author: String!
  }

  type Query {
    books: [Book!]!
  }

  type Mutation {
    addBook(title: String!, author: String!): Book!
  }
`;

// Define resolvers for your schema
const resolvers = {
  Query: {
    books: async () => {
      return prisma.book.findMany();
    },
  },
  Mutation: {
    addBook: async (_: unknown, args: { title: string; author: string }) => {
      return prisma.book.create({
        data: {
          title: args.title,
          author: args.author,
        },
      });
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4040 },
});

console.log(`🚀 Server ready at ${url}`);
