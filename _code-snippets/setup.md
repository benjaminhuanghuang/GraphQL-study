# Setup

## Apollo

```sh
npm init -y

npm i -s npm i graphql @apollo/server graphql-tag
```

## express-graphql

```sh
npm init -y

npm i cors dotenv express express-graphql graphql@15
pnm i jsonwebtoken pg
npm i -D nodemon standard
```

express-graphql doesn't support graphql 16
GraphQL 官方已经把重心转移到 Apollo / Yoga / Helix

- pg: PostgreSQL client for Node.js.
