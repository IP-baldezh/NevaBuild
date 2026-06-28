import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { buildAlternates } from "@/lib/seo";
import { getEventSettings, localizeEvent } from "@/server/services/event";
import { formatDateRange } from "@/lib/format";
import { getExhibitorCategories } from "@/server/services/exhibitors";

import { ExhibitBackground } from "@/components/exhibit/ExhibitBackground";
import { ExhibitHero } from "@/components/exhibit/ExhibitHero";
import { ExhibitBenefitsDark } from "@/components/exhibit/ExhibitBenefitsDark";
import { ExhibitFormatsDark } from "@/components/exhibit/ExhibitFormatsDark";
import { ExhibitStepsDark } from "@/components/exhibit/ExhibitStepsDark";
import { ExhibitFormDark } from "@/components/exhibit/ExhibitFormDark";

export const revalidate = 300;

const SECTION_IDS = ["e-hero", "e-benefits", "e-formats", "e-steps", "e-form"];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "ExhibitPage" });
  return {
    title: t("title"),
    description: t("lead"),
    alternates: buildAlternates(locale, "/exhibit"),
  };
}

export default async function ExhibitPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const [settings, categories] = await Promise.all([getEventSettings(), getExhibitorCategories()]);
  const ev = localizeEvent(settings, locale as Locale);
  const dateRange = formatDateRange(ev.dateStart, ev.dateEnd, locale as Locale);

  return (
    <div className="relative" style={{ background: "#07100a" }}>
      <ExhibitBackground ids={SECTION_IDS} />

      <ExhibitHero dateRange={dateRange} venue={ev.venue} city={ev.city} />

      <ExhibitBenefitsDark />

      <ExhibitFormatsDark />

      <ExhibitStepsDark />

      <ExhibitFormDark categories={categories} />

      <div id="exhibit-end" aria-hidden />
    </div>
  );
}
