"use client";

import { m } from "framer-motion";
import { useLocale } from "next-intl";
import type { Locale } from "@/i18n/routing";
import type { StatItem } from "@/components/home/StatsGrid";

type Props = { stats: StatItem[] };

export function AboutStatsDark({ stats }: Props) {
  const locale = useLocale() as Locale;
  const ru = locale === "ru";

  return (
    <section
      id="s-stats"
      className="relative z-10 min-h-screen flex flex-col justify-center py-24"
      style={{ paddingLeft: "10vw", paddingRight: "10vw" }}
    >
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div>
          <m.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="block text-xs uppercase tracking-[0.18em] font-bold mb-4"
            style={{ color: "#a9ec46" }}
          >
            {ru ? "Масштаб выставки" : "Exhibition scale"}
          </m.span>

          <m.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-black text-white leading-[0.93] tracking-[-0.04em] mb-6"
            style={{ fontSize: "clamp(2.4rem, 4.5vw, 5.5rem)" }}
          >
            {ru ? (
              <>
                Цифры,
                <br />
                которые
                <br />
                говорят сами.
              </>
            ) : (
              <>
                Numbers
                <br />
                that speak
                <br />
                for themselves.
              </>
            )}
          </m.h2>

          <m.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg leading-relaxed max-w-[38ch]"
            style={{ color: "rgba(255,255,255,0.40)", fontFamily: "var(--font-mulish)" }}
          >
            {ru
              ? "Главная строительная выставка Северо-Запада. Четыре дня, сотни участников, десятки тысяч решений."
              : "The premier construction exhibition of the Northwest. Four days, hundreds of exhibitors, tens of thousands of solutions."}
          </m.p>
        </div>

        {/* Stats glass card */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="rounded-3xl backdrop-blur-md flex flex-col justify-center p-8 md:p-10 gap-0"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            minHeight: "50vh",
          }}
        >
          {stats.map((s, i) => (
            <m.div
              key={s.label}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              className="flex items-baseline justify-between py-5"
              style={{
                borderBottom: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none",
              }}
            >
              <span
                className="text-sm leading-tight max-w-[50%]"
                style={{ color: "rgba(255,255,255,0.38)", fontFamily: "var(--font-mulish)" }}
              >
                {s.label}
                {s.sub && (
                  <span
                    className="block text-xs mt-0.5"
                    style={{ color: "rgba(255,255,255,0.20)" }}
                  >
                    {s.sub}
                  </span>
                )}
              </span>
              <span
                className="font-black"
                style={{
                  fontSize: "clamp(1.8rem, 2.8vw, 3rem)",
                  color: s.value != null ? "#a9ec46" : "rgba(255,255,255,0.15)",
                  lineHeight: 1,
                }}
              >
                {s.value != null ? `${s.value.toLocaleString(locale)}${s.suffix}` : "—"}
              </span>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
}
