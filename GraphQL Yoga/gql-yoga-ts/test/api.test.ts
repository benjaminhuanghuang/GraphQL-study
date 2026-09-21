import { createYoga } from "graphql-yoga";
import { describe, expect, it } from "vitest";
import { schema } from "../src/schema.js";

describe("GraphQL Yoga API", () => {
  it("creates and queries users over GraphQL HTTP", async () => {
    const yoga = createYoga({ schema });

    const mutation = await yoga.fetch("http://localhost/graphql", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        query:
          'mutation { createUser(name: "Ada", email: "ada@example.com") { id name email } }',
      }),
    });

    expect(mutation.status).toBe(200);
    expect(await mutation.json()).toEqual({
      data: {
        createUser: {
          id: "1",
          name: "Ada",
          email: "ada@example.com",
        },
      },
    });

    const query = await yoga.fetch("http://localhost/graphql", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ query: "{ users { id name email } }" }),
    });

    expect(await query.json()).toEqual({
      data: {
        users: [{ id: "1", name: "Ada", email: "ada@example.com" }],
      },
    });
  });
});
