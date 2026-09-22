import { z } from "zod";
import type { GraphQLContext } from "../context.js";
import {
  deleteTaskForUser,
  findTaskByIdForUser,
  findTasksByUserId,
  insertTask,
} from "../db/client.js";
import { badUserInput, requireAuth } from "./shared.js";

const taskInputSchema = z.object({
  title: z.string().trim().min(1).max(200),
  description: z.string().trim().max(2000).optional(),
});

const parseTaskInput = (args: unknown) => {
  const result = taskInputSchema.safeParse(args);
  if (!result.success) {
    throw badUserInput(z.prettifyError(result.error));
  }
  return result.data;
};

export const taskTypeDefs = /* GraphQL */ `
  type Task {
    id: ID!
    title: String!
    description: String
    createdAt: String!
  }

  extend type Query {
    tasks: [Task!]!
    task(id: ID!): Task
  }

  extend type Mutation {
    createTask(title: String!, description: String): Task!
    deleteTask(id: ID!): Boolean!
  }
`;

export const taskResolvers = {
  Query: {
    tasks: (_parent: unknown, _args: unknown, ctx: GraphQLContext) => {
      const auth = requireAuth(ctx);
      return findTasksByUserId(auth.sub);
    },
    task: (
      _parent: unknown,
      args: { id: string },
      ctx: GraphQLContext,
    ) => {
      const auth = requireAuth(ctx);
      return findTaskByIdForUser(Number(args.id), auth.sub);
    },
  },
  Mutation: {
    createTask: (
      _parent: unknown,
      args: { title: string; description?: string | null },
      ctx: GraphQLContext,
    ) => {
      const auth = requireAuth(ctx);
      const { title, description } = parseTaskInput(args);
      return insertTask(auth.sub, title, description ?? null);
    },
    deleteTask: (
      _parent: unknown,
      args: { id: string },
      ctx: GraphQLContext,
    ) => {
      const auth = requireAuth(ctx);
      return deleteTaskForUser(Number(args.id), auth.sub);
    },
  },
};
