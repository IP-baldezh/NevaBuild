import type { Locale } from "@/i18n/routing";

/** Выбирает локализованное значение из пары *Ru / *En с разумным фолбэком. */
export function pick(
  locale: Locale,
  ru: string | null | undefined,
  en: string | null | undefined,
): string {
  return (locale === "ru" ? ru : en) ?? ru ?? en ?? "";
}
