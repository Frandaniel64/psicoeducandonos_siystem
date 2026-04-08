import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NewsletterService } from '../../core/api/newsletter.service';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  private readonly fb = inject(FormBuilder);
  private readonly newsletter = inject(NewsletterService);

  protected readonly isSubmitting = signal(false);
  protected readonly submitState = signal<'idle' | 'success' | 'error'>('idle');
  protected readonly feedbackMessage = signal('');

  protected readonly newsletterForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
  });

  protected submitNewsletter(): void {
    if (this.newsletterForm.invalid) {
      this.newsletterForm.markAllAsTouched();
      this.submitState.set('error');
      this.feedbackMessage.set('Ingresa un correo valido para suscribirte.');
      return;
    }

    const { email } = this.newsletterForm.getRawValue();
    this.isSubmitting.set(true);
    this.submitState.set('idle');
    this.feedbackMessage.set('');

    this.newsletter.subscribe(email).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.submitState.set('success');
        this.feedbackMessage.set('Gracias por suscribirte. Te escribiremos pronto.');
        this.newsletterForm.reset();
      },
      error: () => {
        this.isSubmitting.set(false);
        this.submitState.set('error');
        this.feedbackMessage.set('No pudimos procesar tu suscripcion. Intenta nuevamente.');
      },
    });
  }

  protected hasEmailError(): boolean {
    const emailControl = this.newsletterForm.controls.email;
    return emailControl.invalid && (emailControl.dirty || emailControl.touched);
  }
}
