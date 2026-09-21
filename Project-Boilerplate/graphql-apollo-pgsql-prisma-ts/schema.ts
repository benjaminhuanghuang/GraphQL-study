import { gql } from "graphql-tag";

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    name: String
  }

  type Query {
    allUsers: [User!]
  }
`;
