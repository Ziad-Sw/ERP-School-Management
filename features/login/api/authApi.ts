import type {
  LoginCredentials,
  LoginResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  VerifyCodeRequest,
  VerifyCodeResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  OnboardingRequest,
  OnboardingResponse,
} from "../types/authTypes";

const API_BASE = "/api/auth";

async function postJson<T>(url: string, body: unknown): Promise<T> {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data as T;
}

export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
  return postJson<LoginResponse>(`${API_BASE}/login`, credentials);
}

export async function forgotPassword(
  request: ForgotPasswordRequest
): Promise<ForgotPasswordResponse> {
  return postJson<ForgotPasswordResponse>(`${API_BASE}/forgot-password`, request);
}

export async function verifyCode(
  request: VerifyCodeRequest
): Promise<VerifyCodeResponse> {
  return postJson<VerifyCodeResponse>(`${API_BASE}/verify-code`, request);
}

export async function resetPassword(
  request: ResetPasswordRequest
): Promise<ResetPasswordResponse> {
  return postJson<ResetPasswordResponse>(`${API_BASE}/reset-password`, request);
}

export async function completeOnboarding(
  request: OnboardingRequest
): Promise<OnboardingResponse> {
  return postJson<OnboardingResponse>(`${API_BASE}/onboarding`, request);
}
