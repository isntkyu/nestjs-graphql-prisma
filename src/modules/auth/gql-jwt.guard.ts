import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserService } from '@/modules/user/user.service';

@Injectable()
export class GqlJwtGuard extends AuthGuard('jwt') {
  constructor(
    private jwtService: JwtService,
  ) {
    super();
  }

  async canAvtivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    const token = req.headers.authorization?.split('Bearer ')[1];
    if (!token) {
      throw new UnauthorizedException('Invalid Token');
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      req.user = payload;
      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
