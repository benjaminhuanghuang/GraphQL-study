import { Context } from '../context'


export const Query = {
  allUsers: (_parent:any, _args:any, { prisma }:Context) => {
    return prisma.user.findMany();
  }
};