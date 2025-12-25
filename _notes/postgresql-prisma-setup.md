# PostgreSQL + Prisma setup

https://www.prisma.io/docs/getting-started/prisma-orm/quickstart/postgresql

```sh
npm i -D prisma @types/node @types/pg
npm i @prisma/client @prisma/adapter-pg pg dotenv
```

## DB url

```sh
# local docker
DATABASE_URL="postgresql://notesverb:notesverb123@localhost:5432/study"

# Online

```

## psal commands

```sh
    psql
    > \l                      # list all database
    > \c dbname               # connect database
    > create database pgs_test;     # create database, ; is required


```

## Setup DB

```sh
    $ psql <YOUR_DATABASE_NAME> < database/pg-data.sql
```
