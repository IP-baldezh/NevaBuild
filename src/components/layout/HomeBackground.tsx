"use client";

import { useEffect, useRef } from "react";

const TRANSITION =
  "top 2.4s cubic-bezier(0.16,1,0.3,1), left 2.4s cubic-bezier(0.16,1,0.3,1), background 2s ease, opacity 2s ease, transform 2s cubic-bezier(0.16,1,0.3,1)";

const STATES: Record<
  string,
  {
    o1: { top: string; left: string; bg: string; opacity: number; scale: number };
    o2: { top: string; left: string; bg: string; opacity: number; scale: number };
  }
> = {
  hero: {
    o1: { top: "8%", left: "4%", bg: "#12B669", opacity: 0.5, scale: 1.0 },
    o2: { top: "20%", left: "60%", bg: "#a9ec46", opacity: 0.25, scale: 0.85 },
  },
  stats: {
    o1: { top: "35%", left: "2%", bg: "#a9ec46", opacity: 0.4, scale: 1.1 },
    o2: { top: "10%", left: "70%", bg: "#12B669", opacity: 0.32, scale: 0.9 },
  },
  "for-whom": {
    o1: { top: "45%", left: "55%", bg: "#12B669", opacity: 0.38, scale: 1.0 },
    o2: { top: "15%", left: "8%", bg: "#a9ec46", opacity: 0.28, scale: 0.8 },
  },
  sectors: {
    o1: { top: "22%", left: "12%", bg: "#a9ec46", opacity: 0.42, scale: 1.05 },
    o2: { top: "40%", left: "65%", bg: "#12B669", opacity: 0.38, scale: 1.0 },
  },
  "why-visit": {
    o1: { top: "30%", left: "48%", bg: "#12B669", opacity: 0.44, scale: 1.1 },
    o2: { top: "12%", left: "18%", bg: "#a9ec46", opacity: 0.3, scale: 0.9 },
  },
  program: {
    o1: { top: "18%", left: "62%", bg: "#a9ec46", opacity: 0.36, scale: 1.0 },
    o2: { top: "42%", left: "5%", bg: "#12B669", opacity: 0.4, scale: 1.05 },
  },
  news: {
    o1: { top: "25%", left: "30%", bg: "#12B669", opacity: 0.42, scale: 1.1 },
    o2: { top: "50%", left: "58%", bg: "#a9ec46", opacity: 0.32, scale: 0.95 },
  },
  ticket: {
    o1: { top: "20%", left: "20%", bg: "#a9ec46", opacity: 0.55, scale: 1.25 },
    o2: { top: "30%", left: "52%", bg: "#12B669", opacity: 0.48, scale: 1.15 },
  },
};

export function HomeBackground({ sentinelId }: { sentinelId: string }) {
  const o1 = useRef<HTMLDivElement>(null);
  const o2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const applyState = (key: string) => {
      const s = STATES[key];
      if (!s) return;
      const apply = (el: HTMLDivElement | null, st: typeof s.o1) => {
        if (!el) return;
        el.style.transition = TRANSITION;
        el.style.top = st.top;
        el.style.left = st.left;
        el.style.background = st.bg;
        el.style.opacity = String(st.opacity);
        el.style.transform = `scale(${st.scale})`;
      };
      apply(o1.current, s.o1);
      apply(o2.current, s.o2);
    };

    const fadeOut = () => {
      [o1.current, o2.current].forEach((el) => {
        if (!el) return;
        el.style.transition = "opacity 0.7s ease, transform 0.7s ease";
        el.style.opacity = "0";
        el.style.transform = "scale(0.85)";
      });
    };

    // Initial state
    applyState("hero");

    const sectionIds = Object.keys(STATES).filter((k) => k !== "hero");

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const key = e.target.id;
            if (STATES[key]) applyState(key);
          }
        });
      },
      { threshold: 0.25 },
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });

    // Sentinel — fade out before footer
    const sentinel = document.getElementById(sentinelId);
    const exitObs = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) fadeOut();
        else if (entry.boundingClientRect.top > 0) applyState("ticket");
      },
      { threshold: 0 },
    );
    if (sentinel) exitObs.observe(sentinel);

    return () => {
      obs.disconnect();
      exitObs.disconnect();
    };
  }, [sentinelId]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden>
      <div
        ref={o1}
        className="absolute rounded-full"
        style={{
          width: "60vh",
          height: "60vh",
          top: "8%",
          left: "4%",
          background: "#12B669",
          opacity: 0.5,
          filter: "blur(90px)",
          mixBlendMode: "screen",
          transition: TRANSITION,
        }}
      />
      <div
        ref={o2}
        className="absolute rounded-full"
        style={{
          width: "50vh",
          height: "50vh",
          top: "20%",
          left: "60%",
          background: "#a9ec46",
          opacity: 0.25,
          filter: "blur(90px)",
          mixBlendMode: "screen",
          transition: TRANSITION,
        }}
      />
    </div>
  );
}
