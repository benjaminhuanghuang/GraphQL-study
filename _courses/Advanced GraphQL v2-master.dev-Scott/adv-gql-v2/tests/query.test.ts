import { describe, expect, test, vi } from "vitest";
import createTestServer from "./helper";

const FEED = `
  {
    feed {
      id
      message
      createdAt
      likes
      views
    }
  }
`;

describe("queries", () => {
  test("feed", async () => {
    const { query } = createTestServer({
      user: { id: "1" },
      models: {
        Post: {
          findMany: vi.fn(() => [
            {
              id: "1",
              message: "hello",
              createdAt: 12345839,
              likes: 20,
              views: 300,
            },
          ]),
        },
      },
    });

    const res = await query({ query: FEED });
    const result = res.body.kind === "single" ? res.body.singleResult : res.body;
    expect(result).toMatchSnapshot();
  });
});
