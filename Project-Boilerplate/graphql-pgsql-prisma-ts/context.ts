import { prisma } from "./lib/prisma";
import { PrismaClient } from "./generated/prisma/client";

export interface Context {
  prisma: PrismaClient;
}

export const createContext = async (): Promise<Context> => {
  return { prisma };
};
