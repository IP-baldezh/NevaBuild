"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence, m } from "framer-motion";
import { useLocale } from "next-intl";
import { ChevronLeft, ChevronRight, MapPin, Calendar } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { formatDateRange } from "@/lib/format";
import type { Locale } from "@/i18n/routing";

const SLIDE_MS = 6500;
const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const EVENT_DATE = new Date("2027-03-18T10:00:00");

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function Countdown() {
  const [t, setT] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    function calc() {
      const diff = EVENT_DATE.getTime() - Date.now();
      if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      return {
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      };
    }
    setT(calc());
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);

  const items = [
    { val: t.days, label: "дней" },
    { val: t.hours, label: "часов" },
    { val: t.minutes, label: "минут" },
    { val: t.seconds, label: "сек" },
  ];

  return (
    <div className="flex items-center gap-3 md:gap-5">
      {items.map(({ val, label }, i) => (
        <div key={label} className="flex items-center gap-3 md:gap-5">
          <div className="text-center min-w-[44px]">
            <div
              className="font-black text-white tabular-nums leading-none"
              style={{ fontSize: "clamp(20px, 2.5vw, 34px)" }}
            >
              {pad(val)}
            </div>
            <div className="text-white/50 text-[10px] mt-1 uppercase tracking-wider">{label}</div>
          </div>
          {i < items.length - 1 && <span className="font-black text-white/40 text-lg mb-3">:</span>}
        </div>
      ))}
    </div>
  );
}

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
  overlay: string;
  accentGlow: string;
  label: string;
  line1: string;
  line2: string;
  line3?: string;
  accentLine: number;
  body: string;
  cta: { label: string; href: string };
  cta2?: { label: string; href: string };
};

export function Hero({ dateStart, dateEnd, venue, city }: HeroProps) {
  const locale = useLocale() as Locale;
  const dates = formatDateRange(dateStart, dateEnd, locale);
  const ru = locale === "ru";

  const slides: Slide[] = [
    {
      id: "main",
      img: "/images/hero-1.jpg",
      overlay:
        "linear-gradient(90deg, rgba(10,18,12,0.62) 0%, rgba(10,18,12,0.38) 60%, rgba(10,18,12,0.08) 100%)",
      accentGlow:
        "radial-gradient(ellipse 50% 70% at 5% 50%, rgba(18,182,105,0.22) 0%, transparent 60%)",
      label: ru ? "САНКТ-ПЕТЕРБУРГ · ЭКСПОФОРУМ" : "SAINT-PETERSBURG · EXPOFORUM",
      line1: "NEVA",
      line2: "BUILD",
      line3: "2027",
      accentLine: 1,
      body: ru
        ? "Международная строительно-интерьерная выставка Северо-Западного региона"
        : "International construction & interior exhibition of the Northwestern region",
      cta: { label: ru ? "Зарегистрироваться" : "Register", href: "/tickets" },
      cta2: { label: ru ? "Стать экспонентом" : "Become Exhibitor", href: "/exhibit" },
    },
    {
      id: "exhibit",
      img: "/images/hero-2.jpg",
      overlay:
        "linear-gradient(90deg, rgba(8,12,20,0.65) 0%, rgba(8,12,20,0.40) 55%, rgba(8,12,20,0.08) 100%)",
      accentGlow:
        "radial-gradient(ellipse 40% 60% at 5% 60%, rgba(18,182,105,0.15) 0%, transparent 55%)",
      label: ru
        ? "500+ КОМПАНИЙ · 25 000 м² · 35 СТРАН"
        : "500+ COMPANIES · 25 000 m² · 35 COUNTRIES",
      line1: ru ? "ГЛАВНАЯ" : "PREMIER",
      line2: ru ? "ПЛОЩАДКА" : "VENUE",
      line3: ru ? "ОТРАСЛИ" : "OF INDUSTRY",
      accentLine: -1,
      body: ru
        ? "Застройщики, дизайнеры, инженеры и поставщики материалов — все под одной крышей"
        : "Developers, designers, engineers and suppliers — all under one roof",
      cta: { label: ru ? "Посетить выставку" : "Visit Exhibition", href: "/tickets" },
      cta2: { label: ru ? "Деловая программа" : "Business Programme", href: "/program" },
    },
    {
      id: "program",
      img: "/images/hero-3.jpg",
      overlay:
        "linear-gradient(90deg, rgba(12,8,10,0.68) 0%, rgba(12,8,10,0.42) 55%, rgba(12,8,10,0.08) 100%)",
      accentGlow:
        "radial-gradient(ellipse 45% 65% at 5% 50%, rgba(225,27,34,0.12) 0%, transparent 55%)",
      label: ru ? "40+ КОНФЕРЕНЦИЙ И МАСТЕР-КЛАССОВ" : "40+ CONFERENCES & MASTERCLASSES",
      line1: ru ? "ТЕХНОЛОГИИ" : "TECHNOLOGIES",
      line2: ru ? "БУДУЩЕГО" : "OF THE FUTURE",
      line3: ru ? "СЕГОДНЯ" : "TODAY",
      accentLine: -1,
      body: ru
        ? "Практические конференции, воркшопы и живые демонстрации инновационных решений"
        : "Practical conferences, workshops and live demonstrations of innovative solutions",
      cta: { label: ru ? "Программа мероприятий" : "Event Programme", href: "/program" },
      cta2: { label: ru ? "Стать спикером" : "Become Speaker", href: "/about" },
    },
  ];

  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const [fading, setFading] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const go = useCallback(
    (next: number, d: number) => {
      if (fading) return;
      setDir(d);
      setFading(true);
      setTimeout(() => {
        setIdx(((next % slides.length) + slides.length) % slides.length);
        setFading(false);
      }, 400);
    },
    [fading, slides.length],
  );

  const next = useCallback(() => go(idx + 1, 1), [idx, go]);
  const prev = useCallback(() => go(idx - 1, -1), [idx, go]);

  useEffect(() => {
    timer.current = setTimeout(next, SLIDE_MS);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [idx, next]);

  const slide = slides[idx];
  const opacity = fading ? 0 : 1;

  return (
    <section
      className="relative flex flex-col overflow-hidden bg-nb-dark -mt-[72px]"
      style={{ minHeight: "100dvh" }}
      aria-label={`${slide.line1} ${slide.line2}`}
    >
      {/* Background photos */}
      {slides.map((s, i) => (
        <m.div
          key={s.id}
          className="absolute inset-0"
          animate={{ opacity: i === idx ? 1 : 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          aria-hidden
        >
          <Image
            src={s.img}
            alt=""
            fill
            priority={i === 0}
            className="object-cover object-center"
            sizes="100vw"
          />
        </m.div>
      ))}

      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0 transition-all duration-700"
        style={{ background: slide.overlay }}
        aria-hidden
      />

      {/* Accent glow */}
      <div
        className="absolute inset-0 transition-all duration-700"
        style={{ background: slide.accentGlow }}
        aria-hidden
      />

      {/* Left green accent line */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[3px]"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, #12B669 35%, #12B669 65%, transparent 100%)",
        }}
        aria-hidden
      />

      {/* Main content */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="container-neva w-full pt-[88px] pb-6">
          <div className="max-w-[680px]">
            <AnimatePresence mode="wait" custom={dir}>
              <m.div
                key={`content-${slide.id}`}
                custom={dir}
                variants={{
                  enter: (d: number) => ({ opacity: 0, y: d > 0 ? 40 : -40 }),
                  center: { opacity: 1, y: 0 },
                  exit: (d: number) => ({ opacity: 0, y: d > 0 ? -20 : 20 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease }}
              >
                {/* Badge */}
                <div
                  className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full"
                  style={{
                    background: "rgba(18,182,105,0.12)",
                    border: "1px solid rgba(18,182,105,0.28)",
                    opacity,
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-nb-green animate-pulse" />
                  <span className="font-bold text-nb-green-muted text-[11px] tracking-[0.14em] uppercase">
                    {slide.label}
                  </span>
                </div>

                {/* Title */}
                <h1
                  className="font-black leading-[0.88] tracking-tight text-white mb-5"
                  style={{
                    fontSize: "clamp(38px, 6vw, 82px)",
                    opacity,
                    transform: fading ? "translateY(16px)" : "translateY(0)",
                    transition: "transform 0.4s ease, opacity 0.4s ease",
                  }}
                >
                  {[slide.line1, slide.line2, slide.line3].filter(Boolean).map((word, i) => (
                    <span
                      key={i}
                      className="block"
                      style={{ color: i === slide.accentLine ? "#12B669" : "#fff" }}
                    >
                      {word}
                    </span>
                  ))}
                </h1>

                {/* Subtitle */}
                <p
                  className="text-white/80 mb-5 leading-relaxed"
                  style={{ fontSize: "clamp(13px, 1.4vw, 16px)", maxWidth: "520px", opacity }}
                >
                  {slide.body}
                </p>

                {/* Date + location pills */}
                <div className="flex flex-wrap gap-2 mb-6" style={{ opacity }}>
                  {[
                    {
                      icon: <Calendar className="size-3 text-nb-green" />,
                      text: dates,
                    },
                    {
                      icon: <MapPin className="size-3 text-nb-green" />,
                      text: `${city} · ${venue}`,
                    },
                  ].map(({ icon, text }) => (
                    <span
                      key={text}
                      className="flex items-center gap-1.5 font-semibold text-[13px] text-white px-3 py-2 rounded-xl"
                      style={{
                        background: "rgba(255,255,255,0.08)",
                        border: "1px solid rgba(255,255,255,0.12)",
                      }}
                    >
                      {icon} {text}
                    </span>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-3" style={{ opacity }}>
                  <Link
                    href={slide.cta.href}
                    className="inline-flex items-center gap-2 font-bold text-[14px] bg-white text-brand-red px-5 py-3 rounded-xl hover:-translate-y-0.5 transition-all duration-200"
                    style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.22)" }}
                  >
                    {slide.cta.label}
                    <span
                      aria-hidden
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </Link>
                  {slide.cta2 && (
                    <Link
                      href={slide.cta2.href}
                      className="inline-flex items-center gap-2 font-bold text-[14px] text-white px-5 py-3 rounded-xl hover:bg-white/10 transition-all duration-200"
                      style={{ border: "1px solid rgba(255,255,255,0.3)" }}
                    >
                      {slide.cta2.label}
                    </Link>
                  )}
                </div>
              </m.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Countdown strip */}
      <div
        className="relative z-10"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(0,0,0,0.22)",
        }}
      >
        <div className="container-neva py-5 flex items-center gap-6 flex-wrap">
          <span className="font-semibold text-white text-[11px] uppercase tracking-[0.18em] flex-none">
            {ru ? "До открытия выставки:" : "Until exhibition opens:"}
          </span>
          <Countdown />

          {/* Dots + arrows */}
          <div className="flex items-center gap-2 ml-auto">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i, i > idx ? 1 : -1)}
                aria-label={`${ru ? "Слайд" : "Slide"} ${i + 1}`}
                className="transition-all duration-300 rounded-full"
                style={{
                  width: i === idx ? "24px" : "8px",
                  height: "8px",
                  background: i === idx ? "#E11B22" : "rgba(255,255,255,0.35)",
                }}
              />
            ))}
            <button
              onClick={prev}
              aria-label={ru ? "Предыдущий" : "Previous"}
              className="ml-3 w-8 h-8 rounded-full flex items-center justify-center text-white transition-all hover:bg-white/20"
              style={{
                background: "rgba(255,255,255,0.10)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              onClick={next}
              aria-label={ru ? "Следующий" : "Next"}
              className="w-8 h-8 rounded-full flex items-center justify-center text-white transition-all hover:bg-white/20"
              style={{
                background: "rgba(255,255,255,0.10)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
