"use client";

import { useLocale } from "next-intl";
import {
  Building2,
  Layers,
  Square,
  Zap,
  Home,
  Wrench,
  Compass,
  Wifi,
  Sofa,
  Armchair,
  Paintbrush,
  Shield,
} from "lucide-react";
import { FeatureCarousel, type CarouselFeature } from "@/components/ui/feature-carousel";
import { pick } from "@/lib/content";
import type { Locale } from "@/i18n/routing";
import type { ExhibitorCategory } from "@prisma/client";

const SECTOR_IMAGES: Record<string, string> = {
  construction: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200",
  finishing: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=1200",
  windows: "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=1200",
  engineering: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1200",
  roofing: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200",
  tools: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?q=80&w=1200",
  design: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200",
  smart: "https://images.unsplash.com/photo-1558002038-bb4237bb2c12?q=80&w=1200",
  interior: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200",
  furniture: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200",
  light: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?q=80&w=1200",
  decor: "https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=1200",
};

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200";

const SECTOR_ICONS = [
  Building2,
  Layers,
  Square,
  Zap,
  Home,
  Wrench,
  Compass,
  Wifi,
  Sofa,
  Armchair,
  Paintbrush,
  Shield,
];

const DESCRIPTIONS_RU: Record<string, string> = {
  construction: "Стройматериалы, конструкции и фасадные системы",
  finishing: "Отделочные материалы, краски и покрытия",
  windows: "Профильные системы, остекление и фасады",
  engineering: "Отопление, вентиляция, электрика и сантехника",
  roofing: "Кровельные системы, утеплители и гидроизоляция",
  tools: "Профессиональный инструмент и строительная техника",
  design: "Архитектурные проекты, BIM и дизайн-студии",
  smart: "Автоматизация, безопасность и IoT-решения",
  interior: "Материалы, декор, освещение и текстиль",
  furniture: "Мебель для дома и офиса, дизайнерские решения",
  light: "Освещение интерьеров, фасадов и умные системы",
  decor: "Декор, аксессуары и предметы искусства",
};

const DESCRIPTIONS_EN: Record<string, string> = {
  construction: "Building materials, structures and facade systems",
  finishing: "Finishing materials, paints and surface coatings",
  windows: "Profile systems, glazing and curtain walls",
  engineering: "HVAC, electrical systems and plumbing",
  roofing: "Roofing systems, insulation and waterproofing",
  tools: "Professional tools and construction equipment",
  design: "Architecture, BIM design and creative studios",
  smart: "Home automation, security and IoT solutions",
  interior: "Materials, decor, lighting and soft furnishings",
  furniture: "Home and office furniture, design solutions",
  light: "Interior and facade lighting, smart control systems",
  decor: "Decor, accessories and art objects",
};

const FALLBACK_FEATURES: CarouselFeature[] = [
  {
    id: "construction",
    label: "Строительство",
    icon: Building2,
    image: SECTOR_IMAGES.construction,
    description: DESCRIPTIONS_RU.construction,
  },
  {
    id: "finishing",
    label: "Отделка",
    icon: Paintbrush,
    image: SECTOR_IMAGES.finishing,
    description: DESCRIPTIONS_RU.finishing,
  },
  {
    id: "windows",
    label: "Окна и фасады",
    icon: Square,
    image: SECTOR_IMAGES.windows,
    description: DESCRIPTIONS_RU.windows,
  },
  {
    id: "engineering",
    label: "Инженерия",
    icon: Zap,
    image: SECTOR_IMAGES.engineering,
    description: DESCRIPTIONS_RU.engineering,
  },
  {
    id: "roofing",
    label: "Кровля",
    icon: Home,
    image: SECTOR_IMAGES.roofing,
    description: DESCRIPTIONS_RU.roofing,
  },
  {
    id: "tools",
    label: "Инструменты",
    icon: Wrench,
    image: SECTOR_IMAGES.tools,
    description: DESCRIPTIONS_RU.tools,
  },
  {
    id: "design",
    label: "Дизайн",
    icon: Compass,
    image: SECTOR_IMAGES.design,
    description: DESCRIPTIONS_RU.design,
  },
  {
    id: "smart",
    label: "Умный дом",
    icon: Wifi,
    image: SECTOR_IMAGES.smart,
    description: DESCRIPTIONS_RU.smart,
  },
  {
    id: "interior",
    label: "Интерьер",
    icon: Sofa,
    image: SECTOR_IMAGES.interior,
    description: DESCRIPTIONS_RU.interior,
  },
  {
    id: "furniture",
    label: "Мебель",
    icon: Armchair,
    image: SECTOR_IMAGES.furniture,
    description: DESCRIPTIONS_RU.furniture,
  },
];

export function SectorsCarousel({ categories }: { categories: ExhibitorCategory[] }) {
  const locale = useLocale() as Locale;
  const ru = locale === "ru";

  const features: CarouselFeature[] = categories.map((c, i) => ({
    id: c.id,
    label: pick(locale, c.titleRu, c.titleEn),
    icon: SECTOR_ICONS[i % SECTOR_ICONS.length],
    image: SECTOR_IMAGES[c.slug] ?? DEFAULT_IMAGE,
    description: ru
      ? (DESCRIPTIONS_RU[c.slug] ?? pick(locale, c.titleRu, c.titleEn))
      : (DESCRIPTIONS_EN[c.slug] ?? pick(locale, c.titleRu, c.titleEn)),
  }));

  const finalFeatures = features.length > 0 ? features : FALLBACK_FEATURES;

  return (
    <section
      id="sectors"
      className="relative z-10 py-14 sm:py-20"
      style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
    >
      <div className="container-neva">
        <div className="mb-10 sm:mb-12">
          <span
            className="text-[11px] uppercase tracking-[0.28em] mb-3 block font-bold"
            style={{ color: "#a9ec46", fontFamily: "var(--font-mulish)" }}
          >
            {ru ? "Экспозиция" : "Exhibition"}
          </span>
          <h2
            className="font-black text-white leading-tight"
            style={{ fontSize: "clamp(28px, 4vw, 52px)" }}
          >
            {ru ? "Разделы выставки" : "Exhibition sectors"}
          </h2>
        </div>

        <FeatureCarousel
          features={finalFeatures}
          accentColor="#a9ec46"
          panelBackground="linear-gradient(135deg, #00f0ff 0%, #00ff88 45%, #aaff00 100%)"
          chipTextColor="#E11B22"
          badgeText="NevaBuild 2027"
        />
      </div>
    </section>
  );
}
