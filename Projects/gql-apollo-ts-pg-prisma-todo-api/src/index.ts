import "reflect-metadata";
import express, { Express } from "express";
// graphql
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
//
import { TaskResolver } from "./resolvers/task";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

const main = async () => {
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [TaskResolver],
      validate: false,
    }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
  });

  await apolloServer.start();
  const app: Express = express();
  // use apollo
  apolloServer.applyMiddleware({ app });

  app.get("/", (_req, res) => res.send("hello world"));
  const PORT = process.env.PORT || 8964;
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
};

main().catch((err) => console.error(err));
