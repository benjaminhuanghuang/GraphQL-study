import { ApolloServer, PubSub } from "@apollo/server";
import { PrismaClient } from "@prisma/client";
import Query from "./resolvers/Query.js";
import Mutation from "./resolvers/Mutation.js";
import Subscription from "./resolvers/Subscription.js";
import User from "./resolvers/User.js";
import Link from "./resolvers/Link.js";
import Vote from "./resolvers/Vote.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getUserId } from "./utils.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pubsub = new PubSub();

const prisma = new PrismaClient({
  errorFormat: "minimal",
});

const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Link,
  Vote,
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
  resolvers,
  context: ({ req }) => {
    return {
      ...req,
      prisma,
      pubsub,
      userId: req && req.headers.authorization ? getUserId(req) : null,
    };
  },
  subscriptions: {
    onConnect: (connectionParams) => {
      if (connectionParams.authToken) {
        return {
          prisma,
          userId: getUserId(null, connectionParams.authToken),
        };
      } else {
        return {
          prisma,
        };
      }
    },
  },
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
