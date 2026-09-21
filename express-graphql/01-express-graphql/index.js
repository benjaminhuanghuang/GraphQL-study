import express from "express";
import { graphqlHTTP }  from "express-graphql";
import { buildSchema } from "graphql";

const app = express();

// Schema
const schema = buildSchema(`
  type Query {
    hello: String
    friend: Friend
    getFriend(id:ID):Friend
  } 

  type Friend {
    id: ID
    name: String
    gender: Gender
  }
  enum Gender {
    MALE
    FEMALE
  }
  input FriendInput {
    id: ID
    name: String
    gender: Gender
  }

  type Mutation {
    createFriend(input: FriendInput): Friend
  }
`);
// resolver
const root = {
  hello: () => "Hi, GraphQL",
  friend: () => {
    return { id: 1111, ddd: "ben" };
  },
  createFriend: ({ input }) => {
    let id = require("crypto").randomBytes(10).toString("hex");
    friendDatabase[id] = input;
    return new Friend(id, input);
  },
  getFriend:({id})=>{
    return new Friend(id, friendDatabase[id])
  }
};

// database
const friendDatabase = {};

class Friend {
  constructor(id, { name, gender }) {
    this.id = id;
    this.name = name;
    this.gender = gender
  }
}

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true, // enable UI insterface
  })
);
app.listen(8964);

/* Test

query {
  hello
}

query {
	friend {
	  id
	}
}


*/
