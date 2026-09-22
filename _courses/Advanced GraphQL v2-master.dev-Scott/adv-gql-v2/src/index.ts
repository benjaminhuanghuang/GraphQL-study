import "dotenv/config";
import http from "node:http";
import express from "express";
import cors from "cors";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/use/ws";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServer } from "@apollo/server";
import type { ApolloServerPlugin } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";

import typeDefs from "./typedefs";
import resolvers from "./resolvers";
import { createToken, getUserFromToken } from "./auth";
import * as db from "./db/index";

const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express();
const httpServer = http.createServer(app);

const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});

const serverCleanup = useServer(
  {
    schema,
    context: async (ctx) => {
      const token = ctx.connectionParams?.authorization as
        | string
        | undefined;
      const user = getUserFromToken(token);
      return { ...db, user, createToken };
    },
  },
  wsServer,
);

const server = new ApolloServer({
  schema,
  plugins: [
    // proper shutdown for the HTTP server
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await new Promise<void>((resolve) =>
              httpServer.close(() => resolve()),
            );
          },
        };
      },
    } satisfies ApolloServerPlugin,
    // proper shutdown for the WebSocket server
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    } satisfies ApolloServerPlugin,
  ],
});

await server.start();

app.use(
  "/graphql",
  cors<cors.CorsRequest>(),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req }) => {
      const token = req.headers.authorization;
      const user = getUserFromToken(token);
      return { ...db, user, createToken };
    },
  }),
);

const PORT = 4000;
httpServer.listen(PORT, () => {
  console.log(`🚀 Query/Mutation endpoint ready at http://localhost:${PORT}/graphql`);
  console.log(`🚀 Subscription endpoint ready at ws://localhost:${PORT}/graphql`);
});
