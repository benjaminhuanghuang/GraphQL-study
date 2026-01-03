const { ApolloServer } = require("apollo-server");

const typeDefs = `
  type Query {
    info: String
  }
`;

const resolvers = {
  Query: {
    info: () => null,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
