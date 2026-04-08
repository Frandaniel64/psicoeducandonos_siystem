import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './entities/patient.entity';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private patientsRepository: Repository<Patient>,
  ) {}

  async findByEmail(email: string): Promise<Patient | null> {
    // Select explícito del passwordHash porque está oculto por defecto
    return this.patientsRepository.findOne({ 
      where: { email }, 
      select: ['id', 'email', 'passwordHash', 'firstName', 'lastName', 'phone'] 
    });
  }

  async create(patientData: Partial<Patient>): Promise<Patient> {
    const newPatient = this.patientsRepository.create(patientData);
    return this.patientsRepository.save(newPatient);
  }

  async findById(id: string): Promise<Patient | null> {
    return this.patientsRepository.findOne({
      where: { id },
      select: ['id', 'email', 'firstName', 'lastName', 'phone', 'isActive', 'createdAt', 'updatedAt'],
    });
  }
}
