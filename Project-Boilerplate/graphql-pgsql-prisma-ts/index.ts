import { ApolloServer } from "apollo-server";
import { typeDefs } from "./schema";
import * as resolvers from "./resolvers";
import { context } from "./context";

// the PrismaClient is in the context
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
});

const port = process.env.PORT || 8964;

server.listen({ port }).then(async ({ url }) => {
  console.log(`Server ready at: ${url}`);
});
