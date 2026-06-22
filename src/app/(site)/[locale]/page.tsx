import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getEventSettings, localizeEvent } from "@/server/services/event";
import { getExhibitorCategories, getFeaturedExhibitors } from "@/server/services/exhibitors";
import { getProgramDays } from "@/server/services/program";
import { getPartners } from "@/server/services/partners";
import { getLatestNews } from "@/server/services/news";

import { Hero } from "@/components/home/Hero";
import { AboutSection } from "@/components/home/AboutSection";
import { SectionsGrid } from "@/components/home/SectionsGrid";
import { CatalogPreview } from "@/components/home/CatalogPreview";
import { ProgramPreview } from "@/components/home/ProgramPreview";
import { PartnersSection } from "@/components/home/PartnersSection";
import { NewsPreview } from "@/components/home/NewsPreview";
import { ContactsSection } from "@/components/home/ContactsSection";
import { GradientSection } from "@/components/ui/gradient-section";
import { StatsGrid, type StatItem } from "@/components/home/StatsGrid";
import { Link } from "@/i18n/navigation";
import { MarqueeTicker } from "@/components/home/MarqueeTicker";

export const revalidate = 300;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations({ locale: locale as Locale, namespace: "Stats" });

  const settings = await getEventSettings();
  const ev = localizeEvent(settings, locale as Locale);
  const [categories, featured, days, partners, news] = await Promise.all([
    getExhibitorCategories(),
    getFeaturedExhibitors(),
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

      {/* О выставке + направления */}
      <GradientSection variant="plain" id="about">
        <AboutSection />
      </GradientSection>

      {/* Ключевые цифры */}
      <GradientSection variant="muted">
        <StatsGrid items={stats} />
      </GradientSection>

      {/* Секторы */}
      <GradientSection variant="plain" id="sectors">
        <SectionsGrid categories={categories} />
      </GradientSection>

      {/* Каталог участников */}
      {featured.length > 0 && (
        <GradientSection variant="muted">
          <CatalogPreview exhibitors={featured} />
        </GradientSection>
      )}

      {/* Программа */}
      {days.length > 0 && (
        <GradientSection variant="plain" id="program">
          <ProgramPreview days={days} />
        </GradientSection>
      )}

      {/* Партнёры */}
      {partners.length > 0 && (
        <GradientSection variant="muted" id="partners">
          <PartnersSection partners={partners} />
        </GradientSection>
      )}

      {/* Новости */}
      {news.length > 0 && (
        <GradientSection variant="plain" id="news">
          <NewsPreview news={news} />
        </GradientSection>
      )}

      {/* Контакты */}
      <GradientSection variant="muted" id="location">
        <ContactsSection
          venue={ev.venue}
          city={ev.city}
          address={ev.address}
          phone={ev.phone}
          email={ev.email}
        />
      </GradientSection>

      {/* Тикер перед финальным CTA */}
      <MarqueeTicker />

      {/* Финальный CTA */}
      <section className="relative overflow-hidden border-t border-border bg-card">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-blueprint opacity-40" />
        <span aria-hidden className="absolute left-0 top-0 h-1 w-full bg-lime" />
        <div className="container-neva relative py-24 md:py-32">
          <div className="flex items-center gap-3">
            <span className="size-2 bg-brand-red" />
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {ev.city} · {ev.venue}
            </span>
          </div>
          <h2 className="mt-8 max-w-4xl text-balance text-4xl font-black uppercase leading-[1.02] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            Станьте частью{" "}
            <span className="text-lime">NEVA BUILD</span>
          </h2>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Покажите свои решения профессиональной аудитории строительной индустрии.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row" id="participate">
            <Link
              href="/exhibit"
              className="group inline-flex h-12 items-center gap-2 bg-lime px-8 text-sm font-semibold uppercase tracking-wide text-lime-foreground transition-colors hover:bg-foreground"
            >
              Стать участником
              <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link
              href="/tickets"
              className="inline-flex h-12 items-center gap-2 border border-border px-8 text-sm font-semibold uppercase tracking-wide text-foreground transition-colors hover:border-lime hover:text-lime"
            >
              Получить билет
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
