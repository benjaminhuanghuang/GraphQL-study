const express = require("express");
const graphqlHTTP = require("express-graphql");
const { buildSchema } = require('graphql');
const PORT = 4000;

// Construct a schema using GraphQL Schema Language
// Define a Query "hello", it returns String
// Define a data type
var schema = buildSchema(
  `
  type Query {
    getClassmates(classNo: Int!): [String]
    account(name: String): Account
  }

  type Account {
    name: String
    age: Int
  }
  `
)

// The root provides a resolver funciton for each query
var root = {
  getClassmates: ({classNo}) => {
    const obj ={
      1: ["a", "b", 'c'],
      2: ["a2", "b2", 'c2'],
    }
    return obj[classNo];
  },
  account: ({name}) =>{
    return {
      name: name,
      age: 11111
    }
  }
}

const app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));

app.listen(PORT, () => {
  console.log(`Express sever is running at port ${PORT}`);
});

/*
  Open http://localhost:4000/graphql
  
  // query
  {
    getClassmates(classNo:2)
    account(name:"asdfasdf") {
      name
      age
    }
  }

  // result
  {
    "data": {
      "getClassmates": [
        "a2",
        "b2",
        "c2"
      ],
      "account": {
        "name": "asdfasdf",
        "age": 11111
      }
    }
  }
*/