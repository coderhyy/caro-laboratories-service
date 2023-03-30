import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject('AuthService') private readonly authService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const noAuth = this.reflector.get<boolean>('no-auth', context.getHandler());

    if (noAuth) return true;

    // 未授权
    try {
      const user = this.authService.testToken(request);
      request.user = user;
      return true;
    } catch (error) {
      throw new HttpException(
        {
          status: 401,
          error: '身份验证失败',
        },
        401,
      );
    }
  }
}
