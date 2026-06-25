"use client";

import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { pick } from "@/lib/content";
import type { Locale } from "@/i18n/routing";
import type { ExhibitorCategory } from "@prisma/client";

const SECTOR_DESCRIPTIONS_RU: Record<string, string> = {
  construction: "Стройматериалы, конструкции, фасадные системы, кровля и изоляция",
  finishing: "Отделочные материалы, покрытия, краски, декоративные элементы",
  windows: "Профильные системы, остекление, фасады, противопожарные конструкции",
  engineering: "Отопление, вентиляция, кондиционирование, электрика, сантехника",
  roofing: "Кровельные системы, утеплители, гидроизоляция, мансардные окна",
  tools: "Профессиональный инструмент, строительная техника и оборудование",
  design: "Архитектурные проекты, дизайн-студии, программное обеспечение",
  smart: "Автоматизация, системы безопасности, IoT-решения для жилья",
  interior: "Мебель, отделочные материалы, декор, освещение, текстиль",
  furniture: "Мебель для дома и офиса, дизайнерские решения, предметный дизайн",
  light: "Освещение интерьера и фасадов, умные системы управления светом",
  decor: "Декор, аксессуары, предметы искусства, домашний текстиль",
};

const SECTOR_DESCRIPTIONS_EN: Record<string, string> = {
  construction: "Building materials, structures, facade systems, roofing and insulation",
  finishing: "Finishing materials, coatings, paints, decorative elements",
  windows: "Profile systems, glazing, facades, fire-resistant structures",
  engineering: "Heating, ventilation, air conditioning, electrical systems, plumbing",
  roofing: "Roofing systems, thermal insulation, waterproofing, skylight windows",
  tools: "Professional tools, construction machinery and equipment",
  design: "Architectural projects, design studios, CAD/BIM software",
  smart: "Home automation, security systems, IoT solutions for residential buildings",
  interior: "Furniture, finishing materials, decor, lighting, textiles",
  furniture: "Home and office furniture, design solutions, product design",
  light: "Interior and facade lighting, smart lighting control systems",
  decor: "Decor, accessories, art objects, home textiles",
};

const SECTOR_COLORS = [
  { badge: "bg-nb-green/10 text-nb-green-dark border-nb-green/20", accent: "text-nb-green" },
  { badge: "bg-brand-red/10 text-brand-red border-brand-red/15", accent: "text-brand-red" },
  { badge: "bg-blue-500/8 text-blue-600 border-blue-200", accent: "text-blue-500" },
  { badge: "bg-emerald-500/8 text-emerald-700 border-emerald-200", accent: "text-emerald-500" },
  { badge: "bg-violet-500/8 text-violet-700 border-violet-200", accent: "text-violet-500" },
  { badge: "bg-amber-500/8 text-amber-700 border-amber-200", accent: "text-amber-500" },
  { badge: "bg-sky-500/8 text-sky-700 border-sky-200", accent: "text-sky-500" },
  { badge: "bg-nb-dark/5 text-nb-dark border-nb-border", accent: "text-nb-dark" },
];

export function SectionsGrid({ categories }: { categories: ExhibitorCategory[] }) {
  const t = useTranslations("Sections");
  const locale = useLocale() as Locale;

  return (
    <section id="sectors" className="py-20 bg-white">
      <div className="container-neva">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <span className="font-bold text-[13px] text-nb-teal uppercase tracking-[3px] mb-3 block">
              {t("label")}
            </span>
            <h2
              className="font-black text-nb-dark leading-tight"
              style={{ fontSize: "clamp(30px, 4vw, 50px)" }}
            >
              {t("title")}
            </h2>
          </div>
          <ScrollReveal>
            <Link
              href="/exhibitors"
              className="inline-flex items-center gap-2 font-bold text-[14px] text-nb-green-dark hover:text-nb-lime-acid border-b border-nb-green/40 hover:border-nb-lime-acid pb-0.5 transition-all duration-200 self-start sm:self-auto"
            >
              {t("cta")}
              <ArrowUpRight className="size-4" />
            </Link>
          </ScrollReveal>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((c, i) => {
            const colors = SECTOR_COLORS[i % SECTOR_COLORS.length];
            return (
              <Link
                key={c.id}
                href={`/exhibitors?category=${c.slug}`}
                className="group relative bg-white border border-nb-border hover:border-nb-lime-acid/50 rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-nb-green/8"
              >
                <div className="flex items-start justify-between">
                  <span
                    className={`inline-flex items-center font-black text-[11px] px-2.5 py-1 rounded-lg border ${colors.badge}`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <ArrowUpRight
                    className={`size-4 ${colors.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-200`}
                  />
                </div>
                <div>
                  <h3 className="font-bold text-[16px] text-nb-dark mb-2 leading-snug">
                    {pick(locale, c.titleRu, c.titleEn)}
                  </h3>
                  <p
                    className="text-[13px] text-nb-muted leading-relaxed"
                    style={{ fontFamily: "var(--font-mulish)" }}
                  >
                    {locale === "ru"
                      ? (SECTOR_DESCRIPTIONS_RU[c.slug] ?? "")
                      : (SECTOR_DESCRIPTIONS_EN[c.slug] ?? "")}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
