# downsides of GraphQL

1. Complexity in Setup

Server complexity: Unlike REST, you need a GraphQL server that understands schemas, resolvers, and types.

Learning curve: Developers need to learn GraphQL queries, mutations, subscriptions, and tools like Apollo or Relay.

Example: Writing nested queries and resolvers can get tricky in large apps.

2. Overhead for Simple APIs

If your app only needs simple CRUD operations, GraphQL can be overkill compared to REST.

REST endpoints are easier to cache and reason about in small apps.

3. Performance Concerns

Complex queries: Clients can request deeply nested or large amounts of data, which can overload your server.

N+1 problem: If resolvers are not optimized, fetching a list with nested objects can result in many database queries.

Requires careful query optimization and batching (e.g., using dataloader).

4. Caching Challenges

REST can leverage HTTP caching easily (like ETag or Cache-Control). ✅
GraphQL responses are usually POST requests, making traditional HTTP caching less straightforward.
Requires client-side caching (Apollo cache, Relay cache) or custom caching layers.

5. No Built-in Rate Limiting

   Because clients can specify exactly what they want, it’s harder to limit heavy queries.
   Requires query complexity analysis or depth limiting to prevent abuse.

6. Tooling & Ecosystem Considerations
   Tooling is improving but not as mature as REST in some areas (e.g., API gateways, logging).
   Some existing libraries or backend frameworks may not fully support GraphQL.

7. File Uploads
   GraphQL doesn’t natively handle file uploads. You need multipart requests or custom solutions.
