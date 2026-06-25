import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { buildAlternates } from "@/lib/seo";
import { GradientSection } from "@/components/ui/gradient-section";
import { PageHero } from "@/components/layout/PageHero";
import { NewsCard } from "@/components/news/NewsCard";
import { Reveal } from "@/components/ui/reveal";
import { getNewsList } from "@/server/services/news";

export const revalidate = 120;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "NewsPage" });
  return {
    title: t("title"),
    description: t("lead"),
    alternates: buildAlternates(locale, "/news"),
  };
}

export default async function NewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations({ locale: locale as Locale, namespace: "NewsPage" });
  const news = await getNewsList();

  return (
    <>
      <PageHero title={t("title")} lead={t("lead")} />
      <GradientSection variant="plain">
        {news.length === 0 ? (
          <p className="py-16 text-center text-muted-foreground">{t("empty")}</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {news.map((n, i) => (
              <Reveal key={n.id} delay={(i % 3) * 0.06}>
                <NewsCard item={n} />
              </Reveal>
            ))}
          </div>
        )}
      </GradientSection>
    </>
  );
}
