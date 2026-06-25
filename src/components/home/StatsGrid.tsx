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
    <section className="bg-nb-dark max-sm:hidden">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16">
        <div className="grid grid-cols-2 sm:grid-cols-5 divide-x divide-y sm:divide-y-0 divide-white/8">
          {items.map((s, i) => (
            <div
              key={s.label}
              className={`py-6 sm:py-10 px-4 lg:px-8 flex flex-col group cursor-default${
                i === items.length - 1 && items.length % 2 !== 0 ? " col-span-2 sm:col-span-1" : ""
              }`}
            >
              <span
                className="font-black text-white leading-none mb-1.5 group-hover:text-nb-lime-acid transition-colors duration-300 tabular-nums"
                style={{ fontSize: "clamp(26px, 3.5vw, 44px)" }}
              >
                <AnimatedCounter
                  value={s.value}
                  suffix={s.suffix ?? ""}
                  locale={s.locale ?? "ru"}
                  duration={1800}
                />
              </span>
              <span className="text-[13px] sm:text-[14px] font-semibold text-white/60 mb-0.5">
                {s.label}
              </span>
              {s.sub && <span className="text-[11px] sm:text-[12px] text-white/45">{s.sub}</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
