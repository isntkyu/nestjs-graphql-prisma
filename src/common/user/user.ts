import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field((type) => Int)
  id: number;

  @Field()
  // @IsEmail() cv
  email: string;

  @Field((type) => String, { nullable: true })
  name?: string | null;
}
