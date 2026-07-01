"use client";

import { useState, useMemo } from "react";
import { useLocale } from "next-intl";
import { MapPin, Users, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { pick } from "@/lib/content";
import { formatTime } from "@/lib/format";
import type { Locale } from "@/i18n/routing";
import type { ProgramDayWithSessions } from "@/server/services/program";

const ZONE_COLORS = ["#E11B22", "#12B669", "#0066cc", "#7c3aed", "#f59e0b"];

const TYPE_COLORS: Record<string, string> = {
  lecture: "text-teal-300",
  workshop: "text-orange-300",
  conference: "text-blue-300",
  panel: "text-violet-300",
  ceremony: "text-emerald-300",
  presentation: "text-sky-300",
  networking: "text-pink-300",
  exhibition: "text-gray-300",
  default: "text-gray-400",
};

function typeColor(type: string): string {
  return TYPE_COLORS[type] ?? TYPE_COLORS.default;
}

export function ProgramPreview({ days }: { days: ProgramDayWithSessions[] }) {
  const locale = useLocale() as Locale;
  const ru = locale === "ru";

  const [activeDayIdx, setActiveDayIdx] = useState(0);
  const [activeHall, setActiveHall] = useState<string | null>(null);

  const allSessions = useMemo(() => days.flatMap((d) => d.sessions), [days]);

  // Unique halls across ALL days (for zone selector)
  const halls = useMemo(() => {
    const seen = new Set<string>();
    const result: string[] = [];
    for (const s of allSessions) {
      const hall = pick(locale, s.hallRu, s.hallEn);
      if (hall && !seen.has(hall)) {
        seen.add(hall);
        result.push(hall);
      }
    }
    return result;
  }, [allSessions, locale]);

  const currentDay = days[activeDayIdx];
  const visibleSessions = useMemo(() => {
    if (!currentDay) return [];
    const sessions = currentDay.sessions;
    if (!activeHall) return sessions.slice(0, 6);
    return sessions.filter((s) => pick(locale, s.hallRu, s.hallEn) === activeHall).slice(0, 6);
  }, [currentDay, activeHall, locale]);

  if (!days.length) return null;

  return (
    <section
      id="program"
      className="relative z-10 py-12 sm:py-20"
      style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
    >
      <div className="container-neva">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <span
              className="text-[11px] uppercase tracking-[0.28em] mb-3 block font-bold"
              style={{ color: "#a9ec46", fontFamily: "var(--font-mulish)" }}
            >
              {ru ? "Деловая программа" : "Business Programme"}
            </span>
            <h2
              className="font-black text-white leading-tight"
              style={{ fontSize: "clamp(30px,4vw,50px)" }}
            >
              {ru ? (
                <>
                  200+ событий
                  <br />
                  за 4 дня
                </>
              ) : (
                <>
                  200+ events
                  <br />
                  over 4 days
                </>
              )}
            </h2>
          </div>
          <Link
            href="/program"
            className="hidden sm:inline-flex items-center gap-2 font-bold text-[14px] pb-0.5 transition-all duration-200 self-start sm:self-auto"
            style={{ color: "#a9ec46", borderBottom: "1px solid rgba(169,236,70,0.4)" }}
          >
            {ru ? "Полная программа" : "Full programme"}
            <ArrowRight className="size-[14px]" />
          </Link>
        </div>

        {/* Zone / Hall selector */}
        {halls.length > 0 && (
          <div className="mb-6">
            <p
              className="text-[11px] uppercase tracking-[0.14em] mb-3 font-bold"
              style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-mulish)" }}
            >
              {ru ? "Выберите зону" : "Select zone"}
            </p>
            <div className="flex flex-wrap gap-2">
              {(() => {
                const active = activeHall === null;
                return (
                  <button
                    key="all"
                    type="button"
                    onClick={() => setActiveHall(null)}
                    className="flex items-center gap-2 font-bold text-[13.5px] px-4 py-2 rounded-xl border transition-all duration-200"
                    style={{
                      background: active ? "rgba(169,236,70,0.15)" : "rgba(255,255,255,0.04)",
                      color: active ? "#a9ec46" : "rgba(255,255,255,0.5)",
                      borderColor: active ? "rgba(169,236,70,0.4)" : "rgba(255,255,255,0.08)",
                    }}
                  >
                    {ru ? "Все зоны" : "All zones"}
                  </button>
                );
              })()}
              {halls.map((hall, i) => {
                const color = ZONE_COLORS[i % ZONE_COLORS.length];
                const active = activeHall === hall;
                return (
                  <button
                    key={hall}
                    type="button"
                    onClick={() => setActiveHall(active ? null : hall)}
                    className="flex items-center gap-2 font-bold text-[13.5px] px-4 py-2 rounded-xl border transition-all duration-200"
                    style={{
                      background: active ? `${color}22` : "rgba(255,255,255,0.04)",
                      color: active ? color : "rgba(255,255,255,0.5)",
                      borderColor: active ? `${color}66` : "rgba(255,255,255,0.08)",
                    }}
                  >
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: color, opacity: active ? 1 : 0.5 }}
                    />
                    {hall}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Day tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
          {days.map((day, i) => (
            <button
              key={day.id}
              type="button"
              onClick={() => setActiveDayIdx(i)}
              className="flex-shrink-0 font-bold text-[14px] px-5 py-2.5 rounded-xl border transition-all duration-200"
              style={
                activeDayIdx === i
                  ? { background: "#a9ec46", color: "#0d2d06", borderColor: "#a9ec46" }
                  : {
                      background: "rgba(255,255,255,0.04)",
                      color: "rgba(255,255,255,0.55)",
                      borderColor: "rgba(255,255,255,0.08)",
                    }
              }
            >
              {pick(locale, day.titleRu, day.titleEn)}
            </button>
          ))}
        </div>

        {/* Session cards */}
        {visibleSessions.length === 0 ? (
          <div
            className="text-center py-16"
            style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-mulish)" }}
          >
            {activeHall
              ? ru
                ? `В этот день в зоне «${activeHall}» событий нет`
                : `No events in zone «${activeHall}» this day`
              : ru
                ? "Нет мероприятий в этот день"
                : "No events for this day"}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {visibleSessions.map((s) => {
              const hall = pick(locale, s.hallRu, s.hallEn);
              const hallIdx = hall ? halls.indexOf(hall) : -1;
              const hallColor = hallIdx >= 0 ? ZONE_COLORS[hallIdx % ZONE_COLORS.length] : null;
              const tColor = typeColor(s.type);

              return (
                <div
                  key={s.id}
                  className="rounded-[1rem] p-5 sm:p-6 flex gap-5 transition-all duration-200 group"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <div className="flex-shrink-0 w-16 text-right">
                    <span className="font-black text-[18px] text-white">
                      {formatTime(s.startTime, locale)}
                    </span>
                  </div>

                  <div
                    className="w-px flex-shrink-0"
                    style={{ background: "rgba(255,255,255,0.08)" }}
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className={`font-bold text-[11px] uppercase tracking-wide ${tColor}`}>
                        {s.type}
                      </span>
                      {!activeHall && hall && hallColor && (
                        <span
                          className="font-bold text-[11px] px-2.5 py-0.5 rounded-md"
                          style={{ background: `${hallColor}18`, color: hallColor }}
                        >
                          {hall}
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-[16px] text-white leading-snug mb-3 group-hover:text-nb-lime-acid transition-colors duration-200">
                      {pick(locale, s.titleRu, s.titleEn)}
                    </h3>
                    <div className="flex flex-wrap gap-4">
                      {hall && (
                        <div
                          className="flex items-center gap-1.5"
                          style={{ color: "rgba(255,255,255,0.35)" }}
                        >
                          <MapPin className="size-[13px]" />
                          <span style={{ fontFamily: "var(--font-mulish)", fontSize: "13px" }}>
                            {hall}
                          </span>
                        </div>
                      )}
                      {s.speakers && s.speakers.length > 0 && (
                        <div
                          className="flex items-center gap-1.5"
                          style={{ color: "rgba(255,255,255,0.35)" }}
                        >
                          <Users className="size-[13px]" />
                          <span style={{ fontFamily: "var(--font-mulish)", fontSize: "13px" }}>
                            {s.speakers.map((sp) => pick(locale, sp.nameRu, sp.nameEn)).join(", ")}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* CTA */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/program"
            className="inline-flex items-center justify-center gap-2.5 font-bold text-[14.5px] px-8 py-4 rounded-xl text-white transition-all duration-200 hover:-translate-y-0.5 w-full sm:w-auto touch-manipulation"
            style={{ background: "#E11B22", boxShadow: "0 8px 24px rgba(225,27,34,0.25)" }}
          >
            {ru ? "Полная программа" : "Full programme"}
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
