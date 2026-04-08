import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { readApiError } from '../../../core/auth/api-error';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-register-patient',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register-patient.html',
  styleUrl: './register-patient.css',
})
export class RegisterPatient {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  readonly form = this.fb.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    phone: [''],
    terms: [false, Validators.requiredTrue],
  });

  readonly error = signal<string | null>(null);
  readonly loading = signal(false);

  submit(): void {
    if (this.form.invalid) return;
    this.error.set(null);
    this.loading.set(true);
    const v = this.form.getRawValue();
    this.auth
      .registerPatient({
        firstName: v.firstName,
        lastName: v.lastName,
        email: v.email,
        password: v.password,
        phone: v.phone || undefined,
      })
      .subscribe({
        next: () => void this.router.navigateByUrl('/paciente'),
        error: (err) => {
          this.error.set(readApiError(err));
          this.loading.set(false);
        },
      });
  }
}
