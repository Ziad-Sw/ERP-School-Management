import { useTranslations } from "next-intl";
import { WifiOff, RefreshCw } from "lucide-react";
import Button from "@/components/ui/Button";

interface OfflineIndicatorProps {
  onRetry?: () => void;
}

export function OfflineIndicator({ onRetry }: OfflineIndicatorProps) {
  const t = useTranslations("Login");

  return (
    <div className="min-h-screen bg-brand-600 flex flex-col items-center justify-center px-6 py-12">
      <div className="bg-sidebar-bg rounded-[32px] px-12 py-16 flex flex-col items-center gap-8 max-w-md w-full text-center">
        <div className="w-24 h-24 rounded-full bg-alpha-brand-16 flex items-center justify-center">
          <WifiOff size={48} className="text-brand-600" />
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="font-tajawal font-bold text-3xl text-text">
            {t("offlineTitle")}
          </h1>
          <p className="font-tajawal text-lg text-gray">
            {t("offlineDescription")}
          </p>
        </div>
        {onRetry && (
          <Button
            type_="Primary"
            size="Large"
            iconLeft={<RefreshCw size={20} />}
            onClick={onRetry}
            className="w-full"
          >
            {t("retryButton")}
          </Button>
        )}
      </div>
    </div>
  );
}
