# Setup Apollo

## Server side

```sh

npm init -y

npm i apollo-server graphql

npm i -D typescript ts-node

npx tsc --init
"include": ["src"]

npm i -D nodemon
 "dev": "nodemon server.ts"
```

## Client side

```sh
  npm i graphql @apollo/client
```

index.js

```js
  import {ApolloClient, ApolloProvider, InmemoryCache} from '@apollo/client'

  const client = new ApolloClient({
    uri: URL,
    cache: new InmemoryCache()
  })

  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
```
