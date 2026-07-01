"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

const REASONS_RU = [
  {
    num: "01",
    title: "Крупнейшая площадка Северо-Запада",
    desc: "60 000 м² экспозиции в трёх павильонах Экспофорума.",
  },
  {
    num: "02",
    title: "Живой рынок за 4 дня",
    desc: "Встречи с поставщиками и производителями без посредников.",
  },
  {
    num: "03",
    title: "Деловая программа мирового уровня",
    desc: "200+ форумов, круглых столов и мастер-классов.",
  },
  {
    num: "04",
    title: "Технологии будущего сегодня",
    desc: "BIM-проектирование, роботизированные системы, новые материалы.",
  },
  {
    num: "05",
    title: "Нетворкинг с топ-аудиторией",
    desc: "Matchmaking-платформа. 80% экспонентов заключают партнёрства.",
  },
  {
    num: "06",
    title: "Международный формат",
    desc: "Делегации из 70+ стран, национальные экспозиции мировых лидеров.",
  },
];

const REASONS_EN = [
  {
    num: "01",
    title: "Largest Venue in the Northwest",
    desc: "60 000 m² across three Expoforum pavilions.",
  },
  {
    num: "02",
    title: "Live Market in 4 Days",
    desc: "Meet suppliers and manufacturers directly, no intermediaries.",
  },
  {
    num: "03",
    title: "World-Class Business Programme",
    desc: "200+ forums, roundtables and masterclasses.",
  },
  {
    num: "04",
    title: "Tomorrow's Technologies Today",
    desc: "BIM design, robotic systems and next-generation materials.",
  },
  {
    num: "05",
    title: "Networking with Top Audience",
    desc: "Matchmaking platform. 80% of exhibitors close partnerships.",
  },
  {
    num: "06",
    title: "International Format",
    desc: "Delegations from 70+ countries, national expositions worldwide.",
  },
];

export function WhyVisit() {
  const locale = useLocale() as Locale;
  const ru = locale === "ru";
  const reasons = ru ? REASONS_RU : REASONS_EN;

  return (
    <section id="why-visit" className="relative z-10 py-16 sm:py-24">
      <div className="container-neva">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Left */}
          <div className="lg:w-[320px] flex-shrink-0">
            <span
              className="text-[11px] uppercase tracking-[0.28em] mb-4 block font-bold"
              style={{ color: "#a9ec46", fontFamily: "var(--font-mulish)" }}
            >
              {ru ? "Почему NevaBuild" : "Why NevaBuild"}
            </span>
            <h2
              className="font-black text-white leading-tight mb-6"
              style={{ fontSize: "clamp(28px, 4vw, 52px)" }}
            >
              {ru ? (
                <>
                  6 причин
                  <br />
                  прийти
                  <br />
                  на выставку
                </>
              ) : (
                <>
                  6 reasons
                  <br />
                  to visit
                  <br />
                  the show
                </>
              )}
            </h2>
            <p
              className="mb-10 leading-relaxed"
              style={{
                color: "rgba(255,255,255,0.45)",
                fontFamily: "var(--font-mulish)",
                fontSize: "15px",
              }}
            >
              {ru
                ? "Каждый год NevaBuild задаёт тренды строительного рынка. Не упустите возможность быть в центре событий."
                : "Every year NevaBuild sets the trends of the construction market. Don't miss your chance to be at the centre."}
            </p>
            <Link
              href="/tickets"
              className="inline-flex items-center justify-center gap-2 font-bold text-[14px] text-white px-6 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 w-full sm:w-auto"
              style={{ background: "#E11B22", boxShadow: "0 8px 24px rgba(225,27,34,0.30)" }}
            >
              {ru ? "Зарегистрироваться бесплатно" : "Register for Free"}
            </Link>
          </div>

          {/* Right — 2×3 grid */}
          <div
            className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-px"
            style={{ background: "rgba(255,255,255,0.06)" }}
          >
            {reasons.map(({ num, title, desc }) => (
              <div
                key={num}
                className="p-6 sm:p-8 group transition-colors duration-300 hover:bg-white/[0.03]"
                style={{ background: "#07100a" }}
              >
                <span
                  className="block font-black mb-3 tabular-nums group-hover:text-nb-lime-acid transition-colors duration-300"
                  style={{ fontSize: "clamp(28px, 3vw, 40px)", color: "rgba(169,236,70,0.25)" }}
                >
                  {num}
                </span>
                <h3 className="font-black text-white text-[16px] leading-snug mb-2">{title}</h3>
                <p
                  style={{
                    color: "rgba(255,255,255,0.4)",
                    fontFamily: "var(--font-mulish)",
                    fontSize: "13px",
                    lineHeight: "1.6",
                  }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
