import { DatabaseSync } from "node:sqlite";
import { graphql } from "graphql";
import { beforeEach, describe, expect, it } from "vitest";
import { createDatabase } from "../src/database.js";
import { createRoot, schema } from "../src/schema.js";

describe("GraphQL SQLite API", () => {
  let database: DatabaseSync;

  beforeEach(() => {
    database = createDatabase(":memory:");
  });

  it("creates and queries users", async () => {
    const mutation = await graphql({
      schema,
      source: `mutation { createUser(name: "Ada", email: "ada@example.com") { id name email } }`,
      rootValue: createRoot(database),
    });

    expect(mutation.errors).toBeUndefined();
    expect(mutation.data?.createUser).toMatchObject({
      id: "1",
      name: "Ada",
      email: "ada@example.com",
    });

    const query = await graphql({
      schema,
      source: "{ users { id name email } }",
      rootValue: createRoot(database),
    });

    expect(query.errors).toBeUndefined();
    expect(query.data?.users).toEqual([
      { id: "1", name: "Ada", email: "ada@example.com" },
    ]);

    database.close();
  });
});
