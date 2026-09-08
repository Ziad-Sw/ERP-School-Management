"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { ShieldCheck, AlertCircle, ArrowRight, RefreshCw } from "lucide-react";
import Button from "@/components/ui/Button";
import { OtpInput } from "@/components/auth/OtpInput";
import { AuthCard } from "@/components/auth/AuthCard";
import { useVerifyCode, useForgotPassword } from "../hooks/useAuth";

const CODE_LENGTH = 6;
const RESEND_DELAY_SECONDS = 60;

function VerifyCodeForm() {
  const t = useTranslations("Login");
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone") || "";

  const verifyMutation = useVerifyCode();
  const resendMutation = useForgotPassword();

  const [code, setCode] = useState("");
  const [serverError, setServerError] = useState<string | null>(null);
  const [resendTimer, setResendTimer] = useState(RESEND_DELAY_SECONDS);

  const canResend = resendTimer <= 0;

  useEffect(() => {
    if (!locale || !phone) {
      router.push(`/${locale || "ar"}/forgot-password`);
      return;
    }
  }, [phone, router, locale]);

  useEffect(() => {
    if (canResend) return;

    const interval = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [canResend]);

  const handleVerify = async () => {
    if (!locale) return;
    if (code.length !== CODE_LENGTH) {
      setServerError(t("codeIncomplete"));
      return;
    }

    setServerError(null);
    try {
      await verifyMutation.mutateAsync({ phone, code });
      router.push(
        `/${locale}/reset-password?phone=${encodeURIComponent(phone)}&code=${encodeURIComponent(code)}`
      );
    } catch {
      setServerError(t("invalidCode"));
    }
  };

  const handleResend = async () => {
    setResendTimer(RESEND_DELAY_SECONDS);
    setServerError(null);
    try {
      await resendMutation.mutateAsync({ phone });
    } catch {
      setServerError(t("resendFailed"));
    }
  };

  return (
    <div className="min-h-screen bg-brand-600 flex flex-col items-center justify-center px-6 py-12">
      <AuthCard className="w-full max-w-[520px]">
        <div className="flex flex-col gap-3 items-center text-center">
          <div className="w-16 h-16 rounded-full bg-alpha-brand-16 flex items-center justify-center">
            <ShieldCheck size={32} className="text-brand-600" />
          </div>
          <h1 className="text-text font-tajawal font-bold text-3xl">
            {t("verifyCodeTitle")}
          </h1>
          <p className="text-gray font-tajawal text-lg">
            {t("verifyCodeDescription", { phone })}
          </p>
        </div>

        <div className="flex flex-col gap-6 items-center w-full">
          <OtpInput
            length={CODE_LENGTH}
            value={code}
            onChange={setCode}
            error={!!serverError}
            disabled={verifyMutation.isPending}
          />

          {serverError && (
            <div className="flex items-center gap-2 text-error-500 font-tajawal text-sm">
              <AlertCircle size={16} />
              <span>{serverError}</span>
            </div>
          )}

          <Button
            type_="Primary"
            size="Large"
            className="w-full"
            iconRight={<ArrowRight size={20} />}
            onClick={handleVerify}
            disabled={verifyMutation.isPending || code.length !== CODE_LENGTH}
          >
            {verifyMutation.isPending ? t("verifying") : t("verifyButton")}
          </Button>

          <button
            type="button"
            onClick={handleResend}
            disabled={!canResend || resendMutation.isPending}
            className="flex items-center gap-2 text-brand-600 font-tajawal font-bold text-sm disabled:text-gray hover:underline"
          >
            <RefreshCw size={16} />
            {canResend
              ? t("resendCode")
              : t("resendCodeTimer", { seconds: resendTimer })}
          </button>
        </div>

        <a
          href={`/${locale}/forgot-password`}
          className="text-brand-600 font-tajawal font-bold text-sm hover:underline"
        >
          {t("backToLogin")}
        </a>
      </AuthCard>
    </div>
  );
}

export function VerifyCodePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-brand-600" />}>
      <VerifyCodeForm />
    </Suspense>
  );
}
