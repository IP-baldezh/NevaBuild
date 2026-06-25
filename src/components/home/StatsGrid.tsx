"use client";

import { AnimatedCounter } from "@/components/ui/animated-counter";
import { StaggerReveal, StaggerItem } from "@/components/ui/scroll-reveal";

export type StatItem = {
  value: number;
  suffix?: string;
  label: string;
  locale?: string;
};

export function StatsGrid({ items }: { items: StatItem[] }) {
  return (
    <section className="bg-foreground">
      <div className="container-neva py-16 md:py-24">
        <StaggerReveal
          stagger={0.08}
          className="grid grid-cols-2 gap-x-6 gap-y-14 sm:gap-x-10 lg:grid-cols-5 lg:gap-x-0 lg:divide-x lg:divide-white/10"
        >
          {items.map((s) => (
            <StaggerItem key={s.label}>
              <div className="flex flex-col lg:px-10 first:lg:pl-0 last:lg:pr-0 group cursor-default">
                <div
                  className="font-black leading-[0.88] tracking-tight text-white transition-colors duration-300 group-hover:text-nb-lime-acid"
                  style={{ fontSize: "clamp(2.75rem, 6vw, 5rem)" }}
                >
                  <AnimatedCounter
                    value={s.value}
                    suffix={s.suffix ?? ""}
                    locale={s.locale ?? "ru"}
                    duration={1800}
                  />
                </div>
                <div className="mt-3 text-[10px] font-bold uppercase tracking-[0.3em] text-lime/70">
                  {s.label}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
