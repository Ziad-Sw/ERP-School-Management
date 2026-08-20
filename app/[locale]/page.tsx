import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("HomePage");

  return (
    <div className="flex min-h-screen items-center justify-center">
      <h1 className="text-3xl font-bold text-[#0D9488]">{t("title")}</h1>
    </div>
  );
}