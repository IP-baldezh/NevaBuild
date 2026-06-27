import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { buildAlternates } from "@/lib/seo";
import { getEventSettings, localizeEvent } from "@/server/services/event";
import { formatDateRange } from "@/lib/format";

import { AboutBackground } from "@/components/about/AboutBackground";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutStatsDark } from "@/components/about/AboutStatsDark";
import { AboutForWhomDark } from "@/components/about/AboutForWhomDark";
import { AboutSectionsDark } from "@/components/about/AboutSectionsDark";
import { AboutCtaDark } from "@/components/about/AboutCtaDark";
import type { StatItem } from "@/components/home/StatsGrid";

export const revalidate = 300;

const SECTION_IDS = ["s-hero", "s-stats", "s-cards", "s-sections", "s-cta"];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "AboutPage" });
  return {
    title: t("title"),
    description: t("lead"),
    alternates: buildAlternates(locale, "/about"),
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const tAboutPage = await getTranslations({ locale: locale as Locale, namespace: "AboutPage" });
  const tStats = await getTranslations({ locale: locale as Locale, namespace: "Stats" });

  const settings = await getEventSettings();
  const ev = localizeEvent(settings, locale as Locale);

  const dateRange = formatDateRange(ev.dateStart, ev.dateEnd, locale as Locale);
  const sqm = locale === "ru" ? " м²" : " m²";

  const stats: StatItem[] = [
    {
      value: ev.visitorCount,
      suffix: "+",
      label: tStats("visitors"),
      sub: locale === "ru" ? "за 4 дня" : "over 4 days",
      locale,
    },
    {
      value: ev.exhibitorCount,
      suffix: "+",
      label: tStats("companies"),
      sub: locale === "ru" ? "из 35 стран" : "from 35 countries",
      locale,
    },
    {
      value: ev.areaSize,
      suffix: sqm,
      label: tStats("area"),
      sub: locale === "ru" ? "в 3 павильонах" : "in 3 pavilions",
      locale,
    },
    {
      value: ev.programEventsCount,
      suffix: "+",
      label: tStats("events"),
      sub: locale === "ru" ? "форумы и мастер-классы" : "forums & masterclasses",
      locale,
    },
    {
      value: ev.programDays,
      suffix: "",
      label: tStats("days"),
      sub: locale === "ru" ? "деловой программы" : "business programme",
      locale,
    },
  ];

  return (
    <div className="relative" style={{ background: "#07100a" }}>
      <AboutBackground ids={SECTION_IDS} />

      <AboutHero lead={tAboutPage("lead")} dateRange={dateRange} venue={ev.venue} city={ev.city} />

      <AboutStatsDark stats={stats} />

      <AboutForWhomDark />

      <AboutSectionsDark />

      <AboutCtaDark dateRange={dateRange} venue={ev.venue} city={ev.city} />
    </div>
  );
}
