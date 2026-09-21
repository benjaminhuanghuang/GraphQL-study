# graphql-http-ts-sqlite

一个使用 `graphql-http`、TypeScript 和 Node.js 内置 SQLite 的轻量 GraphQL HTTP 服务。

要求 Node.js 22.5 或更高版本。

## 开发

```bash
npm install
npm run dev
```

服务默认运行在 `http://localhost:4000/graphql`。

## 验证

```bash
npm test
npm run build
```

可用的操作：

```graphql
query {
  users {
    id
    name
    email
  }
}
```

```graphql
mutation {
  createUser(name: "Ada", email: "ada@example.com") {
    id
    name
    email
  }
}
```
