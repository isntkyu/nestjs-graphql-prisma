import { Module } from '@nestjs/common';
import { GqlJwtGuard } from './guards/gql-jwt.guard';
import { JwtModule } from '@nestjs/jwt';
import { PostResolver } from '../modules/post/post.resolver';
import { UserResolver } from '../modules/user/user.resolver';
import { PrismaService } from 'src/prisma.service';
import { UserService } from './services/user.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '2days' },
    }),
  ],
  providers: [GqlJwtGuard, UserService],
})
export class CommonModule {}
