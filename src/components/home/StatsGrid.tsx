"use client";

import { AnimatedCounter } from "@/components/ui/animated-counter";

export type StatItem = {
  value: number;
  suffix?: string;
  label: string;
  sub?: string;
  locale?: string;
};

export function StatsGrid({ items }: { items: StatItem[] }) {
  return (
    <section className="bg-nb-dark">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 divide-x divide-y lg:divide-y-0 divide-white/8">
          {items.map((s) => (
            <div key={s.label} className="py-10 px-4 lg:px-8 flex flex-col group cursor-default">
              <span
                className="font-black text-white leading-none mb-1.5 group-hover:text-nb-lime-acid transition-colors duration-300 tabular-nums"
                style={{ fontSize: "clamp(28px, 3.5vw, 44px)" }}
              >
                <AnimatedCounter
                  value={s.value}
                  suffix={s.suffix ?? ""}
                  locale={s.locale ?? "ru"}
                  duration={1800}
                />
              </span>
              <span className="text-[14px] font-semibold text-white/60 mb-0.5">{s.label}</span>
              {s.sub && <span className="text-[12px] text-white/28">{s.sub}</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
