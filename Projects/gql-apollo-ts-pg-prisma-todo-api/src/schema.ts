import { prisma } from "./prisma";

export const typeDefs = `#graphql
  type Task {
    id: Int!
    created: String!
    updated: String!
    title: String!
    isComplete: Boolean!
  }

  type Query {
    hello: String!
    tasks: [Task!]!
    task(id: Int!): Task
  }

  type Mutation {
    createTask(title: String!): Task!
    deleteTask(id: Int!): Boolean!
    updateTask(id: Int!, isComplete: Boolean!): Boolean
  }
`;

export const resolvers = {
  Query: {
    hello: () => "hello world",
    tasks: () => prisma.task.findMany(),
    task: (_parent: unknown, { id }: { id: number }) =>
      prisma.task.findUnique({ where: { id } }),
  },
  Mutation: {
    createTask: (_parent: unknown, { title }: { title: string }) =>
      prisma.task.create({ data: { title } }),
    deleteTask: async (_parent: unknown, { id }: { id: number }) => {
      try {
        await prisma.task.delete({ where: { id } });
        return true;
      } catch {
        return false;
      }
    },
    updateTask: async (
      _parent: unknown,
      { id, isComplete }: { id: number; isComplete: boolean },
    ) => {
      const task = await prisma.task.findUnique({ where: { id } });
      if (!task) {
        return null;
      }

      try {
        await prisma.task.update({ where: { id }, data: { isComplete } });
        return true;
      } catch {
        return false;
      }
    },
  },
};
