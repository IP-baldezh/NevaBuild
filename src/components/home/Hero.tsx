"use client";

import { m } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { CalendarDays, MapPin } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { formatDateRange } from "@/lib/format";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import type { Locale } from "@/i18n/routing";

type HeroProps = {
  dateStart: string | Date;
  dateEnd: string | Date;
  venue: string;
  city: string;
  visitorCount: number;
  exhibitorCount: number;
  areaSize: number;
  programDays: number;
};

const ease = [0.21, 0.47, 0.32, 0.98] as [number, number, number, number];

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease },
  };
}

export function Hero({
  dateStart,
  dateEnd,
  venue,
  city,
  visitorCount,
  exhibitorCount,
  areaSize,
  programDays,
}: HeroProps) {
  const t = useTranslations("Hero");
  const tStats = useTranslations("Stats");
  const locale = useLocale() as Locale;
  const dates = formatDateRange(dateStart, dateEnd, locale);
  const sqm = locale === "ru" ? " м²" : " m²";

  const stats = [
    { num: visitorCount, suffix: "+", label: tStats("visitors") },
    { num: exhibitorCount, suffix: "+", label: tStats("companies") },
    { num: areaSize, suffix: sqm, label: tStats("area") },
    { num: programDays, suffix: "", label: tStats("days") },
  ];

  return (
    <section id="top" className="relative overflow-hidden bg-background">
      {/* Blueprint backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-blueprint opacity-40"
      />
      {/* Scan line */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-full overflow-hidden"
      >
        <div className="animate-scan-line absolute inset-x-0 h-px bg-lime/20" />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent"
      />

      <div className="container-neva relative pb-0 pt-28 md:pt-32 lg:pt-40">

        {/* Kicker */}
        <m.div
          className="flex items-center gap-3"
          {...fadeUp(0.05)}
        >
          <span className="animate-pulse-dot size-2 bg-brand-red" />
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            {t("kicker")}
          </span>
        </m.div>

        {/* Title */}
        <h1 className="mt-8 overflow-hidden text-6xl font-black uppercase leading-[0.92] tracking-tight text-foreground sm:text-7xl md:text-8xl lg:text-[9rem]">
          <m.span
            className="block"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
          >
            NEVA
          </m.span>
          <m.span
            className="block text-lime"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease }}
          >
            BUILD
          </m.span>
        </h1>

        {/* Subtitle */}
        <m.div {...fadeUp(0.4)}>
          <p className="mt-6 max-w-xl text-balance text-2xl font-semibold text-foreground md:text-3xl">
            {t("subtitle")}
          </p>
          <p className="mt-2 max-w-xl text-pretty text-lg text-muted-foreground">
            {t("tagline")}
          </p>
        </m.div>

        {/* Meta — dates and location */}
        <m.div
          className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-10"
          {...fadeUp(0.5)}
        >
          <div className="flex items-center gap-3">
            <CalendarDays className="size-5 shrink-0 text-lime" />
            <span className="text-lg font-bold text-foreground">{dates}</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="size-5 shrink-0 text-lime" />
            <span className="text-lg font-bold text-foreground">
              {city} / {venue}
            </span>
          </div>
        </m.div>

        {/* CTAs */}
        <m.div
          className="mt-10 flex flex-col gap-3 sm:flex-row"
          {...fadeUp(0.6)}
        >
          <Link
            href="/exhibit"
            className="group inline-flex h-12 items-center justify-center gap-2 bg-lime px-6 text-sm font-semibold uppercase tracking-wide text-lime-foreground transition-all hover:bg-foreground hover:glow-lime"
          >
            {t("ctaStand")}
            <span
              aria-hidden
              className="inline-block translate-x-0 transition-transform duration-200 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
          <Link
            href="/tickets"
            className="group inline-flex h-12 items-center justify-center gap-2 border border-border px-6 text-sm font-semibold uppercase tracking-wide text-foreground transition-colors hover:border-lime hover:text-lime"
          >
            {t("ctaTicket")}
          </Link>
        </m.div>

        {/* Stats cards */}
        <m.div
          className="mt-16 grid grid-cols-2 border-t border-border lg:mt-24 lg:grid-cols-4"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1, delayChildren: 0.7 } },
          }}
        >
          {stats.map((s, i) => (
            <m.div
              key={s.label}
              className="group border-b border-border p-6 transition-colors hover:bg-card md:p-8 lg:border-b-0 lg:border-r lg:last:border-r-0 [&:nth-child(odd)]:border-r lg:[&:nth-child(2)]:border-r"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
              }}
            >
              <span className="text-xs text-lime">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="mt-3 text-4xl font-black tracking-tight text-foreground transition-colors group-hover:text-lime md:text-5xl">
                <AnimatedCounter
                  value={s.num}
                  suffix={s.suffix}
                  locale={locale}
                  duration={1800}
                  delay={700 + i * 100}
                />
              </div>
              <div className="mt-1 text-sm uppercase tracking-wide text-muted-foreground">
                {s.label}
              </div>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
}
