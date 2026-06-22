"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SectionTitle } from "@/components/ui/section-title";
import { ScrollReveal, StaggerReveal, StaggerItem } from "@/components/ui/scroll-reveal";
import { getCategoryIcon } from "@/lib/category-icons";
import { pick } from "@/lib/content";
import type { Locale } from "@/i18n/routing";
import type { ExhibitorCategory } from "@prisma/client";

export function SectionsGrid({ categories }: { categories: ExhibitorCategory[] }) {
  const t = useTranslations("Sections");
  const locale = useLocale() as Locale;

  return (
    <>
      <ScrollReveal>
        <SectionTitle
          index="02"
          label={t("label")}
          title={t("title")}
          description={t("description") || undefined}
          className="mb-14"
        />
      </ScrollReveal>

      {/* Один StaggerReveal = один IntersectionObserver на весь grid */}
      <StaggerReveal
        stagger={0.05}
        className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {categories.map((c, i) => {
          const Icon = getCategoryIcon(c.icon);
          return (
            <StaggerItem key={c.id} className="flex flex-col">
              <Link
                href={`/exhibitors?category=${c.slug}`}
                className="group relative flex h-full flex-col gap-4 overflow-hidden bg-background p-7 transition-colors hover:bg-card"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-lime transition-transform duration-300 group-hover:scale-x-100"
                />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Icon className="size-6 text-lime transition-transform duration-300 group-hover:scale-110" />
                </div>
                <h3 className="text-base font-bold uppercase leading-tight tracking-tight text-foreground">
                  {pick(locale, c.titleRu, c.titleEn)}
                </h3>
                <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-foreground transition-colors group-hover:text-lime">
                  {t("more")}{" "}
                  <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </span>
              </Link>
            </StaggerItem>
          );
        })}
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
