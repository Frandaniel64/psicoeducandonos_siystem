import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

export const staffAuthGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (auth.isStaff()) return true;
  if (auth.isPatient()) return router.createUrlTree(['/paciente']);
  return router.createUrlTree(['/auth/staff/login']);
};
