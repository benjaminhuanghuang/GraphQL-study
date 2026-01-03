export function postedBy(parent, args, context) {
  return context.prisma.link
    .findUnique({ where: { id: parent.id } })
    .postedBy();
}

export function votes(parent, args, context) {
  return context.prisma.link.findUnique({ where: { id: parent.id } }).votes();
}
