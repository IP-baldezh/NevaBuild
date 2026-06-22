import "server-only";
import { cache } from "react";
import type { EventSettings } from "@prisma/client";
import { prisma } from "@/lib/db";
import { EVENT_DEFAULTS } from "@/lib/event-defaults";
import type { Locale } from "@/i18n/routing";

/** Фолбэк, если в БД ещё нет строки настроек или БД недоступна (например, на этапе сборки). */
function fallback(): EventSettings {
  const now = new Date();
  return {
    id: "default",
    titleRu: EVENT_DEFAULTS.titleRu,
    titleEn: EVENT_DEFAULTS.titleEn,
    dateStart: new Date(EVENT_DEFAULTS.dateStart),
    dateEnd: new Date(EVENT_DEFAULTS.dateEnd),
    venueRu: EVENT_DEFAULTS.venueRu,
    venueEn: EVENT_DEFAULTS.venueEn,
    cityRu: EVENT_DEFAULTS.cityRu,
    cityEn: EVENT_DEFAULTS.cityEn,
    phone: EVENT_DEFAULTS.phone,
    email: EVENT_DEFAULTS.email,
    addressRu: EVENT_DEFAULTS.addressRu,
    addressEn: EVENT_DEFAULTS.addressEn,
    visitorCount: EVENT_DEFAULTS.visitorCount,
    exhibitorCount: EVENT_DEFAULTS.exhibitorCount,
    areaSize: EVENT_DEFAULTS.areaSize,
    programEventsCount: EVENT_DEFAULTS.programEventsCount,
    programDays: EVENT_DEFAULTS.programDays,
    seoTitleRu: EVENT_DEFAULTS.seoTitleRu,
    seoTitleEn: EVENT_DEFAULTS.seoTitleEn,
    seoDescriptionRu: EVENT_DEFAULTS.seoDescriptionRu,
    seoDescriptionEn: EVENT_DEFAULTS.seoDescriptionEn,
    organizerRu: EVENT_DEFAULTS.organizerRu,
    organizerEn: EVENT_DEFAULTS.organizerEn,
    social: EVENT_DEFAULTS.social,
    domains: [...EVENT_DEFAULTS.domains],
    createdAt: now,
    updatedAt: now,
  };
}

/** Настройки события. cache() дедуплицирует запрос в рамках одного рендера. */
export const getEventSettings = cache(async (): Promise<EventSettings> => {
  try {
    const row = await prisma.eventSettings.findUnique({
      where: { id: "default" },
    });
    return row ?? fallback();
  } catch {
    // БД недоступна (например, при статической сборке без поднятой базы) — отдаём дефолты.
    return fallback();
  }
});

/** Локализованное представление настроек для удобства в компонентах. */
export function localizeEvent(e: EventSettings, locale: Locale) {
  const ru = locale === "ru";
  return {
    title: ru ? e.titleRu : e.titleEn,
    venue: ru ? e.venueRu : e.venueEn,
    city: ru ? e.cityRu : e.cityEn,
    address: ru ? e.addressRu : e.addressEn,
    organizer: ru ? e.organizerRu : e.organizerEn,
    seoTitle: ru ? e.seoTitleRu : e.seoTitleEn,
    seoDescription: ru ? e.seoDescriptionRu : e.seoDescriptionEn,
    dateStart: e.dateStart,
    dateEnd: e.dateEnd,
    phone: e.phone,
    email: e.email,
    visitorCount: e.visitorCount,
    exhibitorCount: e.exhibitorCount,
    areaSize: e.areaSize,
    programEventsCount: e.programEventsCount,
    programDays: e.programDays,
    social: (e.social ?? {}) as Record<string, string>,
    domains: e.domains,
  };
}
