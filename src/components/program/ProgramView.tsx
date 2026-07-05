"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { CalendarPlus, MapPin, Users } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { pick } from "@/lib/content";
import { formatTime, formatDate } from "@/lib/format";
import type { Locale } from "@/i18n/routing";
import type { ProgramDayWithSessions } from "@/server/services/program";

const ZONE_COLORS = ["#E11B22", "#a9ec46", "#0066cc", "#7c3aed", "#f59e0b"];

const TYPE_COLORS: Record<string, string> = {
  PLENARY: "text-white",
  MASTERCLASS: "text-nb-lime-acid",
  LECTURE: "text-white",
  DISCUSSION: "text-nb-lime-acid",
  PRESENTATION: "text-white",
  WORKSHOP: "text-nb-lime-acid",
  default: "text-white/80",
};

function typeColor(type: string): string {
  return TYPE_COLORS[type] ?? TYPE_COLORS.default;
}

function googleCalendarUrl(opts: {
  title: string;
  start: Date;
  end: Date;
  details?: string;
  location?: string;
}) {
  const fmt = (d: Date) =>
    new Date(d)
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}/, "");
  const p = new URLSearchParams({
    action: "TEMPLATE",
    text: opts.title,
    dates: `${fmt(opts.start)}/${fmt(opts.end)}`,
    details: opts.details ?? "",
    location: opts.location ?? "",
  });
  return `https://calendar.google.com/calendar/render?${p.toString()}`;
}

export function ProgramView({ days }: { days: ProgramDayWithSessions[] }) {
  const t = useTranslations("ProgramPage");
  const locale = useLocale() as Locale;
  const ru = locale === "ru";

  const [activeDay, setActiveDay] = useState(0);
  const [activeType, setActiveType] = useState("");
  const [activeHall, setActiveHall] = useState("");

  const allSessions = useMemo(() => days.flatMap((d) => d.sessions), [days]);

  const types = useMemo(() => Array.from(new Set(allSessions.map((s) => s.type))), [allSessions]);

  const halls = useMemo(
    () =>
      Array.from(
        new Set(
          allSessions.map((s) => pick(locale, s.hallRu, s.hallEn)).filter((h): h is string => !!h),
        ),
      ),
    [allSessions, locale],
  );

  const day = days[activeDay];
  const sessions = (day?.sessions ?? []).filter(
    (s) =>
      (!activeType || s.type === activeType) &&
      (!activeHall || pick(locale, s.hallRu, s.hallEn) === activeHall),
  );

  if (days.length === 0) {
    return (
      <p
        className="py-16 text-center"
        style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-mulish)" }}
      >
        {t("empty")}
      </p>
    );
  }

  return (
    <div>
      {/* Day tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {days.map((d, i) => (
          <button
            key={d.id}
            type="button"
            onClick={() => setActiveDay(i)}
            className="flex-shrink-0 flex flex-col items-start font-bold px-5 py-3 rounded-xl border transition-all duration-200"
            style={
              i === activeDay
                ? { background: "#a9ec46", color: "#0d2d06", borderColor: "#a9ec46" }
                : {
                    background: "rgba(255,255,255,0.04)",
                    color: "rgba(255,255,255,0.85)",
                    borderColor: "rgba(255,255,255,0.08)",
                  }
            }
          >
            <span className="text-[14px] font-black leading-tight">
              {pick(locale, d.titleRu, d.titleEn)}
            </span>
            <span
              className="text-[11px] font-semibold mt-0.5"
              style={{ opacity: i === activeDay ? 0.65 : 0.55 }}
            >
              {formatDate(d.date, locale)}
            </span>
          </button>
        ))}
      </div>

      {/* Filters */}
      {(halls.length > 0 || types.length > 1) && (
        <div
          className="flex flex-col gap-4 mb-8 pb-8"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
        >
          {/* Hall filter */}
          {halls.length > 0 && (
            <div>
              <p
                className="text-[11px] uppercase tracking-[0.14em] mb-3 font-bold"
                style={{ color: "rgba(255,255,255,0.60)", fontFamily: "var(--font-mulish)" }}
              >
                {ru ? "Зал" : "Hall"}
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setActiveHall("")}
                  className="font-bold text-[13px] px-4 py-2 rounded-xl border transition-all duration-200"
                  style={{
                    background: !activeHall ? "rgba(169,236,70,0.15)" : "rgba(255,255,255,0.04)",
                    color: !activeHall ? "#a9ec46" : "rgba(255,255,255,0.85)",
                    borderColor: !activeHall ? "rgba(169,236,70,0.4)" : "rgba(255,255,255,0.08)",
                  }}
                >
                  {t("allHalls")}
                </button>
                {halls.map((hall, i) => {
                  const color = ZONE_COLORS[i % ZONE_COLORS.length];
                  const active = activeHall === hall;
                  return (
                    <button
                      key={hall}
                      type="button"
                      onClick={() => setActiveHall(active ? "" : hall)}
                      className="flex items-center gap-2 font-bold text-[13px] px-4 py-2 rounded-xl border transition-all duration-200"
                      style={{
                        background: active ? `${color}22` : "rgba(255,255,255,0.04)",
                        color: active ? color : "rgba(255,255,255,0.85)",
                        borderColor: active ? `${color}66` : "rgba(255,255,255,0.08)",
                      }}
                    >
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ background: color, opacity: active ? 1 : 0.45 }}
                      />
                      {hall}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Type filter */}
          {types.length > 1 && (
            <div>
              <p
                className="text-[11px] uppercase tracking-[0.14em] mb-3 font-bold"
                style={{ color: "rgba(255,255,255,0.60)", fontFamily: "var(--font-mulish)" }}
              >
                {ru ? "Формат" : "Format"}
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setActiveType("")}
                  className="font-bold text-[13px] px-4 py-2 rounded-xl border transition-all duration-200"
                  style={{
                    background: !activeType ? "rgba(169,236,70,0.15)" : "rgba(255,255,255,0.04)",
                    color: !activeType ? "#a9ec46" : "rgba(255,255,255,0.85)",
                    borderColor: !activeType ? "rgba(169,236,70,0.4)" : "rgba(255,255,255,0.08)",
                  }}
                >
                  {t("allTypes")}
                </button>
                {types.map((ty) => {
                  const active = activeType === ty;
                  return (
                    <button
                      key={ty}
                      type="button"
                      onClick={() => setActiveType(active ? "" : ty)}
                      className="font-bold text-[13px] px-4 py-2 rounded-xl border transition-all duration-200"
                      style={{
                        background: active ? "rgba(169,236,70,0.12)" : "rgba(255,255,255,0.04)",
                        color: active ? "#a9ec46" : "rgba(255,255,255,0.85)",
                        borderColor: active ? "rgba(169,236,70,0.35)" : "rgba(255,255,255,0.08)",
                      }}
                    >
                      {t(`type.${ty}`)}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Sessions */}
      {sessions.length === 0 ? (
        <div
          className="text-center py-16"
          style={{ color: "rgba(255,255,255,0.60)", fontFamily: "var(--font-mulish)" }}
        >
          {t("empty")}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {sessions.map((s) => {
            const title = pick(locale, s.titleRu, s.titleEn);
            const hallName = pick(locale, s.hallRu, s.hallEn);
            const hallIdx = hallName ? halls.indexOf(hallName) : -1;
            const hallColor = hallIdx >= 0 ? ZONE_COLORS[hallIdx % ZONE_COLORS.length] : null;
            const tColor = typeColor(s.type);

            return (
              <div
                key={s.id}
                className="rounded-[1rem] p-5 sm:p-6 flex gap-4 sm:gap-5 transition-all duration-200 group"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                {/* Time */}
                <div className="flex-shrink-0 w-14 sm:w-16 text-right">
                  <span className="font-black text-[17px] sm:text-[18px] text-white leading-tight block">
                    {formatTime(s.startTime, locale)}
                  </span>
                  <span
                    className="text-[12px] font-semibold leading-tight block mt-0.5"
                    style={{ color: "rgba(255,255,255,0.50)" }}
                  >
                    {formatTime(s.endTime, locale)}
                  </span>
                </div>

                {/* Divider */}
                <div
                  className="w-px flex-shrink-0"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                />

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={`font-bold text-[11px] uppercase tracking-wide ${tColor}`}>
                      {t(`type.${s.type}`)}
                    </span>
                    {hallName && hallColor && (
                      <span
                        className="font-bold text-[11px] px-2.5 py-0.5 rounded-md"
                        style={{ background: `${hallColor}18`, color: hallColor }}
                      >
                        {hallName}
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-[16px] text-white leading-snug mb-3 group-hover:text-nb-lime-acid transition-colors duration-200">
                    <Link href={`/program/${s.slug}`}>{title}</Link>
                  </h3>
                  <div className="flex flex-wrap items-center gap-4">
                    {hallName && (
                      <div
                        className="flex items-center gap-1.5"
                        style={{ color: "rgba(255,255,255,0.60)" }}
                      >
                        <MapPin className="size-[13px]" />
                        <span style={{ fontFamily: "var(--font-mulish)", fontSize: "13px" }}>
                          {hallName}
                        </span>
                      </div>
                    )}
                    {s.speakers.length > 0 && (
                      <div
                        className="flex items-center gap-1.5"
                        style={{ color: "rgba(255,255,255,0.60)" }}
                      >
                        <Users className="size-[13px]" />
                        <span style={{ fontFamily: "var(--font-mulish)", fontSize: "13px" }}>
                          {s.speakers.map((sp) => pick(locale, sp.nameRu, sp.nameEn)).join(", ")}
                        </span>
                      </div>
                    )}
                    <a
                      href={googleCalendarUrl({
                        title,
                        start: s.startTime,
                        end: s.endTime,
                        location: hallName ?? undefined,
                      })}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-auto flex-shrink-0 inline-flex items-center gap-1.5 font-bold text-[12px] px-3 py-1.5 rounded-lg transition-all duration-200"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.10)",
                        color: "rgba(255,255,255,0.70)",
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <CalendarPlus className="size-3.5" />
                      <span className="hidden sm:inline">{t("addToCalendar")}</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
