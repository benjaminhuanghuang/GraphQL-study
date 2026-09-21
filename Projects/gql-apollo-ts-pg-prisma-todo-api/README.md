# GraphQL TODO API

Apollo Server + typeDefs + resolvers + Prisma 7 + PostgreSQL

## Setup typescript

```sh
  npm i -D typescript @types/node
```

Add script

```json
  "watch": "tsc -w",
  "dev":"nodemon dist/index.js "
```

## Setup GraphQL

```sh
  npm i express
  npm i -D @types/express
  npm i apollo-server-express graphql
```

## Prisma + PostgreSQL

```sh
  npm run prisma:generate
  npm run prisma:migrate
```

```sh
npm run dev
```

GraphQL schema 和 resolver 使用 Apollo 原生的 `typeDefs + resolvers` 方式，
不再依赖 `type-graphql` 或 `reflect-metadata`。
