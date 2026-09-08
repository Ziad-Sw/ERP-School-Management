import { useTranslations } from "next-intl";
import { Sparkles } from "lucide-react";

interface DemoCredentialsProps {
  onQuickLogin?: () => void;
}

export function DemoCredentials({ onQuickLogin }: DemoCredentialsProps) {
  const t = useTranslations("Login");

  return (
    <div className="w-[348px] bg-alpha-brand-16 border border-brand-500 rounded-md p-4 flex flex-col gap-2">
      <div className="flex items-center gap-2 text-brand-600">
        <Sparkles size={18} />
        <span className="font-tajawal font-bold text-sm">
          {t("demoCredentialsTitle")}
        </span>
      </div>
      <p className="font-tajawal text-sm text-text">
        {t("demoCredentialsText", { id: "admin", password: "demo1234" })}
      </p>
      {onQuickLogin && (
        <button
          type="button"
          onClick={onQuickLogin}
          className="text-brand-600 font-tajawal font-bold text-sm underline hover:text-brand-700 text-right"
        >
          {t("quickDemoLogin")}
        </button>
      )}
    </div>
  );
}
