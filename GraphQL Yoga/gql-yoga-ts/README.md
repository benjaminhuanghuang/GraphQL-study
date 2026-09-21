# gql-yoga-ts

使用 GraphQL Yoga 和 TypeScript 创建 GraphQL HTTP API 的最小示例。

数据仅保存在内存中，重启服务后会重置。

## 开发

```bash
npm install
npm run dev
```

服务默认运行在 `http://localhost:4000/graphql`。

核心代码只有两步：使用 `createSchema` 定义 schema，再把 schema 传给 `createYoga`。

```ts
const schema = createSchema({ typeDefs, resolvers });
const yoga = createYoga({ schema });
createServer(yoga).listen(4000);
```

## 验证

```bash
npm test
npm run build
```
