import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { JwtUser } from '../types/jwt-user';
import { UsersService } from '../../users/users.service';
import { PatientsService } from '../../patients/patients.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly patientsService: PatientsService,
  ) {
    const secret = configService.get<string>('JWT_SECRET')?.trim();
    if (!secret) {
      throw new Error('JWT_SECRET no está configurado');
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload: {
    sub: string;
    email: string;
    userType: JwtUser['userType'];
    role?: JwtUser['role'];
  }): Promise<JwtUser> {
    if (payload.userType === 'STAFF') {
      const user = await this.usersService.findById(payload.sub);
      if (!user?.isActive) {
        throw new UnauthorizedException();
      }
      return {
        id: user.id,
        email: user.email,
        userType: 'STAFF',
        role: user.role,
      };
    }
    if (payload.userType === 'PATIENT') {
      const patient = await this.patientsService.findById(payload.sub);
      if (!patient?.isActive) {
        throw new UnauthorizedException();
      }
      return {
        id: patient.id,
        email: patient.email,
        userType: 'PATIENT',
      };
    }
    throw new UnauthorizedException();
  }
}
