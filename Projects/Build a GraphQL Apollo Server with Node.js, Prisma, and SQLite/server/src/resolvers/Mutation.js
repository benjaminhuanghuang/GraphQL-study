import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { APP_SECRET } from "../utils";

export default {
  post: async (parent, args, context, info) => {
    const { userId } = context;

    let postedBy = undefined;
    if (userId) {
      postedBy = { connect: { id: userId } };
    }

    const newLink = await context.prisma.link.create({
      data: {
        url: args.url,
        description: args.description,
        postedBy,
      },
    });

    context.pubsub.publish("NEW_LINK", newLink);

    return newLink;
  },

  postAnonymous: async (parent, args, context, info) => {
    const newLink = await context.prisma.link.create({
      data: {
        url: args.url,
        description: args.description,
      },
    });

    context.pubsub.publish("NEW_LINK", newLink);

    return newLink;
  },

  signup: async (parent, args, context, info) => {
    const password = await bcrypt.hash(args.password, 10);
    const user = await context.prisma.user.create({
      data: { ...args, password },
    });

    const token = jwt.sign({ userId: user.id }, APP_SECRET);

    return {
      token,
      user,
    };
  },

  login: async (parent, args, context, info) => {
    const user = await context.prisma.user.findUnique({
      where: { email: args.email },
    });
    if (!user) {
      throw new Error("No such user found");
    }

    const valid = await bcrypt.compare(args.password, user.password);
    if (!valid) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign({ userId: user.id }, APP_SECRET);

    return {
      token,
      user,
    };
  },

  vote: async (parent, args, context, info) => {
    const { userId } = context;

    const vote = await context.prisma.vote.findUnique({
      where: {
        linkId_userId: {
          linkId: args.linkId,
          userId: userId,
        },
      },
    });

    if (Boolean(vote)) {
      throw new Error(`Already voted for link: ${args.linkId}`);
    }

    const newVote = context.prisma.vote.create({
      data: {
        user: { connect: { id: userId } },
        link: { connect: { id: args.linkId } },
      },
    });
    context.pubsub.publish("NEW_VOTE", newVote);

    return newVote;
  },
};
