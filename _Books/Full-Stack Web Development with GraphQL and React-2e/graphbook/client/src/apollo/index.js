import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { ErrorLink } from "@apollo/client/link/error";

const graphqlUri =
  import.meta.env.VITE_GRAPHQL_ENDPOINT ?? "http://localhost:4000/graphql";

const errorLink = new ErrorLink(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error("[GraphQL error]", { message, locations, path });
    });
  }

  if (networkError) {
    console.error("[Network error]", networkError);
  }
});

const httpLink = new HttpLink({
  uri: graphqlUri,
});

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;
