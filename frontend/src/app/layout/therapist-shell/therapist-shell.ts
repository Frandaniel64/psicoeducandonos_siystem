import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-therapist-shell',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './therapist-shell.html',
  styleUrl: './therapist-shell.css',
})
export class TherapistShell {
  protected readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  logout(): void {
    this.auth.logout();
    void this.router.navigateByUrl('/');
  }
}
