import { createServer } from "node:http";
import { createYoga } from "graphql-yoga";
import { createDatabase } from "./database.js";
import { schema } from "./schema.js";

const port = Number(process.env.PORT ?? 4000);
const database = createDatabase(process.env.DATABASE_FILE ?? "data.sqlite");
const yoga = createYoga({
  schema,
  context: () => ({ database }),
});
const server = createServer(yoga);

server.listen(port, () => {
  console.log(
    `GraphQL Yoga server listening at http://localhost:${port}/graphql`,
  );
});

function closeServer() {
  database.close();
  server.close();
}

process.once("SIGINT", closeServer);
process.once("SIGTERM", closeServer);
