import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";

import bodyParser from "body-parser";

const app = express();
const port = 3333;
app.use(bodyParser.json());

const schema = buildSchema(`
    type TestData {
        text: String!
        views: Int!
    }

    type RootQuery {
        hello: TestData!
    }

    schema {
        query: RootQuery
    }
`);

const resolvers = {
  hello() {
    return {
      text: "Hello World!",
      views: 1024,
    };
  },
};

// Setup graphql endpoint
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true, // Enable GraphiQL interface
  })
);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/graphql`);
});

// Test: http://localhost:4000/graphql
