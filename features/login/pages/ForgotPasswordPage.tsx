"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Phone, ArrowRight, AlertCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { AuthCard } from "@/components/auth/AuthCard";
import { useForgotPassword } from "../hooks/useAuth";

export function ForgotPasswordPage() {
  const t = useTranslations("Login");
  const locale = useLocale();
  const router = useRouter();
  const forgotPasswordMutation = useForgotPassword();
  const [serverError, setServerError] = useState<string | null>(null);

  const schema = z.object({
    phone: z
      .string()
      .min(1, t("phoneRequired"))
      .regex(/^\d+$/, t("phoneInvalid")),
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { phone: "" },
  });

  const onSubmit = async (data: FormData) => {
    if (!locale) return;
    setServerError(null);
    try {
      await forgotPasswordMutation.mutateAsync({ phone: data.phone });
      router.push(`/${locale}/verify-code?phone=${encodeURIComponent(data.phone)}`);
    } catch {
      setServerError(t("phoneNotFound"));
    }
  };

  return (
    <div className="min-h-screen bg-brand-600 flex flex-col items-center justify-center px-6 py-12">
      <AuthCard className="w-full max-w-[520px]">
        <div className="flex flex-col gap-3 items-center text-center">
          <div className="w-16 h-16 rounded-full bg-alpha-brand-16 flex items-center justify-center">
            <Phone size={32} className="text-brand-600" />
          </div>
          <h1 className="text-text font-tajawal font-bold text-3xl">
            {t("forgotPasswordTitle")}
          </h1>
          <p className="text-gray font-tajawal text-lg">
            {t("forgotPasswordDescription")}
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 items-center w-full"
        >
          <div className="flex flex-col gap-2 w-full">
            <Input
              type="tel"
              placeholder={t("phonePlaceholder")}
              icon={<Phone />}
              error={!!errors.phone}
              className="w-full"
              {...register("phone")}
            />
            {(errors.phone || serverError) && (
              <div className="flex items-center gap-2 text-error-500 font-tajawal text-sm">
                <AlertCircle size={16} />
                <span>{errors.phone?.message || serverError}</span>
              </div>
            )}
          </div>

          <Button
            type="submit"
            type_="Primary"
            size="Large"
            className="w-full"
            iconRight={<ArrowRight size={20} />}
            disabled={forgotPasswordMutation.isPending}
          >
            {forgotPasswordMutation.isPending
              ? t("sendingCode")
              : t("sendCodeButton")}
          </Button>
        </form>

        <a
          href={`/${locale}/login`}
          className="text-brand-600 font-tajawal font-bold text-sm hover:underline"
        >
          {t("backToLogin")}
        </a>
      </AuthCard>
    </div>
  );
}
