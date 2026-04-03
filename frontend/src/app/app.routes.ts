import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Blog } from './pages/blog/blog';
import { Servicios } from './pages/servicios/servicios';
import { Nosotros } from './pages/nosotros/nosotros';
import { LoginPatient } from './pages/auth/login-patient/login-patient';
import { RegisterPatient } from './pages/auth/register-patient/register-patient';
import { LoginStaff } from './pages/auth/login-staff/login-staff';
import { AgendarCita } from './pages/agendar-cita/agendar-cita';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'blog', component: Blog },
  { path: 'servicios', component: Servicios },
  { path: 'nosotros', component: Nosotros },
  { path: 'login', component: LoginPatient },
  { path: 'registro', component: RegisterPatient },
  { path: 'staff/login', component: LoginStaff },
  { path: 'agendar', component: AgendarCita }
];
