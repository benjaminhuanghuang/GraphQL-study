# Setup

```js
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";


const client = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:4444/" }),
  cache: new InMemoryCache(),
});


createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
      <App />
  </ApolloProvider>
```
