"use client";

import { useState, useCallback } from "react";
import { m, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Layers,
  Palette,
  Wrench,
  Leaf,
  Wifi,
  SquareDashedBottom,
  ArrowUpRight,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Locale } from "@/i18n/routing";

type Category = "all" | "materials" | "design";

type Section = {
  Icon: LucideIcon;
  num: string;
  label: string;
  sub: string;
  bg: string;
  category: Exclude<Category, "all">;
};

const SECTIONS_RU: Section[] = [
  {
    Icon: Layers,
    num: "01",
    label: "Строительные материалы",
    sub: "Конструкции · Отделка · Покрытия",
    bg: "linear-gradient(150deg, #1e3a2b 0%, #0a1510 100%)",
    category: "materials",
  },
  {
    Icon: Palette,
    num: "02",
    label: "Интерьер и дизайн",
    sub: "Мебель · Освещение · Текстиль",
    bg: "linear-gradient(150deg, #1a2e38 0%, #0a1510 100%)",
    category: "design",
  },
  {
    Icon: Wrench,
    num: "03",
    label: "Инженерные системы",
    sub: "HVAC · Электрика · Водоснабжение",
    bg: "linear-gradient(150deg, #2a3818 0%, #0a1510 100%)",
    category: "materials",
  },
  {
    Icon: Leaf,
    num: "04",
    label: "Ландшафт и благоустройство",
    sub: "Озеленение · Мощение · Малые формы",
    bg: "linear-gradient(150deg, #1e3820 0%, #0a1510 100%)",
    category: "design",
  },
  {
    Icon: Wifi,
    num: "05",
    label: "Умный дом и технологии",
    sub: "IoT · Автоматизация · Безопасность",
    bg: "linear-gradient(150deg, #20183a 0%, #0a1510 100%)",
    category: "design",
  },
  {
    Icon: SquareDashedBottom,
    num: "06",
    label: "Окна, двери и фасады",
    sub: "Профили · Остекление · Сэндвич-панели",
    bg: "linear-gradient(150deg, #18283a 0%, #0a1510 100%)",
    category: "materials",
  },
];

const SECTIONS_EN: Section[] = [
  {
    Icon: Layers,
    num: "01",
    label: "Building Materials",
    sub: "Structures · Finishing · Coatings",
    bg: "linear-gradient(150deg, #1e3a2b 0%, #0a1510 100%)",
    category: "materials",
  },
  {
    Icon: Palette,
    num: "02",
    label: "Interior & Design",
    sub: "Furniture · Lighting · Textiles",
    bg: "linear-gradient(150deg, #1a2e38 0%, #0a1510 100%)",
    category: "design",
  },
  {
    Icon: Wrench,
    num: "03",
    label: "Engineering Systems",
    sub: "HVAC · Electrical · Plumbing",
    bg: "linear-gradient(150deg, #2a3818 0%, #0a1510 100%)",
    category: "materials",
  },
  {
    Icon: Leaf,
    num: "04",
    label: "Landscape & Outdoor",
    sub: "Greenery · Paving · Street furniture",
    bg: "linear-gradient(150deg, #1e3820 0%, #0a1510 100%)",
    category: "design",
  },
  {
    Icon: Wifi,
    num: "05",
    label: "Smart Home & Technology",
    sub: "IoT · Automation · Security",
    bg: "linear-gradient(150deg, #20183a 0%, #0a1510 100%)",
    category: "design",
  },
  {
    Icon: SquareDashedBottom,
    num: "06",
    label: "Windows, Doors & Facades",
    sub: "Profiles · Glazing · Cladding",
    bg: "linear-gradient(150deg, #18283a 0%, #0a1510 100%)",
    category: "materials",
  },
];

const TABS_RU = [
  { id: "all" as Category, label: "Все разделы" },
  { id: "materials" as Category, label: "Материалы" },
  { id: "design" as Category, label: "Дизайн" },
];

const TABS_EN = [
  { id: "all" as Category, label: "All Sections" },
  { id: "materials" as Category, label: "Materials" },
  { id: "design" as Category, label: "Design" },
];

function SectionCard({ Icon, num, label, sub, bg }: Omit<Section, "category">) {
  return (
    <div
      className="group relative rounded-3xl overflow-hidden cursor-pointer flex-shrink-0 w-full"
      style={{ background: bg, height: "clamp(300px, 32vw, 480px)" }}
    >
      {/* Top lime accent bar on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "#a9ec46" }}
        aria-hidden
      />

      {/* Arrow top-right */}
      <div
        className="absolute top-5 right-5 z-20 size-10 rounded-full border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ borderColor: "rgba(169,236,70,0.4)", background: "rgba(169,236,70,0.08)" }}
      >
        <ArrowUpRight className="size-4" style={{ color: "#a9ec46" }} />
      </div>

      {/* Decorative number */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden
      >
        <span
          className="font-black text-white"
          style={{ fontSize: "clamp(80px, 14vw, 180px)", opacity: 0.04, lineHeight: 1 }}
        >
          {num}
        </span>
      </div>

      {/* Bottom gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65), transparent)" }}
        aria-hidden
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8 z-10">
        <div
          className="size-11 rounded-xl flex items-center justify-center border transition-colors duration-300"
          style={{ background: "rgba(169,236,70,0.06)", borderColor: "rgba(169,236,70,0.18)" }}
        >
          <Icon className="size-5" style={{ color: "#a9ec46" }} />
        </div>

        <div>
          <p
            className="font-black text-white leading-tight mb-2"
            style={{ fontSize: "clamp(16px, 1.6vw, 22px)" }}
          >
            {label}
          </p>
          <p
            className="text-white/40 text-[12px] tracking-wide"
            style={{ fontFamily: "var(--font-mulish)" }}
          >
            {sub}
          </p>
        </div>
      </div>

      {/* Hover lime overlay */}
      <div
        className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-20"
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
          className="font-black leading-tight mb-2"
          style={{ fontSize: "clamp(18px, 1.8vw, 24px)", color: "#0d2d06" }}
        >
          {label}
        </p>
        <p
          className="text-[13px] leading-relaxed"
          style={{ color: "rgba(13,45,6,0.55)", fontFamily: "var(--font-mulish)" }}
        >
          {sub}
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

const CARDS_PER_PAGE = 3;

export function AboutSectionsDark() {
  const locale = useLocale() as Locale;
  const ru = locale === "ru";
  const sections = ru ? SECTIONS_RU : SECTIONS_EN;
  const tabs = ru ? TABS_RU : TABS_EN;

  const [activeTab, setActiveTab] = useState<Category>("all");
  const [slideIndex, setSlideIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const filtered =
    activeTab === "all" ? sections : sections.filter((s) => s.category === activeTab);
  const totalPages = Math.ceil(filtered.length / CARDS_PER_PAGE);
  const safeIndex = Math.min(slideIndex, totalPages - 1);
  const visibleCards = filtered.slice(
    safeIndex * CARDS_PER_PAGE,
    safeIndex * CARDS_PER_PAGE + CARDS_PER_PAGE,
  );

  const handleTab = useCallback((tab: Category) => {
    setActiveTab(tab);
    setSlideIndex(0);
    setDirection(1);
  }, []);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setSlideIndex((i) => Math.max(0, i - 1));
  }, []);

  const handleNext = useCallback(() => {
    setDirection(1);
    setSlideIndex((i) => Math.min(totalPages - 1, i + 1));
  }, [totalPages]);

  const sliderKey = `${activeTab}-${safeIndex}`;

  return (
    <section id="s-sections" className="relative z-10 py-16 sm:py-28">
      <div className="container-neva">
        {/* Header */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row justify-between items-start mb-12 md:mb-16 gap-8"
        >
          <div>
            <span
              className="text-[11px] uppercase tracking-[0.28em] mb-4 block font-bold"
              style={{ color: "#a9ec46", fontFamily: "var(--font-mulish)" }}
            >
              {ru ? "Тематика выставки" : "Exhibition Topics"}
            </span>
            <h2
              className="font-black text-white leading-[1.02]"
              style={{ fontSize: "clamp(32px, 5vw, 68px)" }}
            >
              {ru ? (
                <>
                  Что представлено
                  <br />
                  <span style={{ color: "rgba(255,255,255,0.28)" }}>на выставке.</span>
                </>
              ) : (
                <>
                  What&apos;s on
                  <br />
                  <span style={{ color: "rgba(255,255,255,0.28)" }}>display.</span>
                </>
              )}
            </h2>
          </div>

          {/* Right column: arrows+dots above, tabs below — pt pushes arrows to h2 level */}
          <div className="flex flex-col gap-4 items-start md:items-end md:pt-9">
            {/* Arrows + dots */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handlePrev}
                disabled={safeIndex === 0}
                className="size-10 rounded-full border flex items-center justify-center transition-all duration-200 disabled:opacity-30"
                style={{
                  borderColor: "rgba(255,255,255,0.15)",
                  color: "#fff",
                  background: "rgba(255,255,255,0.04)",
                }}
                aria-label={ru ? "Назад" : "Previous"}
              >
                <ChevronLeft className="size-4" />
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setDirection(i > safeIndex ? 1 : -1);
                      setSlideIndex(i);
                    }}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: i === safeIndex ? "24px" : "8px",
                      height: "8px",
                      background: i === safeIndex ? "#E11B22" : "rgba(255,255,255,0.2)",
                    }}
                    aria-label={`${ru ? "Страница" : "Page"} ${i + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={handleNext}
                disabled={safeIndex >= totalPages - 1}
                className="size-10 rounded-full border flex items-center justify-center transition-all duration-200 disabled:opacity-30"
                style={{
                  borderColor: "rgba(255,255,255,0.15)",
                  color: "#fff",
                  background: "rgba(255,255,255,0.04)",
                }}
                aria-label={ru ? "Вперёд" : "Next"}
              >
                <ChevronRight className="size-4" />
              </button>
            </div>

            {/* Tabs */}
            <div
              className="flex gap-5 items-baseline border-b pb-2"
              style={{ borderColor: "rgba(255,255,255,0.08)" }}
            >
              {tabs.map((tab) => {
                const active = tab.id === activeTab;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => handleTab(tab.id)}
                    className="font-black tracking-tight transition-colors duration-200 pb-1"
                    style={{
                      fontSize: "clamp(15px, 1.6vw, 22px)",
                      color: active ? "#ffffff" : "rgba(255,255,255,0.22)",
                      borderBottom: active ? "2px solid #a9ec46" : "2px solid transparent",
                      background: "none",
                      cursor: "pointer",
                    }}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </m.div>

        {/* Slider */}
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <m.div
              key={sliderKey}
              custom={direction}
              variants={{
                enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
                center: { x: "0%", opacity: 1 },
                exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
            >
              {visibleCards.map((s) => (
                <SectionCard key={s.num} {...s} />
              ))}
              {/* Fill empty slots to keep layout stable */}
              {visibleCards.length < CARDS_PER_PAGE &&
                Array.from({ length: CARDS_PER_PAGE - visibleCards.length }).map((_, i) => (
                  <div key={`empty-${i}`} className="hidden lg:block" />
                ))}
            </m.div>
          </AnimatePresence>
        </div>

        {/* CTA */}
        <div className="mt-10 flex justify-end">
          {/* CTA */}
          <Link
            href="/exhibitors"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full font-black text-[13px] tracking-[0.12em] uppercase transition-all duration-200 hover:gap-4"
            style={{ background: "#12B669", color: "#0d2d06" }}
          >
            {ru ? "Каталог участников" : "Exhibitor Directory"}
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
