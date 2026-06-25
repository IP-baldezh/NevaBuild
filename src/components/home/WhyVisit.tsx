"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

const REASONS_RU = [
  {
    num: "01",
    title: "Крупнейшая площадка Северо-Запада",
    desc: "60 000 м² экспозиционной площади в трёх павильонах Экспофорума — самый масштабный отраслевой смотр в регионе.",
  },
  {
    num: "02",
    title: "Живой рынок за 4 дня",
    desc: "Встречи с поставщиками, дистрибьюторами и производителями в режиме реального времени. Без посредников и онлайн-фильтров.",
  },
  {
    num: "03",
    title: "Деловая программа мирового уровня",
    desc: "200+ форумов, круглых столов и мастер-классов. Спикеры — практикующие архитекторы, девелоперы, ведущие инженеры страны.",
  },
  {
    num: "04",
    title: "Технологии будущего сегодня",
    desc: "Зона инноваций с демонстрацией BIM-проектирования, роботизированных строительных систем и материалов нового поколения.",
  },
  {
    num: "05",
    title: "Нетворкинг с топ-аудиторией",
    desc: "Платформа matchmaking соединяет участников ещё до открытия выставки. 80% экспонентов фиксируют партнёрства уже на этапе выставки.",
  },
  {
    num: "06",
    title: "Международный формат",
    desc: "Делегации из 70+ стран. Официальные национальные экспозиции Германии, Италии, Финляндии, Китая и других лидеров строительного рынка.",
  },
];

const REASONS_EN = [
  {
    num: "01",
    title: "Largest Venue in the Northwest",
    desc: "60 000 m² of exhibition space across three pavilions at Expoforum — the region's most large-scale industry showcase.",
  },
  {
    num: "02",
    title: "Live Market in 4 Days",
    desc: "Meet suppliers, distributors and manufacturers in real time. No intermediaries, no online filters.",
  },
  {
    num: "03",
    title: "World-Class Business Programme",
    desc: "200+ forums, roundtables and masterclasses. Speakers are practising architects, developers and leading engineers.",
  },
  {
    num: "04",
    title: "Tomorrow's Technologies Today",
    desc: "An innovation zone showcasing BIM design, robotic construction systems and next-generation materials.",
  },
  {
    num: "05",
    title: "Networking with Top Audience",
    desc: "The matchmaking platform connects participants before the exhibition opens. 80% of exhibitors confirm partnerships during the event.",
  },
  {
    num: "06",
    title: "International Format",
    desc: "Delegations from 70+ countries. Official national expositions from Germany, Italy, Finland, China and other construction market leaders.",
  },
];

export function WhyVisit() {
  const locale = useLocale() as Locale;
  const ru = locale === "ru";
  const reasons = ru ? REASONS_RU : REASONS_EN;

  return (
    <section
      id="why-visit"
      className="py-20 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #12B669 0%, #a9ec46 55%, #d4f772 100%)",
      }}
    >
      <div className="container-neva">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          {/* Left — sticky title */}
          <div className="lg:w-[340px] flex-shrink-0">
            <span className="font-bold text-[13px] text-nb-teal uppercase tracking-[3px] mb-4 block">
              {ru ? "Почему NevaBuild" : "Why NevaBuild"}
            </span>
            <h2
              className="font-black leading-tight mb-6 text-white"
              style={{ fontSize: "clamp(32px, 4vw, 52px)" }}
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
                  the exhibition
                </>
              )}
            </h2>
            <p
              className="text-[15px] leading-relaxed mb-10 text-white/80"
              style={{ fontFamily: "var(--font-mulish)" }}
            >
              {ru
                ? "Каждый год NevaBuild задаёт тренды строительного рынка страны. Не упустите возможность быть в центре событий."
                : "Every year NevaBuild sets the trends of the country's construction market. Don't miss your chance to be at the centre of it all."}
            </p>
            <Link
              href="/tickets"
              className="inline-flex items-center gap-2 font-bold text-[14.5px] px-6 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 bg-brand-red text-white hover:opacity-90"
              style={{ boxShadow: "0 8px 24px rgba(225,27,34,0.35)" }}
            >
              {ru ? "Зарегистрироваться бесплатно" : "Register for Free"}
            </Link>
          </div>

          {/* Right — 2×3 grid */}
          <div
            className="flex-1 grid sm:grid-cols-2 gap-px rounded-2xl overflow-hidden"
            style={{ background: "rgba(13,45,6,0.12)" }}
          >
            {reasons.map(({ num, title, desc }) => (
              <div
                key={num}
                className="p-8 group transition-colors duration-300"
                style={{
                  background: "rgba(255,255,255,0.18)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.30)",
                }}
              >
                <span className="font-black text-[22px] mb-3 block text-brand-red">{num}</span>
                <h3 className="font-black text-[17px] text-white leading-snug mb-3">{title}</h3>
                <p
                  className="text-[14px] leading-relaxed"
                  style={{ color: "#0d2d06", fontFamily: "var(--font-mulish)" }}
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
