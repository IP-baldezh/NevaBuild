"use client";

import { useState } from "react";
import { ArrowRight, Ticket } from "lucide-react";
import { useLocale } from "next-intl";
import { m } from "framer-motion";
import type { Locale } from "@/i18n/routing";
import type { ExhibitorCategory } from "@prisma/client";
import { ExhibitorModal } from "@/components/modals/ExhibitorModal";
import { VisitorModal } from "@/components/modals/VisitorModal";

interface CtaBannerProps {
  categories?: ExhibitorCategory[];
  dateRange?: string;
  venue?: string;
  city?: string;
}

export function CtaBanner({ categories = [], dateRange, venue, city }: CtaBannerProps) {
  const locale = useLocale() as Locale;
  const ru = locale === "ru";
  const [visitorOpen, setVisitorOpen] = useState(false);
  const [exhibitorOpen, setExhibitorOpen] = useState(false);

  const meta = [dateRange, city, venue].filter(Boolean).join(" · ");

  return (
    <>
      <section
        id="ticket"
        className="relative z-10 min-h-screen flex flex-col justify-center items-center text-center"
        style={{
          paddingLeft: "10vw",
          paddingRight: "10vw",
          paddingTop: "6rem",
          paddingBottom: "6rem",
        }}
      >
        <div className="relative z-10 flex flex-col items-center">
          <m.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[11px] uppercase tracking-[0.32em] font-bold mb-6 block"
            style={{ color: "#a9ec46", fontFamily: "var(--font-mulish)" }}
          >
            NEVA BUILD 2027
          </m.span>

          <m.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="font-black text-white mb-10 max-w-4xl"
            style={{
              fontSize: "clamp(2.8rem, 7vw, 7.5rem)",
              lineHeight: 0.93,
              letterSpacing: "-0.04em",
            }}
          >
            {ru ? (
              <>
                Станьте частью
                <br />
                <span style={{ color: "#a9ec46" }}>главного</span> события.
              </>
            ) : (
              <>
                Be part of the
                <br />
                <span style={{ color: "#a9ec46" }}>main</span> event.
              </>
            )}
          </m.h2>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 mb-10"
          >
            <button
              type="button"
              onClick={() => setVisitorOpen(true)}
              className="inline-flex items-center justify-center gap-3 font-bold text-[15px] sm:text-[16px] px-8 py-4 rounded-2xl transition-all duration-200 hover:-translate-y-1 touch-manipulation"
              style={{
                background: "linear-gradient(135deg, #a9ec46 0%, #8dd62e 100%)",
                color: "#0d2d06",
                boxShadow: "0 12px 40px rgba(169,236,70,0.28)",
              }}
            >
              <Ticket className="size-5" />
              {ru ? "Получить бесплатный билет" : "Get a Free Ticket"}
              <ArrowRight className="size-[18px]" />
            </button>
            <button
              type="button"
              onClick={() => setExhibitorOpen(true)}
              className="inline-flex items-center justify-center gap-2.5 font-bold text-[15px] sm:text-[16px] border-2 px-8 py-4 rounded-2xl transition-all duration-200 touch-manipulation hover:border-white/40 hover:text-white"
              style={{ borderColor: "rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.65)" }}
            >
              {ru ? "Участвовать как экспонент" : "Exhibit at NevaBuild"}
            </button>
          </m.div>

          {meta && (
            <m.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.28 }}
              className="text-[13px] font-medium tracking-wide"
              style={{ color: "rgba(255,255,255,0.22)", fontFamily: "var(--font-mulish)" }}
            >
              {meta}
            </m.p>
          )}
        </div>
      </section>

      <VisitorModal open={visitorOpen} onClose={() => setVisitorOpen(false)} />
      <ExhibitorModal
        open={exhibitorOpen}
        onClose={() => setExhibitorOpen(false)}
        categories={categories}
      />
    </>
  );
}
