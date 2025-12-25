# Graphql TS setup

```sh
npm init - y

npm i graphql @apollo/server


npm i -D typescript ts-node

npx tsc --init
"include": ["src"]

npm i -D nodemon
 "dev": "nodemon server.ts"
```

- @apollo/server

  - replaces the older apollo-server and apollo-server-express packages with a more modern, decoupled API.
  - handles routing, middleware integration, etc.

- graphql handles schema parsing, validation, execution, and introspection.
