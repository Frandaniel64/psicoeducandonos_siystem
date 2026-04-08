import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ALLOWED_USER_TYPES_KEY } from '../decorators/allowed-user-types.decorator';
import { JwtUser, JwtUserType } from '../types/jwt-user';

@Injectable()
export class UserTypesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const allowed = this.reflector.getAllAndOverride<JwtUserType[]>(
      ALLOWED_USER_TYPES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!allowed?.length) {
      return true;
    }
    const user = context.switchToHttp().getRequest().user as JwtUser | undefined;
    if (!user || !allowed.includes(user.userType)) {
      throw new ForbiddenException('No autorizado para este recurso');
    }
    return true;
  }
}
