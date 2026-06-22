import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { buildAlternates } from "@/lib/seo";
import { GradientSection } from "@/components/ui/gradient-section";
import { PageHero } from "@/components/layout/PageHero";
import { ProgramView } from "@/components/program/ProgramView";
import { getProgramDays } from "@/server/services/program";

export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "ProgramPage" });
  return {
    title: t("title"),
    description: t("lead"),
    alternates: buildAlternates(locale, "/program"),
  };
}

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations({ locale: locale as Locale, namespace: "ProgramPage" });
  const days = await getProgramDays();

  return (
    <>
      <PageHero title={t("title")} lead={t("lead")} />
      <GradientSection variant="plain">
        <ProgramView days={days} />
      </GradientSection>
    </>
  );
}
