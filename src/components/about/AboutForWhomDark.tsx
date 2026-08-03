"use client";

import { useState } from "react";
import { m } from "framer-motion";
import { useLocale } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { VisitorModal } from "@/components/modals/VisitorModal";
import { ExhibitorModal } from "@/components/modals/ExhibitorModal";

const DATA = {
  ru: {
    visitorsHeading: "Откройте главную точку сборки отрасли",
    visitorsDesc:
      "Три дня, где впервые в Петербурге на одной площадке встречаются архитекторы, девелоперы, строители, дизайнеры, производители материалов и городские структуры.",
    visitors: [
      "Бесплатный вход для профессионалов отрасли",
      "Архитектурный лекторий с ведущими российскими и международными экспертами",
      "Практические мастер-классы и BIM-воркшопы с сертификатами",
      "Дилерская гостиная и биржа деловых контактов «поставщик → покупатель»",
      "Онлайн-регистрация без очереди на входе",
    ],
    exhibitorsHeading: "Найдите клиентов среди тех, кто принимает решения",
    exhibitorsDesc:
      "Прямой выход на девелоперов, архитекторов, дистрибьюторов, строителей и частных заказчиков — с форматами участия под любой масштаб бизнеса.",
    exhibitors: [
      "Прямой доступ к профессиональной b2b-аудитории: от дистрибьюторов и застройщиков до архитектурных бюро",
      "Форматы участия под любой бюджет — от стандартного стенда до премиального",
      "Участие в деловой программе: тематические сессии, мастер-классы, партнёрские коллаборации",
      "Биржа контактов и матчмейкинг для встреч с девелоперами и дилерами",
      "Специальные условия для генеральных партнёров и производителей материалов",
    ],
  },
  en: {
    visitorsHeading: "Discover the industry's key meeting point",
    visitorsDesc:
      "Three days where architects, developers, builders, designers, material manufacturers and city authorities meet on one platform — for the first time in St. Petersburg.",
    visitors: [
      "Free entry for industry professionals",
      "Architectural lecture hall with leading Russian and international experts",
      "Practical masterclasses and BIM workshops with certificates",
      "Dealer lounge and business contact exchange «supplier → buyer»",
      "Online registration with no queues at the entrance",
    ],
    exhibitorsHeading: "Find clients among decision-makers",
    exhibitorsDesc:
      "Direct access to developers, architects, distributors, builders and private clients — with participation formats for any business scale.",
    exhibitors: [
      "Direct access to a professional b2b audience: from distributors and developers to architectural bureaus",
      "Participation formats for any budget — from standard stands to premium",
      "Participation in the business programme: thematic sessions, masterclasses, partner collaborations",
      "Contact exchange and matchmaking for meetings with developers and dealers",
      "Special conditions for general partners and material manufacturers",
    ],
  },
};

export function AboutForWhomDark() {
  const locale = useLocale() as Locale;
  const ru = locale === "ru";
  const d = DATA[ru ? "ru" : "en"] as typeof DATA.ru;
  const [visitorOpen, setVisitorOpen] = useState(false);
  const [exhibitorOpen, setExhibitorOpen] = useState(false);

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
        {ru ? "Участие" : "Participation"}
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
          style={{ background: "rgba(169,236,70,0.07)", border: "1px solid rgba(169,236,70,0.20)" }}
        >
          <div>
            <span
              className="text-xs uppercase tracking-[0.16em] font-bold"
              style={{ color: "#a9ec46" }}
            >
              {ru ? "Посетителям" : "For visitors"}
            </span>
            <h3
              className="font-black text-white mt-2 leading-[1.05]"
              style={{ fontSize: "clamp(1.2rem, 1.8vw, 1.8rem)" }}
            >
              {d.visitorsHeading}
            </h3>
            <p
              className="mt-3 text-sm leading-snug"
              style={{ color: "rgba(255,255,255,0.65)", fontFamily: "var(--font-mulish)" }}
            >
              {d.visitorsDesc}
            </p>
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
                style={{ color: "rgba(255,255,255,0.82)", fontFamily: "var(--font-mulish)" }}
              >
                <span
                  className="mt-[6px] size-[6px] rounded-full flex-shrink-0"
                  style={{ background: "#a9ec46" }}
                />
                {item}
              </m.li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setVisitorOpen(true)}
            className="inline-flex items-center justify-center rounded-xl font-black text-[11px] tracking-[0.18em] uppercase px-6 py-4 transition-all duration-200 hover:brightness-110 touch-manipulation"
            style={{ background: "#a9ec46", color: "#0d2d06" }}
          >
            {ru ? "Зарегистрироваться" : "Register Now"}
          </button>
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
              style={{ color: "rgba(255,255,255,0.70)" }}
            >
              {ru ? "Экспонентам" : "For exhibitors"}
            </span>
            <h3
              className="font-black text-white mt-2 leading-[1.05]"
              style={{ fontSize: "clamp(1.2rem, 1.8vw, 1.8rem)" }}
            >
              {d.exhibitorsHeading}
            </h3>
            <p
              className="mt-3 text-sm leading-snug"
              style={{ color: "rgba(255,255,255,0.65)", fontFamily: "var(--font-mulish)" }}
            >
              {d.exhibitorsDesc}
            </p>
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
                style={{ color: "rgba(255,255,255,0.82)", fontFamily: "var(--font-mulish)" }}
              >
                <span
                  className="mt-[6px] size-[6px] rounded-full flex-shrink-0"
                  style={{ background: "rgba(255,255,255,0.28)" }}
                />
                {item}
              </m.li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setExhibitorOpen(true)}
            className="inline-flex items-center justify-center rounded-xl font-bold text-[11px] tracking-[0.14em] uppercase px-6 py-4 border transition-all duration-200 hover:bg-white/10 touch-manipulation"
            style={{ color: "rgba(255,255,255,0.75)", borderColor: "rgba(255,255,255,0.22)" }}
          >
            {ru ? "Забронировать стенд" : "Book a Stand"}
          </button>
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
