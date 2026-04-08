import { Component, computed, inject, signal } from '@angular/core';
import { AppointmentsService, type AppointmentDto } from '../../../core/api/appointments.service';

interface PatientRow {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  lastSeen: string;
}

@Component({
  selector: 'app-pacientes-therapist',
  imports: [],
  templateUrl: './pacientes-therapist.html',
  styleUrl: './pacientes-therapist.css',
})
export class PacientesTherapist {
  private readonly appointments = inject(AppointmentsService);

  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);
  protected readonly raw = signal<AppointmentDto[]>([]);

  protected readonly patients = computed(() => {
    const map = new Map<string, PatientRow>();
    for (const ap of this.raw()) {
      if (!ap.patient) continue;
      const id = ap.patient.id;
      const existing = map.get(id);
      const t = ap.scheduledAt;
      if (!existing || new Date(t) > new Date(existing.lastSeen)) {
        map.set(id, {
          id,
          firstName: ap.patient.firstName,
          lastName: ap.patient.lastName,
          email: ap.patient.email,
          lastSeen: t,
        });
      }
    }
    return [...map.values()].sort((a, b) => a.lastName.localeCompare(b.lastName));
  });

  constructor() {
    this.appointments.listMineAsTherapist().subscribe({
      next: (data) => {
        this.raw.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudo cargar la lista.');
        this.loading.set(false);
      },
    });
  }
}
