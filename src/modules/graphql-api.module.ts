import { Module } from '@nestjs/common';
import { UserResolver } from './user/user.resolver';
import { PostResolver } from './post/post.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [UserResolver, PostResolver, PrismaService],
})
export class GraphqlApiModule {}
