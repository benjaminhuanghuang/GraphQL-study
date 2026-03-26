import { userResolvers } from "./user.js";
import { postResolvers } from "./post.js";
import { chatResolvers } from "./chat.js";
import { messageResolvers } from "./message.js";
import { mergeResolvers } from "@graphql-tools/merge";

const resolvers = mergeResolvers([
  userResolvers,
  postResolvers,
  messageResolvers,
  chatResolvers,
]);

export default resolvers;
