"use client";

import { useState } from "react";
import { m } from "framer-motion";
import { useLocale } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { VisitorModal } from "@/components/modals/VisitorModal";
import { ExhibitorModal } from "@/components/modals/ExhibitorModal";

type Props = { dateRange: string; venue: string; city: string };

export function AboutCtaDark({ dateRange, venue, city }: Props) {
  const locale = useLocale() as Locale;
  const ru = locale === "ru";
  const [visitorOpen, setVisitorOpen] = useState(false);
  const [exhibitorOpen, setExhibitorOpen] = useState(false);

  return (
    <section
      id="s-cta"
      className="relative z-10 min-h-screen flex flex-col justify-center items-center text-center py-24"
      style={{ paddingLeft: "10vw", paddingRight: "10vw" }}
    >
      <m.span
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="block text-xs uppercase tracking-[0.20em] font-bold mb-6"
        style={{ color: "#a9ec46" }}
      >
        NEVA BUILD 2028
      </m.span>

      <m.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="font-black text-white leading-[0.93] tracking-[-0.04em] mb-10 max-w-4xl"
        style={{ fontSize: "clamp(2.8rem, 7vw, 7.5rem)" }}
      >
        {ru ? (
          <>
            Станьте частью
            <br />
            масштабного события.
          </>
        ) : (
          <>
            Be part of
            <br />
            the main event.
          </>
        )}
      </m.h2>

      <m.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-4 mb-8"
      >
        <button
          type="button"
          onClick={() => setVisitorOpen(true)}
          className="inline-flex items-center justify-center rounded-xl font-black text-[12px] tracking-[0.18em] uppercase px-12 py-5 transition-all duration-200 hover:brightness-110 touch-manipulation"
          style={{ background: "#a9ec46", color: "#0d2d06" }}
        >
          {ru ? "Стать участником" : "Become a Participant"}
        </button>
        <button
          type="button"
          onClick={() => setExhibitorOpen(true)}
          className="inline-flex items-center justify-center rounded-xl font-bold text-[12px] tracking-[0.12em] uppercase px-12 py-5 border transition-all duration-200 hover:bg-white/10 touch-manipulation"
          style={{ color: "rgba(255,255,255,0.90)", borderColor: "rgba(255,255,255,0.25)" }}
        >
          {ru ? "Стать экспонентом" : "Become an Exhibitor"}
        </button>
      </m.div>

      <m.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-sm"
        style={{ color: "rgba(255,255,255,0.60)", fontFamily: "var(--font-mulish)" }}
      >
        {dateRange} · {city} · {venue}
      </m.p>

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
