import { redirect } from "next/navigation";
import { routing } from "../../lib/i18n/routing";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "ar" | "en")) {
    redirect("/ar/login");
  }

  redirect(`/${locale}/login`);
}
