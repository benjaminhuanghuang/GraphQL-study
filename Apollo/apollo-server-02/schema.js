/*
 Type Definations
*/
const { gql } = require("apollo-server");

exports.typeDefs = gql`
  type Query {
    allProducts: [Product!]!
    product(id: ID!): Product
    products(filter: ProductsFilterInput): [Product!]!
    categories: [Category!]!
    category(id: ID!): Category
  }

  type Product {
    id: ID!
    name: String!
    description: String!
    quentity: Int!
    image: String!
    price: Float
    onSale: Boolean
    category: Category
    reviews: [Review!]!
  }

  type Category {
    id: ID!
    name: String!
    allProducts: [Product!]!
    products(filter: ProductsFilterInput): [Product!]!
  }

  type Review {
    id: ID!
    date: String!
    title: String!
    comment: String!
    rating: Int!
  }

  input ProductsFilterInput {
    onSale: Boolean
    avgRating: Int
  }
`;
