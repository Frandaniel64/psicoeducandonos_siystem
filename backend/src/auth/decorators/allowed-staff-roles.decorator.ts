import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../../users/entities/user.entity';

export const ALLOWED_STAFF_ROLES_KEY = 'allowedStaffRoles';

export const AllowedStaffRoles = (...roles: UserRole[]) =>
  SetMetadata(ALLOWED_STAFF_ROLES_KEY, roles);
