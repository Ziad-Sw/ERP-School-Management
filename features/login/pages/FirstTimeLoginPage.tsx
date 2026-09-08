"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { School, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import { AuthCard } from "@/components/auth/AuthCard";
import { useAuthStore } from "../store/authStore";

export function FirstTimeLoginPage() {
  const t = useTranslations("Login");
  const locale = useLocale();
  const router = useRouter();
  const { user, firstTimeLogin } = useAuthStore();

  useEffect(() => {
    if (!firstTimeLogin) {
      router.push(`/${locale || "ar"}/dashboard`);
    }
  }, [firstTimeLogin, router, locale]);

  const handleContinue = () => {
    if (!locale) return;
    router.push(`/${locale}/onboarding`);
  };

  return (
    <div className="min-h-screen bg-brand-600 flex flex-col items-center justify-center px-6 py-12">
      <AuthCard className="w-full max-w-[600px]">
        <div className="flex flex-col gap-6 items-center text-center">
          <div className="w-20 h-20 rounded-full bg-alpha-brand-16 flex items-center justify-center">
            <School size={40} className="text-brand-600" />
          </div>

          <div className="flex flex-col gap-3">
            <h1 className="text-text font-tajawal font-bold text-3xl">
              {t("firstTimeLoginTitle")}
            </h1>
            <p className="text-gray font-tajawal text-lg">
              {t("firstTimeLoginDescription", { name: user?.name || "" })}
            </p>
          </div>

          <div className="bg-card-bg rounded-md p-4 text-right w-full">
            <p className="font-tajawal text-text text-base leading-relaxed">
              {t("firstTimeLoginHint")}
            </p>
          </div>

          <Button
            type_="Primary"
            size="Large"
            className="w-full"
            iconRight={<ArrowRight size={20} />}
            onClick={handleContinue}
          >
            {t("continueToOnboarding")}
          </Button>
        </div>
      </AuthCard>
    </div>
  );
}
