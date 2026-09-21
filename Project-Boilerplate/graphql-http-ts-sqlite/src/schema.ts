import { buildSchema } from "graphql";
import type { DatabaseSync } from "node:sqlite";
import { createUser, listUsers } from "./database.js";

export const schema = buildSchema(`
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
`);

export function createRoot(database: DatabaseSync) {
  return {
    users: () => listUsers(database),
    createUser: ({ name, email }: { name: string; email: string }) =>
      createUser(database, name, email),
  };
}
