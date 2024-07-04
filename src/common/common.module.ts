import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { GqlJwtGuard } from '@/modules/auth/gql-jwt.guard';

@Module({
  providers: [GqlJwtGuard, PrismaService],
})
export class CommonModule {}
