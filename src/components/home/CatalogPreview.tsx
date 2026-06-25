"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SectionTitle } from "@/components/ui/section-title";
import { ScrollReveal, StaggerReveal, StaggerItem } from "@/components/ui/scroll-reveal";
import { pick } from "@/lib/content";
import type { Locale } from "@/i18n/routing";
import type { ExhibitorWithCategories } from "@/server/services/exhibitors";

export function CatalogPreview({ exhibitors }: { exhibitors: ExhibitorWithCategories[] }) {
  const t = useTranslations("CatalogPreview");
  const locale = useLocale() as Locale;
  if (!exhibitors.length) return null;

  return (
    <>
      <ScrollReveal>
        <SectionTitle index="03" label={t("label")} title={t("title")} className="mb-14" />
      </ScrollReveal>

      <StaggerReveal
        stagger={0.05}
        className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {exhibitors.slice(0, 8).map((e, i) => (
          <StaggerItem key={e.id} className="flex flex-col">
            <Link
              href={`/exhibitors/${e.slug}`}
              className="group relative flex h-full flex-col gap-3 overflow-hidden bg-background p-7 transition-colors hover:bg-card"
            >
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-lime transition-transform duration-300 group-hover:scale-x-100"
              />
              <span className="text-xs text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-bold uppercase tracking-tight text-foreground">{e.name}</h3>
              {e.categories.length > 0 && (
                <span className="text-sm text-muted-foreground">
                  {pick(locale, e.categories[0].category.titleRu, e.categories[0].category.titleEn)}
                </span>
              )}
              <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-foreground transition-colors group-hover:text-lime">
                {t("more") || "Подробнее"}{" "}
                <span
                  aria-hidden
                  className="transition-transform duration-200 group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            </Link>
          </StaggerItem>
        ))}
      </StaggerReveal>

      <ScrollReveal className="mt-10 flex justify-center">
        <Link
          href="/exhibitors"
          className="inline-flex h-12 items-center gap-2 border border-border px-8 text-sm font-semibold uppercase tracking-wide text-foreground transition-colors hover:border-lime hover:text-lime"
        >
          {t("cta")}
        </Link>
      </ScrollReveal>
    </>
  );
}
