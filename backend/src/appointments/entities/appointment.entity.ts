import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Patient } from '../../patients/entities/patient.entity';

export enum AppointmentStatus {
  PENDING_REVIEW = 'PENDING_REVIEW', // Slot bloqueado, bajo revisión
  PAYMENT_DELAYED = 'PAYMENT_DELAYED', // Esperando clearing bancario
  CONFIRMED = 'CONFIRMED', // Aprobada con link activo
  REJECTED = 'REJECTED', // Cancelada por terapeuta o pago inválido
}

export enum AppointmentType {
  ONLINE = 'ONLINE',
  IN_PERSON = 'IN_PERSON',
}

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Fecha y hora del inicio de la cita
  @Column({ type: 'timestamp with time zone' })
  scheduledAt: Date;

  @Column({ type: 'enum', enum: AppointmentStatus, default: AppointmentStatus.PENDING_REVIEW })
  status: AppointmentStatus;

  @Column({ type: 'enum', enum: AppointmentType, default: AppointmentType.ONLINE })
  type: AppointmentType;

  // Link de Meet / Zoom (se llena cuando CONFIRMED)
  @Column({ nullable: true })
  meetingLink: string;

  // ID del comprobante P2P en el Storage
  @Column({ nullable: true })
  paymentReceiptUrl: string;

  // Relaciones
  @ManyToOne(() => User)
  @JoinColumn({ name: 'therapist_id' })
  therapist: User;

  @ManyToOne(() => Patient)
  @JoinColumn({ name: 'patient_id' })
  patient: Patient;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
