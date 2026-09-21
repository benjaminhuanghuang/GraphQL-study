# Setup graphql-http

```sh
npm install graphql graphql-http
```

```ts
import http from "node:http";
import { createHandler } from "graphql-http/lib/use/http";
import { schema } from "./schema.js";

const handler = createHandler({ schema });

const server = http.createServer((req, res) => {
  if (req.url?.startsWith("/graphql")) {
    handler(req, res);
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(4000, () => {
  console.log("http://localhost:4000/graphql");
});
```

Option 2

```ts
import express from "express";
import { createHandler } from "graphql-http/lib/use/express";

const app = express();

app.all("/graphql", createHandler({ schema }));

app.listen(4000);
```
