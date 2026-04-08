import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { PatientsService } from '../patients/patients.service';
import { LoginDto } from './dto/login.dto';
import { RegisterPatientDto } from './dto/register-patient.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private patientsService: PatientsService,
    private jwtService: JwtService,
  ) {}

  async loginStaff(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = { sub: user.id, email: user.email, userType: 'STAFF', role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      }
    };
  }

  async loginPatient(loginDto: LoginDto) {
    const patient = await this.patientsService.findByEmail(loginDto.email);
    if (!patient) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, patient.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = { sub: patient.id, email: patient.email, userType: 'PATIENT' };
    return {
      access_token: this.jwtService.sign(payload),
      patient: {
        id: patient.id,
        email: patient.email,
        firstName: patient.firstName,
        lastName: patient.lastName,
      }
    };
  }

  async registerPatient(registerDto: RegisterPatientDto) {
    // Check if email is available
    const existingPatient = await this.patientsService.findByEmail(registerDto.email);
    if (existingPatient) {
      throw new BadRequestException('El correo ya está en uso por otro paciente');
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(registerDto.password, salt);

    // Create the patient
    const newPatient = await this.patientsService.create({
      firstName: registerDto.firstName,
      lastName: registerDto.lastName,
      email: registerDto.email,
      phone: registerDto.phone,
      passwordHash,
    });

    // Auto-login the patient
    const payload = { sub: newPatient.id, email: newPatient.email, userType: 'PATIENT' };
    return {
      access_token: this.jwtService.sign(payload),
      patient: {
        id: newPatient.id,
        email: newPatient.email,
        firstName: newPatient.firstName,
        lastName: newPatient.lastName,
      }
    };
  }
}
