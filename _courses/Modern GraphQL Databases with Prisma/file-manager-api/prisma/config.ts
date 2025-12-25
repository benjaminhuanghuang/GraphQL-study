import { PrismaClient } from "../generated/prisma"

export function prismaClient(): PrismaClient {
  const prisma = new PrismaClient({
    log: ["query", "info", "warn", "error"],
  })
  return prisma
}
