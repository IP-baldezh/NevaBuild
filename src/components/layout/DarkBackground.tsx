"use client";

import { useEffect, useRef } from "react";

const HERO = {
  o1: { x: "6vw", y: "12vh", bg: "#12B669", opacity: 0.48, scale: 1.0 },
  o2: { x: "65vw", y: "22vh", bg: "#a9ec46", opacity: 0.22, scale: 0.85 },
};
const CONTENT = {
  o1: { x: "4vw", y: "38vh", bg: "#a9ec46", opacity: 0.38, scale: 1.1 },
  o2: { x: "72vw", y: "10vh", bg: "#12B669", opacity: 0.32, scale: 0.95 },
};

const TRANSITION = "transform 2s cubic-bezier(0.16,1,0.3,1), background 2s ease, opacity 2s ease";

type State = typeof HERO;

/**
 * Анимированные орбы для внутренних тёмных страниц.
 * При скролле переходят из hero-позиции в content-позицию,
 * исчезают перед футером через sentinel div.
 */
export function DarkBackground({ sentinelId }: { sentinelId: string }) {
  const o1 = useRef<HTMLDivElement>(null);
  const o2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const apply = (state: State) => {
      const set = (el: HTMLDivElement | null, s: State["o1"]) => {
        if (!el) return;
        el.style.transition = TRANSITION;
        el.style.transform = `translate(${s.x}, ${s.y}) scale(${s.scale})`;
        el.style.background = s.bg;
        el.style.opacity = String(s.opacity);
      };
      set(o1.current, state.o1);
      set(o2.current, state.o2);
    };

    const fadeOut = () => {
      [o1.current, o2.current].forEach((el) => {
        if (!el) return;
        el.style.transition = "opacity 0.6s ease";
        el.style.opacity = "0";
      });
    };

    const HERO_THRESHOLD = 400;
    let inContent = false;

    const onScroll = () => {
      const past = window.scrollY > HERO_THRESHOLD;
      if (past && !inContent) {
        inContent = true;
        apply(CONTENT);
      } else if (!past && inContent) {
        inContent = false;
        apply(HERO);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const sentinel = document.getElementById(sentinelId);
    const exitObs = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          fadeOut();
        } else if (entry.boundingClientRect.top > 0) {
          apply(inContent ? CONTENT : HERO);
        }
      },
      { threshold: 0 },
    );
    if (sentinel) exitObs.observe(sentinel);

    return () => {
      window.removeEventListener("scroll", onScroll);
      exitObs.disconnect();
    };
  }, [sentinelId]);

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
          opacity: 0.48,
          filter: "blur(90px)",
          mixBlendMode: "screen",
          transform: "translate(6vw, 12vh) scale(1)",
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
          opacity: 0.22,
          filter: "blur(90px)",
          mixBlendMode: "screen",
          transform: "translate(65vw, 22vh) scale(0.85)",
          transition: TRANSITION,
        }}
      />
    </div>
  );
}
