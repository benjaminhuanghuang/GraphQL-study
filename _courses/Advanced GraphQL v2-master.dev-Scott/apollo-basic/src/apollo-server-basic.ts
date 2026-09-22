import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

export const typeDefs = `#graphql
  type User {
    id: ID!
    username: String!
    createdAt: Int!
  }

    type Settings {
    user: User!
    theme: String!
  }

  input NewSettingsInput {
    user: ID!
    theme: String!
  }

  type Query {
    me: User!
    settings(user: ID!): Settings!
  }

  type Mutation {
      settings(input: NewSettingsInput!): Settings!
  }
`;

interface NewSettingsInput {
  user: string;
  theme: string;
}

export const resolvers = {
  Query: {
    me() {
      return {
        id: 1,
        username: "coder",
        createdAt: 3749584958,
      };
    },
    settings(_parent: unknown, args: { user: string }) {
      return {
        user: args.user, // only a ID
        theme: "Light",
      };
    },
  },

  Mutation: {
    settings(_parent: unknown, args: { input: NewSettingsInput }) {
      return args.input;
    },
  },

  // 每个 schema 里定义的 type 都可以在 resolver map 里有同名 key，给这个 type 的某个具体字段提供自定义解析逻辑
  Settings: {
    // Return whole user
    user() {
      return {
        id: 1,
        username: "coder",
        createdAt: 3749584958,
      };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`Server at ${url}`);

/*
{
  me {
    id
  }
}
*/
