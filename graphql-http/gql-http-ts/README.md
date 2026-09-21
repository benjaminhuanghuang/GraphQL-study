# gql-http-ts

使用 `graphql-http` 和 TypeScript 创建 GraphQL HTTP API 的最小示例。

## 启动

```bash
npm install
npm run dev
```

API 地址：`http://localhost:4000/graphql`

## API 实现方式

`graphql-http` 提供符合 GraphQL over HTTP 规范的 request handler。这里通过
Node.js 原生 `http.createServer` 挂载它：

```ts
import { createServer } from "node:http";
import { createHandler } from "graphql-http/lib/use/http";

const handler = createHandler({ schema, rootValue });
const server = createServer(handler);
server.listen(4000);
```

本项目额外判断 `/graphql` 路径，对其他路径返回 `404`。

## 查询示例

```bash
curl http://localhost:4000/graphql \
  -X POST \
  -H 'content-type: application/json' \
  -d '{"query":"{ books { id title author } }"}'
```

返回：

```json
{
  "data": {
    "books": [
      { "id": "1", "title": "The Hobbit", "author": "J. R. R. Tolkien" }
    ]
  }
}
```

## Mutation 示例

```bash
curl http://localhost:4000/graphql \
  -X POST \
  -H 'content-type: application/json' \
  -d '{"query":"mutation { addBook(title: \"Dune\", author: \"Frank Herbert\") { id title author } }"}'
```

## 验证

```bash
npm test
npm run build
```
