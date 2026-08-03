import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { buildAlternates } from "@/lib/seo";
import { getEventSettings, localizeEvent } from "@/server/services/event";
import { formatDateRange } from "@/lib/format";
import { getPartners } from "@/server/services/partners";
import { getExhibitorCategories } from "@/server/services/exhibitors";

import { AboutBackground } from "@/components/about/AboutBackground";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutIntroBlock } from "@/components/about/AboutIntroBlock";
import { AboutStatsDark } from "@/components/about/AboutStatsDark";
import { AboutForWhomDark } from "@/components/about/AboutForWhomDark";
import { AboutBusinessCard } from "@/components/about/AboutBusinessCard";
import { AboutReasonsDark } from "@/components/about/AboutReasonsDark";
import { AboutSectionsDark } from "@/components/about/AboutSectionsDark";
import { AboutAmbassadors } from "@/components/about/AboutAmbassadors";
import { AboutCtaDark } from "@/components/about/AboutCtaDark";
import { PartnersSection } from "@/components/home/PartnersSection";
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

  const [settings, partners, categories] = await Promise.all([
    getEventSettings(),
    getPartners(),
    getExhibitorCategories(),
  ]);
  const ev = localizeEvent(settings, locale as Locale);

  const dateRange = formatDateRange(ev.dateStart, ev.dateEnd, locale as Locale);
  const sqm = locale === "ru" ? " м²" : " m²";

  const stats: StatItem[] = [
    {
      value: ev.visitorCount,
      suffix: "+",
      label: tStats("visitors"),
      sub: locale === "ru" ? "за 3 дня" : "over 3 days",
      locale,
    },
    {
      value: ev.exhibitorCount,
      suffix: "+",
      label: tStats("companies"),
      sub:
        locale === "ru"
          ? "производителей, дистрибьюторов и застройщиков России и зарубежных стран"
          : "manufacturers, distributors and developers from Russia and abroad",
      locale,
    },
    {
      value: ev.areaSize,
      suffix: sqm,
      label: tStats("area"),
      sub:
        locale === "ru"
          ? "выставочные залы, практические зоны"
          : "exhibition halls and practical zones",
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
      locale,
    },
  ];

  return (
    <div className="relative" style={{ background: "#07100a" }}>
      <AboutBackground ids={SECTION_IDS} />

      <AboutHero lead={tAboutPage("lead")} dateRange={dateRange} venue={ev.venue} city={ev.city} />

      <AboutIntroBlock />

      <AboutStatsDark stats={stats} />

      <AboutForWhomDark />

      <AboutAmbassadors />

      <AboutBusinessCard />

      <AboutReasonsDark />

      <AboutSectionsDark categories={categories} />

      <PartnersSection partners={partners} />

      <AboutCtaDark dateRange={dateRange} venue={ev.venue} city={ev.city} />
      <div id="about-end" aria-hidden />
    </div>
  );
}
