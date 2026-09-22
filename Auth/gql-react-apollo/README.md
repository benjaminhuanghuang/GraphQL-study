# GraphQL Auth Study (Apollo)

## Stack

### Backend

- TS 7
- Apollo Server 5 (`@apollo/server/standalone`, no Express)
- node:sqlite (no ORM — plain SQL via `node:sqlite`'s `DatabaseSync`)

### Frontend

- TS 6
- React 19
- React Router 8 (`createBrowserRouter`/`RouterProvider`, `/login` vs. protected `/task-list`)
- Tailwind CSS 4
- Apollo Client 4 (`@apollo/client/react` hooks, `ErrorLink`/`SetContextLink` for auth)

## How auth works here

1. `signup`/`login` mutations hash/verify the password (`bcryptjs`) and return a JWT (`jsonwebtoken`) signed with `JWT_SECRET` — identical logic to the urql version, the `src/schema/` and `src/auth.ts`/`src/db/client.ts` files were copied over unchanged (they don't depend on the GraphQL server framework).
2. The client stores the token (`localStorage`, via `src/authStore.ts`) and an Apollo `SetContextLink` (`react-apollo-router/src/apollo-client.ts`) attaches it as `Authorization: Bearer <token>` to every request.
3. The server's `context()` (`apollo-sqlite/src/context.ts`) verifies the token per request and puts the decoded payload on `ctx.user`. Unlike Yoga (which hands the context function a Fetch API `Request`), `startStandaloneServer` hands it Node's raw `req`/`res`, so the header is read via `req.headers.authorization` instead of `request.headers.get(...)`.
4. Resolvers that need auth read `ctx.user`; `Query.me` returns `null` when there's no valid token.
5. An Apollo `ErrorLink` inspects every response for a `CombinedGraphQLErrors` with `extensions.code === "UNAUTHENTICATED"` and clears the stored token (no refresh-token flow in this study app — it just signs the user out).
6. Routing (`react-apollo-router/src/router.tsx`) reacts to the same token state: `/login` redirects to `/task-list` once signed in, and protected routes redirect to `/login` when signed out.

## What's different from the urql version

- **Server transport**: `@apollo/server/standalone` instead of `graphql-yoga` + `node:http`. Apollo's standalone server bundles its own permissive CORS (`cors()` with no options — reflects any origin), so unlike the Yoga backend there's no explicit `cors` config here; it isn't needed since we're not sending cookies (just a manually-attached `Authorization` header, which CORS credentials mode doesn't govern).
- **Client data layer**: Apollo Client 4 instead of urql. Apollo Client 4 is a from-scratch RxJS-based rewrite — the old `setContext`/`onError` link helpers are deprecated in favor of `SetContextLink`/`ErrorLink` classes, which is what this project uses.
- **Mutation error handling**: urql returns `{ error }` on the result object; Apollo's mutate function _rejects_ the promise on a GraphQL error by default, so components use `try/catch` instead of checking `result.error`.
- **Ports**: backend on `4001` (not `4000`) and both projects use their own `.env`, so this project can run side by side with the urql one without colliding.

## Run it

```sh
# backend
cd apollo-sqlite
npm install
npm run dev             # http://localhost:4001/ — creates data/auth.db on first run

# frontend (separate terminal)
cd react-apollo-router
npm install
npm run dev             # http://localhost:5173
```

## Notes / things intentionally left out

- No refresh tokens — the JWT is a 7-day token; there's no rotation.
- No rate limiting on login/signup — don't reuse this auth code as-is in production.
- No password reset flow.
