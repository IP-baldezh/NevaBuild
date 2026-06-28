import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { buildAlternates } from "@/lib/seo";
import { NewsCardDark } from "@/components/news/NewsCardDark";
import { getNewsList } from "@/server/services/news";
import { DarkBackground } from "@/components/layout/DarkBackground";
import { DarkPageHero } from "@/components/layout/DarkPageHero";
import { Reveal } from "@/components/ui/reveal";

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
    <div className="relative" style={{ background: "#07100a" }}>
      <DarkBackground sentinelId="news-end" />

      <DarkPageHero
        eyebrow={locale === "ru" ? "Новости" : "News"}
        title={t("title")}
        lead={t("lead")}
      />

      <section
        className="relative z-10 py-16 border-t"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="container-neva">
          {news.length === 0 ? (
            <p className="py-20 text-center" style={{ color: "rgba(255,255,255,0.4)" }}>
              {t("empty")}
            </p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {news.map((n, i) => (
                <Reveal key={n.id} delay={(i % 3) * 0.07}>
                  <NewsCardDark item={n} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <div id="news-end" aria-hidden />
    </div>
  );
}
