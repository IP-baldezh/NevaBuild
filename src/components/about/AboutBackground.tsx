"use client";

import { useEffect, useRef } from "react";

const ORB_STATES: Record<
  string,
  {
    o1: { top: string; left: string; bg: string; opacity: number; scale: number };
    o2: { top: string; left: string; bg: string; opacity: number; scale: number };
  }
> = {
  "s-hero": {
    o1: { top: "10%", left: "10%", bg: "#12B669", opacity: 0.55, scale: 1.0 },
    o2: { top: "20%", left: "65%", bg: "#a9ec46", opacity: 0.28, scale: 0.8 },
  },
  "s-stats": {
    o1: { top: "30%", left: "4%", bg: "#a9ec46", opacity: 0.42, scale: 1.1 },
    o2: { top: "8%", left: "72%", bg: "#12B669", opacity: 0.38, scale: 0.9 },
  },
  "s-cards": {
    o1: { top: "42%", left: "28%", bg: "#12B669", opacity: 0.38, scale: 1.0 },
    o2: { top: "12%", left: "58%", bg: "#a9ec46", opacity: 0.25, scale: 0.7 },
  },
  "s-sections": {
    o1: { top: "22%", left: "14%", bg: "#a9ec46", opacity: 0.42, scale: 1.0 },
    o2: { top: "38%", left: "68%", bg: "#12B669", opacity: 0.4, scale: 1.1 },
  },
  "s-cta": {
    o1: { top: "18%", left: "22%", bg: "#a9ec46", opacity: 0.58, scale: 1.3 },
    o2: { top: "28%", left: "52%", bg: "#12B669", opacity: 0.5, scale: 1.2 },
  },
};

export function AboutBackground({ ids }: { ids: string[] }) {
  const o1 = useRef<HTMLDivElement>(null);
  const o2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];

    const applyOrbs = (state: (typeof ORB_STATES)[string]) => {
      const apply = (el: HTMLDivElement | null, s: typeof state.o1) => {
        if (!el) return;
        el.style.transition =
          "top 2s cubic-bezier(0.16,1,0.3,1), left 2s cubic-bezier(0.16,1,0.3,1), background 2s ease, opacity 2s ease, transform 2s cubic-bezier(0.16,1,0.3,1)";
        el.style.top = s.top;
        el.style.left = s.left;
        el.style.background = s.bg;
        el.style.opacity = String(s.opacity);
        el.style.transform = `scale(${s.scale})`;
      };
      apply(o1.current, state.o1);
      apply(o2.current, state.o2);
    };

    const fadeOut = () => {
      [o1.current, o2.current].forEach((el) => {
        if (!el) return;
        el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        el.style.opacity = "0";
        el.style.transform = "scale(0.85)";
      });
    };

    // Main scroll observer — updates orb positions/colors per section
    const scrollObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const id = e.target.id;
          if (ORB_STATES[id]) applyOrbs(ORB_STATES[id]);
        });
      },
      { threshold: 0.4 },
    );

    sections.forEach((s) => scrollObs.observe(s));

    // Exit observer — fades orbs when CTA section scrolls past (user enters footer)
    const cta = document.getElementById("s-cta");
    const exitObs = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        const pastPage = !entry.isIntersecting && entry.boundingClientRect.top < 0;
        if (pastPage) {
          fadeOut();
        } else if (entry.isIntersecting) {
          // Restore when scrolling back up into CTA
          applyOrbs(ORB_STATES["s-cta"]);
        }
      },
      { threshold: 0 },
    );

    if (cta) exitObs.observe(cta);

    return () => {
      scrollObs.disconnect();
      exitObs.disconnect();
    };
  }, [ids]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden>
      <div
        ref={o1}
        className="absolute rounded-full"
        style={{
          width: "55vh",
          height: "55vh",
          top: "10%",
          left: "10%",
          background: "#12B669",
          opacity: 0.55,
          filter: "blur(90px)",
          mixBlendMode: "screen",
          transition:
            "top 2s cubic-bezier(0.16,1,0.3,1), left 2s cubic-bezier(0.16,1,0.3,1), background 2s ease, opacity 2s ease, transform 2s cubic-bezier(0.16,1,0.3,1)",
        }}
      />
      <div
        ref={o2}
        className="absolute rounded-full"
        style={{
          width: "45vh",
          height: "45vh",
          top: "20%",
          left: "65%",
          background: "#a9ec46",
          opacity: 0.28,
          filter: "blur(90px)",
          mixBlendMode: "screen",
          transition:
            "top 2s cubic-bezier(0.16,1,0.3,1), left 2s cubic-bezier(0.16,1,0.3,1), background 2s ease, opacity 2s ease, transform 2s cubic-bezier(0.16,1,0.3,1)",
        }}
      />
    </div>
  );
}
