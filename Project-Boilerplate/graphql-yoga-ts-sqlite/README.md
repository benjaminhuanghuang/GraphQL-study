# graphql-yoga-ts-sqlite

使用 GraphQL Yoga、TypeScript 和 Node.js 内置 SQLite 的 GraphQL HTTP 服务。

要求 Node.js 22.5 或更高版本。

## 开发

```bash
npm install
npm run dev
```

服务默认运行在 `http://localhost:4000/graphql`，数据库文件默认为 `data.sqlite`。

可以通过环境变量配置：

```bash
PORT=4000 DATABASE_FILE=./data.sqlite npm start
```

## 验证

```bash
npm test
npm run build
```
