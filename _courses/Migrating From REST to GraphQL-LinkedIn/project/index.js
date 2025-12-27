import express from "express";
import { graphqlHTTP } from "express-graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";
import typeDefs from "./src/graphql/types.js";
import resolvers from "./src/graphql/resolvers.js";
import mongoose from "mongoose";

const app = express();
const port = 3333;
const schema = makeExecutableSchema({ typeDefs, resolvers });

// serving static files
app.use(express.static("public"));

// Setup graphql endpoint
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true, // Enable GraphiQL interface
  })
);

mongoose
  .connect("mongodb://localhost:27017/rest-to-graphql")
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}/graphql`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

// Test: http://localhost:3333/graphql
