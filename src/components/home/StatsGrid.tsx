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
    <StaggerReveal
      stagger={0.07}
      className="grid grid-cols-2 gap-px border border-border bg-border lg:grid-cols-5"
    >
      {items.map((s, i) => (
        <StaggerItem key={s.label}>
          <div className="group flex h-full flex-col bg-background p-8 transition-colors hover:bg-card md:p-10">
            <span className="text-xs text-lime">{String(i + 1).padStart(2, "0")}</span>
            <div className="mt-3 text-4xl font-black tracking-tight text-foreground transition-colors group-hover:text-lime md:text-5xl lg:text-6xl">
              <AnimatedCounter
                value={s.value}
                suffix={s.suffix ?? ""}
                locale={s.locale ?? "ru"}
                duration={1600}
              />
            </div>
            <div className="mt-1 text-sm uppercase tracking-wide text-muted-foreground">
              {s.label}
            </div>
          </div>
        </StaggerItem>
      ))}
    </StaggerReveal>
  );
}
