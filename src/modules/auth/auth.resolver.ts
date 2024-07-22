import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from '@/modules/auth/auth.service';
import { LoginInput, LoginResponse } from '@/modules/auth/dto/login';
import { RefreshTokenInput, RefreshTokenReponse } from './dto/refresh-token';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponse)
  async login(@Args('loginInput') loginInput: LoginInput) {
    return await this.authService.login(loginInput);
  }

  @Mutation(() => RefreshTokenReponse)
  async refreshToken(
    @Args('refreshTokenInput') refreshTokenInput: RefreshTokenInput,
  ) {
    return await this.authService.refreshToken(refreshTokenInput);
  }
}
