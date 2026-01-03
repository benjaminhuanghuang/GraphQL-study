export default {
  link: (parent, args, context) => {
    return context.prisma.vote.findUnique({ where: { id: parent.id } }).link();
  },
  user: (parent, args, context) => {
    return context.prisma.vote.findUnique({ where: { id: parent.id } }).user();
  },
};
