"use client";

import { useLocale, useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { pick } from "@/lib/content";
import { formatDate } from "@/lib/format";
import type { Locale } from "@/i18n/routing";
import type { News } from "@prisma/client";

const TAG_COLORS = [
  "bg-nb-green/10 text-nb-green-dark",
  "bg-brand-red/10 text-brand-red",
  "bg-violet-500/10 text-violet-700",
  "bg-amber-500/10 text-amber-700",
];

const TAG_LABELS = ["Анонс", "Новость", "Деловая программа", "Участники"];

export function NewsPreview({ news }: { news: News[] }) {
  const t = useTranslations("NewsPreview");
  const locale = useLocale() as Locale;
  if (!news.length) return null;

  return (
    <section id="news" className="py-20 bg-white">
      <div className="container-neva">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <span className="font-bold text-[11px] text-nb-green uppercase tracking-[3px] mb-3 block">
              {t("label")}
            </span>
            <h2
              className="font-black text-nb-dark leading-tight"
              style={{ fontSize: "clamp(30px, 4vw, 50px)" }}
            >
              {t("title")}
            </h2>
          </div>
          <ScrollReveal>
            <Link
              href="/news"
              className="inline-flex items-center gap-2 font-bold text-[14px] text-nb-green-dark hover:text-nb-lime-acid border-b border-nb-green/40 hover:border-nb-lime-acid pb-0.5 transition-all duration-200 self-start sm:self-auto"
            >
              {t("cta")}
              <ArrowRight className="size-4" />
            </Link>
          </ScrollReveal>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.slice(0, 3).map((n, i) => {
            const tagColor = TAG_COLORS[i % TAG_COLORS.length];
            const tagLabel = TAG_LABELS[i % TAG_LABELS.length];
            return (
              <article
                key={n.id}
                className="group bg-white border border-nb-border hover:border-nb-lime-acid/50 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-nb-green/8"
              >
                {/* Image placeholder */}
                <div
                  className="h-48 flex items-center justify-center bg-nb-bg-light relative overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, #F4FAF6 0%, #EAF8F0 100%)",
                  }}
                >
                  <span
                    className="font-black text-nb-border"
                    style={{ fontSize: "clamp(3rem, 8vw, 5rem)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background:
                        "radial-gradient(ellipse at 70% 30%, rgba(18,182,105,0.12) 0%, transparent 70%)",
                    }}
                    aria-hidden
                  />
                </div>

                <div className="p-7 flex flex-col flex-1 gap-3">
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full ${tagColor}`}
                    >
                      {tagLabel}
                    </span>
                    <time className="text-[12px] text-nb-muted">
                      {formatDate(n.publishedAt ?? n.createdAt, locale)}
                    </time>
                  </div>

                  <h3 className="font-black text-[17px] text-nb-dark leading-snug">
                    {pick(locale, n.titleRu, n.titleEn)}
                  </h3>

                  {(n.excerptRu || n.excerptEn) && (
                    <p className="text-[14px] text-nb-muted-dark leading-relaxed flex-1">
                      {pick(locale, n.excerptRu ?? "", n.excerptEn ?? "")}
                    </p>
                  )}

                  <Link
                    href={`/news/${n.slug}`}
                    className="inline-flex items-center gap-2 font-bold text-[13px] text-nb-green-dark group-hover:text-nb-green mt-2 transition-colors"
                  >
                    Читать далее
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
