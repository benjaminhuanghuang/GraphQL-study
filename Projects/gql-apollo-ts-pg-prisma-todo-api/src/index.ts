import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { resolvers, typeDefs } from "./schema";

const main = async () => {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const port = Number(process.env.PORT) || 8964;
  const { url } = await startStandaloneServer(apolloServer, {
    listen: { port },
  });

  console.log(`Server started at ${url}`);
};

main().catch((error) => console.error(error));
