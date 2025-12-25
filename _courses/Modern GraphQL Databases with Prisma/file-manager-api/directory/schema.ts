import { createModule, gql } from "graphql-modules"
import { prismaClient } from "../prisma"
import * as directoryService from "./service"

export const directoryModule = createModule({
  //A unique ID for this module.
  id: "directory-module",
  // Passes the current file’s directory to GraphQL Modules.
  dirname: __dirname,
  typeDefs: [
    gql`
      type Directory implements FileNode {
        id: ID!
        name: String!
        parentId: ID
        createdAt: String!
        updatedAt: String!
        files: [File]!
        directories: [Directory]!
      }

      extend type Query {
        getAllDirectories: [Directory]!
      }

      type Mutation {
        createDirectory(name: String!, parentId: String!): Directory!
      }
    `,
  ],
  resolvers: {
    Query: {
      getAllDirectories: () => {
        return prismaClient().directory.findMany()
      },
    },
    Mutation: {
      createDirectory: async (
        _: unknown,
        { name, parentId }: { name: string; parentId: string },
      ) => {
        return await directoryService.createDirectory(
          prismaClient(),
          name,
          parentId,
        )
      },
    },
  },
})
