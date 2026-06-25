/** Форматирование дат и диапазонов с учётом локали. Хранение — ISO в UTC. */

export function formatDateRange(start: string | Date, end: string | Date, locale: string): string {
  const s = new Date(start);
  const e = new Date(end);
  const day = (d: Date) => d.getUTCDate();

  const sameMonth =
    s.getUTCMonth() === e.getUTCMonth() && s.getUTCFullYear() === e.getUTCFullYear();

  if (sameMonth) {
    const monthYear = new Intl.DateTimeFormat(locale, {
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }).format(e);
    return `${day(s)}–${day(e)} ${monthYear}`;
  }

  const fmt = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
  return `${fmt.format(s)} — ${fmt.format(e)}`;
}

export function formatDate(date: string | Date, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}

export function formatTime(date: string | Date, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  }).format(new Date(date));
}
