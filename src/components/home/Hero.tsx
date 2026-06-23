"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence, m } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { CalendarDays, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { formatDateRange } from "@/lib/format";
import type { Locale } from "@/i18n/routing";

const SLIDE_MS = 5500;
const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

export type HeroProps = {
  dateStart: string | Date;
  dateEnd: string | Date;
  venue: string;
  city: string;
  visitorCount: number;
  exhibitorCount: number;
  areaSize: number;
  programDays: number;
};

type Slide = {
  id: string;
  img: string;
  kicker: string;
  line1: string;
  line2: string;
  accentLine: 0 | 1;
  body: string;
  cta: { label: string; href: string };
  cta2?: { label: string; href: string };
};

export function Hero({ dateStart, dateEnd, venue, city }: HeroProps) {
  const locale = useLocale() as Locale;
  const t = useTranslations("Hero");
  const dates = formatDateRange(dateStart, dateEnd, locale);
  const ru = locale === "ru";

  const slides: Slide[] = [
    {
      id: "main",
      img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1920&h=1080&q=80",
      kicker: t("kicker"),
      line1: "NEVA",
      line2: "BUILD",
      accentLine: 1,
      body: t("tagline"),
      cta: { label: t("ctaTicket"), href: "/tickets" },
      cta2: { label: t("ctaStand"), href: "/exhibit" },
    },
    {
      id: "exhibit",
      img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1920&h=1080&q=80",
      kicker: ru ? "Участникам выставки" : "For Exhibitors",
      line1: ru ? "СТАТЬ" : "BECOME",
      line2: ru ? "УЧАСТНИКОМ" : "EXHIBITOR",
      accentLine: 0,
      body: ru
        ? "Представьте продукцию тысячам специалистов строительной индустрии"
        : "Present your products to thousands of construction industry specialists",
      cta: { label: ru ? "Подать заявку" : "Apply Now", href: "/exhibit" },
      cta2: { label: ru ? "Смотреть участников" : "View Exhibitors", href: "/exhibitors" },
    },
    {
      id: "program",
      img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1920&h=1080&q=80",
      kicker: ru ? "Деловая программа" : "Business Programme",
      line1: ru ? "ФОРУМЫ" : "FORUMS",
      line2: ru ? "И СОБЫТИЯ" : "& EVENTS",
      accentLine: 1,
      body: ru
        ? "Ведущие эксперты отрасли — конференции, мастер-классы и презентации"
        : "Leading industry experts — conferences, workshops and presentations",
      cta: { label: ru ? "Программа" : "Programme", href: "/program" },
      cta2: { label: ru ? "Купить билет" : "Get Ticket", href: "/tickets" },
    },
  ];

  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const go = useCallback(
    (next: number, d: number) => {
      setDir(d);
      setIdx(((next % slides.length) + slides.length) % slides.length);
    },
    [slides.length],
  );

  useEffect(() => {
    if (paused) return;
    timer.current = setTimeout(() => go(idx + 1, 1), SLIDE_MS);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [idx, paused, go]);

  const slide = slides[idx];

  return (
    <section
      className="relative overflow-hidden"
      style={{ height: "100dvh", minHeight: 640 }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label={`${slide.line1} ${slide.line2}`}
    >
      {/* Background images — all pre-rendered, toggled by opacity */}
      {slides.map((s, i) => (
        <m.div
          key={s.id}
          className="absolute inset-0"
          animate={{ opacity: i === idx ? 1 : 0 }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
          aria-hidden
        >
          <Image
            src={s.img}
            alt=""
            fill
            priority={i === 0}
            className="object-cover"
            unoptimized
          />
        </m.div>
      ))}

      {/* Dark overlays */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/65 via-black/20 to-transparent"
      />

      {/* Subtle blueprint grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-blueprint opacity-20" />

      {/* Main content */}
      <div className="container-neva relative flex h-full flex-col justify-end pb-28 pt-32">
        <AnimatePresence mode="wait" custom={dir}>
          <m.div
            key={`content-${slide.id}`}
            custom={dir}
            variants={{
              enter: (d: number) => ({ opacity: 0, y: d > 0 ? 52 : -52 }),
              center: { opacity: 1, y: 0 },
              exit: (d: number) => ({ opacity: 0, y: d > 0 ? -28 : 28 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6, ease }}
          >
            {/* Kicker */}
            <div className="mb-8 flex items-center gap-3">
              <span
                aria-hidden
                className="animate-pulse-dot size-2 shrink-0 bg-lime"
              />
              <span className="text-xs uppercase tracking-[0.3em] text-white/65">
                {slide.kicker}
              </span>
            </div>

            {/* Title */}
            <h1
              className="font-black uppercase leading-[0.88] tracking-tight"
              style={{ fontSize: "clamp(3.5rem, 12vw, 10.5rem)" }}
            >
              <span
                className={slide.accentLine === 0 ? "block text-lime" : "block text-white"}
              >
                {slide.line1}
              </span>
              <span
                className={slide.accentLine === 1 ? "block text-lime" : "block text-white"}
              >
                {slide.line2}
              </span>
            </h1>

            {/* Body */}
            <p className="mt-6 max-w-lg text-base font-medium leading-relaxed text-white/72 sm:text-lg">
              {slide.body}
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={slide.cta.href}
                className="group inline-flex h-12 items-center justify-center gap-2 bg-lime px-7 text-sm font-bold uppercase tracking-wide text-lime-foreground transition-all hover:bg-white hover:text-black"
              >
                {slide.cta.label}
                <span
                  aria-hidden
                  className="inline-block transition-transform duration-200 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
              {slide.cta2 && (
                <Link
                  href={slide.cta2.href}
                  className="inline-flex h-12 items-center justify-center gap-2 border border-white/30 px-7 text-sm font-bold uppercase tracking-wide text-white transition-all hover:border-lime hover:text-lime"
                >
                  {slide.cta2.label}
                </Link>
              )}
            </div>
          </m.div>
        </AnimatePresence>
      </div>

      {/* Arrow navigation */}
      <button
        onClick={() => go(idx - 1, -1)}
        className="absolute left-4 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center border border-white/20 bg-black/20 text-white backdrop-blur-sm transition-colors hover:border-lime hover:text-lime md:left-8"
        aria-label={ru ? "Предыдущий слайд" : "Previous slide"}
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        onClick={() => go(idx + 1, 1)}
        className="absolute right-4 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center border border-white/20 bg-black/20 text-white backdrop-blur-sm transition-colors hover:border-lime hover:text-lime md:right-8"
        aria-label={ru ? "Следующий слайд" : "Next slide"}
      >
        <ChevronRight className="size-5" />
      </button>

      {/* Bottom bar */}
      <div className="absolute bottom-7 inset-x-0">
        <div className="container-neva flex items-center gap-5">
          {/* Dot indicators */}
          <div className="flex items-center gap-2">
            {slides.map((s, i) => (
              <button
                key={s.id}
                onClick={() => go(i, i > idx ? 1 : -1)}
                aria-label={`${ru ? "Слайд" : "Slide"} ${i + 1}`}
                className={`h-px transition-all duration-300 ${
                  i === idx
                    ? "w-8 bg-lime"
                    : "w-4 bg-white/35 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

          {/* Slide counter */}
          <span className="font-mono text-xs tabular-nums text-white/40">
            {String(idx + 1).padStart(2, "0")} /{" "}
            {String(slides.length).padStart(2, "0")}
          </span>

          {/* Date + venue — right side */}
          <div className="ml-auto hidden items-center gap-6 text-sm text-white/55 md:flex">
            <div className="flex items-center gap-2">
              <CalendarDays className="size-4 shrink-0 text-lime" />
              <span className="font-medium">{dates}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="size-4 shrink-0 text-lime" />
              <span>
                {city} · {venue}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 inset-x-0 h-[2px] bg-white/10">
        <m.div
          key={`prog-${idx}-${paused ? "p" : "r"}`}
          className="h-full bg-lime"
          initial={{ scaleX: 0 }}
          animate={paused ? { scaleX: 0 } : { scaleX: 1 }}
          transition={paused ? { duration: 0 } : { duration: SLIDE_MS / 1000, ease: "linear" }}
          style={{ transformOrigin: "left" }}
        />
      </div>
    </section>
  );
}
