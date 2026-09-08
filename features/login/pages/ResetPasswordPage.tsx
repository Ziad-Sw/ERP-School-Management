"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Lock, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { AuthCard } from "@/components/auth/AuthCard";
import { useResetPassword } from "../hooks/useAuth";

function ResetPasswordForm() {
  const t = useTranslations("Login");
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone") || "";
  const code = searchParams.get("code") || "";

  const resetMutation = useResetPassword();
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!phone || !code) {
      router.push(`/${locale || "ar"}/forgot-password`);
      return;
    }
  }, [phone, code, router, locale]);

  const schema = z
    .object({
      newPassword: z
        .string()
        .min(8, t("passwordMinLength")),
      confirmPassword: z.string().min(1, t("confirmPasswordRequired")),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: t("passwordsDoNotMatch"),
      path: ["confirmPassword"],
    });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { newPassword: "", confirmPassword: "" },
  });

  const onSubmit = async (data: FormData) => {
    if (!locale) return;
    setServerError(null);
    try {
      await resetMutation.mutateAsync({
        phone,
        code,
        newPassword: data.newPassword,
      });
      setSuccess(true);
      setTimeout(() => {
        router.push(`/${locale}/login`);
      }, 2000);
    } catch {
      setServerError(t("resetFailed"));
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-brand-600 flex flex-col items-center justify-center px-6 py-12">
        <AuthCard className="w-full max-w-[520px]">
          <div className="flex flex-col gap-4 items-center text-center">
            <CheckCircle2 size={64} className="text-finance-500" />
            <h1 className="text-text font-tajawal font-bold text-3xl">
              {t("resetSuccessTitle")}
            </h1>
            <p className="text-gray font-tajawal text-lg">
              {t("resetSuccessDescription")}
            </p>
          </div>
        </AuthCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-600 flex flex-col items-center justify-center px-6 py-12">
      <AuthCard className="w-full max-w-[520px]">
        <div className="flex flex-col gap-3 items-center text-center">
          <div className="w-16 h-16 rounded-full bg-alpha-brand-16 flex items-center justify-center">
            <Lock size={32} className="text-brand-600" />
          </div>
          <h1 className="text-text font-tajawal font-bold text-3xl">
            {t("resetPasswordTitle")}
          </h1>
          <p className="text-gray font-tajawal text-lg">
            {t("resetPasswordDescription")}
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 items-center w-full"
        >
          <div className="flex flex-col gap-4 w-full">
            <Input
              type="password"
              placeholder={t("newPasswordPlaceholder")}
              icon={<Lock />}
              error={!!errors.newPassword}
              className="w-full"
              {...register("newPassword")}
            />
            <Input
              type="password"
              placeholder={t("confirmPasswordPlaceholder")}
              icon={<Lock />}
              error={!!errors.confirmPassword}
              className="w-full"
              {...register("confirmPassword")}
            />
            {(errors.newPassword || errors.confirmPassword || serverError) && (
              <div className="flex items-center gap-2 text-error-500 font-tajawal text-sm">
                <AlertCircle size={16} />
                <span>
                  {errors.newPassword?.message ||
                    errors.confirmPassword?.message ||
                    serverError}
                </span>
              </div>
            )}
          </div>

          <Button
            type="submit"
            type_="Primary"
            size="Large"
            className="w-full"
            iconRight={<ArrowRight size={20} />}
            disabled={resetMutation.isPending}
          >
            {resetMutation.isPending
              ? t("resettingPassword")
              : t("resetPasswordButton")}
          </Button>
        </form>
      </AuthCard>
    </div>
  );
}

export function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-brand-600" />}>
      <ResetPasswordForm />
    </Suspense>
  );
}
