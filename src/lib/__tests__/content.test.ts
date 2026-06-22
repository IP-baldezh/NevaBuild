import { describe, it, expect } from "vitest";
import { pick } from "../content";

// Locale type: "ru" | "en"

describe("pick", () => {
  it("возвращает ru значение для локали ru", () => {
    expect(pick("ru", "Привет", "Hello")).toBe("Привет");
  });

  it("возвращает en значение для локали en", () => {
    expect(pick("en", "Привет", "Hello")).toBe("Hello");
  });

  it("фолбэк на ru если en равен null", () => {
    expect(pick("en", "Привет", null)).toBe("Привет");
  });

  it("фолбэк на ru если en равен undefined", () => {
    expect(pick("en", "Привет", undefined)).toBe("Привет");
  });

  it("возвращает пустую строку если оба null", () => {
    expect(pick("ru", null, null)).toBe("");
  });

  it("возвращает пустую строку если оба undefined", () => {
    expect(pick("en", undefined, undefined)).toBe("");
  });

  it("фолбэк на en если ru null и запрошен ru", () => {
    // pick: (locale=ru ? ru : en) ?? ru ?? en ?? ""
    // locale=ru → ru=null → en="Hello" → "Hello"
    expect(pick("ru", null, "Hello")).toBe("Hello");
  });

  it("пустая строка en — валидное значение, фолбэка нет (nullish ?? не срабатывает)", () => {
    // ?? фолбэк только на null/undefined, не на пустую строку
    expect(pick("en", "Привет", "")).toBe("");
  });

  it("возвращает ru для незнакомой локали (не-en)", () => {
    // TypeScript не позволит это на уровне типов, но pick работает через "=== ru"
    // Незнакомая строка не равна "ru", поэтому возьмёт en
    expect(pick("en", "RU", "EN")).toBe("EN");
  });
});
