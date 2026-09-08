"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { School, MapPin, Phone, Mail, Building, ArrowRight, AlertCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { AuthCard } from "@/components/auth/AuthCard";
import { useOnboarding } from "../hooks/useAuth";
import { useAuthStore } from "../store/authStore";

export function OnboardingPage() {
  const t = useTranslations("Login");
  const locale = useLocale();
  const router = useRouter();
  const onboardingMutation = useOnboarding();
  const { user, firstTimeLogin, setSchool, completeFirstTimeLogin } = useAuthStore();

  useEffect(() => {
    if (!firstTimeLogin) {
      router.push(`/${locale || "ar"}/dashboard`);
    }
  }, [firstTimeLogin, router, locale]);

  const schema = z.object({
    name: z.string().min(1, t("schoolNameRequired")),
    address: z.string().min(1, t("schoolAddressRequired")),
    phone: z
      .string()
      .min(1, t("schoolPhoneRequired"))
      .regex(/^\d+$/, t("phoneInvalid")),
    email: z.string().email(t("schoolEmailInvalid")),
    type: z.string().min(1, t("schoolTypeRequired")),
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      address: "",
      phone: "",
      email: "",
      type: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    if (!user?.id) {
      setError("root", { message: t("userNotFound") });
      return;
    }

    try {
      const response = await onboardingMutation.mutateAsync({
        userId: user.id,
        school: {
          name: data.name,
          address: data.address,
          phone: data.phone,
          email: data.email,
          type: data.type,
        },
      });

      setSchool(response.school);
      completeFirstTimeLogin();
      if (locale) router.push(`/${locale}/dashboard`);
    } catch {
      setError("root", { message: t("onboardingFailed") });
    }
  };

  return (
    <div className="min-h-screen bg-brand-600 flex flex-col items-center justify-center px-6 py-12">
      <AuthCard className="w-full max-w-[600px]">
        <div className="flex flex-col gap-3 items-center text-center">
          <div className="w-16 h-16 rounded-full bg-alpha-brand-16 flex items-center justify-center">
            <School size={32} className="text-brand-600" />
          </div>
          <h1 className="text-text font-tajawal font-bold text-3xl">
            {t("onboardingTitle")}
          </h1>
          <p className="text-gray font-tajawal text-lg">
            {t("onboardingDescription")}
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 w-full"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="text"
              placeholder={t("schoolNamePlaceholder")}
              icon={<School />}
              error={!!errors.name}
              className="w-full"
              {...register("name")}
            />
            <Input
              type="text"
              placeholder={t("schoolTypePlaceholder")}
              icon={<Building />}
              error={!!errors.type}
              className="w-full"
              {...register("type")}
            />
            <Input
              type="text"
              placeholder={t("schoolAddressPlaceholder")}
              icon={<MapPin />}
              error={!!errors.address}
              className="w-full"
              {...register("address")}
            />
            <Input
              type="tel"
              placeholder={t("schoolPhonePlaceholder")}
              icon={<Phone />}
              error={!!errors.phone}
              className="w-full"
              {...register("phone")}
            />
            <Input
              type="email"
              placeholder={t("schoolEmailPlaceholder")}
              icon={<Mail />}
              error={!!errors.email}
              className="w-full md:col-span-2"
              {...register("email")}
            />
          </div>

          {(Object.values(errors).some(Boolean) || errors.root) && (
            <div className="flex items-center gap-2 text-error-500 font-tajawal text-sm">
              <AlertCircle size={16} />
              <span>
                {errors.name?.message ||
                  errors.type?.message ||
                  errors.address?.message ||
                  errors.phone?.message ||
                  errors.email?.message ||
                  errors.root?.message}
              </span>
            </div>
          )}

          <Button
            type="submit"
            type_="Primary"
            size="Large"
            className="w-full"
            iconRight={<ArrowRight size={20} />}
            disabled={onboardingMutation.isPending}
          >
            {onboardingMutation.isPending
              ? t("savingSchool")
              : t("completeOnboarding")}
          </Button>
        </form>
      </AuthCard>
    </div>
  );
}
