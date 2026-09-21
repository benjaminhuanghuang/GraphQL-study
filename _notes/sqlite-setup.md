# Setup Sqlite

## node:sqlite

2024.7.17 Node.js 22.5.0. support sqlite

异步 API

```ts
import { Database } from "node:sqlite";

const db = new Database("app.db");

const users = await db.prepare("SELECT * FROM users").all();
```

```ts
import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync("app.db");

const users = db.prepare("SELECT * FROM users").all();

console.log(users);
```

## better-sqlite3

同步 API

```ts
import Database from "better-sqlite3";

const db = new Database("app.db");

const users = db.prepare("SELECT * FROM users").all();
```

## sqlite3

异步 API, 老项目

```ts
import sqlite3 from "sqlite3";

const db = new sqlite3.Database("app.db");

db.all("SELECT * FROM users", (err, users) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(users);
});
```
