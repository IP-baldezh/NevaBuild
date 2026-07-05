"use client";

import { useLocale, useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { pick } from "@/lib/content";
import { formatDate } from "@/lib/format";
import type { Locale } from "@/i18n/routing";
import type { News } from "@prisma/client";

const TAG_LABELS_RU = ["Анонс", "Новость", "Деловая программа", "Участники"];
const TAG_LABELS_EN = ["Announcement", "News", "Business Programme", "Participants"];

const NEWS_FALLBACKS = [
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&fit=crop",
  "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=800&fit=crop",
  "https://images.unsplash.com/photo-1590644365607-7eff9b2ce5b1?q=80&w=800&fit=crop",
];

export function NewsPreview({ news }: { news: News[] }) {
  const t = useTranslations("NewsPreview");
  const locale = useLocale() as Locale;
  const TAG_LABELS = locale === "ru" ? TAG_LABELS_RU : TAG_LABELS_EN;
  if (!news.length) return null;

  return (
    <section
      id="news"
      className="relative z-10 py-10 sm:py-20"
      style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
    >
      <div className="container-neva">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-14">
          <div>
            <span
              className="text-[11px] uppercase tracking-[0.28em] mb-3 block font-bold"
              style={{ color: "#a9ec46", fontFamily: "var(--font-mulish)" }}
            >
              {locale === "ru" ? "Актуальное" : "Latest"}
            </span>
            <h2
              className="font-black text-white leading-tight"
              style={{ fontSize: "clamp(28px, 4vw, 50px)" }}
            >
              {t("title")}
            </h2>
          </div>
          <Link
            href="/news"
            className="inline-flex items-center gap-2 font-bold text-[14px] pb-0.5 transition-all duration-200 self-start sm:self-auto"
            style={{ color: "#a9ec46", borderBottom: "1px solid rgba(169,236,70,0.4)" }}
          >
            {t("cta")}
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {news.slice(0, 3).map((n, i) => {
            const tagLabel = TAG_LABELS[i % TAG_LABELS.length];
            const coverSrc = n.coverImageUrl || NEWS_FALLBACKS[i % NEWS_FALLBACKS.length];
            return (
              <article
                key={n.id}
                className="group rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <div className="h-44 relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={coverSrc}
                    alt=""
                    aria-hidden
                    draggable={false}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background:
                        "radial-gradient(ellipse at 70% 30%, rgba(169,236,70,0.08) 0%, transparent 70%)",
                    }}
                    aria-hidden
                  />
                </div>

                <div className="p-5 sm:p-6 flex flex-col flex-1 gap-3">
                  <div className="flex items-center gap-3">
                    <span
                      className="text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full"
                      style={{ background: "rgba(169,236,70,0.12)", color: "#a9ec46" }}
                    >
                      {tagLabel}
                    </span>
                    <time
                      className="text-[12px]"
                      style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-mulish)" }}
                    >
                      {formatDate(n.publishedAt ?? n.createdAt, locale)}
                    </time>
                  </div>

                  <h3 className="font-black text-[16px] text-white group-hover:text-nb-lime-acid leading-snug transition-colors duration-200">
                    {pick(locale, n.titleRu, n.titleEn)}
                  </h3>

                  {(n.excerptRu || n.excerptEn) && (
                    <p
                      className="text-[13px] leading-relaxed flex-1"
                      style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-mulish)" }}
                    >
                      {pick(locale, n.excerptRu ?? "", n.excerptEn ?? "")}
                    </p>
                  )}

                  <Link
                    href={`/news/${n.slug}`}
                    className="inline-flex items-center gap-2 font-bold text-[13px] mt-2 transition-colors"
                    style={{ color: "rgba(169,236,70,0.7)" }}
                  >
                    {locale === "ru" ? "Читать далее" : "Read more"}
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
