import { http, HttpResponse } from "msw";
import type {
  LoginCredentials,
  LoginResponse,
  ForgotPasswordRequest,
  VerifyCodeRequest,
  ResetPasswordRequest,
  OnboardingRequest,
} from "../features/login/types/authTypes";

const DEMO_CREDENTIALS = { id: "admin", password: "demo1234" };
const DEMO_PHONE = "01234567890";
const DEMO_CODE = "123456";

function delay(ms = 400) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const handlers = [
  http.post("/api/auth/login", async ({ request }) => {
    await delay();
    const body = (await request.json()) as LoginCredentials;

    const isDemo =
      body.id === DEMO_CREDENTIALS.id && body.password === DEMO_CREDENTIALS.password;
    const isFirstTime = body.id === "admin" && isDemo;

    if (!isDemo && body.password !== "password") {
      return HttpResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const response: LoginResponse = {
      token: "mock-jwt-token-" + Date.now(),
      user: {
        id: body.id,
        name: isDemo ? "المدير العام" : "مستخدم النظام",
        role: isDemo ? "admin" : "supervisor",
        schoolId: isFirstTime ? undefined : "school-001",
      },
      firstTimeLogin: isFirstTime,
    };

    return HttpResponse.json(response);
  }),

  http.post("/api/auth/forgot-password", async ({ request }) => {
    await delay();
    const body = (await request.json()) as ForgotPasswordRequest;

    if (body.phone !== DEMO_PHONE) {
      return HttpResponse.json(
        { message: "Phone number not found" },
        { status: 404 }
      );
    }

    return HttpResponse.json({ success: true, message: "Code sent" });
  }),

  http.post("/api/auth/verify-code", async ({ request }) => {
    await delay();
    const body = (await request.json()) as VerifyCodeRequest;

    if (body.phone !== DEMO_PHONE || body.code !== DEMO_CODE) {
      return HttpResponse.json(
        { message: "Invalid or expired code" },
        { status: 400 }
      );
    }

    return HttpResponse.json({ success: true });
  }),

  http.post("/api/auth/reset-password", async ({ request }) => {
    await delay();
    const body = (await request.json()) as ResetPasswordRequest;

    if (body.phone !== DEMO_PHONE || body.code !== DEMO_CODE) {
      return HttpResponse.json(
        { message: "Invalid or expired code" },
        { status: 400 }
      );
    }

    return HttpResponse.json({ success: true });
  }),

  http.post("/api/auth/onboarding", async ({ request }) => {
    await delay();
    const body = (await request.json()) as OnboardingRequest;

    return HttpResponse.json({
      success: true,
      school: body.school,
    });
  }),
];
