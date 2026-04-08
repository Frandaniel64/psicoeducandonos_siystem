import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-dashboard-patient',
  imports: [RouterLink],
  templateUrl: './dashboard-patient.html',
  styleUrl: './dashboard-patient.css',
})
export class DashboardPatient {
  protected readonly auth = inject(AuthService);
}
