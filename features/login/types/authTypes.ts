export type UserRole = "admin" | "supervisor";

export interface User {
  id: string;
  name: string;
  role: UserRole;
  schoolId?: string;
}

export interface LoginCredentials {
  id: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
  firstTimeLogin?: boolean;
}

export interface ForgotPasswordRequest {
  phone: string;
}

export interface VerifyCodeRequest {
  phone: string;
  code: string;
}

export interface ResetPasswordRequest {
  phone: string;
  code: string;
  newPassword: string;
}

export interface SchoolInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
  type: string;
  logo?: string;
}

export interface OnboardingRequest {
  userId: string;
  school: SchoolInfo;
}

export interface AuthError {
  message: string;
  code?: string;
}

export interface ForgotPasswordResponse {
  success: boolean;
  message?: string;
}

export interface VerifyCodeResponse {
  success: boolean;
}

export interface ResetPasswordResponse {
  success: boolean;
}

export interface OnboardingResponse {
  success: boolean;
  school: SchoolInfo;
}
