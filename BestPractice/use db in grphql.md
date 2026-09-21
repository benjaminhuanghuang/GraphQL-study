# Use db in graphQL

```ts
const database = createDatabase(process.env.DATABASE_FILE ?? "data.sqlite");

const server = createServer(
  createHandler({
    schema,
    rootValue: createRoot(database),
  }),
);
```
