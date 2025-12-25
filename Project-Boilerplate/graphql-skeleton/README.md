# Graphql JS setup

```sh
npm init - y && npm pkg set type="module"


npm i graphql @apollo/server
```

- @apollo/server

  - replaces the older apollo-server and apollo-server-express packages with a more modern, decoupled API.
  - handles routing, middleware integration, etc.

- graphql handles schema parsing, validation, execution, and introspection.

## Query

```js
query GameQuery{
  games {
    title,
    platform
  }
}
```
