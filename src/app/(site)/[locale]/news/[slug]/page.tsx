import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { buildAlternates } from "@/lib/seo";
import { Link } from "@/i18n/navigation";
import { pick } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { getNewsBySlug, getAllNewsSlugs } from "@/server/services/news";
import { DarkBackground } from "@/components/layout/DarkBackground";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Reveal } from "@/components/ui/reveal";

export const revalidate = 120;
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getAllNewsSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const item = await getNewsBySlug(slug);
  if (!item) return {};
  const title = pick(locale as Locale, item.titleRu, item.titleEn);
  const description = pick(locale as Locale, item.excerptRu, item.excerptEn);
  return {
    title,
    description,
    alternates: buildAlternates(locale, `/news/${slug}`),
    openGraph: {
      title,
      description,
      type: "article",
      images: item.coverImageUrl ? [item.coverImageUrl] : undefined,
    },
  };
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations({ locale: locale as Locale, namespace: "Common" });

  const item = await getNewsBySlug(slug);
  if (!item) notFound();

  const lc = locale as Locale;
  const title = pick(lc, item.titleRu, item.titleEn);
  const category = pick(lc, item.categoryRu, item.categoryEn);
  const content = pick(lc, item.contentRu, item.contentEn);

  return (
    <article className="relative pb-24" style={{ background: "#07100a" }}>
      <DarkBackground sentinelId="news-article-end" />

      {/* Header */}
      <div
        className="relative z-10"
        style={{ paddingTop: "clamp(100px, 16vh, 160px)", paddingBottom: "clamp(40px, 6vh, 80px)" }}
      >
        <div className="container-neva max-w-3xl">
          <ScrollReveal>
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-sm font-semibold mb-8 transition-colors hover:text-[#a9ec46]"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              <ArrowLeft className="size-4" />
              {t("allNews")}
            </Link>

            <div className="flex items-center gap-3 mb-4">
              {category && (
                <span
                  className="text-[10px] font-bold uppercase tracking-[0.16em] px-3 py-1 rounded-full"
                  style={{ background: "rgba(169,236,70,0.1)", color: "#a9ec46" }}
                >
                  {category}
                </span>
              )}
              {item.publishedAt && (
                <time
                  className="text-sm"
                  style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-mulish)" }}
                >
                  {formatDate(item.publishedAt, lc)}
                </time>
              )}
            </div>

            <h1
              className="font-black text-white leading-[1.06]"
              style={{ fontSize: "clamp(24px, 4vw, 52px)", letterSpacing: "-0.01em" }}
            >
              {title}
            </h1>
          </ScrollReveal>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container-neva max-w-3xl">
        {item.coverImageUrl && (
          <Reveal>
            <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-3xl">
              <Image src={item.coverImageUrl} alt={title} fill className="object-cover" />
            </div>
          </Reveal>
        )}
        <Reveal delay={0.1}>
          <div
            className="leading-relaxed whitespace-pre-line"
            style={{
              fontSize: "clamp(15px, 1.2vw, 18px)",
              color: "rgba(255,255,255,0.7)",
              fontFamily: "var(--font-mulish)",
            }}
          >
            {content}
          </div>
        </Reveal>

        <div className="mt-12 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:text-[#a9ec46]"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            <ArrowLeft className="size-4" />
            {t("allNews")}
          </Link>
        </div>
      </div>

      <div id="news-article-end" aria-hidden />
    </article>
  );
}
