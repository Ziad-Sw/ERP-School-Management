"use client";

import { useTranslations } from "next-intl";
import { LoadingSpinner } from "@/components/auth/LoadingSpinner";

export function LoadingPage() {
  const t = useTranslations("Login");

  return <LoadingSpinner text={t("loadingText")} />;
}
