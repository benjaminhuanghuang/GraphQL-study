# GraphQL + PostgreSQL + TS

## Creating the Node.js Project

```sh
  npm init -y

  # ts
  npm i typescript tsx @types/node -D

  create tsconfig.json

  # express
  npm i express
  npm i @types/express -D
```

## Setup graphql

```sh
  npm i graphql @apollo/server graphql-tag
```

## Setting Up Prisma with PostgreSQL

```sh
  npm i @prisma/adapter-pg pg

  npm i prisma -D
  npm i @prisma/client dotenv
```

```sh
  npx prisma init
```

create scheme in /prisma/schema.prisma

Create db

```sh
npx prisma db push
```

migration, giving a name

```sh
  npx prisma migrate dev --name init

  npx prisma migrate dev --name add-post
```

folder `migrations` would be created, 每次执行 migrate， prisma 都会更新 prisma client，以便使用最新生成的数据类型

Open prisma GUI and add data

```sh
npx prisma studio
```

Seed data

```sh
  npx ts-node ./prisma/seed.ts
```
