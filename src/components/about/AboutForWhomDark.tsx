"use client";

import { m } from "framer-motion";
import { useLocale } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";

const DATA = {
  ru: {
    visitors: [
      "Архитекторы и дизайнеры интерьеров",
      "Застройщики и девелоперы",
      "Инженеры и технические специалисты",
      "Закупщики строительных материалов",
      "Руководители строительных компаний",
    ],
    exhibitors: [
      "Производители стройматериалов",
      "Поставщики инженерных решений",
      "Дизайн-студии и архбюро",
      "Компании-экспортёры из 35 стран",
      "Технологические стартапы отрасли",
    ],
  },
  en: {
    visitors: [
      "Architects and interior designers",
      "Property developers",
      "Engineers and technical specialists",
      "Construction materials buyers",
      "Construction company executives",
    ],
    exhibitors: [
      "Construction materials manufacturers",
      "Engineering solutions suppliers",
      "Design studios and architecture firms",
      "Exporters from 35 countries",
      "Industry technology startups",
    ],
  },
};

export function AboutForWhomDark() {
  const locale = useLocale() as Locale;
  const ru = locale === "ru";
  const d = DATA[ru ? "ru" : "en"];

  return (
    <section
      id="s-cards"
      className="relative z-10 min-h-screen flex flex-col justify-center py-24"
      style={{ paddingLeft: "10vw", paddingRight: "10vw" }}
    >
      <m.span
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="block text-xs uppercase tracking-[0.18em] font-bold mb-4"
        style={{ color: "#a9ec46" }}
      >
        {ru ? "Участники" : "Participants"}
      </m.span>

      <m.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="font-black text-white leading-[0.93] tracking-[-0.04em] mb-12"
        style={{ fontSize: "clamp(2.4rem, 4.5vw, 5.5rem)" }}
      >
        {ru ? (
          <>
            Для кого
            <br />
            выставка.
          </>
        ) : (
          <>
            Who is it
            <br />
            for.
          </>
        )}
      </m.h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Visitors */}
        <m.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="rounded-3xl p-8 md:p-10 flex flex-col gap-6"
          style={{ background: "rgba(18,182,105,0.07)", border: "1px solid rgba(18,182,105,0.20)" }}
        >
          <div>
            <span
              className="text-xs uppercase tracking-[0.16em] font-bold"
              style={{ color: "#12B669" }}
            >
              {ru ? "Посетителям" : "For visitors"}
            </span>
            <h3
              className="font-black text-white mt-2 leading-[0.95]"
              style={{ fontSize: "clamp(1.5rem, 2.2vw, 2.2rem)" }}
            >
              {ru ? "Профессионалы отрасли" : "Industry Professionals"}
            </h3>
          </div>

          <ul className="flex flex-col gap-3 flex-1">
            {d.visitors.map((item, i) => (
              <m.li
                key={item}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.06 }}
                className="flex items-start gap-3 text-sm leading-snug"
                style={{ color: "rgba(255,255,255,0.50)", fontFamily: "var(--font-mulish)" }}
              >
                <span
                  className="mt-[6px] size-[6px] rounded-full flex-shrink-0"
                  style={{ background: "#12B669" }}
                />
                {item}
              </m.li>
            ))}
          </ul>

          <Link
            href="/tickets"
            className="inline-flex items-center justify-center rounded-xl font-black text-[11px] tracking-[0.18em] uppercase px-6 py-4 transition-all duration-200 hover:brightness-110 touch-manipulation"
            style={{ background: "#a9ec46", color: "#0d2d06" }}
          >
            {ru ? "Зарегистрироваться" : "Register Now"}
          </Link>
        </m.div>

        {/* Exhibitors */}
        <m.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="rounded-3xl p-8 md:p-10 flex flex-col gap-6"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.09)",
          }}
        >
          <div>
            <span
              className="text-xs uppercase tracking-[0.16em] font-bold"
              style={{ color: "rgba(255,255,255,0.32)" }}
            >
              {ru ? "Экспонентам" : "For exhibitors"}
            </span>
            <h3
              className="font-black text-white mt-2 leading-[0.95]"
              style={{ fontSize: "clamp(1.5rem, 2.2vw, 2.2rem)" }}
            >
              {ru ? "Компании и бренды" : "Companies & Brands"}
            </h3>
          </div>

          <ul className="flex flex-col gap-3 flex-1">
            {d.exhibitors.map((item, i) => (
              <m.li
                key={item}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.06 }}
                className="flex items-start gap-3 text-sm leading-snug"
                style={{ color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-mulish)" }}
              >
                <span
                  className="mt-[6px] size-[6px] rounded-full flex-shrink-0"
                  style={{ background: "rgba(255,255,255,0.28)" }}
                />
                {item}
              </m.li>
            ))}
          </ul>

          <Link
            href="/exhibit"
            className="inline-flex items-center justify-center rounded-xl font-bold text-[11px] tracking-[0.14em] uppercase px-6 py-4 border transition-all duration-200 hover:bg-white/10 touch-manipulation"
            style={{ color: "rgba(255,255,255,0.75)", borderColor: "rgba(255,255,255,0.22)" }}
          >
            {ru ? "Забронировать стенд" : "Book a Stand"}
          </Link>
        </m.div>
      </div>
    </section>
  );
}
