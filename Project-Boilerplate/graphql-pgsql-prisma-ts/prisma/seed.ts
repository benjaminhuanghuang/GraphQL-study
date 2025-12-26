// prisma/seed.ts

import { tasks } from "../data/tasks";
import { prisma } from "../lib/prisma";

async function main() {
  await prisma.user.create({
    data: {
      email: `testemail@gmail.com`,
      name: "John Doe",
    },
  });

  await prisma.task.createMany({
    data: tasks,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
