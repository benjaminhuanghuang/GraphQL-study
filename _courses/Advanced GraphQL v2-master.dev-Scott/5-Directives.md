# Directives

Allows you to add logic and metadata to your Schemas, Queries, or Mutations. Directives can act like middleware for your Schemas, or post processing hooks for your Queries and Mutations.

## Client Directives: skip & include

## Custom Directives

## Custom Directives Arguments

## Custom Directives Exercise

## Custom Directives Solution: Date Formatting

```ts
directive @date(format: String) on FIELD_DEFINITION


type Post {
    createdAt: String! @date
}
```

## Custom Directives Solution: Authorization & Authentication
