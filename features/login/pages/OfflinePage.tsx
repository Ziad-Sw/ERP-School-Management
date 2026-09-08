"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { OfflineIndicator } from "@/components/auth/OfflineIndicator";

export function OfflinePage() {
  const router = useRouter();
  const locale = useLocale();

  useEffect(() => {
    if (!locale) return;

    if (navigator.onLine) {
      router.push(`/${locale}/login`);
    }

    const handleOnline = () => {
      router.push(`/${locale}/login`);
    };

    window.addEventListener("online", handleOnline);
    return () => window.removeEventListener("online", handleOnline);
  }, [router, locale]);

  const handleRetry = () => {
    if (!locale) return;
    if (navigator.onLine) {
      router.push(`/${locale}/login`);
    }
  };

  return <OfflineIndicator onRetry={handleRetry} />;
}
