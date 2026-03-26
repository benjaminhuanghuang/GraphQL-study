# Chapter 4: Hooking Apollo into React

```sh
npm i @apollo/client graphql
```

graphql is a reference implementation for GraphQL and provides logic to parse
GraphQL queries.

```js
import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/client/react";
import App from "./App";
import client from "./apollo";

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root"),
);
```

```js
import { gql } from "@apollo/client";

client
  .query({
    query: gql`
      {
        posts {
          id
          text
          user {
            avatar
            username
          }
        }
      }
    `,
  })
  .then((result) => console.log(result));
```
