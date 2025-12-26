# Graphql Apollo + Prisma + TS

Node v23.6+ supports Typescript

```sh
npm init - y

npm i graphql @apollo/server graphql-tag

npm i -D typescript

```

Setup mongoose

```sh
npm i mongoose
```

## test in

```graphql
mutation {
  createUser(
    userInput: { email: "test@test.com", name: "Tom", password: "secret123" }
  ) {
    _id
    email
    name
  }
}

query UserLogin($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    userId
  }
}
```
