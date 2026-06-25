import { getTranslations, setRequestLocale } from "next-intl/server";
import { XCircle } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { GradientSection } from "@/components/ui/gradient-section";

export const dynamic = "force-dynamic";

export default async function TicketFailPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations({ locale: locale as Locale, namespace: "TicketsPage" });

  return (
    <GradientSection variant="plain" className="min-h-[70vh]">
      <div className="mx-auto max-w-lg text-center">
        <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-destructive/10 text-destructive">
          <XCircle className="size-8" />
        </span>
        <h1 className="mt-6 text-3xl font-extrabold">{t("failTitle")}</h1>
        <p className="mt-3 text-muted-foreground">{t("failText")}</p>
        <Button asChild className="mt-8">
          <Link href="/tickets">{t("tryAgain")}</Link>
        </Button>
      </div>
    </GradientSection>
  );
}
