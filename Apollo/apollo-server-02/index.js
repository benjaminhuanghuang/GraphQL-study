const { ApolloServer } = require("apollo-server");
//
const {products, categories, reviews} = require('./db');
const {typeDefs} = require("./schema");
const {Query} = require('./resolvers/Query');
const {Product} = require('./resolvers/Product');
const {Category} = require('./resolvers/Category');

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Product,
    Category
  },
  context: {
    categories, 
    products,
    reviews
  }
});

server.listen().then(({ url }) => {
  console.log("Server is ready at " + url);
});
