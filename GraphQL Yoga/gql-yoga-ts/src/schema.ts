import { createSchema } from "graphql-yoga";

type User = {
  id: string;
  name: string;
  email: string;
};

const users: User[] = [];

export const schema = createSchema({
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
      users: () => users,
    },
    Mutation: {
      createUser: (_parent: unknown, args: { name: string; email: string }) => {
        const user = { id: String(users.length + 1), ...args };
        users.push(user);
        return user;
      },
    },
  },
});
