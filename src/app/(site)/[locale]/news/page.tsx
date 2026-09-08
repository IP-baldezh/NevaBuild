import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { buildAlternates } from "@/lib/seo";
import { Link } from "@/i18n/navigation";
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
  const ru = locale === "ru";

  return (
    <div className="relative" style={{ background: "#07100a" }}>
      <DarkBackground sentinelId="news-end" />

      <DarkPageHero eyebrow={ru ? "Новости" : "News"} title={t("title")} lead={t("lead")} />

      <section
        className="relative z-10 py-16 border-t"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="container-neva">
          {news.length === 0 ? (
            <p className="py-20 text-center" style={{ color: "rgba(255,255,255,0.65)" }}>
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

      {/* CTA */}
      <section
        className="relative z-10 py-14 sm:py-20 border-t"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="container-neva text-center max-w-2xl mx-auto">
          <span
            className="text-[11px] uppercase tracking-[0.28em] mb-4 block font-bold"
            style={{ color: "#a9ec46", fontFamily: "var(--font-mulish)" }}
          >
            NEVA BUILD 2028
          </span>
          <h2
            className="font-black text-white leading-[1.02] mb-4"
            style={{ fontSize: "clamp(24px, 4vw, 52px)" }}
          >
            {ru ? "Будьте в курсе событий" : "Stay up to date"}
          </h2>
          <p
            className="mb-10 leading-relaxed"
            style={{
              color: "rgba(255,255,255,0.75)",
              fontFamily: "var(--font-mulish)",
              fontSize: "clamp(14px, 1.2vw, 17px)",
            }}
          >
            {ru
              ? "Получайте свежие анонсы участников и деловой программы — оформите билет или станьте экспонентом."
              : "Get the latest exhibitor announcements and programme updates — register or become an exhibitor."}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/tickets"
              className="inline-flex items-center rounded-xl font-black text-[12px] tracking-[0.18em] uppercase px-8 py-4 transition-all duration-200 hover:brightness-110"
              style={{ background: "#a9ec46", color: "#0d2d06" }}
            >
              {ru ? "Получить билет" : "Get a Ticket"}
            </Link>
            <Link
              href="/exhibit"
              className="inline-flex items-center rounded-xl font-black text-[12px] tracking-[0.14em] uppercase px-8 py-4 border transition-all duration-200 hover:bg-white/10"
              style={{ borderColor: "rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.90)" }}
            >
              {ru ? "Стать экспонентом" : "Become Exhibitor"}
            </Link>
          </div>
        </div>
      </section>

      <div id="news-end" aria-hidden />
    </div>
  );
}
