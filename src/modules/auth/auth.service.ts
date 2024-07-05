import { BadRequestException, Injectable } from '@nestjs/common';
import {
  LoginInput,
  LoginResponse,
  TokenPayload,
} from '@/modules/auth/dto/login';
import { UserService } from '@/modules/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from '@/modules/user/user';
import { JwtService } from '@nestjs/jwt';
import * as process from 'process';
import { PrismaService } from '@/prisma.service';

@Injectable()
export class AuthService {
  private saltRound = 10;

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async login(loginInput: LoginInput) {
    const user = await this.userService.findUnique({
      where: { email: loginInput.email },
    });

    if (
      user &&
      (await bcrypt.compare(loginInput.password, user.hashedPassword))
    ) {
      return await this.issueTokens(user);
    }

    throw new BadRequestException();
  }

  async generateRefreshToken(payload: TokenPayload) {
    // TODO migrate Redis

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.REFRESH_TOKEN_JWT_SECRET,
      expiresIn: '7d',
    });
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await this.prismaService.refreshToken.create({
      data: {
        userId: payload.userId,
        token: bcrypt.hash(refreshToken, this.saltRound),
        expiresAt,
      },
    });

    return refreshToken;
  }

  private async issueTokens(user: User): Promise<LoginResponse> {
    const payload: TokenPayload = { userId: user.id };

    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.generateRefreshToken(payload);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
