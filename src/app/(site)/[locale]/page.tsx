import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getEventSettings, localizeEvent } from "@/server/services/event";
import { getExhibitorCategories } from "@/server/services/exhibitors";
import { getProgramDays } from "@/server/services/program";
import { getPartners } from "@/server/services/partners";
import { getLatestNews } from "@/server/services/news";

import { Hero } from "@/components/home/Hero";
import { ForWhom } from "@/components/home/ForWhom";
import { WhyVisit } from "@/components/home/WhyVisit";
import { AmbassadorsAlt } from "@/components/home/AmbassadorsAlt";
import { SectionsGrid } from "@/components/home/SectionsGrid";
import { ProgramPreview } from "@/components/home/ProgramPreview";
import { PartnersSection } from "@/components/home/PartnersSection";
import { NewsPreview } from "@/components/home/NewsPreview";
import { CtaBanner } from "@/components/home/CtaBanner";
import { StatsGrid, type StatItem } from "@/components/home/StatsGrid";
import { MarqueeTicker } from "@/components/home/MarqueeTicker";

export const revalidate = 300;

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations({ locale: locale as Locale, namespace: "Stats" });

  const settings = await getEventSettings();
  const ev = localizeEvent(settings, locale as Locale);
  const [categories, days, partners, news] = await Promise.all([
    getExhibitorCategories(),
    getProgramDays(),
    getPartners(),
    getLatestNews(),
  ]);

  const sqm = locale === "ru" ? " м²" : " m²";
  const stats: StatItem[] = [
    {
      value: ev.visitorCount,
      suffix: "+",
      label: t("visitors"),
      sub: locale === "ru" ? "за 4 дня" : "over 4 days",
      locale,
    },
    {
      value: ev.exhibitorCount,
      suffix: "+",
      label: t("companies"),
      sub: locale === "ru" ? "из 35 стран" : "from 35 countries",
      locale,
    },
    {
      value: ev.areaSize,
      suffix: sqm,
      label: t("area"),
      sub: locale === "ru" ? "в 3 павильонах" : "in 3 pavilions",
      locale,
    },
    {
      value: ev.programEventsCount,
      suffix: "+",
      label: t("events"),
      sub: locale === "ru" ? "форумы и мастер-классы" : "forums & masterclasses",
      locale,
    },
    {
      value: ev.programDays,
      suffix: "",
      label: t("days"),
      sub: locale === "ru" ? "деловой программы" : "business programme",
      locale,
    },
  ];

  return (
    <>
      {/* Hero — fullscreen slider с countdown */}
      <Hero
        dateStart={ev.dateStart}
        dateEnd={ev.dateEnd}
        venue={ev.venue}
        city={ev.city}
        visitorCount={ev.visitorCount}
        exhibitorCount={ev.exhibitorCount}
        areaSize={ev.areaSize}
        programDays={ev.programDays}
      />

      {/* Тикер */}
      <MarqueeTicker />

      {/* Ключевые цифры — тёмная секция */}
      <StatsGrid items={stats} />

      {/* Посетителям / Экспонентам */}
      <ForWhom categories={categories} />

      {/* Секторы выставки — перед WhyVisit, как в 2.0 */}
      {categories.length > 0 && <SectionsGrid categories={categories} />}

      {/* Почему NevaBuild — зелёный градиент */}
      <WhyVisit />

      {/* Голоса индустрии — тёмный блок с карточками */}
      <AmbassadorsAlt />

      {/* Деловая программа */}
      {days.length > 0 && <ProgramPreview days={days} />}

      {/* Партнёры */}
      <PartnersSection partners={partners} />

      {/* Новости */}
      <NewsPreview news={news} />

      {/* Тикер */}
      <MarqueeTicker />

      {/* Финальный CTA — тёмная секция */}
      <CtaBanner categories={categories} />
    </>
  );
}
