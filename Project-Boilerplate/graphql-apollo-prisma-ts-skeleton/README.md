# Graphql Apollo + Prisma + TS

Node v23.6+ supports Typescript

```sh
npm init - y

npm i graphql @apollo/server dotenv

npm i -D typescript

```

Setup prisma

```sh
npm i @prisma/client dotenv
npm i -D prisma @types/node
npm i @prisma/adapter-pg pg

npx prisma init
# creates prisma folder, .env and prisma.config.ts
# add /generated/prisma to .gitignore

npx prisma generate
```

Add model in prisma/schema.prisma

Setup database

```sh
npx prisma migrate dev --name init
```

## Test

```graphql
mutation {
  addBook(title: "The Pragmatic Programmer", author: "Andrew Hunt") {
    id
    title
    author
  }
}

query {
  books {
    id
    title
    author
  }
}
```
