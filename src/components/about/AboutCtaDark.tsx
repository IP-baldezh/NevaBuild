"use client";

import { m } from "framer-motion";
import { useLocale } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";

type Props = { dateRange: string; venue: string; city: string };

export function AboutCtaDark({ dateRange, venue, city }: Props) {
  const locale = useLocale() as Locale;
  const ru = locale === "ru";

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
        NEVA BUILD 2027
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
            главного события.
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
        <Link
          href="/tickets"
          className="inline-flex items-center justify-center rounded-xl font-black text-[12px] tracking-[0.18em] uppercase px-12 py-5 transition-all duration-200 hover:brightness-110 touch-manipulation"
          style={{ background: "#a9ec46", color: "#0d2d06" }}
        >
          {ru ? "Зарегистрироваться" : "Register Now"}
        </Link>
        <Link
          href="/exhibit"
          className="inline-flex items-center justify-center rounded-xl font-bold text-[12px] tracking-[0.12em] uppercase px-12 py-5 border transition-all duration-200 hover:bg-white/10 touch-manipulation"
          style={{ color: "rgba(255,255,255,0.65)", borderColor: "rgba(255,255,255,0.18)" }}
        >
          {ru ? "Стать экспонентом" : "Become an Exhibitor"}
        </Link>
      </m.div>

      <m.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-sm"
        style={{ color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-mulish)" }}
      >
        {dateRange} · {city} · {venue}
      </m.p>
    </section>
  );
}
