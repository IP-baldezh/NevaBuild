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
        <div className="flex flex-wrap sm:flex-nowrap divide-y sm:divide-y-0 sm:divide-x divide-white/[0.07]">
          {items.map((s) => (
            <div
              key={s.label}
              className="w-1/2 sm:w-auto sm:flex-1 py-7 sm:py-9 px-5 lg:px-8 flex flex-col gap-1 group cursor-default"
            >
              <span
                className="font-black text-white leading-none tabular-nums group-hover:text-nb-lime-acid transition-colors duration-300"
                style={{ fontSize: "clamp(28px, 3vw, 42px)" }}
              >
                <AnimatedCounter
                  value={s.value}
                  suffix={s.suffix ?? ""}
                  locale={s.locale ?? "ru"}
                  duration={1800}
                />
              </span>
              <span
                className="text-[12px] sm:text-[13px] font-medium leading-snug"
                style={{ color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-mulish)" }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
