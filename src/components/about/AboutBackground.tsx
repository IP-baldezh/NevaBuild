"use client";

import { useEffect, useRef } from "react";

const ORB_STATES: Record<
  string,
  {
    o1: { x: string; y: string; bg: string; opacity: number; scale: number };
    o2: { x: string; y: string; bg: string; opacity: number; scale: number };
  }
> = {
  "s-hero": {
    o1: { x: "10vw", y: "10vh", bg: "#12B669", opacity: 0.55, scale: 1.0 },
    o2: { x: "65vw", y: "20vh", bg: "#a9ec46", opacity: 0.28, scale: 0.8 },
  },
  "s-stats": {
    o1: { x: "4vw", y: "30vh", bg: "#a9ec46", opacity: 0.42, scale: 1.1 },
    o2: { x: "72vw", y: "8vh", bg: "#12B669", opacity: 0.38, scale: 0.9 },
  },
  "s-cards": {
    o1: { x: "28vw", y: "42vh", bg: "#12B669", opacity: 0.38, scale: 1.0 },
    o2: { x: "58vw", y: "12vh", bg: "#a9ec46", opacity: 0.25, scale: 0.7 },
  },
  "s-sections": {
    o1: { x: "14vw", y: "22vh", bg: "#a9ec46", opacity: 0.42, scale: 1.0 },
    o2: { x: "68vw", y: "38vh", bg: "#12B669", opacity: 0.4, scale: 1.1 },
  },
  "s-cta": {
    o1: { x: "22vw", y: "18vh", bg: "#a9ec46", opacity: 0.58, scale: 1.3 },
    o2: { x: "52vw", y: "28vh", bg: "#12B669", opacity: 0.5, scale: 1.2 },
  },
};

const TRANSITION = "transform 2s cubic-bezier(0.16,1,0.3,1), background 2s ease, opacity 2s ease";

export function AboutBackground({ ids }: { ids: string[] }) {
  const o1 = useRef<HTMLDivElement>(null);
  const o2 = useRef<HTMLDivElement>(null);
  const idsKey = ids.join(",");

  useEffect(() => {
    const sections = idsKey
      .split(",")
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const applyOrbs = (state: (typeof ORB_STATES)[string]) => {
      const apply = (el: HTMLDivElement | null, s: typeof state.o1) => {
        if (!el) return;
        el.style.transition = TRANSITION;
        el.style.transform = `translate(${s.x}, ${s.y}) scale(${s.scale})`;
        el.style.background = s.bg;
        el.style.opacity = String(s.opacity);
      };
      apply(o1.current, state.o1);
      apply(o2.current, state.o2);
    };

    const fadeOut = () => {
      [o1.current, o2.current].forEach((el) => {
        if (!el) return;
        el.style.transition = "opacity 0.6s ease";
        el.style.opacity = "0";
      });
    };

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

    const sentinel = document.getElementById("about-end");
    const exitObs = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          fadeOut();
        } else if (entry.boundingClientRect.top > 0) {
          applyOrbs(ORB_STATES["s-cta"]);
        }
      },
      { threshold: 0 },
    );

    if (sentinel) exitObs.observe(sentinel);

    return () => {
      scrollObs.disconnect();
      exitObs.disconnect();
    };
  }, [idsKey]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden>
      <div
        ref={o1}
        className="absolute rounded-full"
        style={{
          width: "55vh",
          height: "55vh",
          top: 0,
          left: 0,
          background: "#12B669",
          opacity: 0.55,
          filter: "blur(90px)",
          mixBlendMode: "screen",
          transform: "translate(10vw, 10vh) scale(1)",
          transition: TRANSITION,
        }}
      />
      <div
        ref={o2}
        className="absolute rounded-full"
        style={{
          width: "45vh",
          height: "45vh",
          top: 0,
          left: 0,
          background: "#a9ec46",
          opacity: 0.28,
          filter: "blur(90px)",
          mixBlendMode: "screen",
          transform: "translate(65vw, 20vh) scale(0.8)",
          transition: TRANSITION,
        }}
      />
    </div>
  );
}
