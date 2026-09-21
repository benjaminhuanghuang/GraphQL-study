import { authExchange } from "@urql/exchange-auth";
import { cacheExchange, createClient, fetchExchange } from "urql";
import { authStore } from "./authStore";

export const client = createClient({
  url: import.meta.env.VITE_GRAPHQL_URL,
  exchanges: [
    cacheExchange,
    authExchange(async (utils) => ({
      addAuthToOperation(operation) {
        const token = authStore.getToken();
        if (!token) return operation;
        return utils.appendHeaders(operation, {
          Authorization: `Bearer ${token}`,
        });
      },
      didAuthError(error) {
        return error.graphQLErrors.some(
          (e) => e.extensions?.code === "UNAUTHENTICATED",
        );
      },
      async refreshAuth() {
        // No refresh-token flow in this study app: an auth error just
        // signs the user out so they can log in again.
        authStore.setToken(null);
      },
    })),
    fetchExchange,
  ],
});
