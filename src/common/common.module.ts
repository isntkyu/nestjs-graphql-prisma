import { Module } from '@nestjs/common';
import { GqlJwtGuard } from './gql-jwt.guard';
import { JwtModule } from '@nestjs/jwt';
import { PostResolver } from './post/resolvers.post';
import { UserResolver } from './user/resolvers.user';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '2days' },
    }),
  ],
  providers: [GqlJwtGuard, UserResolver, PostResolver, PrismaService],
})
export class CommonModule {}
