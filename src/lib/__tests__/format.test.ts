import { describe, it, expect } from "vitest";
import { formatDateRange, formatDate, formatTime } from "../format";

describe("formatDateRange", () => {
  it("форматирует диапазон в одном месяце на русском", () => {
    const result = formatDateRange("2025-10-01", "2025-10-05", "ru-RU");
    // Ожидаем формат "1–5 октября 2025 г."
    expect(result).toMatch(/^1–5/);
    expect(result).toMatch(/октябр/);
    expect(result).toMatch(/2025/);
  });

  it("форматирует диапазон в одном месяце на английском", () => {
    const result = formatDateRange("2025-10-01", "2025-10-05", "en-US");
    expect(result).toMatch(/^1–5/);
    expect(result).toMatch(/October/);
    expect(result).toMatch(/2025/);
  });

  it("форматирует кросс-месячный диапазон на русском", () => {
    const result = formatDateRange("2025-09-28", "2025-10-02", "ru-RU");
    // Разные месяцы — формат с полными датами через " — "
    expect(result).toContain(" — ");
    expect(result).toMatch(/сентябр/i);
    expect(result).toMatch(/октябр/i);
  });

  it("форматирует кросс-месячный диапазон на английском", () => {
    const result = formatDateRange("2025-09-28", "2025-10-02", "en-US");
    expect(result).toContain(" — ");
    expect(result).toMatch(/September/i);
    expect(result).toMatch(/October/i);
  });

  it("принимает объекты Date", () => {
    const start = new Date("2025-10-01T00:00:00Z");
    const end = new Date("2025-10-05T00:00:00Z");
    const result = formatDateRange(start, end, "ru-RU");
    expect(result).toMatch(/^1–5/);
  });

  it("корректно обрабатывает однодневный диапазон (один месяц)", () => {
    const result = formatDateRange("2025-10-03", "2025-10-03", "ru-RU");
    expect(result).toMatch(/^3–3/);
  });

  it("кросс-годовой диапазон", () => {
    const result = formatDateRange("2024-12-30", "2025-01-02", "ru-RU");
    expect(result).toContain(" — ");
    expect(result).toMatch(/2024/);
    expect(result).toMatch(/2025/);
  });
});

describe("formatDate", () => {
  it("форматирует дату на русском", () => {
    const result = formatDate("2025-10-03", "ru-RU");
    expect(result).toMatch(/3/);
    expect(result).toMatch(/октябр/i);
    expect(result).toMatch(/2025/);
  });

  it("форматирует дату на английском", () => {
    const result = formatDate("2025-10-03", "en-US");
    expect(result).toMatch(/3/);
    expect(result).toMatch(/October/);
    expect(result).toMatch(/2025/);
  });

  it("принимает объект Date", () => {
    const d = new Date("2025-06-15T00:00:00Z");
    const result = formatDate(d, "ru-RU");
    expect(result).toMatch(/15/);
    expect(result).toMatch(/июн/i);
  });
});

describe("formatTime", () => {
  it("форматирует время в формате HH:mm", () => {
    const result = formatTime("2025-10-03T14:30:00Z", "ru-RU");
    expect(result).toBe("14:30");
  });

  it("форматирует полночь", () => {
    const result = formatTime("2025-10-03T00:00:00Z", "ru-RU");
    expect(result).toBe("00:00");
  });

  it("форматирует время для en-US (должен быть 02-значный час)", () => {
    const result = formatTime("2025-10-03T09:05:00Z", "en-US");
    // В en-US может быть 09:05 AM или 09:05
    expect(result).toMatch(/09/);
    expect(result).toMatch(/05/);
  });
});
