"use client";

import { useState } from "react";
import { m } from "framer-motion";
import { useLocale } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { VisitorModal } from "@/components/modals/VisitorModal";
import { ExhibitorModal } from "@/components/modals/ExhibitorModal";

type Props = {
  lead: string;
  dateRange: string;
  venue: string;
  city: string;
};

const MARQUEE = "NEVA BUILD · NEVA BUILD · NEVA BUILD · NEVA BUILD · NEVA BUILD · NEVA BUILD · ";

export function AboutHero({ lead, dateRange, venue, city }: Props) {
  const locale = useLocale() as Locale;
  const ru = locale === "ru";
  const [visitorOpen, setVisitorOpen] = useState(false);
  const [exhibitorOpen, setExhibitorOpen] = useState(false);

  return (
    <section
      id="s-hero"
      className="relative overflow-hidden"
      style={{ height: "100svh", minHeight: "560px" }}
    >
      {/* Left vertical accent line */}
      <div
        className="max-sm:hidden absolute left-0 top-0 bottom-0 w-[3px] z-10"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, #a9ec46 25%, #a9ec46 75%, transparent 100%)",
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
          className="max-w-[620px]"
        >
          <h1
            className="font-black text-white leading-[1.08] mb-5"
            style={{ fontSize: "clamp(26px, 3.2vw, 52px)", letterSpacing: "0.03em" }}
          >
            {ru
              ? "МЕЖДУНАРОДНАЯ СТРОИТЕЛЬНО-ИНТЕРЬЕРНАЯ ВЫСТАВКА И ФОРУМ"
              : "INTERNATIONAL CONSTRUCTION & INTERIOR EXHIBITION AND FORUM"}
          </h1>

          <p
            className="text-white/85 mb-5 leading-relaxed"
            style={{
              fontSize: "clamp(13px, 1.2vw, 16px)",
              fontFamily: "var(--font-mulish)",
              maxWidth: "460px",
            }}
          >
            {lead}
          </p>

          <p
            className="font-bold text-white/70 mb-8 tracking-[0.14em]"
            style={{ fontSize: "clamp(11px, 0.9vw, 13px)", fontFamily: "var(--font-mulish)" }}
          >
            {dateRange} / {city.toUpperCase()} · {venue.toUpperCase()}
          </p>

          <m.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap gap-3"
          >
            <button
              type="button"
              onClick={() => setVisitorOpen(true)}
              className="inline-flex items-center rounded-xl font-black text-[12px] tracking-[0.18em] uppercase px-8 py-4 transition-all duration-200 hover:brightness-110 touch-manipulation"
              style={{ background: "#a9ec46", color: "#0d2d06" }}
            >
              {ru ? "Стать участником" : "Become a Participant"}
            </button>
            <button
              type="button"
              onClick={() => setExhibitorOpen(true)}
              className="inline-flex items-center rounded-xl font-black text-[12px] tracking-[0.14em] uppercase px-8 py-4 border transition-all duration-200 hover:bg-white/10 touch-manipulation"
              style={{ borderColor: "rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.9)" }}
            >
              {ru ? "Стать экспонентом" : "Become Exhibitor"}
            </button>
          </m.div>
        </m.div>
      </div>

      {/* MARQUEE TICKER */}
      <div
        className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none select-none"
        style={{ height: "clamp(70px, 12vw, 155px)" }}
        aria-hidden
      >
        <m.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 24, ease: "linear", repeat: Infinity }}
          className="flex whitespace-nowrap absolute bottom-0 left-0"
          style={{ width: "max-content" }}
        >
          <span
            className="font-black text-white"
            style={{
              fontSize: "clamp(70px, 12vw, 155px)",
              lineHeight: 0.88,
              letterSpacing: "-0.02em",
              opacity: 0.9,
            }}
          >
            {MARQUEE}
          </span>
          <span
            className="font-black text-white"
            style={{
              fontSize: "clamp(70px, 12vw, 155px)",
              lineHeight: 0.88,
              letterSpacing: "-0.02em",
              opacity: 0.9,
            }}
          >
            {MARQUEE}
          </span>
        </m.div>
      </div>

      <VisitorModal
        open={visitorOpen}
        onClose={() => setVisitorOpen(false)}
        title={ru ? "Стать участником\nи получить билет" : "Become a Participant\nand Get a Ticket"}
        subtitle={
          ru
            ? "Оставьте заявку — мы пришлём билет и всю нужную информацию"
            : "Leave a request — we'll send you a ticket and all the details"
        }
      />
      <ExhibitorModal open={exhibitorOpen} onClose={() => setExhibitorOpen(false)} />
    </section>
  );
}
