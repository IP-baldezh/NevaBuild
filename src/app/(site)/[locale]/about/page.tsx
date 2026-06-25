import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Building2, Users, Hammer, Compass, ShoppingCart, Briefcase } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { buildAlternates } from "@/lib/seo";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { GradientSection } from "@/components/ui/gradient-section";
import { SectionTitle } from "@/components/ui/section-title";
import { PageHero } from "@/components/layout/PageHero";
import { StatsGrid, type StatItem } from "@/components/home/StatsGrid";
import { SectionsGrid } from "@/components/home/SectionsGrid";
import { getEventSettings, localizeEvent } from "@/server/services/event";
import { getExhibitorCategories } from "@/server/services/exhibitors";

export const revalidate = 300;

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

const AUDIENCE = [
  { key: "architects", icon: Compass },
  { key: "designers", icon: Building2 },
  { key: "developers", icon: Briefcase },
  { key: "builders", icon: Hammer },
  { key: "buyers", icon: ShoppingCart },
  { key: "owners", icon: Users },
] as const;

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations({ locale: locale as Locale, namespace: "AboutPage" });
  const tAbout = await getTranslations({ locale: locale as Locale, namespace: "About" });
  const tStats = await getTranslations({ locale: locale as Locale, namespace: "Stats" });
  const tc = await getTranslations({ locale: locale as Locale, namespace: "Common" });

  const settings = await getEventSettings();
  const ev = localizeEvent(settings, locale as Locale);
  const categories = await getExhibitorCategories();

  const sqm = locale === "ru" ? " м²" : " m²";
  const stats: StatItem[] = [
    { value: ev.visitorCount, suffix: "+", label: tStats("visitors"), locale },
    { value: ev.exhibitorCount, suffix: "+", label: tStats("companies"), locale },
    { value: ev.areaSize, suffix: sqm, label: tStats("area"), locale },
    { value: ev.programEventsCount, suffix: "+", label: tStats("events"), locale },
    { value: ev.programDays, suffix: "", label: tStats("days"), locale },
  ];

  return (
    <>
      <PageHero title={t("title")} lead={t("lead")} />

      <GradientSection variant="plain">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <SectionTitle
              label={tAbout("label")}
              title={t("descriptionTitle")}
              description={tAbout("text")}
            />
          </div>
          <StatsGridCompact />
        </div>
        <div className="mt-12">
          <StatsGrid items={stats} />
        </div>
      </GradientSection>

      <GradientSection variant="muted">
        <SectionTitle align="center" title={t("audienceTitle")} className="mb-10" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {AUDIENCE.map(({ key, icon: Icon }) => (
            <div
              key={key}
              className="flex flex-col items-center gap-3 rounded-2xl border bg-card p-6 text-center"
            >
              <span className="flex size-12 items-center justify-center rounded-xl bg-secondary text-brand-red">
                <Icon className="size-6" />
              </span>
              <span className="text-sm font-semibold">{t(`audience.${key}`)}</span>
            </div>
          ))}
        </div>
      </GradientSection>

      <GradientSection variant="plain">
        <SectionsGrid categories={categories} />
      </GradientSection>

      <GradientSection variant="muted">
        <div className="mx-auto max-w-3xl text-center">
          <SectionTitle align="center" title={t("whyCity")} description={t("whyCityText")} />
        </div>
      </GradientSection>

      <GradientSection variant="dark">
        <div className="flex flex-col items-center gap-6 text-center">
          <h2 className="text-balance text-3xl font-extrabold text-white sm:text-4xl">
            {tAbout("title")}
          </h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/tickets">{tc("getTicket")}</Link>
            </Button>
            <Button asChild size="lg" variant="accent">
              <Link href="/exhibit">{tc("bookStand")}</Link>
            </Button>
          </div>
        </div>
      </GradientSection>
    </>
  );
}

function StatsGridCompact() {
  return (
    <div className="ring-outline relative aspect-square overflow-hidden rounded-3xl bg-neva-gradient p-8">
      <div className="flex h-full items-end">
        <span className="text-3xl font-extrabold leading-tight text-brand-black">
          NEVA BUILD
          <span className="block text-base font-semibold text-brand-black/60">
            Saint Petersburg · Expoforum
          </span>
        </span>
      </div>
    </div>
  );
}
