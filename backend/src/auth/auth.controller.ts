import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterPatientDto } from './dto/register-patient.dto';

@UseGuards(ThrottlerGuard)
@Throttle({ default: { limit: 20, ttl: 60000 } })
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('staff/login')
  loginStaff(@Body() loginDto: LoginDto) {
    return this.authService.loginStaff(loginDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('patient/login')
  loginPatient(@Body() loginDto: LoginDto) {
    return this.authService.loginPatient(loginDto);
  }

  @Post('patient/register')
  registerPatient(@Body() registerDto: RegisterPatientDto) {
    return this.authService.registerPatient(registerDto);
  }
}
