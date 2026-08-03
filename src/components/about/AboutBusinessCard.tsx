"use client";

import { m } from "framer-motion";
import { useLocale } from "next-intl";
import { Calendar, Mic, Users } from "lucide-react";
import type { Locale } from "@/i18n/routing";

const FEATURES_RU = [
  { Icon: Calendar, label: "Архитектурный лекторий и BIM-воркшопы с сертификатами" },
  { Icon: Mic, label: "Дилерская гостиная и биржа деловых контактов" },
  { Icon: Users, label: "Торжественная церемония вручения отраслевой премии" },
];

const FEATURES_EN = [
  { Icon: Calendar, label: "Architectural lecture hall and BIM workshops with certificates" },
  { Icon: Mic, label: "Dealer lounge and business contact exchange" },
  { Icon: Users, label: "Solemn ceremony of the industry award" },
];

export function AboutBusinessCard() {
  const locale = useLocale() as Locale;
  const ru = locale === "ru";
  const features = ru ? FEATURES_RU : FEATURES_EN;

  return (
    <section
      className="relative z-10 py-10 sm:py-16 border-t"
      style={{ borderColor: "rgba(255,255,255,0.07)" }}
    >
      <div className="container-neva">
        <m.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #0e2a14 0%, #071510 60%, #0a1a10 100%)",
            border: "1px solid rgba(169,236,70,0.15)",
          }}
        >
          <div className="p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left */}
            <div>
              <span
                className="text-[11px] uppercase tracking-[0.28em] mb-4 block font-bold"
                style={{ color: "#a9ec46", fontFamily: "var(--font-mulish)" }}
              >
                {ru ? "Деловая программа" : "Business Programme"}
              </span>
              <h2
                className="font-black text-white leading-tight mb-5"
                style={{ fontSize: "clamp(24px, 3vw, 44px)" }}
              >
                {ru
                  ? "Диалог, который формирует повестку отрасли — не на три дня, а на весь год"
                  : "A dialogue that shapes the industry agenda — not just for three days, but for the whole year"}
              </h2>
              <p
                className="leading-relaxed mb-8"
                style={{
                  color: "rgba(255,255,255,0.85)",
                  fontFamily: "var(--font-mulish)",
                  fontSize: "clamp(13px, 1.1vw, 16px)",
                }}
              >
                {ru ? (
                  <>
                    Деловая программа NEVA BUILD EXPO построена вокруг трёх направлений —
                    архитектура и городская среда, бизнес и технологии в строительстве, дизайн и
                    интерьер. Каждый день работает несколько параллельных треков: для архитекторов и
                    девелоперов, для строителей и поставщиков, а также форматы для широкой
                    аудитории.
                    <br />
                    <br />В программе — пленарные сессии и архитектурный лекторий с российскими и
                    зарубежными экспертами, дилерская гостиная и биржа деловых контактов,
                    BIM-воркшопы и мастер-классы с сертификатами, фестиваль инноваций в дизайне и
                    материалах, ландшафтный трек и арт-зона с независимыми галереями. Деловую
                    программу завершает торжественная церемония вручения отраслевой премии.
                  </>
                ) : (
                  <>
                    The NEVA BUILD EXPO business programme is built around three tracks —
                    architecture and urban environment, business and construction technology, design
                    and interior. Each day runs several parallel streams: for architects and
                    developers, for builders and suppliers, and formats for the wider audience.
                    <br />
                    <br />
                    The programme includes plenary sessions and an architectural lecture hall with
                    Russian and international experts, a dealer lounge and business contact
                    exchange, BIM workshops and masterclasses with certificates, an innovation
                    festival in design and materials, a landscape track and an art zone with
                    independent galleries. The business programme concludes with a solemn industry
                    award ceremony.
                  </>
                )}
              </p>
            </div>

            {/* Right — feature pills */}
            <div className="flex flex-col gap-4">
              {features.map(({ Icon, label }, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 rounded-2xl"
                  style={{
                    background: "rgba(169,236,70,0.06)",
                    border: "1px solid rgba(169,236,70,0.12)",
                  }}
                >
                  <div
                    className="size-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: "rgba(169,236,70,0.10)",
                      border: "1px solid rgba(169,236,70,0.2)",
                    }}
                  >
                    <Icon className="size-5" style={{ color: "#a9ec46" }} />
                  </div>
                  <span
                    className="font-bold"
                    style={{ color: "rgba(255,255,255,0.9)", fontSize: "clamp(13px, 1vw, 15px)" }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </m.div>
      </div>
    </section>
  );
}
