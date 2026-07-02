"use client";

import { useLocale } from "next-intl";
import { Compass, Building2, Briefcase, Hammer, ShoppingCart, Users } from "lucide-react";
import { m } from "framer-motion";
import type { Locale } from "@/i18n/routing";

const AUDIENCE_RU = [
  {
    icon: Compass,
    title: "Архитекторы и проектировщики",
    desc: "BIM-решения, новые материалы, зарубежные технологии для проектов любой сложности.",
  },
  {
    icon: Building2,
    title: "Дизайнеры интерьеров",
    desc: "Сотни коллекций отделочных материалов, мебели, декора и освещения напрямую от производителей.",
  },
  {
    icon: Briefcase,
    title: "Девелоперы и застройщики",
    desc: "Поставщики, подрядчики и готовые решения для масштабных жилых и коммерческих проектов.",
  },
  {
    icon: Hammer,
    title: "Строительные компании",
    desc: "Профессиональный инструмент, оборудование и инженерные системы от ведущих производителей.",
  },
  {
    icon: ShoppingCart,
    title: "Байеры и закупщики",
    desc: "Прямые переговоры, эксклюзивные условия и новые позиции для расширения ассортимента.",
  },
  {
    icon: Users,
    title: "Владельцы бизнеса",
    desc: "Нетворкинг с лидерами рынка, тренды отрасли и партнёрства для конкурентного преимущества.",
  },
];

const AUDIENCE_EN = [
  {
    icon: Compass,
    title: "Architects & Project Designers",
    desc: "BIM solutions, new materials and international technologies for projects of any complexity.",
  },
  {
    icon: Building2,
    title: "Interior Designers",
    desc: "Hundreds of finishing material, furniture, decor and lighting collections directly from manufacturers.",
  },
  {
    icon: Briefcase,
    title: "Developers & Builders",
    desc: "Suppliers, contractors and ready-made solutions for large-scale residential and commercial projects.",
  },
  {
    icon: Hammer,
    title: "Construction Companies",
    desc: "Professional tools, equipment and engineering systems from leading manufacturers.",
  },
  {
    icon: ShoppingCart,
    title: "Buyers & Procurement",
    desc: "Direct negotiations, exclusive terms and new items for your product catalogue.",
  },
  {
    icon: Users,
    title: "Business Owners",
    desc: "Networking with market leaders, industry trends and partnerships for competitive advantage.",
  },
];

export function AudienceSection() {
  const locale = useLocale() as Locale;
  const ru = locale === "ru";
  const audience = ru ? AUDIENCE_RU : AUDIENCE_EN;

  return (
    <section className="py-20 md:py-28 bg-white border-t border-[#e4efe8]">
      <div className="container-neva">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 sm:mb-16">
          <div>
            <span
              className="font-bold text-[12px] uppercase tracking-[0.24em] block mb-3"
              style={{ color: "#E11B22" }}
            >
              {ru ? "Участники" : "Participants"}
            </span>
            <h2
              className="font-black text-black leading-tight"
              style={{ fontSize: "clamp(28px, 4vw, 50px)" }}
            >
              {ru ? "Для кого выставка" : "Who the exhibition is for"}
            </h2>
          </div>
          <p
            className="text-black/50 text-[14px] max-w-xs leading-relaxed"
            style={{ fontFamily: "var(--font-mulish)" }}
          >
            {ru
              ? "Профессионалы строительной и интерьерной отрасли со всего Северо-Запада"
              : "Construction and interior industry professionals from across the Northwest"}
          </p>
        </div>
        <div className="flex flex-col">
          {audience.map(({ icon: Icon, title, desc }, i) => (
            <m.div
              key={title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: i * 0.06, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="group flex items-center gap-5 sm:gap-8 py-5 sm:py-6 border-t border-[#e4efe8] first:border-t-0 hover:bg-[#f4faf6] -mx-4 px-4 sm:-mx-6 sm:px-6 rounded-xl transition-colors duration-200 cursor-default"
            >
              <span
                className="flex-none flex size-11 items-center justify-center rounded-xl transition-colors duration-200 group-hover:bg-[#a9ec46]/15"
                style={{ background: "rgba(169,236,70,0.08)" }}
              >
                <Icon className="size-5" style={{ color: "#a9ec46" }} />
              </span>
              <div className="flex-1 min-w-0">
                <h3 className="font-black text-[16px] sm:text-[18px] text-black mb-1 leading-snug">
                  {title}
                </h3>
                <p
                  className="text-[14px] text-black/55 leading-relaxed"
                  style={{ fontFamily: "var(--font-mulish)" }}
                >
                  {desc}
                </p>
              </div>
              <span
                className="flex-none font-bold text-[20px] text-black/10 group-hover:text-[#a9ec46] transition-colors duration-200 hidden sm:block"
                aria-hidden
              >
                →
              </span>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
