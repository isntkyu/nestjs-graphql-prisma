import { Injectable } from '@nestjs/common';
import { BaseCrudService } from './base.service';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService extends BaseCrudService<
  User,
  Prisma.UserFindFirstArgs,
  Prisma.UserFindUniqueArgs,
  Prisma.UserFindManyArgs,
  Prisma.UserGroupByArgs,
  Prisma.UserAggregateArgs,
  Prisma.UserCreateArgs,
  Prisma.UserCreateManyArgs,
  Prisma.UserUpdateArgs,
  Prisma.UserUpdateManyArgs,
  Prisma.UserDeleteArgs,
  Prisma.UserDeleteManyArgs
> {
  private saltRound = 10;
  constructor(prisma: PrismaService, private readonly jwtService: JwtService) {
    super(prisma);
  }

  // async login(args: LoginArgs) {}
}
