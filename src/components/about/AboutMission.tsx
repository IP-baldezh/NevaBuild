"use client";

import { useLocale } from "next-intl";
import { Zap, Users2, TrendingUp } from "lucide-react";
import { ScrollReveal, StaggerReveal, StaggerItem } from "@/components/ui/scroll-reveal";
import type { Locale } from "@/i18n/routing";

const CARDS_RU = [
  {
    icon: Zap,
    title: "Инновации в действии",
    desc: "Живые демонстрации BIM-проектирования, роботизированных систем и материалов нового поколения. Технологии, которые уже меняют отрасль.",
    color: "#12B669",
  },
  {
    icon: Users2,
    title: "Профессиональное сообщество",
    desc: "10 000+ профессионалов за 4 дня. Архитекторы, девелоперы, поставщики и инженеры — в одном пространстве для диалога.",
    color: "#E11B22",
  },
  {
    icon: TrendingUp,
    title: "Деловые результаты",
    desc: "80% участников фиксируют новые партнёрства прямо на площадке. Matchmaking-платформа соединяет поставщиков и покупателей ещё до открытия.",
    color: "#a9ec46",
  },
];

const CARDS_EN = [
  {
    icon: Zap,
    title: "Innovation in Action",
    desc: "Live demonstrations of BIM design, robotic systems and next-generation materials. Technologies that are already reshaping the industry.",
    color: "#12B669",
  },
  {
    icon: Users2,
    title: "Professional Community",
    desc: "10,000+ professionals over 4 days. Architects, developers, suppliers and engineers — in one space for dialogue.",
    color: "#E11B22",
  },
  {
    icon: TrendingUp,
    title: "Business Results",
    desc: "80% of exhibitors confirm new partnerships on the floor. The matchmaking platform connects suppliers and buyers before opening day.",
    color: "#a9ec46",
  },
];

export function AboutMission() {
  const locale = useLocale() as Locale;
  const ru = locale === "ru";
  const cards = ru ? CARDS_RU : CARDS_EN;

  return (
    <section className="py-20 md:py-28 bg-background border-t border-border">
      <div className="container-neva">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          {/* Left — text */}
          <div>
            <ScrollReveal>
              <span className="inline-flex items-center gap-2 mb-4">
                <span className="size-2 rounded-full bg-brand-red" />
                <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-muted-foreground">
                  {ru ? "О выставке" : "About"}
                </span>
              </span>
            </ScrollReveal>

            <ScrollReveal delay={0.06}>
              <h2
                className="font-black leading-tight tracking-tight text-foreground mb-6"
                style={{ fontSize: "clamp(30px, 4vw, 52px)" }}
              >
                {ru
                  ? "Главное событие строительной отрасли Северо-Запада"
                  : "Premier Event of the Northwestern Construction Industry"}
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.12}>
              <p className="font-mulish text-[16px] leading-relaxed text-muted-foreground mb-6">
                {ru
                  ? "NEVA BUILD — крупнейшая строительно-интерьерная выставка и форум Северо-Запада России. Место встречи профессионалов отрасли: производителей, поставщиков, проектировщиков, архитекторов и девелоперов."
                  : "NEVA BUILD is the largest construction and interior exhibition and forum in Northwestern Russia. The meeting place for industry professionals: manufacturers, suppliers, designers, architects and developers."}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.18}>
              <p className="font-mulish text-[15px] leading-relaxed text-muted-foreground">
                {ru
                  ? "За 4 дня — сотни новинок, десятки конференций и сотни прямых деловых встреч. Площадка, где заключаются контракты и формируется повестка отрасли на следующий год."
                  : "Over 4 days — hundreds of new products, dozens of conferences and hundreds of direct business meetings. The venue where contracts are signed and the industry's agenda is shaped for the year ahead."}
              </p>
            </ScrollReveal>
          </div>

          {/* Right — cards */}
          <StaggerReveal className="flex flex-col gap-4" stagger={0.1}>
            {cards.map(({ icon: Icon, title, desc, color }) => (
              <StaggerItem key={title}>
                <div className="group relative rounded-2xl p-6 border border-border bg-card overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5">
                  {/* Accent line */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl"
                    style={{ background: color }}
                  />
                  <div className="flex items-start gap-4 pl-2">
                    <span
                      className="flex-none flex size-10 items-center justify-center rounded-xl"
                      style={{ background: `${color}18` }}
                    >
                      <Icon className="size-5" style={{ color }} />
                    </span>
                    <div>
                      <h3 className="font-black text-[16px] text-foreground mb-2 leading-snug">
                        {title}
                      </h3>
                      <p className="font-mulish text-[14px] text-muted-foreground leading-relaxed">
                        {desc}
                      </p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </div>
    </section>
  );
}
