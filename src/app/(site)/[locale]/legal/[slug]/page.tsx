import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { buildAlternates } from "@/lib/seo";
import { GradientSection } from "@/components/ui/gradient-section";
import { PageHero } from "@/components/layout/PageHero";

const SLUGS = ["privacy", "terms", "consent", "offer"] as const;
type LegalSlug = (typeof SLUGS)[number];

export const dynamicParams = false;

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!SLUGS.includes(slug as LegalSlug)) return {};
  const t = await getTranslations({ locale: locale as Locale, namespace: "Footer" });
  const TITLES = {
    privacy: t("privacy"),
    terms: t("terms"),
    consent: t("consent"),
    offer: t("offer"),
  } satisfies Record<LegalSlug, string>;
  return {
    title: TITLES[slug as LegalSlug],
    alternates: buildAlternates(locale, `/legal/${slug}`),
    robots: { index: false },
  };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!SLUGS.includes(slug as LegalSlug)) notFound();
  setRequestLocale(locale as Locale);
  const tf = await getTranslations({ locale: locale as Locale, namespace: "Footer" });
  const tl = await getTranslations({ locale: locale as Locale, namespace: "Legal" });

  return (
    <>
      <PageHero title={tf(slug as LegalSlug)} />
      <GradientSection variant="plain">
        <div className="mx-auto max-w-3xl text-pretty leading-relaxed text-muted-foreground">
          <p>{tl("placeholder")}</p>
        </div>
      </GradientSection>
    </>
  );
}
