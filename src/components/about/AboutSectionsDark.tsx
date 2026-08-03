"use client";

import { useState, useCallback } from "react";
import { m, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";
import {
  Layers,
  Palette,
  Wrench,
  Sofa,
  SquareDashedBottom,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Building2,
  Zap,
  Home,
  Compass,
  Wifi,
  Shield,
  Package,
  Paintbrush,
  Hammer,
  HardHat,
  Lightbulb,
  Thermometer,
  Wind,
  Droplets,
  Settings,
  Factory,
  Warehouse,
  LayoutGrid,
  PaintBucket,
  Ruler,
  DoorOpen,
  Truck,
  Cpu,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { CategoryCard } from "@/components/categories/CategoryCard";

const ICON_MAP: Record<string, LucideIcon> = {
  Layers,
  Palette,
  Wrench,
  Sofa,
  SquareDashedBottom,
  Building2,
  Zap,
  Home,
  Compass,
  Wifi,
  Shield,
  Package,
  Paintbrush,
  Hammer,
  HardHat,
  Lightbulb,
  Thermometer,
  Wind,
  Droplets,
  Settings,
  Factory,
  Warehouse,
  LayoutGrid,
  PaintBucket,
  Ruler,
  DoorOpen,
  Truck,
  Cpu,
};

const EXTRA_BGS = [
  "linear-gradient(150deg, #1e3a2b 0%, #0a1510 100%)",
  "linear-gradient(150deg, #2a1e3a 0%, #0a0a15 100%)",
  "linear-gradient(150deg, #3a2a1e 0%, #150a05 100%)",
  "linear-gradient(150deg, #1e2a3a 0%, #050a15 100%)",
  "linear-gradient(150deg, #3a1e2a 0%, #15050a 100%)",
  "linear-gradient(150deg, #2a3a1e 0%, #0a1505 100%)",
  "linear-gradient(150deg, #1e3a3a 0%, #051515 100%)",
];
import type { Locale } from "@/i18n/routing";
import type { ExhibitorCategory } from "@prisma/client";

type Section = {
  Icon: LucideIcon;
  num: string;
  label: string;
  sub: string;
  description: string;
  items: string[];
  bg: string;
  image: string;
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
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop",
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
    image:
      "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?q=80&w=800&auto=format&fit=crop",
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
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
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
    image:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=800&auto=format&fit=crop",
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
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop",
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
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop",
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
    image:
      "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?q=80&w=800&auto=format&fit=crop",
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
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
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
    image:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=800&auto=format&fit=crop",
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
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop",
  },
];

function SectionCard({ Icon, num, label, sub, description, items, bg, image }: Section) {
  return (
    <CategoryCard
      num={num}
      Icon={Icon}
      label={label}
      sub={sub}
      image={image || undefined}
      bg={bg}
      className="cursor-pointer"
    >
      {/* Arrow top-right */}
      <div
        className="absolute top-5 right-5 z-20 size-10 rounded-full border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ borderColor: "rgba(169,236,70,0.4)", background: "rgba(169,236,70,0.08)" }}
      >
        <ArrowUpRight className="size-4" style={{ color: "#a9ec46" }} />
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
    </CategoryCard>
  );
}

const CARDS_PER_PAGE = 3;

export function AboutSectionsDark({ categories = [] }: { categories?: ExhibitorCategory[] }) {
  const locale = useLocale() as Locale;
  const ru = locale === "ru";
  const baseSections = ru ? SECTIONS_RU : SECTIONS_EN;

  // When DB has categories, map over ALL of them (not capped at baseSections.length)
  const sections: Section[] =
    categories.length > 0
      ? categories.map((cat, i) => {
          const base = baseSections[i];
          const ResolvedIcon = ICON_MAP[cat.icon ?? ""] ?? base?.Icon ?? Layers;
          const dbSub = ru ? cat.subRu : cat.subEn;
          return {
            Icon: ResolvedIcon,
            num: String(i + 1).padStart(2, "0"),
            label: ru ? cat.titleRu : cat.titleEn,
            sub: dbSub || base?.sub || (ru ? cat.titleRu : cat.titleEn),
            description: base?.description ?? "",
            items: base?.items ?? [],
            bg: base?.bg ?? EXTRA_BGS[i % EXTRA_BGS.length],
            image: cat.imageUrl ?? base?.image ?? "",
          };
        })
      : baseSections;

  const [slideIndex, setSlideIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const totalPages = Math.ceil(sections.length / CARDS_PER_PAGE);
  const safeIndex = Math.min(slideIndex, totalPages - 1);
  const visibleCards = sections.slice(
    safeIndex * CARDS_PER_PAGE,
    safeIndex * CARDS_PER_PAGE + CARDS_PER_PAGE,
  );

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setSlideIndex((i) => Math.max(0, i - 1));
  }, []);

  const handleNext = useCallback(() => {
    setDirection(1);
    setSlideIndex((i) => Math.min(totalPages - 1, i + 1));
  }, [totalPages]);

  const sliderKey = safeIndex.toString();

  return (
    <section id="s-sections" className="relative z-10 py-10 sm:py-20">
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
              {ru ? "Разделы выставки" : "Exhibition Sections"}
            </span>
            <h2
              className="font-black text-white leading-[1.02]"
              style={{ fontSize: "clamp(32px, 5vw, 68px)" }}
            >
              {ru ? (
                <>
                  Что представлено
                  <br />
                  <span style={{ color: "#ffffff" }}>на выставке.</span>
                </>
              ) : (
                <>
                  What&apos;s on
                  <br />
                  <span style={{ color: "#ffffff" }}>display.</span>
                </>
              )}
            </h2>
          </div>

          {/* Arrows + dots (desktop only) */}
          <div className="hidden sm:flex items-center gap-3 md:pt-9">
            <button
              type="button"
              onClick={handlePrev}
              disabled={safeIndex === 0}
              className="size-11 rounded-full border-2 flex items-center justify-center transition-all duration-200 disabled:opacity-25 hover:scale-105"
              style={{
                borderColor: safeIndex === 0 ? "rgba(255,255,255,0.25)" : "rgba(169,236,70,0.7)",
                color: safeIndex === 0 ? "#fff" : "#a9ec46",
                background: safeIndex === 0 ? "rgba(255,255,255,0.06)" : "rgba(169,236,70,0.10)",
              }}
              aria-label={ru ? "Назад" : "Previous"}
            >
              <ChevronLeft className="size-5" />
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
                    width: i === safeIndex ? "28px" : "8px",
                    height: "8px",
                    background: i === safeIndex ? "#a9ec46" : "rgba(255,255,255,0.30)",
                  }}
                  aria-label={`${ru ? "Страница" : "Page"} ${i + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={handleNext}
              disabled={safeIndex >= totalPages - 1}
              className="size-11 rounded-full border-2 flex items-center justify-center transition-all duration-200 disabled:opacity-25 hover:scale-105"
              style={{
                borderColor:
                  safeIndex >= totalPages - 1 ? "rgba(255,255,255,0.25)" : "rgba(169,236,70,0.7)",
                color: safeIndex >= totalPages - 1 ? "#fff" : "#a9ec46",
                background:
                  safeIndex >= totalPages - 1 ? "rgba(255,255,255,0.06)" : "rgba(169,236,70,0.10)",
              }}
              aria-label={ru ? "Вперёд" : "Next"}
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </m.div>

        {/* Mobile: all cards as a simple list */}
        <div className="sm:hidden grid grid-cols-1 gap-4">
          {sections.map((s) => (
            <SectionCard key={s.num} {...s} />
          ))}
        </div>

        {/* Desktop: paginated slider */}
        <div className="hidden sm:block relative overflow-hidden">
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
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
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
      </div>
    </section>
  );
}
