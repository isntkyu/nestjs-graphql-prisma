import { Module } from '@nestjs/common';
import { GqlJwtGuard } from './guards/gql-jwt.guard';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [GqlJwtGuard, PrismaService],
})
export class CommonModule {}
