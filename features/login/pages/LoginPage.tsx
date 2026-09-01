import { useTranslations } from "next-intl";
import { User, Lock } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export function LoginPage() {
  const t = useTranslations("Login");

  return (
    <div className="min-h-screen bg-brand-600 flex flex-col gap-16 items-center px-20 py-12">
      <div className="w-full flex justify-start">
        <p className="text-white font-tajawal font-bold text-xl">
          {t("welcome")}
        </p>
      </div>

      <div className="w-full flex items-center justify-between gap-12">
        <div className="flex flex-col gap-8 items-end text-white w-[753px]">
          <h2 className="font-tajawal font-bold text-4xl text-right leading-snug">
            {t("heroTitle")}
          </h2>
          <p className="font-tajawal font-normal text-2xl text-right">
            {t("heroDescription")}
          </p>
        </div>

        <div className="bg-sidebar-bg rounded-[32px] px-24 py-16 flex flex-col gap-6 items-center">
          <div className="flex flex-col gap-8 items-center w-[290px]">
            <div className="flex flex-col gap-8 items-center w-[210px]">
              <h1 className="text-[color:var(--color-text)] font-tajawal font-bold text-3xl">
                {t("title")}
              </h1>
            </div>
            <p className="text-[color:var(--color-text)] font-tajawal font-medium text-xl text-center">
              {t("subtitle")}
            </p>
          </div>

          <form className="flex flex-col gap-[72px] items-center">
            <div className="flex flex-col gap-3 items-start">
              <div className="flex flex-col gap-8 items-center">
                <Input
                  type="text"
                  placeholder={t("idPlaceholder")}
                  icon={<User />}
                  className="w-[348px]"
                />
                <Input
                  type="password"
                  placeholder={t("passwordPlaceholder")}
                  icon={<Lock />}
                  className="w-[348px]"
                />
              </div>
              <a href="#" className="text-error-500 font-tajawal font-medium text-sm">
                {t("forgotPassword")}
              </a>
            </div>

            <Button type_="Primary" size="Large" className="w-[348px]">
              {t("loginButton")}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
