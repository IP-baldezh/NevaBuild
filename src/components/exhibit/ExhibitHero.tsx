"use client";

import { m } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import type { Locale } from "@/i18n/routing";

const MARQUEE = "УЧАСТНИКАМ · NEVA BUILD · FOR EXHIBITORS · NEVA BUILD · ";

type Props = {
  dateRange: string;
  venue: string;
  city: string;
};

export function ExhibitHero({ dateRange, venue, city }: Props) {
  const locale = useLocale() as Locale;
  const ru = locale === "ru";
  const t = useTranslations("ExhibitPage");

  return (
    <section
      id="e-hero"
      className="relative overflow-hidden"
      style={{ height: "100svh", minHeight: "560px" }}
    >
      {/* Left vertical accent line */}
      <div
        className="max-sm:hidden absolute left-0 top-0 bottom-0 w-[3px] z-10"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, #12B669 25%, #12B669 75%, transparent 100%)",
        }}
        aria-hidden
      />

      {/* Content */}
      <div
        className="container-neva relative z-10 flex flex-col"
        style={{ paddingTop: "clamp(110px, 18vh, 200px)" }}
      >
        <m.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[680px]"
        >
          <m.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="block text-[11px] uppercase tracking-[0.28em] mb-5 font-bold"
            style={{ color: "#a9ec46", fontFamily: "var(--font-mulish)" }}
          >
            {ru ? "Участникам" : "For Exhibitors"}
          </m.span>

          <h1
            className="font-black text-white leading-[1.02] mb-5"
            style={{ fontSize: "clamp(32px, 6vw, 88px)", letterSpacing: "-0.02em" }}
          >
            {ru ? (
              <>
                Станьте
                <br />
                <span style={{ color: "rgba(255,255,255,0.28)" }}>участником.</span>
              </>
            ) : (
              <>
                Become an
                <br />
                <span style={{ color: "rgba(255,255,255,0.28)" }}>exhibitor.</span>
              </>
            )}
          </h1>

          <p
            className="text-white/55 mb-8 leading-relaxed"
            style={{
              fontSize: "clamp(13px, 1.2vw, 17px)",
              fontFamily: "var(--font-mulish)",
              maxWidth: "500px",
            }}
          >
            {t("lead")}
          </p>

          <m.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap gap-3"
          >
            <a
              href="#e-form"
              className="inline-flex items-center rounded-xl font-black text-[12px] tracking-[0.18em] uppercase px-8 py-4 transition-all duration-200 hover:brightness-110 touch-manipulation"
              style={{ background: "#a9ec46", color: "#0d2d06" }}
            >
              {ru ? "Оставить заявку" : "Submit Request"}
            </a>
            <a
              href="#e-formats"
              className="inline-flex items-center rounded-xl font-black text-[12px] tracking-[0.14em] uppercase px-8 py-4 border transition-all duration-200 hover:bg-white/10 touch-manipulation"
              style={{ borderColor: "rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.75)" }}
            >
              {ru ? "Форматы участия" : "Participation Formats"}
            </a>
          </m.div>

          <p
            className="font-bold text-white/30 mt-8 tracking-[0.14em]"
            style={{ fontSize: "clamp(11px, 0.9vw, 13px)", fontFamily: "var(--font-mulish)" }}
          >
            {dateRange} / {city.toUpperCase()} · {venue.toUpperCase()}
          </p>
        </m.div>
      </div>

      {/* MARQUEE TICKER */}
      <div
        className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none select-none"
        style={{ height: "clamp(60px, 10vw, 130px)" }}
        aria-hidden
      >
        <m.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, ease: "linear", repeat: Infinity }}
          className="flex whitespace-nowrap absolute bottom-0 left-0"
          style={{ width: "max-content" }}
        >
          {[0, 1].map((i) => (
            <span
              key={i}
              className="font-black text-white"
              style={{
                fontSize: "clamp(60px, 10vw, 130px)",
                lineHeight: 0.88,
                letterSpacing: "-0.02em",
                opacity: 0.9,
              }}
            >
              {MARQUEE}
            </span>
          ))}
        </m.div>
      </div>
    </section>
  );
}
