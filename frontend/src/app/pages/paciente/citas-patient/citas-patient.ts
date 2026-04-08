import { DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppointmentsService, type AppointmentDto } from '../../../core/api/appointments.service';

@Component({
  selector: 'app-citas-patient',
  imports: [DatePipe, RouterLink],
  templateUrl: './citas-patient.html',
  styleUrl: './citas-patient.css',
})
export class CitasPatient {
  private readonly appointments = inject(AppointmentsService);

  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);
  protected readonly rows = signal<AppointmentDto[]>([]);

  constructor() {
    this.appointments.listMineAsPatient().subscribe({
      next: (data) => {
        this.rows.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No pudimos cargar tus citas. Intenta de nuevo en unos minutos.');
        this.loading.set(false);
      },
    });
  }
}
