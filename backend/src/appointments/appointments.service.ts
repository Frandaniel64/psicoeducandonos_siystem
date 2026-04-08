import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, In, Repository } from 'typeorm';
import {
  Appointment,
  AppointmentStatus,
  AppointmentType,
} from './entities/appointment.entity';
import { CreateAppointmentRequestDto } from './dto/create-appointment-request.dto';
import { UsersService } from '../users/users.service';
import { PatientsService } from '../patients/patients.service';

const SESSION_MS = 50 * 60 * 1000;

const BLOCKING_STATUSES: AppointmentStatus[] = [
  AppointmentStatus.PENDING_REVIEW,
  AppointmentStatus.PAYMENT_DELAYED,
  AppointmentStatus.CONFIRMED,
];

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentsRepository: Repository<Appointment>,
    private readonly usersService: UsersService,
    private readonly patientsService: PatientsService,
  ) {}

  private intervalsOverlap(aStart: Date, bStart: Date): boolean {
    const aEnd = new Date(aStart.getTime() + SESSION_MS);
    const bEnd = new Date(bStart.getTime() + SESSION_MS);
    return aStart < bEnd && bStart < aEnd;
  }

  async assertSlotOpen(therapistId: string, slotStart: Date): Promise<void> {
    const windowStart = new Date(slotStart.getTime() - SESSION_MS);
    const windowEnd = new Date(slotStart.getTime() + SESSION_MS);
    const candidates = await this.appointmentsRepository.find({
      where: {
        therapist: { id: therapistId },
        status: In(BLOCKING_STATUSES),
        scheduledAt: Between(windowStart, windowEnd),
      },
    });
    for (const c of candidates) {
      if (this.intervalsOverlap(slotStart, c.scheduledAt)) {
        throw new ConflictException('El horario ya no está disponible');
      }
    }
  }

  async requestAppointment(
    patientId: string,
    dto: CreateAppointmentRequestDto,
  ): Promise<Appointment> {
    const therapist = await this.usersService.findById(dto.therapistId);
    if (!therapist || !therapist.isActive) {
      throw new NotFoundException('Terapeuta no encontrado');
    }
    const patient = await this.patientsService.findById(patientId);
    if (!patient || !patient.isActive) {
      throw new NotFoundException('Paciente no encontrado');
    }
    const scheduledAt = new Date(dto.scheduledAt);
    if (Number.isNaN(scheduledAt.getTime())) {
      throw new ConflictException('Fecha u hora inválida');
    }
    await this.assertSlotOpen(dto.therapistId, scheduledAt);
    const row = this.appointmentsRepository.create({
      scheduledAt,
      type: dto.type ?? AppointmentType.ONLINE,
      status: AppointmentStatus.PENDING_REVIEW,
      therapist: { id: dto.therapistId },
      patient: { id: patientId },
    });
    const saved = await this.appointmentsRepository.save(row);
    return this.findByIdForActor(saved.id, { staffId: null, patientId });
  }

  async listForPatient(patientId: string): Promise<Appointment[]> {
    return this.appointmentsRepository.find({
      where: { patient: { id: patientId } },
      relations: ['therapist', 'patient'],
      order: { scheduledAt: 'ASC' },
    });
  }

  async listForTherapist(therapistId: string): Promise<Appointment[]> {
    return this.appointmentsRepository.find({
      where: { therapist: { id: therapistId } },
      relations: ['therapist', 'patient'],
      order: { scheduledAt: 'ASC' },
    });
  }

  async findByIdForActor(
    id: string,
    ctx: { staffId: string | null; patientId: string | null },
  ): Promise<Appointment> {
    const ap = await this.appointmentsRepository.findOne({
      where: { id },
      relations: ['therapist', 'patient'],
    });
    if (!ap) {
      throw new NotFoundException('Cita no encontrada');
    }
    if (ctx.patientId && ap.patient?.id !== ctx.patientId) {
      throw new ForbiddenException('No autorizado');
    }
    if (ctx.staffId && ap.therapist?.id !== ctx.staffId) {
      throw new ForbiddenException('No autorizado');
    }
    return ap;
  }

  async confirmByTherapist(
    appointmentId: string,
    therapistUserId: string,
    meetingLink: string,
  ): Promise<Appointment> {
    const ap = await this.findByIdForActor(appointmentId, {
      staffId: therapistUserId,
      patientId: null,
    });
    if (
      ap.status !== AppointmentStatus.PENDING_REVIEW &&
      ap.status !== AppointmentStatus.PAYMENT_DELAYED
    ) {
      throw new ConflictException('La cita no puede confirmarse en este estado');
    }
    ap.status = AppointmentStatus.CONFIRMED;
    ap.meetingLink = meetingLink;
    await this.appointmentsRepository.save(ap);
    return this.findByIdForActor(ap.id, {
      staffId: therapistUserId,
      patientId: null,
    });
  }

  async rejectByTherapist(
    appointmentId: string,
    therapistUserId: string,
  ): Promise<Appointment> {
    const ap = await this.findByIdForActor(appointmentId, {
      staffId: therapistUserId,
      patientId: null,
    });
    if (ap.status === AppointmentStatus.REJECTED) {
      throw new ConflictException('La cita ya fue rechazada');
    }
    if (ap.status === AppointmentStatus.CONFIRMED) {
      throw new ConflictException('No se puede rechazar una cita ya confirmada');
    }
    ap.status = AppointmentStatus.REJECTED;
    await this.appointmentsRepository.save(ap);
    return this.findByIdForActor(ap.id, {
      staffId: therapistUserId,
      patientId: null,
    });
  }

  async setPaymentReceiptByPatient(
    appointmentId: string,
    patientId: string,
    paymentReceiptUrl: string,
  ): Promise<Appointment> {
    const ap = await this.findByIdForActor(appointmentId, {
      staffId: null,
      patientId,
    });
    if (
      ap.status !== AppointmentStatus.PENDING_REVIEW &&
      ap.status !== AppointmentStatus.PAYMENT_DELAYED
    ) {
      throw new ConflictException(
        'Solo se puede adjuntar comprobante mientras la cita está en revisión o pago pendiente',
      );
    }
    ap.paymentReceiptUrl = paymentReceiptUrl;
    if (ap.status === AppointmentStatus.PENDING_REVIEW) {
      ap.status = AppointmentStatus.PAYMENT_DELAYED;
    }
    await this.appointmentsRepository.save(ap);
    return this.findByIdForActor(ap.id, { staffId: null, patientId });
  }
}
