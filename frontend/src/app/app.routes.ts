import { Routes } from '@angular/router';
import { patientAuthGuard } from './core/guards/patient-auth.guard';
import { staffAuthGuard } from './core/guards/staff-auth.guard';
import { PatientShell } from './layout/patient-shell/patient-shell';
import { TherapistShell } from './layout/therapist-shell/therapist-shell';
import { AgendarCita } from './pages/agendar-cita/agendar-cita';
import { LoginPatient } from './pages/auth/login-patient/login-patient';
import { LoginStaff } from './pages/auth/login-staff/login-staff';
import { RegisterPatient } from './pages/auth/register-patient/register-patient';
import { Blog } from './pages/blog/blog';
import { BlogArticle } from './pages/blog/blog-article/blog-article';
import { Home } from './pages/home/home';
import { BibliotecaPatient } from './pages/paciente/biblioteca-patient/biblioteca-patient';
import { CitasPatient } from './pages/paciente/citas-patient/citas-patient';
import { DashboardPatient } from './pages/paciente/dashboard-patient/dashboard-patient';
import { Nosotros } from './pages/nosotros/nosotros';
import { Servicios } from './pages/servicios/servicios';
import { AgendaTherapist } from './pages/terapeuta/agenda-therapist/agenda-therapist';
import { CmsEditor } from './pages/terapeuta/cms-editor/cms-editor';
import { DashboardTherapist } from './pages/terapeuta/dashboard-therapist/dashboard-therapist';
import { PacientesTherapist } from './pages/terapeuta/pacientes-therapist/pacientes-therapist';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'blog', component: Blog },
  { path: 'blog/:id', component: BlogArticle },
  { path: 'servicios', component: Servicios },
  { path: 'nosotros', component: Nosotros },
  { path: 'agendar', component: AgendarCita },

  { path: 'login', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'registro', redirectTo: 'auth/registro', pathMatch: 'full' },
  { path: 'staff/login', redirectTo: 'auth/staff/login', pathMatch: 'full' },
  {
    path: 'auth',
    children: [
      { path: 'login', component: LoginPatient },
      { path: 'registro', component: RegisterPatient },
      { path: 'staff/login', component: LoginStaff },
    ],
  },

  {
    path: 'paciente',
    component: PatientShell,
    canActivate: [patientAuthGuard],
    children: [
      { path: '', component: DashboardPatient },
      { path: 'citas', component: CitasPatient },
      { path: 'agendar', component: AgendarCita },
      { path: 'biblioteca', component: BibliotecaPatient },
    ],
  },

  {
    path: 'terapeuta',
    component: TherapistShell,
    canActivate: [staffAuthGuard],
    children: [
      { path: '', component: DashboardTherapist },
      { path: 'agenda', component: AgendaTherapist },
      { path: 'pacientes', component: PacientesTherapist },
      { path: 'cms', component: CmsEditor },
    ],
  },
];
