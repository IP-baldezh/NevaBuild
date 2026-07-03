"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: string;
  titleDim?: string;
  lead?: string;
  children?: ReactNode;
};

/** Компактный dark-hero для внутренних страниц (≈55vh, без marquee). */
export function DarkPageHero({ eyebrow, title, titleDim, lead, children }: Props) {
  return (
    <section
      className="relative z-10 flex flex-col justify-end"
      style={{
        minHeight: "54vh",
        paddingTop: "clamp(120px, 20vh, 220px)",
        paddingBottom: "clamp(48px, 6vh, 80px)",
      }}
    >
      {/* Left vertical accent line */}
      <div
        className="max-sm:hidden absolute left-0 top-0 bottom-0 w-[3px]"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, #a9ec46 25%, #a9ec46 75%, transparent 100%)",
        }}
        aria-hidden
      />

      <div className="container-neva">
        <m.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {eyebrow && (
            <span
              className="block text-[11px] uppercase tracking-[0.28em] mb-4 font-bold"
              style={{ color: "#a9ec46", fontFamily: "var(--font-mulish)" }}
            >
              {eyebrow}
            </span>
          )}
          <h1
            className="font-black text-white leading-[1.02]"
            style={{ fontSize: "clamp(28px, 5.5vw, 80px)", letterSpacing: "-0.02em" }}
          >
            {title}
            {titleDim && (
              <>
                <br />
                <span style={{ color: "rgba(255,255,255,0.28)" }}>{titleDim}</span>
              </>
            )}
          </h1>
          {lead && (
            <p
              className="text-white/55 mt-5 leading-relaxed max-w-xl"
              style={{ fontSize: "clamp(13px, 1.2vw, 17px)", fontFamily: "var(--font-mulish)" }}
            >
              {lead}
            </p>
          )}
          {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        </m.div>
      </div>
    </section>
  );
}
