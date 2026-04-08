import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-patient-shell',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './patient-shell.html',
  styleUrl: './patient-shell.css',
})
export class PatientShell {
  protected readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  logout(): void {
    this.auth.logout();
    void this.router.navigateByUrl('/');
  }
}
