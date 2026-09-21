import type { DatabaseSync } from "node:sqlite";
import { createSchema } from "graphql-yoga";
import { createUser, listUsers } from "./database.js";

export type GraphQLContext = {
  database: DatabaseSync;
};

export const schema = createSchema<GraphQLContext>({
  typeDefs: /* GraphQL */ `
    type User {
      id: ID!
      name: String!
      email: String!
    }

    type Query {
      users: [User!]!
    }

    type Mutation {
      createUser(name: String!, email: String!): User!
    }
  `,
  resolvers: {
    Query: {
      users: (_parent: unknown, _args: unknown, context: GraphQLContext) =>
        listUsers(context.database),
    },
    Mutation: {
      createUser: (
        _parent: unknown,
        args: { name: string; email: string },
        context: GraphQLContext,
      ) => createUser(context.database, args.name, args.email),
    },
  },
});
