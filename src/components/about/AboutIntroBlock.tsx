"use client";

import { m } from "framer-motion";
import { useLocale } from "next-intl";
import type { Locale } from "@/i18n/routing";

const ITEMS_RU = [
  "Продемонстрировать свою продукцию широкой профессиональной аудитории",
  "Обсуждать ключевые тренды отрасли с экспертами и лидерами рынка",
  "Расширять круг деловых контактов и находить новых партнёров",
  "Узнавать об инновационных решениях и технологиях будущего",
];

const ITEMS_EN = [
  "Showcase your products to a broad professional audience",
  "Discuss key industry trends with experts and market leaders",
  "Expand your professional network and find new business partners",
  "Discover innovative solutions and the technologies of tomorrow",
];

export function AboutIntroBlock() {
  const locale = useLocale() as Locale;
  const ru = locale === "ru";

  return (
    <section
      className="relative z-10 py-10 sm:py-20 border-t"
      style={{ borderColor: "rgba(255,255,255,0.07)" }}
    >
      <div className="container-neva">
        <m.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start"
        >
          {/* Left — heading */}
          <div>
            <span
              className="text-[11px] uppercase tracking-[0.28em] mb-4 block font-bold"
              style={{ color: "#a9ec46", fontFamily: "var(--font-mulish)" }}
            >
              {ru ? "О выставке" : "About"}
            </span>
            <h2
              className="font-black text-white leading-[1.04]"
              style={{ fontSize: "clamp(28px, 3.8vw, 56px)" }}
            >
              {ru ? (
                <>
                  НеваБилд —<br />
                  <span style={{ color: "rgba(255,255,255,0.75)" }}>
                    место встречи профессионалов
                  </span>
                </>
              ) : (
                <>
                  NevaBuild —<br />
                  <span style={{ color: "rgba(255,255,255,0.75)" }}>where professionals meet</span>
                </>
              )}
            </h2>
          </div>

          {/* Right — text + list */}
          <div>
            <p
              className="leading-relaxed mb-5"
              style={{
                color: "rgba(255,255,255,0.85)",
                fontFamily: "var(--font-mulish)",
                fontSize: "clamp(14px, 1.15vw, 17px)",
              }}
            >
              {ru
                ? "NEVA BUILD EXPO — новая международная b2b-выставка строительной отрасли, архитектуры и дизайна интерьера, объединяющая Санкт-Петербург и весь Северо-Западный регион. Мы создаём не очередное отраслевое мероприятие, а уникальную точку пересечения глубинной специфики города, системных вызовов современного строительства и практических интересов всех участников рынка — от поставщиков стройматериалов до девелоперов, архитекторов, дизайнеров и общественных институтов."
                : "NEVA BUILD EXPO is a new international b2b exhibition of the construction industry, architecture and interior design, bringing together St. Petersburg and the entire North-West region. We are creating not just another industry event, but a unique intersection of the city's deep specifics, systemic challenges of modern construction, and the practical interests of all market participants — from building material suppliers to developers, architects, designers and public institutions."}
            </p>
            <p
              className="leading-relaxed mb-8"
              style={{
                color: "rgba(255,255,255,0.70)",
                fontFamily: "var(--font-mulish)",
                fontSize: "clamp(13px, 1.05vw, 16px)",
              }}
            >
              {ru
                ? "Впервые в Петербурге на одной площадке встречаются производители и дистрибьюторы строительных материалов, строители и подрядчики, архитекторы и девелоперы, дизайнеры интерьеров и предметного дизайна — а также представители городских структур и профессиональное сообщество."
                : "For the first time in St. Petersburg, manufacturers and distributors of building materials, builders and contractors, architects and developers, interior and product designers meet on one platform — alongside city representatives and the professional community."}
            </p>

            <p
              className="font-bold mb-5"
              style={{
                color: "rgba(255,255,255,0.9)",
                fontSize: "clamp(13px, 1vw, 15px)",
                fontFamily: "var(--font-mulish)",
              }}
            >
              {ru ? "В течение всей выставки Вы можете:" : "Throughout the exhibition you can:"}
            </p>

            <ul className="space-y-3">
              {(ru ? ITEMS_RU : ITEMS_EN).map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className="flex-shrink-0 mt-1 w-5 h-5 rounded-full flex items-center justify-center"
                    style={{
                      background: "rgba(169,236,70,0.12)",
                      border: "1px solid rgba(169,236,70,0.3)",
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#a9ec46" }} />
                  </span>
                  <span
                    style={{
                      color: "rgba(255,255,255,0.85)",
                      fontFamily: "var(--font-mulish)",
                      fontSize: "clamp(13px, 1vw, 15px)",
                      lineHeight: "1.6",
                    }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </m.div>
      </div>
    </section>
  );
}
