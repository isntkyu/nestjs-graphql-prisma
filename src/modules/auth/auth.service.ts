import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginInput } from '@/modules/auth/dto/login';
import { UserService } from '@/modules/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async login(loginInput: LoginInput) {
    const user = await this.userService.findUnique({
      where: { email: loginInput.email },
    });

    if (
      user &&
      (await bcrypt.compare(loginInput.password, user.hashedPassword))
    ) {
      // return issueTokens
    }

    throw new BadRequestException();
  }
}
