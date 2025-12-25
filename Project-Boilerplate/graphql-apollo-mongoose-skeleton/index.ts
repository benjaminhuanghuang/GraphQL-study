import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import mongoose from "mongoose";

import schema from "./graghql/schema";
import resolvers  from "./graghql/resolvers";

// Connects to db and starts the app on port 4000
mongoose
  .connect("mongodb://localhost:27018/nodejs-study")
  .then(() => {
    app.listen(4000, () => {
      console.log("🚀 Server is running on http://localhost:4000");
    });
  })
  .catch((error) => console.log(error));

// server setup
const server = new ApolloServer({
  typeDefs: schema
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`Server ready at: ${url}`);
