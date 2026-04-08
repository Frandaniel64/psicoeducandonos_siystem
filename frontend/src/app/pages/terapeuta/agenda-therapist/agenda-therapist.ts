import { DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { AppointmentsService, type AppointmentDto } from '../../../core/api/appointments.service';

@Component({
  selector: 'app-agenda-therapist',
  imports: [DatePipe],
  templateUrl: './agenda-therapist.html',
  styleUrl: './agenda-therapist.css',
})
export class AgendaTherapist {
  private readonly appointments = inject(AppointmentsService);

  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);
  protected readonly rows = signal<AppointmentDto[]>([]);

  constructor() {
    this.appointments.listMineAsTherapist().subscribe({
      next: (data) => {
        const sorted = [...data].sort(
          (a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime(),
        );
        this.rows.set(sorted);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudo cargar la agenda.');
        this.loading.set(false);
      },
    });
  }
}
