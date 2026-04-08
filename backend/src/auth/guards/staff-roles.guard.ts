import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ALLOWED_STAFF_ROLES_KEY } from '../decorators/allowed-staff-roles.decorator';
import { JwtUser } from '../types/jwt-user';
import { UserRole } from '../../users/entities/user.entity';

@Injectable()
export class StaffRolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const allowedRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ALLOWED_STAFF_ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!allowedRoles?.length) {
      return true;
    }
    const user = context.switchToHttp().getRequest().user as JwtUser | undefined;
    if (!user || user.userType !== 'STAFF') {
      throw new ForbiddenException('Solo personal autorizado');
    }
    if (!user.role || !allowedRoles.includes(user.role)) {
      throw new ForbiddenException('Permisos insuficientes');
    }
    return true;
  }
}
