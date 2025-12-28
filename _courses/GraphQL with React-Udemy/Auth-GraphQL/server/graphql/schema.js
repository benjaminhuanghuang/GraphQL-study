import { buildSchema } from "graphql";

const schema = buildSchema(`   
  type User {
    email: String!
    password: String!
  }

  type Query {
    user: User
  }

  schema {
    query: Query
  }
`);

export default schema;
