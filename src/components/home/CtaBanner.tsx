"use client";

import { ArrowRight, Ticket } from "lucide-react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

export function CtaBanner() {
  const locale = useLocale() as Locale;
  const ru = locale === "ru";

  return (
    <section id="ticket" className="py-20 bg-nb-dark relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #a9ec46 0%, transparent 65%)" }}
        aria-hidden
      />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-nb-lime-acid/40 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-nb-lime-acid/20 to-transparent" />

      <div className="container-neva relative text-center">
        <h2
          className="font-black text-white leading-tight tracking-tight mb-6 max-w-[900px] mx-auto"
          style={{ fontSize: "clamp(36px, 6vw, 80px)" }}
        >
          {ru ? "Станьте частью" : "Be part of"}
          <br />
          <span className="text-nb-lime-acid">{ru ? "NevaBuild 2027" : "NevaBuild 2027"}</span>
        </h2>

        <p
          className="text-[17px] text-white/50 max-w-[560px] mx-auto mb-12 leading-relaxed"
          style={{ fontFamily: "var(--font-mulish)" }}
        >
          {ru
            ? "Покажите свои решения профессиональной аудитории строительной индустрии. Присоединяйтесь к 500+ компаниям из 35 стран."
            : "Showcase your solutions to a professional construction industry audience. Join 500+ companies from 35 countries."}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/tickets"
            className="inline-flex items-center gap-3 font-bold text-[16px] px-8 py-4 rounded-2xl transition-all duration-200 hover:-translate-y-1"
            style={{
              background: "linear-gradient(135deg, #a9ec46 0%, #8dd62e 100%)",
              color: "#0d2d06",
              boxShadow: "0 12px 40px rgba(169,236,70,0.28)",
            }}
          >
            <Ticket className="size-5" />
            {ru ? "Получить бесплатный билет" : "Get a Free Ticket"}
            <ArrowRight className="size-[18px]" />
          </Link>
          <Link
            href="/exhibit"
            className="inline-flex items-center gap-2.5 font-bold text-[16px] border-2 border-white/20 hover:border-nb-lime-acid text-white hover:text-nb-lime-acid px-8 py-4 rounded-2xl transition-all duration-200"
          >
            {ru ? "Участвовать как экспонент" : "Exhibit at NevaBuild"}
          </Link>
        </div>
      </div>
    </section>
  );
}
