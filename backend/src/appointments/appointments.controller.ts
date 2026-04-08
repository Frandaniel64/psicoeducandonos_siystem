import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserTypesGuard } from '../auth/guards/user-types.guard';
import { AllowedUserTypes } from '../auth/decorators/allowed-user-types.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { JwtUser } from '../auth/types/jwt-user';
import { CreateAppointmentRequestDto } from './dto/create-appointment-request.dto';
import { ConfirmAppointmentDto } from './dto/confirm-appointment.dto';
import { SetPaymentReceiptDto } from './dto/set-payment-receipt.dto';
import { Appointment } from './entities/appointment.entity';

function toAppointmentResponse(ap: Appointment) {
  return {
    id: ap.id,
    scheduledAt: ap.scheduledAt,
    status: ap.status,
    type: ap.type,
    meetingLink: ap.meetingLink,
    paymentReceiptUrl: ap.paymentReceiptUrl,
    createdAt: ap.createdAt,
    updatedAt: ap.updatedAt,
    therapist: ap.therapist
      ? {
          id: ap.therapist.id,
          email: ap.therapist.email,
          firstName: ap.therapist.firstName,
          lastName: ap.therapist.lastName,
        }
      : null,
    patient: ap.patient
      ? {
          id: ap.patient.id,
          email: ap.patient.email,
          firstName: ap.patient.firstName,
          lastName: ap.patient.lastName,
        }
      : null,
  };
}

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post('request')
  @UseGuards(JwtAuthGuard, UserTypesGuard)
  @AllowedUserTypes('PATIENT')
  async request(
    @CurrentUser() user: JwtUser,
    @Body() dto: CreateAppointmentRequestDto,
  ) {
    const ap = await this.appointmentsService.requestAppointment(user.id, dto);
    return toAppointmentResponse(ap);
  }

  @Get('me/patient')
  @UseGuards(JwtAuthGuard, UserTypesGuard)
  @AllowedUserTypes('PATIENT')
  async listMineAsPatient(@CurrentUser() user: JwtUser) {
    const rows = await this.appointmentsService.listForPatient(user.id);
    return rows.map(toAppointmentResponse);
  }

  @Get('me/therapist')
  @UseGuards(JwtAuthGuard, UserTypesGuard)
  @AllowedUserTypes('STAFF')
  async listMineAsTherapist(@CurrentUser() user: JwtUser) {
    const rows = await this.appointmentsService.listForTherapist(user.id);
    return rows.map(toAppointmentResponse);
  }

  @Patch(':id/confirm')
  @UseGuards(JwtAuthGuard, UserTypesGuard)
  @AllowedUserTypes('STAFF')
  async confirm(
    @CurrentUser() user: JwtUser,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: ConfirmAppointmentDto,
  ) {
    const ap = await this.appointmentsService.confirmByTherapist(
      id,
      user.id,
      dto.meetingLink,
    );
    return toAppointmentResponse(ap);
  }

  @Patch(':id/reject')
  @UseGuards(JwtAuthGuard, UserTypesGuard)
  @AllowedUserTypes('STAFF')
  async reject(
    @CurrentUser() user: JwtUser,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const ap = await this.appointmentsService.rejectByTherapist(id, user.id);
    return toAppointmentResponse(ap);
  }

  @Patch(':id/payment-receipt')
  @UseGuards(JwtAuthGuard, UserTypesGuard)
  @AllowedUserTypes('PATIENT')
  async paymentReceipt(
    @CurrentUser() user: JwtUser,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: SetPaymentReceiptDto,
  ) {
    const ap = await this.appointmentsService.setPaymentReceiptByPatient(
      id,
      user.id,
      dto.paymentReceiptUrl,
    );
    return toAppointmentResponse(ap);
  }
}
