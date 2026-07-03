"use client";

import { useState, useCallback } from "react";
import { m, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Layers,
  Palette,
  Wrench,
  Sofa,
  SquareDashedBottom,
  ArrowUpRight,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Locale } from "@/i18n/routing";

type Category = "all" | "materials" | "solutions";

type Section = {
  Icon: LucideIcon;
  num: string;
  label: string;
  sub: string;
  description: string;
  items: string[];
  bg: string;
  category: Exclude<Category, "all">;
};

const SECTIONS_RU: Section[] = [
  {
    Icon: Layers,
    num: "01",
    label: "Строительные материалы",
    sub: "Конструкции · Кровля · Утеплители · Гидроизоляция",
    description:
      "Фундамент любого объекта: стеновые и кровельные материалы, пиломатериалы, металлопрокат, сухие смеси, утеплители и гидроизоляция. Для прорабов, закупщиков и частных застройщиков.",
    items: [
      "Стеновые материалы (кирпич, газобетон, блоки)",
      "Кровельные системы и мембраны",
      "Пиломатериалы и фанера",
      "Сухие строительные смеси",
      "Утеплители (минвата, ППС, ЭППС)",
      "Гидроизоляция и пароизоляция",
    ],
    bg: "linear-gradient(150deg, #1e3a2b 0%, #0a1510 100%)",
    category: "materials",
  },
  {
    Icon: Palette,
    num: "02",
    label: "Отделочные материалы",
    sub: "Штукатурки · Краски · Плитка · Фасадные панели",
    description:
      "Сектор финишной отделки, формирующий визуальный облик интерьеров и фасадов. Декоративные штукатурки, краски, обои, керамическая плитка, фасадные панели, лепнина.",
    items: [
      "Декоративные штукатурки и фактурные покрытия",
      "Краски (интерьерные, фасадные, текстурные)",
      "Обои (бумажные, виниловые, флизелиновые, жидкие)",
      "Керамическая плитка и керамогранит",
      "Фасадные системы и панели",
      "Лепнина, молдинги, декоративные балки",
    ],
    bg: "linear-gradient(150deg, #1a2e38 0%, #0a1510 100%)",
    category: "materials",
  },
  {
    Icon: SquareDashedBottom,
    num: "03",
    label: "Окна, двери, пол",
    sub: "Остекление · Двери · Напольные покрытия",
    description:
      "Комплексный сектор: светопрозрачные конструкции, входные и межкомнатные двери с фурнитурой, а также все типы напольных покрытий — от паркетной доски до ПВХ-плит.",
    items: [
      "Окна (ПВХ, алюминий, дерево, стеклопакеты)",
      "Балконные и фасадные системы",
      "Входные и межкомнатные двери",
      "Дверная фурнитура (ручки, замки, доводчики)",
      "Напольные покрытия (паркет, ламинат, винил, ковролин)",
      "Плинтусы и пороги",
    ],
    bg: "linear-gradient(150deg, #18283a 0%, #0a1510 100%)",
    category: "materials",
  },
  {
    Icon: Wrench,
    num: "04",
    label: "Инженерные решения",
    sub: "HVAC · Электрика · Водоснабжение · Умный дом",
    description:
      "Технологическое ядро выставки: отопление, вентиляция, кондиционирование, водоснабжение, канализация, электрика и решения для «Умного дома». Для проектировщиков и инженеров.",
    items: [
      "Радиаторы, тёплые полы, котельное оборудование",
      "Вентиляция и кондиционеры",
      "Водоснабжение и канализация (трубы, фитинги, насосы)",
      "Инженерная сантехника (смесители, душевые системы)",
      "Кабель, щиты, автоматика",
      "Системы «Умный дом» и освещение",
    ],
    bg: "linear-gradient(150deg, #2a3818 0%, #0a1510 100%)",
    category: "solutions",
  },
  {
    Icon: Sofa,
    num: "05",
    label: "Интерьерные решения",
    sub: "Мебель · Освещение · Текстиль · Декор",
    description:
      "Раздел, формирующий стиль и атмосферу пространства. Мебель, системы хранения, дизайнерский свет, текстиль, ковры, декор и арт-объекты для жилых и общественных интерьеров.",
    items: [
      "Корпусная мебель (кухни, шкафы, стеллажи)",
      "Мягкая мебель (диваны, кресла, пуфы)",
      "Системы хранения (гардеробные, модули)",
      "Дизайнерское освещение (люстры, бра, LED-ленты)",
      "Текстиль (шторы, карнизы, ткани, ковры)",
      "Декор (зеркала, часы, вазы, картины, арт-объекты)",
    ],
    bg: "linear-gradient(150deg, #20183a 0%, #0a1510 100%)",
    category: "solutions",
  },
];

const SECTIONS_EN: Section[] = [
  {
    Icon: Layers,
    num: "01",
    label: "Building Materials",
    sub: "Structures · Roofing · Insulation · Waterproofing",
    description:
      "The foundation of any structure: wall and roofing materials, lumber, rolled metal, dry mixes, insulation and waterproofing. For construction managers, procurement specialists, and developers.",
    items: [
      "Wall materials (brick, aerated concrete, blocks)",
      "Roofing systems and membranes",
      "Lumber and plywood",
      "Dry building mixes",
      "Insulation (mineral wool, EPS, XPS)",
      "Waterproofing and vapour barriers",
    ],
    bg: "linear-gradient(150deg, #1e3a2b 0%, #0a1510 100%)",
    category: "materials",
  },
  {
    Icon: Palette,
    num: "02",
    label: "Finishing Materials",
    sub: "Plasters · Paints · Tiles · Facade Panels",
    description:
      "The finishing sector shaping the visual character of interiors and facades. Decorative plasters, paints, wallpapers, ceramic tiles, facade panels and mouldings.",
    items: [
      "Decorative plasters and textured coatings",
      "Paints (interior, exterior, textured)",
      "Wallpapers (paper, vinyl, fleece, liquid)",
      "Ceramic tiles and porcelain stoneware",
      "Facade systems and panels",
      "Mouldings, cornices and decorative beams",
    ],
    bg: "linear-gradient(150deg, #1a2e38 0%, #0a1510 100%)",
    category: "materials",
  },
  {
    Icon: SquareDashedBottom,
    num: "03",
    label: "Windows, Doors & Flooring",
    sub: "Glazing · Doors · Flooring",
    description:
      "A comprehensive sector: glazing systems, entrance and interior doors with full hardware sets, and all types of flooring — from hardwood boards to modern PVC slabs.",
    items: [
      "Windows (PVC, aluminium, timber, glass units)",
      "Balcony and facade systems",
      "Entrance and interior doors",
      "Door hardware (handles, locks, closers)",
      "Flooring (parquet, laminate, vinyl, carpet)",
      "Skirting boards and thresholds",
    ],
    bg: "linear-gradient(150deg, #18283a 0%, #0a1510 100%)",
    category: "materials",
  },
  {
    Icon: Wrench,
    num: "04",
    label: "Engineering Solutions",
    sub: "HVAC · Electrical · Plumbing · Smart Home",
    description:
      "The technical core: heating, ventilation, air-conditioning, water supply, drainage, electrical systems and Smart Home solutions. For designers, engineers, and installation contractors.",
    items: [
      "Radiators, underfloor heating, boiler equipment",
      "Ventilation and air-conditioning",
      "Water supply and drainage (pipes, fittings, pumps)",
      "Engineering plumbing (mixers, shower systems)",
      "Cable, distribution boards, automation",
      "Smart Home systems and lighting",
    ],
    bg: "linear-gradient(150deg, #2a3818 0%, #0a1510 100%)",
    category: "solutions",
  },
  {
    Icon: Sofa,
    num: "05",
    label: "Interior Solutions",
    sub: "Furniture · Lighting · Textiles · Décor",
    description:
      "The section shaping the style and atmosphere of a space. Furniture, storage systems, designer lighting, textiles, rugs, décor and art objects for residential and commercial interiors.",
    items: [
      "Case furniture (kitchens, wardrobes, shelving)",
      "Upholstered furniture (sofas, armchairs, ottomans)",
      "Storage systems (walk-in closets, modules)",
      "Designer lighting (chandeliers, sconces, LED strips)",
      "Textiles (curtains, cornices, fabrics, rugs)",
      "Décor (mirrors, clocks, vases, artwork, art objects)",
    ],
    bg: "linear-gradient(150deg, #20183a 0%, #0a1510 100%)",
    category: "solutions",
  },
];

const TABS_RU = [
  { id: "all" as Category, label: "Все разделы" },
  { id: "materials" as Category, label: "Материалы" },
  { id: "solutions" as Category, label: "Решения" },
];

const TABS_EN = [
  { id: "all" as Category, label: "All Sections" },
  { id: "materials" as Category, label: "Materials" },
  { id: "solutions" as Category, label: "Solutions" },
];

function SectionCard({ Icon, num, label, sub, description, items, bg }: Omit<Section, "category">) {
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

      {/* Default content */}
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
        className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-20 rounded-3xl"
        style={{ background: "#a9ec46" }}
      >
        <span
          className="text-[11px] font-bold uppercase tracking-[0.16em] mb-2"
          style={{ color: "rgba(13,45,6,0.45)" }}
        >
          {num}
        </span>
        <p
          className="font-black leading-tight mb-2"
          style={{ fontSize: "clamp(16px, 1.6vw, 20px)", color: "#0d2d06" }}
        >
          {label}
        </p>
        <p
          className="text-[12px] leading-snug mb-3 line-clamp-3"
          style={{ color: "rgba(13,45,6,0.6)", fontFamily: "var(--font-mulish)" }}
        >
          {description}
        </p>
        <div className="flex flex-wrap gap-1">
          {items.slice(0, 4).map((item, i) => (
            <span
              key={i}
              className="text-[10px] font-bold px-2 py-0.5 rounded-full leading-tight"
              style={{ background: "rgba(13,45,6,0.12)", color: "rgba(13,45,6,0.65)" }}
            >
              {item.split(" (")[0]}
            </span>
          ))}
          {items.length > 4 && (
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded-full leading-tight"
              style={{ background: "rgba(13,45,6,0.12)", color: "rgba(13,45,6,0.65)" }}
            >
              +{items.length - 4}
            </span>
          )}
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

          {/* Right column: arrows+dots above, tabs below */}
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
              {visibleCards.length < CARDS_PER_PAGE &&
                Array.from({ length: CARDS_PER_PAGE - visibleCards.length }).map((_, i) => (
                  <div key={`empty-${i}`} className="hidden lg:block" />
                ))}
            </m.div>
          </AnimatePresence>
        </div>

        {/* CTA */}
        <div className="mt-10 flex justify-end">
          <Link
            href="/exhibitors"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full font-black text-[13px] tracking-[0.12em] uppercase transition-all duration-200 hover:gap-4"
            style={{ background: "#a9ec46", color: "#0d2d06" }}
          >
            {ru ? "Каталог участников" : "Exhibitor Directory"}
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
