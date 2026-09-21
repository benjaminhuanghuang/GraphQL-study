# Setup Node.js + TS API project

```sh

npm init -y



npm i apollo-server graphql

npm i -D typescript ts-node

npx tsc --init
"include": ["src"]

npm i -D nodemon
 "dev": "nodemon server.ts"
```

ts-node-dev is Live-reloading for .ts files (like nodemon)
