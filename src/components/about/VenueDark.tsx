"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import type { Locale } from "@/i18n/routing";

const CARDS_RU = [
  {
    bigNum: "60К",
    label: "КВЦ Экспофорум",
    sublabel: "Санкт-Петербург",
    bg: "linear-gradient(150deg, #1e3a2b 0%, #0a1510 100%)",
    quote:
      "60 000 м² площади в трёх павильонах. Один из крупнейших выставочных комплексов Северо-Запада. Современная инфраструктура и полный сервис.",
    quoteInitials: "КВЦ",
    quoteName: "КВЦ Экспофорум",
    quoteRole: "Санкт-Петербург, Петербургское ш., 64/1",
    span: "lg:col-span-2",
  },
  {
    bigNum: "20",
    label: "Транспортная доступность",
    sublabel: "Минут от центра",
    bg: "linear-gradient(150deg, #1a2e38 0%, #0a1510 100%)",
    quote:
      "20 минут от центра города. Прямой автобус от м. Московская, собственная многоуровневая парковка.",
    quoteInitials: "20м",
    quoteName: "Быстрый доступ",
    quoteRole: "м. Московская / Экспофорум",
    span: "lg:col-span-1",
  },
  {
    bigNum: "8M",
    label: "Строительный рынок",
    sublabel: "Северо-Запад России",
    bg: "linear-gradient(150deg, #201a38 0%, #0a1510 100%)",
    quote:
      "8 млн м² жилья ежегодно. Петербург является архитектурной и деловой столицей Северо-Западного федерального округа.",
    quoteInitials: "8M",
    quoteName: "Рынок региона",
    quoteRole: "Северо-Западный федеральный округ",
    span: "lg:col-span-1",
  },
  {
    bigNum: "35",
    label: "Страны-участницы",
    sublabel: "Международный формат",
    bg: "linear-gradient(150deg, #1e2838 0%, #0a1510 100%)",
    quote:
      "Участники из 35 стран делают NEVA BUILD по-настоящему международной площадкой для диалога производителей и байеров.",
    quoteInitials: "35",
    quoteName: "Международный охват",
    quoteRole: "Азия, Европа, СНГ",
    span: "lg:col-span-2",
  },
];

const CARDS_EN = [
  {
    bigNum: "60K",
    label: "Expoforum Convention Centre",
    sublabel: "Saint Petersburg",
    bg: "linear-gradient(150deg, #1e3a2b 0%, #0a1510 100%)",
    quote:
      "60,000 m² across three pavilions. One of the largest exhibition complexes in the Northwest. Modern infrastructure and full service.",
    quoteInitials: "ECC",
    quoteName: "Expoforum Convention Centre",
    quoteRole: "Saint Petersburg, Peterburgskoe sh., 64/1",
    span: "lg:col-span-2",
  },
  {
    bigNum: "20",
    label: "Accessibility",
    sublabel: "Minutes from the city centre",
    bg: "linear-gradient(150deg, #1a2e38 0%, #0a1510 100%)",
    quote:
      "20 minutes from the city centre. Direct bus from Moskovskaya metro, own multi-level parking.",
    quoteInitials: "20m",
    quoteName: "Fast access",
    quoteRole: "Moskovskaya metro / Expoforum",
    span: "lg:col-span-1",
  },
  {
    bigNum: "8M",
    label: "Construction Market",
    sublabel: "Northwestern Russia",
    bg: "linear-gradient(150deg, #201a38 0%, #0a1510 100%)",
    quote:
      "8 million m² of housing per year. Saint Petersburg is the architectural and business capital of the Northwestern Federal District.",
    quoteInitials: "8M",
    quoteName: "Regional market",
    quoteRole: "Northwestern Federal District",
    span: "lg:col-span-1",
  },
  {
    bigNum: "35",
    label: "Participating Countries",
    sublabel: "International format",
    bg: "linear-gradient(150deg, #1e2838 0%, #0a1510 100%)",
    quote:
      "Participants from 35 countries make NEVA BUILD a truly international platform for dialogue between manufacturers and buyers.",
    quoteInitials: "35",
    quoteName: "International reach",
    quoteRole: "Asia, Europe, CIS",
    span: "lg:col-span-2",
  },
];

type Card = (typeof CARDS_RU)[0];

function VenueCard({
  bigNum,
  label,
  sublabel,
  bg,
  quote,
  quoteInitials,
  quoteName,
  quoteRole,
  span,
}: Card) {
  const [tapped, setTapped] = useState(false);

  return (
    <div
      className={`relative rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer group touch-manipulation ${span}`}
      style={{ background: bg, aspectRatio: "16 / 9", minHeight: "200px" }}
      onClick={() => setTapped((v) => !v)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && setTapped((v) => !v)}
      aria-label={label}
    >
      {/* Lime top accent bar */}
      <div
        className={`absolute top-0 left-0 right-0 h-[3px] transition-opacity duration-300 ${
          tapped ? "opacity-0" : "group-hover:opacity-0"
        }`}
        style={{ background: "#a9ec46" }}
      />

      {/* Decorative large number */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden
      >
        <span
          className="font-black text-white/[0.04]"
          style={{ fontSize: "clamp(60px, 10vw, 120px)" }}
        >
          {bigNum}
        </span>
      </div>

      {/* Bottom ambient */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-36 pointer-events-none transition-opacity duration-300 ${
          tapped ? "opacity-0" : "group-hover:opacity-0"
        }`}
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65), transparent)" }}
      />

      {/* Name strip */}
      <div
        className={`absolute bottom-0 left-0 right-0 p-4 sm:p-6 transition-transform duration-300 ${
          tapped ? "translate-y-full" : "group-hover:translate-y-full"
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className="size-10 rounded-full flex items-center justify-center flex-shrink-0 border"
            style={{
              background: "rgba(169,236,70,0.10)",
              borderColor: "rgba(169,236,70,0.30)",
            }}
          >
            <span className="font-black text-[10px]" style={{ color: "#a9ec46" }}>
              {quoteInitials}
            </span>
          </div>
          <div>
            <p className="font-black text-white text-[13px] leading-tight">{label}</p>
            <p className="text-white/45 text-[11px] mt-0.5">{sublabel}</p>
          </div>
        </div>
      </div>

      {/* Reveal overlay — slides up on hover/tap */}
      <div
        className={`absolute inset-0 flex flex-col justify-end p-4 sm:p-6 transition-transform duration-300 ease-out ${
          tapped ? "translate-y-0" : "translate-y-full group-hover:translate-y-0"
        }`}
        style={{ background: "#a9ec46" }}
      >
        <span
          className="font-black leading-none block select-none"
          style={{
            fontSize: "clamp(44px, 8vw, 96px)",
            color: "rgba(13,45,6,0.08)",
            marginBottom: "clamp(-14px, -2vw, -28px)",
          }}
        >
          &#8220;
        </span>
        <p
          className="text-[13px] sm:text-[14px] leading-relaxed mb-4"
          style={{ color: "#0d2d06", fontFamily: "var(--font-mulish)" }}
        >
          {quote}
        </p>
        <div
          className="border-t pt-3 sm:pt-4 flex items-center gap-2 sm:gap-3"
          style={{ borderColor: "rgba(13,45,6,0.2)" }}
        >
          <div
            className="size-8 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(13,45,6,0.10)" }}
          >
            <span className="font-black text-[10px]" style={{ color: "#0d2d06" }}>
              {quoteInitials}
            </span>
          </div>
          <div>
            <p className="font-black text-[12px] sm:text-[13px]" style={{ color: "#0d2d06" }}>
              {quoteName}
            </p>
            <p
              className="text-[10px] sm:text-[11px] mt-0.5"
              style={{ color: "rgba(13,45,6,0.55)" }}
            >
              {quoteRole}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function VenueDark() {
  const locale = useLocale() as Locale;
  const ru = locale === "ru";
  const cards = ru ? CARDS_RU : CARDS_EN;

  return (
    <section
      id="s-venue"
      className="relative z-10 py-12 sm:py-24"
      style={{ background: "rgba(8,16,11,0.88)" }}
    >
      <div className="container-neva">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 lg:mb-16">
          <h2
            className="font-black text-white leading-tight"
            style={{ fontSize: "clamp(32px, 4.5vw, 60px)" }}
          >
            {ru ? "Почему Санкт-Петербург" : "Why Saint Petersburg"}
          </h2>
          <p
            className="text-[15px] leading-relaxed lg:max-w-[380px]"
            style={{ color: "rgba(255,255,255,0.38)", fontFamily: "var(--font-mulish)" }}
          >
            {ru
              ? "Северо-Запад является одним из крупнейших строительных рынков страны. Петербург его деловой и архитектурный центр."
              : "The Northwest is one of the country's largest construction markets. Saint Petersburg is its business and architectural centre."}
          </p>
        </div>

        {/* Asymmetric grid — NOT three equal cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {cards.map((c) => (
            <VenueCard key={c.label} {...c} />
          ))}
        </div>

        <p
          className="text-center text-[12px] mt-8"
          style={{ color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-mulish)" }}
        >
          {ru ? "Нажмите на карточку, чтобы узнать больше" : "Tap a card to learn more"}
        </p>
      </div>
    </section>
  );
}
