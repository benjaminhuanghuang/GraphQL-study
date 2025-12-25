


## Setup TypeScript for node.js
```
  npm i -D typescript @types/node
```

create typescript config
```
  npx tsconfig.json
```

Add script
```
  "watch": "tsc -w",  
  "dev":"nodemon dist/index.js "
```
watch: compiles typescript to js
dev: Run the js


## Setup express
```
  npm i express 
  npm i -D @types/express
```


## Setup Apollo and TypeGraphQL
```
  npm i apollo-server-express graphql type-graphql
  npm i reflect-metadata
```

## Connect to PostgSQL
```
  npm i typeorm pg
```