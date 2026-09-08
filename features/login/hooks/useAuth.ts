import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  login,
  forgotPassword,
  verifyCode,
  resetPassword,
  completeOnboarding,
} from "../api/authApi";
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
import { useAuthStore } from "../store/authStore";

export function useAuth() {
  const { user, token, isHydrated } = useAuthStore();

  return useQuery({
    queryKey: ["auth", token, user?.id],
    queryFn: () => ({ user, token }),
    enabled: isHydrated,
    staleTime: Infinity,
  });
}

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation<LoginResponse, Error, LoginCredentials>({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });
}

export function useForgotPassword() {
  return useMutation<ForgotPasswordResponse, Error, ForgotPasswordRequest>({
    mutationFn: forgotPassword,
  });
}

export function useVerifyCode() {
  return useMutation<VerifyCodeResponse, Error, VerifyCodeRequest>({
    mutationFn: verifyCode,
  });
}

export function useResetPassword() {
  return useMutation<ResetPasswordResponse, Error, ResetPasswordRequest>({
    mutationFn: resetPassword,
  });
}

export function useOnboarding() {
  return useMutation<OnboardingResponse, Error, OnboardingRequest>({
    mutationFn: completeOnboarding,
  });
}
