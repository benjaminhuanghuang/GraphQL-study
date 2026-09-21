import { buildSchema } from "graphql";

const schema = buildSchema(`   
  type User {
    email: String!
    password: String!
  }

  type Query {
    user: User
  }

  type Mutation {
    signup(email: String!, password: String!): User
    login(email: String!, password: String!): User
    logout: Boolean
  }

  schema {
    query: Query
    mutation: Mutation
  }
`);

export default schema;
