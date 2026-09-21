const express = require("express");
const graphqlHTTP = require("express-graphql");
const { buildSchema } = require('graphql');
const PORT = 4000;

// Construct a schema using GraphQL Schema Language
// Define a Query "hello", it returns String
// Define a data type
var schema = buildSchema(
  `
  input AccountInput {
    name: String
    age: Int
  }

  type Mutation {
    createAccount(input: AccountInput): Account
    updateAccount(id: ID!, input AccountInput): Account
  }

  type Account {
    name: String
    age: Int
  }
  `
)

const fakeDb ={};

// The root provides a resolver funciton for each query
var root = {
  createAccount: ({input}) => {
    fakeDb[input.name] = input;
    return fakeDb[input.name]
  },
  updateAccount: ({id, input}) =>{
    const updatedAccount = Object.assign({}, fakeDb[id], input);
    fakeDb[id] = updatedAccount;
    return updatedAccount;
  }
}

const app = express();

const middleware = (req, res, next) =>{
  if(req.rul.index('/graphql') !== -1 && req.headers.cookie.index('auth') === -1){
    res.send(JSON.stringify({
      error:"Auth failed."
    }));
    return
  }
  next();
}
app.use(middleware);

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