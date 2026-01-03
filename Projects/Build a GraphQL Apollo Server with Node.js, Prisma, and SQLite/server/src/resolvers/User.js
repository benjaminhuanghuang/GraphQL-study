export default {
  links: (parent, args, context) => {
    return context.prisma.user.findUnique({ where: { id: parent.id } }).links();
  },
};
