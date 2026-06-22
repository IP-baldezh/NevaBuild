"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SectionTitle } from "@/components/ui/section-title";
import { ScrollReveal, StaggerReveal, StaggerItem } from "@/components/ui/scroll-reveal";
import { pick } from "@/lib/content";
import { formatDate } from "@/lib/format";
import type { Locale } from "@/i18n/routing";
import type { News } from "@prisma/client";

export function NewsPreview({ news }: { news: News[] }) {
  const t = useTranslations("NewsPreview");
  const locale = useLocale() as Locale;
  if (!news.length) return null;

  return (
    <>
      <ScrollReveal>
        <SectionTitle
          index="07"
          label={t("label")}
          title={t("title")}
          className="mb-14"
        />
      </ScrollReveal>

      <StaggerReveal
        stagger={0.08}
        className="grid gap-px border border-border bg-border sm:grid-cols-2"
      >
        {news.slice(0, 4).map((n) => (
          <StaggerItem key={n.id} className="flex flex-col">
            <article className="group flex h-full flex-col gap-4 bg-background p-8 transition-colors hover:bg-card md:p-10">
              <time className="text-xs font-semibold uppercase tracking-wide text-lime">
                {formatDate(n.publishedAt ?? n.createdAt, locale)}
              </time>
              <h3 className="text-xl font-bold leading-tight text-foreground md:text-2xl">
                {pick(locale, n.titleRu, n.titleEn)}
              </h3>
              <p className="flex-1 text-pretty leading-relaxed text-muted-foreground">
                {pick(locale, n.excerptRu, n.excerptEn)}
              </p>
              <Link
                href={`/news/${n.slug}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors group-hover:text-lime"
              >
                {t("readMore")}{" "}
                <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </article>
          </StaggerItem>
        ))}
      </StaggerReveal>

      <ScrollReveal className="mt-10 flex justify-center">
        <Link
          href="/news"
          className="inline-flex h-12 items-center gap-2 border border-border px-8 text-sm font-semibold uppercase tracking-wide text-foreground transition-colors hover:border-lime hover:text-lime"
        >
          {t("cta")}
        </Link>
      </ScrollReveal>
    </>
  );
}
