import "dotenv/config";
import { createServer } from "node:http";
import { createYoga } from "graphql-yoga";
import { createContext } from "./context.js";
import { schema } from "./schema.js";

const port = Number(process.env.PORT ?? 4000);
const yoga = createYoga({
  schema,
  context: createContext,
  cors: {
    origin: process.env.CORS_ORIGIN ?? "http://localhost:5173",
    credentials: true,
  },
});
const server = createServer(yoga);

server.listen(port, () => {
  console.log(
    `GraphQL Yoga server listening at http://localhost:${port}/graphql`,
  );
});

process.once("SIGINT", () => server.close());
process.once("SIGTERM", () => server.close());
