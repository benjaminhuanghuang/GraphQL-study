import { ApolloServer } from "@apollo/server";
import typeDefs from "./schema.js";
import resolvers from "./resolvers.js";
import { startStandaloneServer } from "@apollo/server/standalone";
import { models, db } from "./db/index";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4040 },
  context: async () => {
    const user = db.get("user").value();
    return { models, db, user };
  },
});
