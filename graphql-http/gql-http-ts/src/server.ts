import { createServer } from "node:http";
import { createHandler } from "graphql-http/lib/use/http";
import { rootValue, schema } from "./schema.js";

const port = Number(process.env.PORT ?? 4000);

const handler = createHandler({
  schema,
  rootValue,
});

const server = createServer((request, response) => {
  if (request.url?.startsWith("/graphql")) {
    return handler(request, response);
  }

  response.writeHead(404).end("Not Found");
});

server.listen(port, () => {
  console.log(`GraphQL API listening at http://localhost:${port}/graphql`);
});

function closeServer() {
  server.close();
}

process.once("SIGINT", closeServer);
process.once("SIGTERM", closeServer);
