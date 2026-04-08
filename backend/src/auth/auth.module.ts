import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PatientsModule } from '../patients/patients.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UserTypesGuard } from './guards/user-types.guard';
import { StaffRolesGuard } from './guards/staff-roles.guard';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    PatientsModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '7d' },
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy, JwtAuthGuard, UserTypesGuard, StaffRolesGuard],
  controllers: [AuthController],
  exports: [
    AuthService,
    JwtModule,
    PassportModule,
    JwtStrategy,
    JwtAuthGuard,
    UserTypesGuard,
    StaffRolesGuard,
  ],
})
export class AuthModule {}
