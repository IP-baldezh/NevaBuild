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
import { SectionsGrid } from "@/components/home/SectionsGrid";
import { ProgramPreview } from "@/components/home/ProgramPreview";
import { PartnersSection } from "@/components/home/PartnersSection";
import { NewsPreview } from "@/components/home/NewsPreview";
import { ContactsSection } from "@/components/home/ContactsSection";
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
    { value: ev.visitorCount, suffix: "+", label: t("visitors"), locale },
    { value: ev.exhibitorCount, suffix: "+", label: t("companies"), locale },
    { value: ev.areaSize, suffix: sqm, label: t("area"), locale },
    { value: ev.programEventsCount, suffix: "+", label: t("events"), locale },
    { value: ev.programDays, suffix: "", label: t("days"), locale },
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
      <ForWhom />

      {/* Почему NevaBuild — зелёный градиент */}
      <WhyVisit />

      {/* Секторы выставки */}
      {categories.length > 0 && <SectionsGrid categories={categories} />}

      {/* Деловая программа */}
      {days.length > 0 && (
        <section className="py-20 bg-nb-bg-light" id="program">
          <div className="container-neva">
            <ProgramPreview days={days} />
          </div>
        </section>
      )}

      {/* Партнёры */}
      <PartnersSection partners={partners} />

      {/* Новости */}
      <NewsPreview news={news} />

      {/* Контакты */}
      <section className="py-20 bg-nb-bg-light" id="location">
        <div className="container-neva">
          <ContactsSection
            venue={ev.venue}
            city={ev.city}
            address={ev.address}
            phone={ev.phone}
            email={ev.email}
          />
        </div>
      </section>

      {/* Тикер */}
      <MarqueeTicker />

      {/* Финальный CTA — тёмная секция */}
      <CtaBanner />
    </>
  );
}
