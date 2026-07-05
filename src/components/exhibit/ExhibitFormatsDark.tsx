"use client";

import { m } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { LayoutGrid, Sparkles, Handshake, Mic, Rocket, ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Locale } from "@/i18n/routing";

type FormatKey = "standard" | "custom" | "partner" | "speaker" | "special";

type Format = {
  key: FormatKey;
  Icon: LucideIcon;
  num: string;
  image: string;
  overlay: string;
  sub: { ru: string; en: string };
};

const FORMATS: Format[] = [
  {
    key: "standard",
    Icon: LayoutGrid,
    num: "01",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop",
    overlay: "linear-gradient(150deg, rgba(10,21,16,0.75) 0%, rgba(5,10,8,0.88) 100%)",
    sub: { ru: "Готовая застройка · 6–18 м²", en: "Shell scheme · 6–18 m²" },
  },
  {
    key: "custom",
    Icon: Sparkles,
    num: "02",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format&fit=crop",
    overlay: "linear-gradient(150deg, rgba(8,16,26,0.75) 0%, rgba(5,10,8,0.88) 100%)",
    sub: { ru: "Авторский дизайн · от 20 м²", en: "Custom design · from 20 m²" },
  },
  {
    key: "partner",
    Icon: Handshake,
    num: "03",
    image:
      "https://images.unsplash.com/photo-1560439514-4e9645039924?q=80&w=1200&auto=format&fit=crop",
    overlay: "linear-gradient(150deg, rgba(14,21,8,0.78) 0%, rgba(5,10,8,0.90) 100%)",
    sub: { ru: "Спонсорство · Брендинг площадки", en: "Sponsorship · Venue branding" },
  },
  {
    key: "speaker",
    Icon: Mic,
    num: "04",
    image:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1200&auto=format&fit=crop",
    overlay: "linear-gradient(150deg, rgba(10,21,10,0.78) 0%, rgba(5,10,8,0.90) 100%)",
    sub: { ru: "Деловая программа · Лекция или панель", en: "Business programme · Talk or panel" },
  },
  {
    key: "special",
    Icon: Rocket,
    num: "05",
    image:
      "https://images.unsplash.com/photo-1547637589-f54c34f5d7a4?q=80&w=1200&auto=format&fit=crop",
    overlay: "linear-gradient(150deg, rgba(10,8,21,0.78) 0%, rgba(5,10,8,0.90) 100%)",
    sub: {
      ru: "Инсталляция · Активация · Интеграция",
      en: "Installation · Activation · Integration",
    },
  },
];

function FormatCard({ fmt, label, ru }: { fmt: Format; label: string; ru: boolean }) {
  const { Icon, num, image, overlay, sub } = fmt;
  return (
    <div
      className="group relative rounded-3xl overflow-hidden cursor-pointer"
      style={{ height: "clamp(260px, 28vw, 420px)" }}
    >
      {/* Photo background */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />

      {/* Dark color overlay */}
      <div className="absolute inset-0" style={{ background: overlay }} />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.80), transparent)" }}
        aria-hidden
      />

      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "#a9ec46" }}
        aria-hidden
      />

      {/* Arrow */}
      <div
        className="absolute top-5 right-5 z-20 size-10 rounded-full border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ borderColor: "rgba(169,236,70,0.4)", background: "rgba(169,236,70,0.08)" }}
      >
        <ArrowUpRight className="size-4" style={{ color: "#a9ec46" }} />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8 z-10">
        <div
          className="size-11 rounded-xl flex items-center justify-center border"
          style={{ background: "rgba(169,236,70,0.08)", borderColor: "rgba(169,236,70,0.20)" }}
        >
          <Icon className="size-5" style={{ color: "#a9ec46" }} />
        </div>
        <div>
          <p
            className="font-black text-white leading-tight mb-1.5"
            style={{ fontSize: "clamp(15px, 1.5vw, 20px)" }}
          >
            {label}
          </p>
          <p
            className="text-white/75 text-[12px] tracking-wide"
            style={{ fontFamily: "var(--font-mulish)" }}
          >
            {ru ? sub.ru : sub.en}
          </p>
        </div>
      </div>

      {/* Hover lime overlay */}
      <div
        className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-20 rounded-3xl"
        style={{ background: "#a9ec46" }}
      >
        <div
          className="font-black leading-none block select-none mb-1"
          style={{ fontSize: "clamp(48px, 8vw, 96px)", color: "rgba(13,45,6,0.06)" }}
          aria-hidden
        >
          &#8220;
        </div>
        <p
          className="font-black leading-tight mb-1.5"
          style={{ fontSize: "clamp(16px, 1.6vw, 22px)", color: "#0d2d06" }}
        >
          {label}
        </p>
        <p
          className="text-[13px] leading-relaxed"
          style={{ color: "rgba(13,45,6,0.65)", fontFamily: "var(--font-mulish)" }}
        >
          {ru ? sub.ru : sub.en}
        </p>
        <div className="mt-4 pt-4 border-t" style={{ borderColor: "rgba(13,45,6,0.15)" }}>
          <span
            className="text-[11px] font-black tracking-[0.14em] uppercase"
            style={{ color: "#0d2d06" }}
          >
            {num}
          </span>
        </div>
      </div>
    </div>
  );
}

export function ExhibitFormatsDark() {
  const locale = useLocale() as Locale;
  const ru = locale === "ru";
  const t = useTranslations("ExhibitPage");

  return (
    <section id="e-formats" className="relative z-10 py-10 sm:py-20">
      <div className="container-neva">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span
            className="text-[11px] uppercase tracking-[0.28em] mb-4 block font-bold"
            style={{ color: "#a9ec46", fontFamily: "var(--font-mulish)" }}
          >
            {ru ? "Форматы" : "Formats"}
          </span>
          <h2
            className="font-black text-white leading-[1.02]"
            style={{ fontSize: "clamp(32px, 5vw, 68px)" }}
          >
            {ru ? (
              <>
                {t("formatsTitle")}
                <br />
                <span style={{ color: "#ffffff" }}>на ваш выбор.</span>
              </>
            ) : (
              <>
                {t("formatsTitle")}
                <br />
                <span style={{ color: "#ffffff" }}>your choice.</span>
              </>
            )}
          </h2>
        </m.div>

        {/* 2+3 grid */}
        <m.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4"
        >
          {FORMATS.slice(0, 2).map((fmt) => (
            <div key={fmt.key} className="lg:col-span-3">
              <FormatCard fmt={fmt} label={t(`formats.${fmt.key}`)} ru={ru} />
            </div>
          ))}
          {FORMATS.slice(2).map((fmt) => (
            <div key={fmt.key} className="lg:col-span-2">
              <FormatCard fmt={fmt} label={t(`formats.${fmt.key}`)} ru={ru} />
            </div>
          ))}
        </m.div>
      </div>
    </section>
  );
}
