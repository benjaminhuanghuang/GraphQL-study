# Authentication

## Auth in GraphQL Overview

Authentication: Used to identify a user. To determine if they are who they say they are.

Authorization: Used to determine if a user is allowed to perform certain operations on certain resources.

### A good auth system in GraphQL

Authorization

- Should not be coupled to a resolver
- Can provide field level custom rules
- Can authorize some of your schema and not all

Authentication

- Provides the user to resolvers
- Should not be coupled to a resolver
- Can protect some of your Schema and not all of it
- Can provide field level protection

## GraphQL Auth Approaches

So many ways to auth

- Outside of GraphQL
- When creating context
- Inside the resolvers

### Outside of GraphQL

- Using something like Express middleware before the GraphQL Server executes
- Completely locks down all GraphQL queries and mutations
- Extra complexity of passing auth info to GraphQL

### When creating context

- Use context creation function when creating your apollo server
- Can access the incoming request to determine authentication
- No extra work to pass to GraphQL resolvers

```ts
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context() {},
});
```

### Inside resolvers

- Business logic tied up with authentication logic
- The simplest to implement
- The hardest to reuse

## Code Base Overview

## Authenticated Helper Exercise

## Authenticated Helper Solution
