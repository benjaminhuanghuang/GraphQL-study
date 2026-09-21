import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { prisma } from "../prisma";
import { Task } from "../entities/Task";

@Resolver()
export class TaskResolver {
  @Query(() => String)
  hello(): string {
    return "hello world";
  }

  @Query(() => [Task])
  tasks(): Promise<Task[]> {
    return prisma.task.findMany();
  }

  @Query(() => Task, { nullable: true })
  task(
    @Arg("id", () => Int)
    id: number,
  ): Promise<Task | null> {
    return prisma.task.findUnique({ where: { id } });
  }

  @Mutation(() => Task)
  createTask(
    @Arg("title", () => String)
    title: string,
  ): Promise<Task> {
    return prisma.task.create({ data: { title } });
  }

  @Mutation(() => Boolean)
  deleteTask(
    @Arg("id", () => Int)
    id: number,
  ): Promise<boolean> {
    return prisma.task
      .delete({ where: { id } })
      .then(() => true)
      .catch(() => false);
  }

  @Mutation(() => Boolean, { nullable: true })
  updateTask(
    @Arg("id", () => Int)
    id: number,

    @Arg("isComplete", () => Boolean)
    isComplete: boolean,
  ): Promise<boolean | null> {
    return prisma.task.findUnique({ where: { id } }).then((task) => {
      if (!task) {
        return null;
      }

      return prisma.task
        .update({ where: { id }, data: { isComplete } })
        .then(() => true)
        .catch(() => false);
    });
  }
}
