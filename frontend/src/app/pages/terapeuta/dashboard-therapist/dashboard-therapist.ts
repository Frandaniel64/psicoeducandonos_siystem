import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppointmentsService, type AppointmentDto } from '../../../core/api/appointments.service';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-dashboard-therapist',
  imports: [RouterLink],
  templateUrl: './dashboard-therapist.html',
  styleUrl: './dashboard-therapist.css',
})
export class DashboardTherapist {
  protected readonly auth = inject(AuthService);
  private readonly appointments = inject(AppointmentsService);

  protected readonly loading = signal(true);
  protected readonly rows = signal<AppointmentDto[]>([]);

  constructor() {
    this.appointments.listMineAsTherapist().subscribe({
      next: (data) => {
        this.rows.set(data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  protected pendingCount(): number {
    return this.rows().filter((a) => a.status === 'PENDING_REVIEW').length;
  }
}
