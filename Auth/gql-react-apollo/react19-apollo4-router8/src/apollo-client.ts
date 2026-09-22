import { ApolloClient, from, HttpLink, InMemoryCache } from "@apollo/client";
import { CombinedGraphQLErrors } from "@apollo/client/errors";
import { SetContextLink } from "@apollo/client/link/context";
import { ErrorLink } from "@apollo/client/link/error";
import { authStore } from "./authStore";

const httpLink = new HttpLink({ uri: import.meta.env.VITE_GRAPHQL_URL });

const authLink = new SetContextLink((prevContext) => {
  const token = authStore.getToken();
  return {
    headers: {
      ...prevContext.headers,
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
  };
});

const errorLink = new ErrorLink(({ error }) => {
  // No refresh-token flow in this study app: an auth error just
  // signs the user out so they can log in again.
  if (
    CombinedGraphQLErrors.is(error) &&
    error.errors.some((e) => e.extensions?.code === "UNAUTHENTICATED")
  ) {
    authStore.setToken(null);
  }
});

export const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});
