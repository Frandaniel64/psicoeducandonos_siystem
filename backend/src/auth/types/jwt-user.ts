import { UserRole } from '../../users/entities/user.entity';

export type JwtUserType = 'STAFF' | 'PATIENT';

export interface JwtUser {
  id: string;
  email: string;
  userType: JwtUserType;
  role?: UserRole;
}
