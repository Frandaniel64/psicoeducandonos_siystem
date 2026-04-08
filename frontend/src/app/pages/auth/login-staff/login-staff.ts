import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { readApiError } from '../../../core/auth/api-error';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-login-staff',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login-staff.html',
  styleUrl: './login-staff.css',
})
export class LoginStaff {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  readonly error = signal<string | null>(null);
  readonly loading = signal(false);

  submit(): void {
    if (this.form.invalid) return;
    this.error.set(null);
    this.loading.set(true);
    this.auth.loginStaff(this.form.getRawValue()).subscribe({
      next: () => void this.router.navigateByUrl('/terapeuta'),
      error: (err) => {
        this.error.set(readApiError(err));
        this.loading.set(false);
      },
    });
  }
}
