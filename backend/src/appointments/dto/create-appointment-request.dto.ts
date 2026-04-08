import { IsEnum, IsISO8601, IsUUID } from 'class-validator';
import { AppointmentType } from '../entities/appointment.entity';

export class CreateAppointmentRequestDto {
  @IsUUID()
  therapistId: string;

  @IsISO8601()
  scheduledAt: string;

  @IsEnum(AppointmentType)
  type: AppointmentType;
}
