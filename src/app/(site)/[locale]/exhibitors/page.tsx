import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ExhibitorStatus } from "@prisma/client";
import type { Locale } from "@/i18n/routing";
import { buildAlternates } from "@/lib/seo";
import { GradientSection } from "@/components/ui/gradient-section";
import { PageHero } from "@/components/layout/PageHero";
import { ExhibitorCard } from "@/components/exhibitors/ExhibitorCard";
import { ExhibitorFilters } from "@/components/exhibitors/ExhibitorFilters";
import {
  getExhibitors,
  getExhibitorCategories,
  getExhibitorCountries,
} from "@/server/services/exhibitors";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "ExhibitorsPage" });
  return {
    title: t("title"),
    description: t("lead"),
    alternates: buildAlternates(locale, "/exhibitors"),
  };
}

function parseStatus(v: string | undefined): ExhibitorStatus | undefined {
  return v && v in ExhibitorStatus ? (v as ExhibitorStatus) : undefined;
}

export default async function ExhibitorsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale } = await params;
  const sp = await searchParams;
  setRequestLocale(locale as Locale);
  const t = await getTranslations({ locale: locale as Locale, namespace: "ExhibitorsPage" });

  const str = (v: string | string[] | undefined) => (typeof v === "string" ? v : undefined);

  const [exhibitors, categories, countries] = await Promise.all([
    getExhibitors({
      search: str(sp.q),
      category: str(sp.category),
      country: str(sp.country),
      status: parseStatus(str(sp.status)),
    }),
    getExhibitorCategories(),
    getExhibitorCountries(),
  ]);

  return (
    <>
      <PageHero title={t("title")} lead={t("lead")} />
      <GradientSection variant="plain">
        <ExhibitorFilters categories={categories} countries={countries} />

        {exhibitors.length === 0 ? (
          <p className="py-16 text-center text-muted-foreground">{t("notFound")}</p>
        ) : (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {exhibitors.map((e) => (
              <ExhibitorCard key={e.id} exhibitor={e} />
            ))}
          </div>
        )}
      </GradientSection>
    </>
  );
}
