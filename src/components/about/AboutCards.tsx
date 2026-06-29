"use client";

import { useLocale } from "next-intl";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

const FACTS_RU = [
  "500+ компаний-участников из 35 стран",
  "40 000+ специалистов за 4 дня",
  "200+ мероприятий деловой программы",
  "60 000 м² экспозиционной площади",
  "Крупнейшее событие Северо-Запада",
];

const FACTS_EN = [
  "500+ participating companies from 35 countries",
  "40,000+ specialists over 4 days",
  "200+ business programme events",
  "60,000 m² of exhibition space",
  "The Northwest's largest industry event",
];

const MISSION_RU = [
  "Прямой диалог производителей и байеров",
  "Формирование трендов строительной отрасли",
  "Платформа для инновационных технологий",
  "Профессиональное сообщество без посредников",
  "Международный форум строительной индустрии",
];

const MISSION_EN = [
  "Direct dialogue between manufacturers and buyers",
  "Setting trends for the construction industry",
  "Platform for innovative technologies",
  "Professional community without intermediaries",
  "International forum for the construction industry",
];

export function AboutCards() {
  const locale = useLocale() as Locale;
  const ru = locale === "ru";
  const facts = ru ? FACTS_RU : FACTS_EN;
  const mission = ru ? MISSION_RU : MISSION_EN;

  return (
    <section className="py-12 sm:py-20" style={{ background: "#f4faf6" }}>
      <div className="container-neva">
        <div className="grid lg:grid-cols-2 gap-6">
          <div
            className="relative rounded-3xl p-7 sm:p-10 lg:p-12 overflow-hidden flex flex-col"
            style={{ background: "linear-gradient(135deg, #12B669 0%, #a9ec46 55%, #d4f772 100%)" }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 80% 60% at 80% 20%, rgba(255,255,255,0.22) 0%, transparent 65%)",
              }}
              aria-hidden
            />
            <div
              className="absolute right-6 bottom-6 font-black leading-none pointer-events-none select-none"
              style={{ fontSize: "clamp(80px, 12vw, 160px)", color: "rgba(13,45,6,0.06)" }}
              aria-hidden
            >
              №1
            </div>
            <span
              className="font-bold text-[13px] uppercase tracking-[3px] mb-6 relative z-10"
              style={{ color: "#E11B22" }}
            >
              {ru ? "NEVA BUILD в цифрах" : "NEVA BUILD by numbers"}
            </span>
            <h2
              className="font-black leading-tight mb-4 relative z-10"
              style={{ fontSize: "clamp(26px, 3.2vw, 40px)", color: "#0d2d06" }}
            >
              {ru ? (
                <>
                  Масштаб,
                  <br />
                  который впечатляет
                </>
              ) : (
                <>
                  Scale that
                  <br />
                  impresses
                </>
              )}
            </h2>
            <p
              className="text-[15px] mb-8 max-w-[420px] leading-relaxed relative z-10"
              style={{ color: "#1a4a0a", fontFamily: "var(--font-mulish)" }}
            >
              {ru
                ? "Каждый год NEVA BUILD собирает лучших профессионалов строительной отрасли под одной крышей КВЦ Экспофорум."
                : "Every year NEVA BUILD brings together the best construction industry professionals under one roof at Expoforum."}
            </p>
            <ul className="flex flex-col gap-3 mb-10 relative z-10">
              {facts.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <CheckCircle
                    className="flex-shrink-0 mt-0.5 size-[18px]"
                    style={{ color: "#0d2d06" }}
                  />
                  <span
                    className="text-[14px]"
                    style={{ color: "#1a4a0a", fontFamily: "var(--font-mulish)" }}
                  >
                    {f}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-auto relative z-10">
              <Link
                href="/tickets"
                className="inline-flex items-center justify-center gap-2 font-bold text-[14.5px] px-6 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 touch-manipulation"
                style={{
                  background: "#0e2d08",
                  color: "#a9ec46",
                  boxShadow: "0 8px 24px rgba(14,45,8,0.25)",
                }}
              >
                {ru ? "Зарегистрироваться" : "Register Now"}
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>

          <div className="relative bg-white rounded-3xl p-7 sm:p-10 lg:p-12 overflow-hidden border border-[#e4efe8] flex flex-col">
            <div
              className="absolute top-0 right-0 w-[280px] h-[280px] opacity-[0.04] pointer-events-none"
              style={{ background: "radial-gradient(circle, #12B669 0%, transparent 70%)" }}
              aria-hidden
            />
            <span
              className="font-bold text-[13px] uppercase tracking-[3px] mb-6"
              style={{ color: "#E11B22" }}
            >
              {ru ? "Наша миссия" : "Our Mission"}
            </span>
            <h2
              className="font-black text-black leading-tight mb-4"
              style={{ fontSize: "clamp(26px, 3.2vw, 40px)" }}
            >
              {ru ? (
                <>
                  Площадка,
                  <br />
                  где строятся связи
                </>
              ) : (
                <>
                  The venue
                  <br />
                  where ties are built
                </>
              )}
            </h2>
            <p
              className="text-[15px] text-black/65 mb-8 max-w-[420px] leading-relaxed"
              style={{ fontFamily: "var(--font-mulish)" }}
            >
              {ru
                ? "NEVA BUILD объединяет производителей, поставщиков и профессиональный рынок строительства и дизайна."
                : "NEVA BUILD connects manufacturers, suppliers and the professional construction and design market."}
            </p>
            <ul className="flex flex-col gap-3 mb-10">
              {mission.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <CheckCircle className="flex-shrink-0 mt-0.5 size-[18px] text-[#12B669]" />
                  <span
                    className="text-[14px] text-black/75"
                    style={{ fontFamily: "var(--font-mulish)" }}
                  >
                    {f}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-auto">
              <Link
                href="/exhibit"
                className="inline-flex items-center justify-center gap-2 font-bold text-[14.5px] text-white px-6 py-3.5 rounded-xl transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 touch-manipulation"
                style={{ background: "#E11B22", boxShadow: "0 8px 20px rgba(225,27,34,0.25)" }}
              >
                {ru ? "Забронировать стенд" : "Book a Stand"}
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
