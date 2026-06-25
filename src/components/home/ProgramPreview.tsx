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
  lecture: "bg-teal-50 text-teal-700",
  workshop: "bg-orange-50 text-orange-700",
  conference: "bg-blue-50 text-blue-700",
  panel: "bg-violet-50 text-violet-700",
  ceremony: "bg-emerald-50 text-emerald-700",
  presentation: "bg-sky-50 text-sky-700",
  networking: "bg-pink-50 text-pink-700",
  exhibition: "bg-gray-100 text-gray-700",
  default: "bg-gray-100 text-gray-600",
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
    <section id="program" className="py-12 sm:py-20 bg-nb-bg-light">
      <div className="container-neva">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <h2
              className="font-black text-nb-dark leading-tight"
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
            className="hidden sm:inline-flex items-center gap-2 font-bold text-[14px] hover:text-nb-lime-acid border-b hover:border-nb-lime-acid pb-0.5 transition-all duration-200 self-start sm:self-auto"
            style={{ color: "#E11B22", borderColor: "rgba(18,182,105,0.4)" }}
          >
            {ru ? "Полная программа" : "Full programme"}
            <ArrowRight className="size-[14px]" />
          </Link>
        </div>

        {/* Zone / Hall selector */}
        {halls.length > 0 && (
          <div className="mb-6">
            <p className="font-mulish text-[11px] text-nb-muted uppercase tracking-[0.14em] mb-3 font-bold">
              {ru ? "Выберите зону" : "Select zone"}
            </p>
            <div className="flex flex-wrap gap-2">
              {/* All zones */}
              {(() => {
                const active = activeHall === null;
                return (
                  <button
                    key="all"
                    type="button"
                    onClick={() => setActiveHall(null)}
                    className="flex items-center gap-2 font-bold text-[13.5px] px-4 py-2 rounded-xl border transition-all duration-200"
                    style={{
                      background: active ? "#16221C" : "white",
                      color: active ? "white" : "#16221C",
                      borderColor: active ? "#16221C" : "#e4efe8",
                      boxShadow: active ? "0 4px 14px rgba(22,34,28,0.22)" : "none",
                    }}
                  >
                    {ru ? "Все зоны" : "All zones"}
                  </button>
                );
              })()}
              {/* Each hall */}
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
                      background: active ? color : "white",
                      color: active ? "white" : "#16221C",
                      borderColor: active ? color : "#e4efe8",
                      boxShadow: active ? `0 4px 14px ${color}33` : "none",
                    }}
                  >
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: active ? "rgba(255,255,255,0.7)" : color }}
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
              className={`flex-shrink-0 font-bold text-[14px] px-5 py-2.5 rounded-xl transition-all duration-200 ${
                activeDayIdx === i
                  ? "bg-nb-dark text-white shadow-lg shadow-nb-dark/20"
                  : "bg-white text-nb-dark border border-nb-border hover:border-nb-dark/40"
              }`}
            >
              {pick(locale, day.titleRu, day.titleEn)}
            </button>
          ))}
        </div>

        {/* Session cards */}
        {visibleSessions.length === 0 ? (
          <div className="font-mulish text-center py-16 text-nb-muted">
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
                  className="bg-white border border-nb-border hover:border-nb-lime-acid/40 rounded-[1rem] p-5 sm:p-6 flex gap-5 transition-all duration-200 hover:shadow-md group"
                >
                  {/* Time */}
                  <div className="flex-shrink-0 w-16 text-right">
                    <span className="font-black text-[18px] text-nb-dark">
                      {formatTime(s.startTime, locale)}
                    </span>
                  </div>

                  <div className="w-px bg-nb-border flex-shrink-0" />

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className={`font-bold text-[11px] px-2.5 py-1 rounded-md ${tColor}`}>
                        {s.type}
                      </span>
                      {!activeHall && hall && hallColor && (
                        <span
                          className="font-bold text-[11px] px-2.5 py-1 rounded-md"
                          style={{
                            background: `${hallColor}14`,
                            color: hallColor,
                          }}
                        >
                          {hall}
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-[16px] text-nb-dark leading-snug mb-3 group-hover:text-nb-green transition-colors duration-200">
                      {pick(locale, s.titleRu, s.titleEn)}
                    </h3>
                    <div className="flex flex-wrap gap-4">
                      {hall && (
                        <div className="flex items-center gap-1.5 text-nb-muted">
                          <MapPin className="size-[13px]" />
                          <span className="font-mulish text-[13px]">{hall}</span>
                        </div>
                      )}
                      {s.speakers && s.speakers.length > 0 && (
                        <div className="flex items-center gap-1.5 text-nb-muted">
                          <Users className="size-[13px]" />
                          <span className="font-mulish text-[13px]">
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
