import { mergeTypeDefs } from "@graphql-tools/merge";

import userTypeDefs from "./user.graphql";
import postTypeDefs from "./post.graphql";
import messageTypeDefs from "/message.graphql";
import chatTypeDefs from "./chat.graphql";

const typeDefs = mergeTypeDefs([
  userTypeDefs,
  postTypeDefs,
  messageTypeDefs,
  chatTypeDefs,
]);

export default typeDefs;
