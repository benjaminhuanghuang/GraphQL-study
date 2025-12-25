# Modern GraphQL Databases with Prisma

https://levelup.video/tutorials/modern-graphql-databases-with-prisma/getting-started

https://github.com/glassblowerscat/file-manager-api/

https://github.com/glassblowerscat/node-express-typescript-template

https://www.bilibili.com/video/BV1G34y1B7YP

## Table of Contents

1. Getting Started
2. Basic Prisma Schema
3. Scaffolding our API
4. Organizing our API into Modules
5. Creating the S3 Bucket Interface
6. Creating our Local "Bucket"
7. Creating Rows Using Prisma
8. Creating Rows with Relation Fields
9. Downloading Files from a GET Endpoint
10. Uploading Files to a PUT Endpoint
11. Getting by ID Using Prisma
12. Seeding Data
13. Creating a New File Version
14. Getting Relation Fields
15. Updates and Deletes, Part 1
16. Updates and Deletes, Part 2
17. Updates and Deletes, Part 3
18. Basic Search
19. Tracking "Ancestors" with a Prisma Array Type
20. Updating our API for Ancestors
21. Large DB Transactions
22. Prisma 'distinct'
23. Prisma Raw SQL Queries
24. Counting and Aggregating
25. Prisma Middleware
26. Updating our API for Soft Delete
27. Prisma JSON Type
28. Creating a Row with a JSON Column
29. Updating JSON Columns, Part 1
30. Updating JSON Columns, Part 2
31. Where To Go From Here

## Docker

```sh
docker run --name postgresql-container -p 5432:5432 -e POSTGRES_PASSWORD=dbPass -d postgres

docker ps -a

docker exec -it container-id bash

    psql -h localhost -p 5432 -U postgres -W

    CREATE DATABASE file_manager;

    \l
    \q

exit
```

## Setup

```sh
npm i graphql @graphql-tools/schema express-graphql

npm i -D

npx prisma init
npm i @prisma/client
```

## Schema and DB

```sh
npx prisma migrate dev --name model_scaffold

npx prisma studio
```

Create test data in prisma studio

## graphQL basic

```graphql
{
  getAllFileVersions {
    id
    name
    fileId
    mimeType
    size
    createdAt
    updatedAt
  }
}
```

## Organize api

```sh
npm uninstall @graphql-tools/schema

npm i graphql-modules
```

## S3 Interface

```sh
npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner --force

```

Create file-manager-api/bucket

## Create Director

/directory/service.ts

Add createDirectory to directory Mutation

```graphql
mutation {
  createDirectory(
    name: "New Dir"
    parentId: "78e34368-c660-4ee4-9c49-98fbcdedff32"
  )
  id
  name
  parentId
}
```

## Create File

Create /file/service.ts

Delete the existed data

```sh
npx prisma migrate dev --name file_version_key_property
```

## Download file
