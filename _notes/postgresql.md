# DB url

```sh
    "postgres://localhost:5432"
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
