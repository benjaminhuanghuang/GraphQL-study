# Apollo 4

```js
const server = new ApolloServer({ typeDefs, resolvers });

server.listen(4000).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
```

In Apollo Server v4:

There is no built-in HTTP server.

ApolloServer does not have a listen() method.

You must attach it to a framework like Express, Fastify, or Node’s native HTTP server.

option 1

```js
import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

const app = express();
const server = new ApolloServer({ typeDefs, resolvers });

await server.start();

app.use("/graphql", express.json(), expressMiddleware(server));

const PORT = 4040;
app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
});
```

Option 2

```js
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4040 },
});

console.log(`🚀 Server ready at ${url}`);
```
