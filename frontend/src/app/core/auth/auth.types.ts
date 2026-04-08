export type AuthUserType = 'PATIENT' | 'STAFF';

export interface PatientProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface StaffProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

export interface AuthSession {
  access_token: string;
  userType: AuthUserType;
  patient?: PatientProfile;
  user?: StaffProfile;
}

export interface PatientLoginResponse {
  access_token: string;
  patient: PatientProfile;
}

export interface StaffLoginResponse {
  access_token: string;
  user: StaffProfile;
}
