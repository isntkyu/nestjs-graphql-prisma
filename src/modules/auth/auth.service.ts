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

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
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

  private async issueRefreshToken(payload: TokenPayload) {
    return await this.jwtService.signAsync(payload, {
      secret: process.env.REFRESH_TOKEN_JWT_SECRET,
      expiresIn: '7d',
    });
  }

  private async issueTokens(user: User): Promise<LoginResponse> {
    const payload: TokenPayload = { userId: user.id };

    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.issueRefreshToken(payload);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
