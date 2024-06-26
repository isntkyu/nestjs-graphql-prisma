import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Post } from '../post/post';

@ObjectType()
export class User {
  @Field((type) => Int)
  id: number;

  @Field()
  // @IsEmail() cv
  email: string;

  @Field((type) => String, { nullable: true })
  name?: string | null;

  @Field((type) => [Post], { nullable: true })
  posts?: [Post] | null;
}
