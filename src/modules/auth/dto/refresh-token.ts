import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class RefreshTokenInput {
  @Field()
  @IsNotEmpty()
  refreshToken: string;
}

@ObjectType()
export class RefreshTokenReponse {
  @Field()
  access_token: string;

  @Field()
  refresh_token: string;
}
