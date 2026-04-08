import { SetMetadata } from '@nestjs/common';
import { JwtUserType } from '../types/jwt-user';

export const ALLOWED_USER_TYPES_KEY = 'allowedUserTypes';

export const AllowedUserTypes = (...userTypes: JwtUserType[]) =>
  SetMetadata(ALLOWED_USER_TYPES_KEY, userTypes);
