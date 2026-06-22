"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { CalendarPlus, Clock, MapPin } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { SelectNative } from "@/components/ui/select-native";
import { pick } from "@/lib/content";
import { formatTime, formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/routing";
import type { ProgramDayWithSessions } from "@/server/services/program";

function googleCalendarUrl(opts: {
  title: string;
  start: Date;
  end: Date;
  details?: string;
  location?: string;
}) {
  const fmt = (d: Date) =>
    new Date(d).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
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
  const [activeDay, setActiveDay] = useState(0);
  const [type, setType] = useState("");
  const [hall, setHall] = useState("");

  const allSessions = useMemo(
    () => days.flatMap((d) => d.sessions),
    [days],
  );
  const types = useMemo(
    () => Array.from(new Set(allSessions.map((s) => s.type))),
    [allSessions],
  );
  const halls = useMemo(
    () =>
      Array.from(
        new Set(allSessions.map((s) => s.hallRu).filter((h): h is string => !!h)),
      ),
    [allSessions],
  );

  const day = days[activeDay];
  const sessions = (day?.sessions ?? []).filter(
    (s) =>
      (!type || s.type === type) && (!hall || s.hallRu === hall),
  );

  if (days.length === 0) {
    return <p className="py-16 text-center text-muted-foreground">{t("empty")}</p>;
  }

  return (
    <div>
      {/* Табы по дням */}
      <div className="flex flex-wrap gap-2">
        {days.map((d, i) => (
          <button
            key={d.id}
            type="button"
            onClick={() => setActiveDay(i)}
            className={cn(
              "rounded-full px-5 py-2.5 text-sm font-semibold transition-colors",
              i === activeDay
                ? "bg-brand-red text-white"
                : "border bg-card hover:bg-secondary",
            )}
          >
            <span className="block">{pick(locale, d.titleRu, d.titleEn)}</span>
            <span
              className={cn(
                "text-xs font-normal",
                i === activeDay ? "text-white/70" : "text-muted-foreground",
              )}
            >
              {formatDate(d.date, locale)}
            </span>
          </button>
        ))}
      </div>

      {/* Фильтры */}
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:max-w-md">
        <SelectNative value={type} onChange={(e) => setType(e.target.value)} aria-label={t("allTypes")}>
          <option value="">{t("allTypes")}</option>
          {types.map((ty) => (
            <option key={ty} value={ty}>
              {t(`type.${ty}`)}
            </option>
          ))}
        </SelectNative>
        <SelectNative value={hall} onChange={(e) => setHall(e.target.value)} aria-label={t("allHalls")}>
          <option value="">{t("allHalls")}</option>
          {halls.map((h) => (
            <option key={h} value={h}>
              {h}
            </option>
          ))}
        </SelectNative>
      </div>

      {/* Сессии */}
      <div className="mt-8 space-y-4">
        {sessions.length === 0 ? (
          <p className="py-12 text-center text-muted-foreground">{t("empty")}</p>
        ) : (
          sessions.map((s) => {
            const title = pick(locale, s.titleRu, s.titleEn);
            const hallName = pick(locale, s.hallRu, s.hallEn);
            return (
              <div
                key={s.id}
                className="flex flex-col gap-4 rounded-2xl border bg-card p-5 sm:flex-row sm:gap-6"
              >
                <div className="flex shrink-0 items-center gap-2 text-sm font-bold text-brand-red sm:w-32 sm:flex-col sm:items-start sm:justify-center">
                  <Clock className="size-4 sm:hidden" />
                  <span>{formatTime(s.startTime, locale)}</span>
                  <span className="text-muted-foreground sm:text-xs">
                    – {formatTime(s.endTime, locale)}
                  </span>
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary">{t(`type.${s.type}`)}</Badge>
                    {hallName && (
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="size-3" />
                        {hallName}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-2 text-lg font-bold">
                    <Link href={`/program/${s.slug}`} className="hover:text-brand-red">
                      {title}
                    </Link>
                  </h3>
                  {s.speakers.length > 0 && (
                    <p className="mt-1 text-sm text-muted-foreground">
                      {t("speakers")}:{" "}
                      {s.speakers
                        .map((sp) => pick(locale, sp.nameRu, sp.nameEn))
                        .join(", ")}
                    </p>
                  )}
                </div>

                <a
                  href={googleCalendarUrl({
                    title,
                    start: s.startTime,
                    end: s.endTime,
                    location: hallName,
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-fit shrink-0 items-center gap-2 self-start rounded-full border px-4 py-2 text-xs font-semibold hover:bg-secondary"
                >
                  <CalendarPlus className="size-4" />
                  {t("addToCalendar")}
                </a>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
