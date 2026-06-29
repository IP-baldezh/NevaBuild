"use client";

import React, { useState, useEffect, useCallback } from "react";
import { m, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export interface CarouselFeature {
  id: string;
  label: string;
  icon: LucideIcon;
  image: string;
  description: string;
}

interface FeatureCarouselProps {
  features: CarouselFeature[];
  accentColor?: string;
  panelBackground?: string;
  chipTextColor?: string;
  badgeText?: string;
  autoPlayInterval?: number;
}

const ITEM_HEIGHT = 65;

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export function FeatureCarousel({
  features,
  accentColor = "#12B669",
  panelBackground,
  chipTextColor,
  badgeText = "NevaBuild 2027",
  autoPlayInterval = 3000,
}: FeatureCarouselProps) {
  const [step, setStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentIndex = ((step % features.length) + features.length) % features.length;

  const nextStep = useCallback(() => setStep((prev) => prev + 1), []);

  const handleChipClick = (index: number) => {
    const diff = (index - currentIndex + features.length) % features.length;
    if (diff > 0) setStep((s) => s + diff);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextStep, autoPlayInterval);
    return () => clearInterval(interval);
  }, [nextStep, isPaused, autoPlayInterval]);

  const getCardStatus = (index: number) => {
    const diff = index - currentIndex;
    const len = features.length;
    let d = diff;
    if (d > len / 2) d -= len;
    if (d < -len / 2) d += len;
    if (d === 0) return "active";
    if (d === -1) return "prev";
    if (d === 1) return "next";
    return "hidden";
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="relative overflow-hidden rounded-[2.5rem] lg:rounded-[3rem] flex flex-col lg:flex-row min-h-[560px] lg:aspect-video border border-nb-border">
        {/* Left panel — scrolling chips */}
        <div
          className="w-full lg:w-[38%] min-h-[300px] md:min-h-[400px] lg:h-full relative z-30 flex flex-col items-start justify-center overflow-hidden px-8 md:px-14 lg:pl-14"
          style={{ background: panelBackground ?? accentColor }}
        >
          <div
            className="absolute inset-x-0 top-0 h-16 lg:h-20 z-40 pointer-events-none"
            style={{
              background: panelBackground
                ? "linear-gradient(to bottom, rgba(0,240,210,0.95) 0%, transparent 100%)"
                : `linear-gradient(to bottom, ${accentColor} 20%, transparent)`,
            }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-16 lg:h-20 z-40 pointer-events-none"
            style={{
              background: panelBackground
                ? "linear-gradient(to top, rgba(170,255,0,0.95) 0%, transparent 100%)"
                : `linear-gradient(to top, ${accentColor} 20%, transparent)`,
            }}
          />

          <div className="relative w-full h-full flex items-center justify-center lg:justify-start z-20">
            {features.map((feature, index) => {
              const isActive = index === currentIndex;
              const distance = index - currentIndex;
              const wrappedDistance = wrap(-(features.length / 2), features.length / 2, distance);
              const Icon = feature.icon;
              const activeTextColor = chipTextColor ?? accentColor;
              const inactiveColor = chipTextColor ? `${chipTextColor}99` : "rgba(255,255,255,0.6)";
              const inactiveBorder = chipTextColor ? `${chipTextColor}44` : "rgba(255,255,255,0.2)";

              return (
                <m.div
                  key={feature.id}
                  style={{ height: ITEM_HEIGHT, width: "fit-content" }}
                  animate={{
                    y: wrappedDistance * ITEM_HEIGHT,
                    opacity: 1 - Math.abs(wrappedDistance) * 0.25,
                  }}
                  transition={{ type: "spring", stiffness: 90, damping: 22, mass: 1 }}
                  className="absolute flex items-center justify-start"
                >
                  <button
                    type="button"
                    onClick={() => handleChipClick(index)}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    className="relative flex items-center gap-3 px-5 md:px-8 lg:px-7 py-3 md:py-4 rounded-full transition-all duration-500 text-left border font-bold text-[13px] md:text-[14px] tracking-wide uppercase"
                    style={
                      isActive
                        ? {
                            background: "white",
                            borderColor: "white",
                            color: activeTextColor,
                            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                            zIndex: 10,
                          }
                        : {
                            background: "transparent",
                            borderColor: inactiveBorder,
                            color: inactiveColor,
                          }
                    }
                  >
                    <span
                      className="flex-shrink-0 transition-colors duration-500"
                      style={{ color: isActive ? activeTextColor : inactiveColor }}
                    >
                      <Icon size={16} strokeWidth={2.5} />
                    </span>
                    <span
                      className="whitespace-nowrap"
                      style={{ fontFamily: "var(--font-mulish)" }}
                    >
                      {feature.label}
                    </span>
                  </button>
                </m.div>
              );
            })}
          </div>
        </div>

        {/* Right panel — image cards */}
        <div
          className="flex-1 min-h-[460px] md:min-h-[560px] lg:h-full relative flex items-center justify-center py-14 md:py-20 lg:py-14 px-6 md:px-10 overflow-hidden border-t lg:border-t-0 lg:border-l"
          style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.07)" }}
        >
          <div className="relative w-full max-w-[380px] aspect-[4/5] flex items-center justify-center">
            {features.map((feature, index) => {
              const status = getCardStatus(index);
              const isActive = status === "active";
              const isPrev = status === "prev";
              const isNext = status === "next";

              return (
                <m.div
                  key={feature.id}
                  initial={false}
                  animate={{
                    x: isActive ? 0 : isPrev ? -90 : isNext ? 90 : 0,
                    scale: isActive ? 1 : isPrev || isNext ? 0.87 : 0.7,
                    opacity: isActive ? 1 : isPrev || isNext ? 0.35 : 0,
                    rotate: isPrev ? -3 : isNext ? 3 : 0,
                    zIndex: isActive ? 20 : isPrev || isNext ? 10 : 0,
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 25, mass: 0.8 }}
                  className="absolute inset-0 rounded-[1.75rem] md:rounded-[2.25rem] overflow-hidden border-4 md:border-[6px] border-white bg-white origin-center shadow-xl"
                >
                  <Image
                    src={feature.image}
                    alt={feature.label}
                    fill
                    className={cn(
                      "object-cover transition-all duration-700",
                      isActive ? "grayscale-0" : "grayscale blur-[2px] brightness-75",
                    )}
                  />

                  <AnimatePresence>
                    {isActive && (
                      <m.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute inset-x-0 bottom-0 p-8 pt-28 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end pointer-events-none"
                      >
                        <div
                          className="px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.22em] w-fit mb-3 border"
                          style={{
                            background: "rgba(255,255,255,0.12)",
                            color: "#a9ec46",
                            borderColor: "rgba(169,236,70,0.3)",
                            fontFamily: "var(--font-mulish)",
                          }}
                        >
                          {index + 1} · {feature.label}
                        </div>
                        <p className="text-white font-bold text-lg md:text-xl leading-snug drop-shadow-md">
                          {feature.description}
                        </p>
                      </m.div>
                    )}
                  </AnimatePresence>

                  <div
                    className={cn(
                      "absolute top-6 left-6 flex items-center gap-2.5 transition-opacity duration-300",
                      isActive ? "opacity-100" : "opacity-0",
                    )}
                  >
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ background: "#a9ec46", boxShadow: "0 0 8px #a9ec46" }}
                    />
                    <span
                      className="text-white/70 text-[10px] font-bold uppercase tracking-[0.3em]"
                      style={{ fontFamily: "var(--font-mulish)" }}
                    >
                      {badgeText}
                    </span>
                  </div>
                </m.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
