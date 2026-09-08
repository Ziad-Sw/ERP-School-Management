"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User, Lock, AlertCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { DemoCredentials } from "@/components/auth/DemoCredentials";
import { AuthCard } from "@/components/auth/AuthCard";
import { useLogin } from "../hooks/useAuth";
import { useAuthStore } from "../store/authStore";

const MAX_ATTEMPTS = 5;
const LOCK_DURATION_MS = 60_000;
const DEMO_ID = "admin";
const DEMO_PASSWORD = "demo1234";

export function LoginPage() {
  const t = useTranslations("Login");
  const locale = useLocale();
  const router = useRouter();
  const loginMutation = useLogin();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockUntil, setLockUntil] = useState<number | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [now, setNow] = useState<number>(() => Date.now());

  const schema = z.object({
    id: z.string().min(1, t("idRequired")),
    password: z.string().min(1, t("passwordRequired")),
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { id: "", password: "" },
  });

  useEffect(() => {
    if (!locale) return;

    if (!navigator.onLine) {
      router.push(`/${locale}/offline`);
      return;
    }

    const handleOffline = () => router.push(`/${locale}/offline`);
    window.addEventListener("offline", handleOffline);
    return () => window.removeEventListener("offline", handleOffline);
  }, [router, locale]);

  useEffect(() => {
    if (!lockUntil) return;

    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, [lockUntil]);

  const onSubmit = async (data: FormData) => {
    if (!locale) return;
    if (lockUntil && Date.now() < lockUntil) return;

    setServerError(null);
    try {
      const response = await loginMutation.mutateAsync(data);
      setFailedAttempts(0);
      setLockUntil(null);
      setAuth(response.token, response.user, response.firstTimeLogin);

      if (response.firstTimeLogin) {
        router.push(`/${locale}/first-time-login`);
      } else {
        router.push(`/${locale}/dashboard`);
      }
    } catch {
      const nextAttempts = failedAttempts + 1;
      setFailedAttempts(nextAttempts);

      if (nextAttempts >= MAX_ATTEMPTS) {
        setLockUntil(Date.now() + LOCK_DURATION_MS);
      }

      setServerError(t("invalidCredentials"));
    }
  };

  const handleQuickDemoLogin = async () => {
    setValue("id", DEMO_ID);
    setValue("password", DEMO_PASSWORD);
    await onSubmit({ id: DEMO_ID, password: DEMO_PASSWORD });
  };

  const isLocked = lockUntil !== null && now < lockUntil;
  const countdown = lockUntil ? Math.max(0, Math.ceil((lockUntil - now) / 1000)) : 0;

  return (
    <div className="min-h-screen bg-brand-600 flex flex-col gap-16 items-center px-6 lg:px-20 py-12">
      <div className="w-full flex justify-start">
        <p className="text-white font-tajawal font-bold text-xl">
          {t("welcome")}
        </p>
      </div>

      <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="flex flex-col gap-8 items-end text-white lg:w-[753px]">
          <h2 className="font-tajawal font-bold text-3xl lg:text-4xl text-right leading-snug">
            {t("heroTitle")}
          </h2>
          <p className="font-tajawal font-normal text-xl lg:text-2xl text-right">
            {t("heroDescription")}
          </p>
        </div>

        <AuthCard>
          <div className="flex flex-col gap-8 items-center w-full max-w-[290px]">
            <h1 className="text-text font-tajawal font-bold text-3xl text-center">
              {t("title")}
            </h1>
            <p className="text-text font-tajawal font-medium text-xl text-center">
              {t("subtitle")}
            </p>
          </div>

          <DemoCredentials onQuickLogin={handleQuickDemoLogin} />

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-8 items-center w-full"
          >
            <div className="flex flex-col gap-3 items-start w-full">
              <div className="flex flex-col gap-6 items-center w-full">
                <Input
                  type="text"
                  placeholder={t("idPlaceholder")}
                  icon={<User />}
                  error={!!errors.id}
                  className="w-[348px]"
                  {...register("id")}
                />
                <Input
                  type="password"
                  placeholder={t("passwordPlaceholder")}
                  icon={<Lock />}
                  error={!!errors.password}
                  className="w-[348px]"
                  {...register("password")}
                />
              </div>

              {(errors.id || errors.password || serverError) && (
                <div className="flex items-center gap-2 text-error-500 font-tajawal text-sm">
                  <AlertCircle size={16} />
                  <span>
                    {errors.id?.message ||
                      errors.password?.message ||
                      serverError}
                  </span>
                </div>
              )}

              <a
                href={`/${locale}/forgot-password`}
                className="text-error-500 font-tajawal font-medium text-sm hover:underline"
              >
                {t("forgotPassword")}
              </a>
            </div>

            <Button
              type="submit"
              type_="Primary"
              size="Large"
              className="w-[348px]"
              disabled={loginMutation.isPending || isLocked}
            >
              {isLocked
                ? t("lockedButton", { seconds: countdown })
                : loginMutation.isPending
                ? t("loggingIn")
                : t("loginButton")}
            </Button>
          </form>
        </AuthCard>
      </div>
    </div>
  );
}
