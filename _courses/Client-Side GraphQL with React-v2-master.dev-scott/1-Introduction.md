# Introduction

## Turso

<https://docs.turso.tech/introduction>

Create a .env file on the root

```evn
TURSO_CONNECTION_URL="your turso db url"
TURSO_AUTH_TOKEN="your db token"
```

Create token for Turso db

```sh
turso db tokens create <db>
```

Push db

```json
"db:push": "drizzle-kit push --config ./drizzle.config.ts"
```
