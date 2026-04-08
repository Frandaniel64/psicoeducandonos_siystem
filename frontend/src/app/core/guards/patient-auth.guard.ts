import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

export const patientAuthGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (auth.isPatient()) return true;
  if (auth.isStaff()) return router.createUrlTree(['/terapeuta']);
  return router.createUrlTree(['/auth/login']);
};
