"use client";

import { ArrowRight } from "lucide-react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

export function CtaBanner() {
  const locale = useLocale() as Locale;
  const ru = locale === "ru";

  return (
    <section className="relative overflow-hidden bg-nb-dark">
      {/* Lime glow accent */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] pointer-events-none opacity-10"
        style={{ background: "radial-gradient(ellipse, #a9ec46 0%, transparent 65%)" }}
        aria-hidden
      />

      {/* Top lime line */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-nb-lime-acid/40 to-transparent" />

      <div className="container-neva relative py-24 md:py-32 text-center">
        <span className="font-bold text-[13px] text-nb-teal uppercase tracking-[3px] mb-5 block">
          {ru
            ? "17–20 марта 2027 · Экспофорум · Санкт-Петербург"
            : "17–20 March 2027 · Expoforum · Saint Petersburg"}
        </span>

        <h2
          className="font-black leading-tight tracking-tight text-white mb-6 max-w-[900px] mx-auto"
          style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
        >
          {ru ? "Станьте частью" : "Be part of"}{" "}
          <span style={{ color: "#a9ec46" }}>NEVA BUILD</span>
        </h2>

        <p className="max-w-2xl mx-auto text-[16px] leading-relaxed text-white/60 mb-12">
          {ru
            ? "Покажите свои решения профессиональной аудитории строительной индустрии. Присоединяйтесь к 500+ компаниям из 35 стран."
            : "Showcase your solutions to a professional construction industry audience. Join 500+ companies from 35 countries."}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/exhibit"
            className="inline-flex items-center gap-2 font-bold text-[15px] px-8 py-4 rounded-2xl transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, #a9ec46 0%, #8dd62e 100%)",
              color: "#0d2d06",
              boxShadow: "0 12px 40px rgba(169,236,70,0.28)",
            }}
          >
            {ru ? "Стать участником" : "Become an Exhibitor"}
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/tickets"
            className="inline-flex items-center gap-2 font-bold text-[15px] border-2 border-white/20 hover:border-nb-lime-acid text-white hover:text-nb-lime-acid px-8 py-4 rounded-2xl transition-all duration-200"
          >
            {ru ? "Получить билет" : "Get a Ticket"}
          </Link>
        </div>
      </div>

      {/* Bottom lime line */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-nb-lime-acid/20 to-transparent" />
    </section>
  );
}
