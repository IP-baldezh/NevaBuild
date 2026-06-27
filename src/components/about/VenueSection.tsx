"use client";

import { useLocale } from "next-intl";
import { MapPin, Train, Building, Award } from "lucide-react";
import { ScrollReveal, StaggerReveal, StaggerItem } from "@/components/ui/scroll-reveal";
import type { Locale } from "@/i18n/routing";

const FACTS_RU = [
  {
    icon: Building,
    title: "Экспофорум",
    desc: "Крупнейший выставочный комплекс Северо-Запада. 3 павильона, 60 000 м² под одной крышей.",
  },
  {
    icon: Train,
    title: "Транспортная доступность",
    desc: "20 минут от центра города. Прямой автобус от м. Московская, удобная парковка для гостей.",
  },
  {
    icon: Award,
    title: "Деловая столица",
    desc: "Петербург — архитектурная и деловая столица России. Один из крупнейших строительных рынков страны.",
  },
];

const FACTS_EN = [
  {
    icon: Building,
    title: "Expoforum",
    desc: "The largest exhibition complex in the Northwest. 3 pavilions, 60,000 m² under one roof.",
  },
  {
    icon: Train,
    title: "Accessibility",
    desc: "20 minutes from the city centre. Direct bus from Moskovskaya metro, convenient parking for guests.",
  },
  {
    icon: Award,
    title: "Business Capital",
    desc: "Saint Petersburg is the architectural and business capital of Russia — one of the country's largest construction markets.",
  },
];

export function VenueSection() {
  const locale = useLocale() as Locale;
  const ru = locale === "ru";
  const facts = ru ? FACTS_RU : FACTS_EN;

  return (
    <section className="py-20 md:py-28 bg-background border-t border-border">
      <div className="container-neva">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          {/* Left */}
          <div>
            <ScrollReveal>
              <span className="inline-flex items-center gap-2 mb-4">
                <MapPin className="size-3.5 text-nb-green" />
                <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-muted-foreground">
                  {ru ? "Место проведения" : "Venue"}
                </span>
              </span>
            </ScrollReveal>

            <ScrollReveal delay={0.07}>
              <h2
                className="font-black leading-tight tracking-tight text-foreground mb-6"
                style={{ fontSize: "clamp(28px, 4vw, 50px)" }}
              >
                {ru ? (
                  <>
                    Почему
                    <br />
                    Санкт-Петербург
                  </>
                ) : (
                  <>
                    Why
                    <br />
                    Saint Petersburg
                  </>
                )}
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.13}>
              <p className="font-mulish text-[15px] leading-relaxed text-muted-foreground">
                {ru
                  ? "Северо-Запад России — один из крупнейших строительных рынков страны с объёмом ввода жилья свыше 8 млн м² в год. Санкт-Петербург — деловой, архитектурный и культурный центр региона."
                  : "Northwestern Russia is one of the country's largest construction markets with over 8 million m² of housing commissioned annually. Saint Petersburg is the business, architectural and cultural centre of the region."}
              </p>
            </ScrollReveal>
          </div>

          {/* Right — facts */}
          <StaggerReveal className="flex flex-col gap-4" stagger={0.1}>
            {facts.map(({ icon: Icon, title, desc }) => (
              <StaggerItem key={title}>
                <div className="group rounded-2xl border border-border bg-card p-6 flex gap-4 items-start transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5 hover:border-nb-green/30">
                  <span className="flex-none flex size-11 items-center justify-center rounded-xl bg-nb-green/10 group-hover:bg-nb-green/20 transition-colors duration-300">
                    <Icon className="size-5 text-nb-green" />
                  </span>
                  <div>
                    <h3 className="font-black text-[15px] text-foreground mb-1.5 leading-snug">
                      {title}
                    </h3>
                    <p className="font-mulish text-[13px] text-muted-foreground leading-relaxed">
                      {desc}
                    </p>
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
