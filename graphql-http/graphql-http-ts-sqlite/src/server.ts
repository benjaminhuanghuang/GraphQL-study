import { createServer } from "node:http";
import { createHandler } from "graphql-http/lib/use/http";
import { createDatabase } from "./database.js";
import { createRoot, schema } from "./schema.js";

const port = Number(process.env.PORT ?? 4000);
const database = createDatabase(process.env.DATABASE_FILE ?? "data.sqlite");

const server = createServer(
  createHandler({
    schema,
    rootValue: createRoot(database),
  }),
);

server.listen(port, () => {
  console.log(`GraphQL server listening at http://localhost:${port}/graphql`);
});

function closeServer() {
  database.close();
  server.close();
}

process.once("SIGINT", closeServer);
process.once("SIGTERM", closeServer);
