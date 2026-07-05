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
              className="leading-relaxed mb-8"
              style={{
                color: "rgba(255,255,255,0.85)",
                fontFamily: "var(--font-mulish)",
                fontSize: "clamp(14px, 1.15vw, 17px)",
              }}
            >
              {ru
                ? "НеваБилд создана для взаимодействия производителей и поставщиков строительных и отделочных материалов, дизайнеров, архитекторов, специалистов оптовых и розничных организаций, строительных и ремонтных компаний со своими клиентами и партнерами."
                : "NevaBuild was created to connect manufacturers and suppliers of construction and finishing materials with designers, architects, wholesale and retail specialists, and construction and renovation companies — with their clients and partners."}
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
