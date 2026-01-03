export default {
  postedBy: (parent, args, context) => {
    return context.prisma.link
      .findUnique({ where: { id: parent.id } })
      .postedBy();
  },
  votes: (parent, args, context) => {
    return context.prisma.link.findUnique({ where: { id: parent.id } }).votes();
  },
};
