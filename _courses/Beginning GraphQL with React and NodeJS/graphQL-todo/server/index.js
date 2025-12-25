import express from "express";
import { graphqlHTTP } from "express-graphql";
import connectDB from "./db.js";
import schema from "./schema.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

connectDB();
const app = express();
app.use(cors());

// register a middleware function for handling GraphQL requests.
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    // whether to use the GraphiQL tool for handling requests
    graphiql: process.env.NODE_ENV === "development",
  })
);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`server running on port ${port}`));
