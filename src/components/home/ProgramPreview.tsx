"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SectionTitle } from "@/components/ui/section-title";
import { ScrollReveal, StaggerReveal, StaggerItem } from "@/components/ui/scroll-reveal";
import { pick } from "@/lib/content";
import { formatTime } from "@/lib/format";
import type { Locale } from "@/i18n/routing";
import type { ProgramDayWithSessions } from "@/server/services/program";

export function ProgramPreview({ days }: { days: ProgramDayWithSessions[] }) {
  const t = useTranslations("ProgramPreview");
  const tp = useTranslations("ProgramPage");
  const locale = useLocale() as Locale;

  const day = days[0];
  if (!day || day.sessions.length === 0) return null;
  const sessions = day.sessions.slice(0, 4);

  return (
    <>
      <ScrollReveal>
        <SectionTitle index="04" label={t("label")} title={t("title")} className="mb-14" />
      </ScrollReveal>

      <StaggerReveal stagger={0.08} className="grid gap-px border border-border bg-border">
        {sessions.map((s) => (
          <StaggerItem key={s.id}>
            <div className="flex flex-col gap-3 bg-background p-6 transition-colors hover:bg-card sm:flex-row sm:items-center sm:gap-8 md:p-8">
              <time className="w-32 shrink-0 text-sm font-bold text-lime">
                {formatTime(s.startTime, locale)} – {formatTime(s.endTime, locale)}
              </time>
              <div className="flex-1">
                <h4 className="font-bold text-foreground">{pick(locale, s.titleRu, s.titleEn)}</h4>
                {(s.hallRu || s.hallEn) && (
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {pick(locale, s.hallRu, s.hallEn)}
                  </p>
                )}
              </div>
              <span className="shrink-0 border border-border px-3 py-1 text-xs uppercase tracking-wide text-muted-foreground">
                {tp(`type.${s.type}`)}
              </span>
            </div>
          </StaggerItem>
        ))}
      </StaggerReveal>

      <ScrollReveal className="mt-10 flex justify-center">
        <Link
          href="/program"
          className="group inline-flex h-12 items-center gap-2 bg-lime px-8 text-sm font-semibold uppercase tracking-wide text-lime-foreground transition-colors hover:bg-foreground"
        >
          {t("cta")}
          <span aria-hidden className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
      </ScrollReveal>
    </>
  );
}
