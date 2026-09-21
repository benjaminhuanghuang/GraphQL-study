# GraphQL TODO API

Apollo Server + typeDefs + resolvers + Prisma 7 + PostgreSQL

## Setup typescript

```sh
  npm i -D typescript tsx @types/node
```

Add script

```json
  "dev": "prisma generate && tsx watch src/index.ts"
```

## Setup GraphQL

```sh
  npm i @apollo/server graphql
```

`startStandaloneServer` 起一个纯 GraphQL server，不需要 express。

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
