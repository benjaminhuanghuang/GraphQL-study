import { createServer } from "node:http";
import assert from "node:assert/strict";
import { after, before, describe, it } from "node:test";
import { createHandler } from "graphql-http/lib/use/http";
import { rootValue, schema } from "../src/schema.js";

describe("graphql-http API", () => {
  const server = createServer(
    createHandler({
      schema,
      rootValue,
    }),
  );
  let address: string;

  before(async () => {
    await new Promise<void>((resolve) => {
      server.listen(0, () => {
        const { port } = server.address() as { port: number };
        address = `http://localhost:${port}/graphql`;
        resolve();
      });
    });
  });

  after(() => {
    server.close();
  });

  it("serves a GraphQL query over HTTP", async () => {
    const response = await fetch(address, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ query: "{ books { id title author } }" }),
    });

    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), {
      data: {
        books: [{ id: "1", title: "The Hobbit", author: "J. R. R. Tolkien" }],
      },
    });
  });
});
