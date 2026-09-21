# GraphQL Auth Study

Minimal username/password auth flow to study how JWT auth works end-to-end in GraphQL: server-side context/resolvers and client-side token handling with urql.

## Stack

### Backend

- TS
- GraphQL Yoga (plain `node:http`, no Express)
- node:sqlite (no ORM — plain SQL via`node:sqlite`'s `DatabaseSync`)

### Frontend

- React 19
- Router 8
- urql (`authExchange` for attaching/expiring the JWT)

## How auth works here

1. `signup`/`login` mutations hash/verify the password (`bcryptjs`) and return a JWT (`jsonwebtoken`) signed with `JWT_SECRET`.
2. The client stores the token (`localStorage`, via `src/authStore.ts`) and urql's `authExchange` attaches it as `Authorization: Bearer <token>` to every request.
3. The server's `context()` (`gql-youga-sqlite-drizzle/src/context.ts`) verifies the token per request and puts the decoded payload on `ctx.user`.
4. Resolvers that need auth read `ctx.user`; `Query.me` returns `null` when there's no valid token.
5. If a request comes back with a GraphQL error whose `extensions.code` is `UNAUTHENTICATED`, urql's `didAuthError` fires and `refreshAuth` clears the stored token (there's no refresh-token flow in this study app — it just signs the user out).

## Run it

```sh
# backend
npm run dev             # http://localhost:4000/graphql — creates data/auth.db on first run

# frontend (separate terminal)
npm run dev             # http://localhost:5173
```

## Notes / things intentionally left out

- No refresh tokens — the JWT is a 7-day token; there's no rotation.
- No rate limiting on login/signup — don't reuse this auth code as-is in production.
- No password reset flow.
