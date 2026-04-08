import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import type {
  AuthSession,
  AuthUserType,
  PatientLoginResponse,
  StaffLoginResponse,
} from './auth.types';

const STORAGE_KEY = 'psico_session';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);

  private readonly sessionSignal = signal<AuthSession | null>(this.readFromStorage());

  readonly session = this.sessionSignal.asReadonly();
  readonly token = computed(() => this.sessionSignal()?.access_token ?? null);
  readonly userType = computed(() => this.sessionSignal()?.userType ?? null);
  readonly patient = computed(() => this.sessionSignal()?.patient);
  readonly staffUser = computed(() => this.sessionSignal()?.user);

  isPatient(): boolean {
    return this.userType() === 'PATIENT' && !!this.token();
  }

  isStaff(): boolean {
    return this.userType() === 'STAFF' && !!this.token();
  }

  loginPatient(body: { email: string; password: string }): Observable<PatientLoginResponse> {
    return this.http
      .post<PatientLoginResponse>(`${environment.apiUrl}/auth/patient/login`, body)
      .pipe(
        tap((res) =>
          this.persist({
            access_token: res.access_token,
            userType: 'PATIENT',
            patient: res.patient,
          }),
        ),
      );
  }

  loginStaff(body: { email: string; password: string }): Observable<StaffLoginResponse> {
    return this.http
      .post<StaffLoginResponse>(`${environment.apiUrl}/auth/staff/login`, body)
      .pipe(
        tap((res) =>
          this.persist({
            access_token: res.access_token,
            userType: 'STAFF',
            user: res.user,
          }),
        ),
      );
  }

  registerPatient(body: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone?: string;
  }): Observable<PatientLoginResponse> {
    return this.http
      .post<PatientLoginResponse>(`${environment.apiUrl}/auth/patient/register`, body)
      .pipe(
        tap((res) =>
          this.persist({
            access_token: res.access_token,
            userType: 'PATIENT',
            patient: res.patient,
          }),
        ),
      );
  }

  logout(): void {
    sessionStorage.removeItem(STORAGE_KEY);
    this.sessionSignal.set(null);
  }

  private persist(session: AuthSession): void {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    this.sessionSignal.set(session);
  }

  private readFromStorage(): AuthSession | null {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw) as AuthSession;
      if (!parsed?.access_token || !parsed?.userType) return null;
      return parsed;
    } catch {
      return null;
    }
  }
}
