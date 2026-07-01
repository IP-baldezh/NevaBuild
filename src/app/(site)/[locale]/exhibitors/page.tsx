import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ExhibitorStatus } from "@prisma/client";
import type { Locale } from "@/i18n/routing";
import { buildAlternates } from "@/lib/seo";
import { ExhibitorCardDark } from "@/components/exhibitors/ExhibitorCardDark";
import { ExhibitorFilters } from "@/components/exhibitors/ExhibitorFilters";
import {
  getExhibitors,
  getExhibitorCategories,
  getExhibitorCountries,
} from "@/server/services/exhibitors";
import { DarkBackground } from "@/components/layout/DarkBackground";
import { DarkPageHero } from "@/components/layout/DarkPageHero";
import { Reveal } from "@/components/ui/reveal";

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
    <div className="relative" style={{ background: "#07100a" }}>
      <DarkBackground sentinelId="exhibitors-end" />

      <DarkPageHero
        eyebrow={locale === "ru" ? "Каталог" : "Catalog"}
        title={t("title")}
        lead={t("lead")}
      />

      <section
        className="relative z-10 py-16 border-t"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="container-neva">
          <ExhibitorFilters categories={categories} countries={countries} />

          {exhibitors.length === 0 ? (
            <p className="py-20 text-center" style={{ color: "rgba(255,255,255,0.4)" }}>
              {t("notFound")}
            </p>
          ) : (
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {exhibitors.map((e, i) => (
                <Reveal key={e.id} delay={(i % 4) * 0.06}>
                  <ExhibitorCardDark exhibitor={e} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <div id="exhibitors-end" aria-hidden />
    </div>
  );
}
