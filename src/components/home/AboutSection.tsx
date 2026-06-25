"use client";

import { m } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { StaggerReveal, StaggerItem } from "@/components/ui/scroll-reveal";

const DIRECTIONS = [
  { index: "01", tKey: "ExhibitBlock", href: "/exhibit", accent: true },
  { index: "02", tKey: "VisitBlock", href: "/tickets", accent: false },
] as const;

const ease = [0.21, 0.47, 0.32, 0.98] as [number, number, number, number];

export function AboutSection() {
  const t = useTranslations("About");
  const tExhibit = useTranslations("ExhibitBlock");
  const tVisit = useTranslations("VisitBlock");
  const tc = useTranslations("Common");

  const items = [
    { ...DIRECTIONS[0], title: tExhibit("title"), text: tExhibit("text"), cta: tc("bookStand") },
    { ...DIRECTIONS[1], title: tVisit("title"), text: tVisit("text"), cta: tc("getTicket") },
  ];

  return (
    <div>
      {/* Header */}
      <m.div
        className="flex items-center gap-4"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease }}
      >
        <span className="text-sm text-lime">00</span>
        <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
          {t("label")}
        </span>
        <span className="h-px flex-1 bg-border" />
      </m.div>

      {/* Intro text */}
      <m.p
        className="mt-10 max-w-5xl text-balance text-2xl font-bold leading-snug text-foreground md:text-4xl"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, delay: 0.1, ease }}
      >
        <span className="text-lime">NEVA BUILD</span> — {t("text")}
      </m.p>

      {/* Direction cards — один IntersectionObserver на оба */}
      <StaggerReveal
        stagger={0.12}
        className="mt-16 grid gap-px border border-border bg-border md:grid-cols-2"
      >
        {items.map((d) => (
          <StaggerItem key={d.index}>
            <div className="group flex h-full flex-col bg-background p-8 transition-colors hover:bg-card md:p-12">
              <span className="text-6xl font-black text-border transition-colors group-hover:text-lime md:text-7xl">
                {d.index}
              </span>
              <h3 className="mt-8 text-2xl font-black uppercase tracking-tight text-foreground md:text-3xl">
                {d.title}
              </h3>
              <p className="mt-4 max-w-md flex-1 text-pretty leading-relaxed text-muted-foreground">
                {d.text}
              </p>
              <div className="mt-8">
                <Link
                  href={d.href}
                  className={
                    d.accent
                      ? "group/btn inline-flex h-11 items-center gap-2 bg-lime px-6 text-sm font-semibold uppercase tracking-wide text-lime-foreground transition-colors hover:bg-foreground"
                      : "inline-flex h-11 items-center gap-2 border border-border px-6 text-sm font-semibold uppercase tracking-wide text-foreground transition-colors hover:border-lime hover:text-lime"
                  }
                >
                  {d.cta}
                </Link>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerReveal>
    </div>
  );
}
