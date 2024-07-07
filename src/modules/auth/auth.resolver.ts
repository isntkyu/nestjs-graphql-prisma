import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from '@/modules/auth/auth.service';
import { LoginInput, LoginResponse } from '@/modules/auth/dto/login';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponse)
  async login(@Args('loginInput') loginInput: LoginInput) {
    return await this.authService.login(loginInput);
  }
}
