"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

const SPEAKERS = [
  {
    name: "Александра Федорова",
    role: "Арт-директор · LINES Design",
    initials: "АФ",
    quote:
      "NevaBuild — это место, где тренды превращаются в реальные проекты. Здесь я нахожу вдохновение и партнёров.",
    bg: "linear-gradient(150deg, #1e3a2b 0%, #0a1510 100%)",
  },
  {
    name: "Борис Уборевич",
    role: "Главный архитектор · АрхБюро",
    initials: "БУ",
    quote:
      "Профессиональный диалог между архитекторами и производителями — именно это делает выставку уникальной.",
    bg: "linear-gradient(150deg, #1a2e38 0%, #0a1510 100%)",
  },
  {
    name: "Артемий Лебедев",
    role: "Основатель · Студия Лебедева",
    initials: "АЛ",
    quote:
      "Дизайн живёт там, где встречаются идея и материал. NevaBuild — главная точка их встречи в России.",
    bg: "linear-gradient(150deg, #201a38 0%, #0a1510 100%)",
  },
  {
    name: "Диана Балашова",
    role: "Дизайнер · DB Studio",
    initials: "ДБ",
    quote:
      "Когда видишь новейшие материалы вживую, понимаешь, как расширяются возможности в дизайне.",
    bg: "linear-gradient(150deg, #321a1a 0%, #0a1510 100%)",
  },
  {
    name: "Михаил Шапошников",
    role: "Партнёр · MLA+",
    initials: "МШ",
    quote:
      "Для урбанистики важен диалог между проектировщиками и поставщиками. NevaBuild создаёт это пространство.",
    bg: "linear-gradient(150deg, #1a2e1a 0%, #0a1510 100%)",
  },
  {
    name: "Олег Клодт",
    role: "Основатель · Oleg Kladt Design",
    initials: "ОК",
    quote:
      "Российский рынок строительных материалов растёт быстро. NevaBuild — лучший способ быть в курсе новинок.",
    bg: "linear-gradient(150deg, #1a1a32 0%, #0a1510 100%)",
  },
  {
    name: "Елена Паунич",
    role: "Основатель · Дизайн-студия",
    initials: "ЕП",
    quote:
      "Luxury-интерьеры начинаются с правильных материалов. На NevaBuild я нахожу именно то, что ищу.",
    bg: "linear-gradient(150deg, #2e1a2e 0%, #0a1510 100%)",
  },
  {
    name: "Валерий Лизунов",
    role: "Руководитель · ZROBIM Architects",
    initials: "ВЛ",
    quote:
      "BIM и параметрика меняют индустрию. Выставка — лучшая площадка, чтобы увидеть, как это работает вживую.",
    bg: "linear-gradient(150deg, #1a2838 0%, #0a1510 100%)",
  },
];

type Speaker = (typeof SPEAKERS)[0];

function SpeakerCard({ name, role, initials, quote, bg }: Speaker) {
  return (
    <div
      className="relative rounded-3xl overflow-hidden cursor-pointer group"
      style={{ height: "360px", background: bg }}
    >
      {/* Lime top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-nb-lime-acid transition-all duration-500 group-hover:opacity-0" />

      {/* Decorative large initials */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="font-black text-white/[0.035]" style={{ fontSize: "130px" }}>
          {initials}
        </span>
      </div>

      {/* Bottom ambient shadow */}
      <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-black/70 to-transparent pointer-events-none transition-opacity duration-500 group-hover:opacity-0" />

      {/* Name strip — slides down on hover */}
      <div className="absolute bottom-0 left-0 right-0 p-6 transition-transform duration-500 group-hover:translate-y-full">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border border-nb-lime-acid/30"
            style={{ background: "rgba(169,236,70,0.10)" }}
          >
            <span className="font-black text-nb-lime-acid text-[11px]">{initials}</span>
          </div>
          <div>
            <p className="font-black text-white text-[14px] leading-tight">{name}</p>
            <p className="text-white/45 text-[11px] mt-0.5">{role}</p>
          </div>
        </div>
      </div>

      {/* Quote overlay — slides up on hover */}
      <div
        className="absolute inset-0 flex flex-col justify-end p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"
        style={{ background: "#a9ec46" }}
      >
        <span
          className="font-black text-[#0d2d06]/10 select-none leading-none block"
          style={{ fontSize: "96px", marginBottom: "-28px" }}
        >
          &#8220;
        </span>
        <p
          className="text-[#0d2d06] text-[14px] leading-relaxed mb-5"
          style={{ fontFamily: "var(--font-mulish)" }}
        >
          {quote}
        </p>
        <div className="border-t border-[#0d2d06]/20 pt-4 flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(13,45,6,0.10)" }}
          >
            <span className="font-black text-[#0d2d06] text-[10px]">{initials}</span>
          </div>
          <div>
            <p className="font-black text-[#0d2d06] text-[13px]">{name}</p>
            <p className="text-[#0d2d06]/60 text-[11px] mt-0.5">{role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AmbassadorsAlt() {
  const locale = useLocale() as Locale;
  const ru = locale === "ru";

  return (
    <section className="py-24" style={{ background: "#0F1813" }}>
      <div className="container-neva">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <span className="font-bold text-[13px] text-nb-teal uppercase tracking-[3px] mb-4 block">
              {ru ? "Эксперты NevaBuild 2027" : "NevaBuild 2027 Experts"}
            </span>
            <h2
              className="font-black text-white leading-tight"
              style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
            >
              {ru ? "Голоса индустрии" : "Voices of the Industry"}
            </h2>
          </div>
          <div className="lg:max-w-[420px]">
            <p
              className="text-white/40 text-[15px] leading-relaxed"
              style={{ fontFamily: "var(--font-mulish)" }}
            >
              {ru
                ? "Ведущие архитекторы, дизайнеры и девелоперы, которые определяют будущее строительной отрасли — уже с нами."
                : "Leading architects, designers and developers shaping the future of the construction industry — already with us."}
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 font-bold text-[13px] text-nb-lime-acid hover:text-white mt-5 transition-colors duration-200 group/cta"
            >
              {ru ? "Стать амбассадором" : "Become an Ambassador"}
              <span className="transition-transform duration-200 group-hover/cta:translate-x-1 inline-block">
                →
              </span>
            </Link>
          </div>
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SPEAKERS.map((s) => (
            <SpeakerCard key={s.name} {...s} />
          ))}
        </div>

        {/* Footer row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-12 pt-12 border-t border-white/[0.06]">
          <p className="text-white/30 text-[13px]">
            {ru ? (
              <>
                Уже <span className="text-nb-lime-acid font-bold">14 амбассадоров</span> подтвердили
                участие в NevaBuild 2027
              </>
            ) : (
              <>
                Already <span className="text-nb-lime-acid font-bold">14 ambassadors</span>{" "}
                confirmed for NevaBuild 2027
              </>
            )}
          </p>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 font-bold text-[14px] px-7 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: "#a9ec46",
              color: "#0d2d06",
              boxShadow: "0 8px 32px rgba(169,236,70,0.18)",
            }}
          >
            {ru ? "Все амбассадоры" : "All Ambassadors"}
          </Link>
        </div>
      </div>
    </section>
  );
}
