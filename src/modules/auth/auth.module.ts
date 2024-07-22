import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { GqlJwtGuard } from '@/modules/auth/gql-jwt.guard';
import { UserModule } from '@/modules/user/user.module';
import { PrismaService } from '@/prisma.service';
import { AuthResolver } from '@/modules/auth/auth.resolver';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '2days' },
    }),
    UserModule,
  ],
  providers: [AuthService, GqlJwtGuard, PrismaService, AuthResolver],
})
export class AuthModule {}
