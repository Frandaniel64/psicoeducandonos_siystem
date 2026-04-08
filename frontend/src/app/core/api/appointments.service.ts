import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';

export interface AppointmentDto {
  id: string;
  scheduledAt: string;
  status: string;
  type: string;
  meetingLink: string | null;
  paymentReceiptUrl: string | null;
  therapist: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  } | null;
  patient: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  } | null;
}

@Injectable({ providedIn: 'root' })
export class AppointmentsService {
  private readonly http = inject(HttpClient);

  listMineAsPatient() {
    return this.http.get<AppointmentDto[]>(`${environment.apiUrl}/appointments/me/patient`);
  }

  listMineAsTherapist() {
    return this.http.get<AppointmentDto[]>(`${environment.apiUrl}/appointments/me/therapist`);
  }
}
