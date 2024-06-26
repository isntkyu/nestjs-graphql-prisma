import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class GqlJwtGuard extends AuthGuard('jwt') {
  constructor(
    private readonly userService: UserService,
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
      const userData = await this.userService.findFirst({
        where: { id: { equals: payload.sub ?? '' } },
        include: { role: { include: { permissions: true } } },
      });
      req.user = userData;
      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
