import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export class Task {
  @Field(() => Int)
  id!: number;

  @Field(() => String)
  created!: Date;

  @Field(() => String)
  updated!: Date;

  @Field(() => String)
  title!: string;

  @Field(() => Boolean)
  isComplete!: boolean;
}
