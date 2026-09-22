import { ApolloServer, type BaseContext } from "@apollo/server";
import typeDefs from "../src/typedefs";
import resolvers from "../src/resolvers";

const createTestServer = <TContext extends BaseContext>(contextValue: TContext) => {
  const server = new ApolloServer<TContext>({
    typeDefs,
    resolvers,
  });

  return {
    query: (request: { query: string; variables?: Record<string, unknown> }) =>
      server.executeOperation(request, { contextValue }),
  };
};

export default createTestServer;
