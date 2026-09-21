const express = require("express");
const graphqlHTTP = require("express-graphql");
const { buildSchema } = require('graphql');
const PORT = 4000;

// Define a data type
const schema = buildSchema(`
  input AccountInput {
    name: String
    age: Int
  }
  type Account {
    name: String
    age: Int
  }
  type Mutation {
    createAccount(input: AccountInput): Account
    updateAccount(id: ID!, input: AccountInput): Account
  }
  type Query {
    accounts: [Account]
  }
`)

const fakeDb ={};

// The root provides a resolver funciton for each query
const root = {
  accounts: ()=> {
    var arr =[]
    for(const key in fakeDb)
    { 
      arr.push(fakeDb[key])
    }
    return arr;
  },

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
  
  mutation
  {
    createAccount(input:{
      name: "Alen"
      age: 12
    }){
      name
      age
    }
  }

  query{
    accounts{
      name
    }
  }
*/