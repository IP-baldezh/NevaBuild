import { describe, it, expect } from "vitest";
import { cn, formatPrice, slugify } from "../utils";

describe("cn", () => {
  it("объединяет классы", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("разрешает конфликты Tailwind (последний побеждает)", () => {
    expect(cn("p-4", "p-8")).toBe("p-8");
  });

  it("игнорирует falsy значения", () => {
    expect(cn("foo", false && "bar", null, undefined, "baz")).toBe("foo baz");
  });

  it("поддерживает условные объекты", () => {
    expect(cn({ "text-lime": true, "text-red": false })).toBe("text-lime");
  });

  it("возвращает пустую строку без аргументов", () => {
    expect(cn()).toBe("");
  });

  it("разрешает конфликт background-color", () => {
    expect(cn("bg-lime", "bg-red-500")).toBe("bg-red-500");
  });
});

describe("formatPrice", () => {
  it("форматирует рубли по умолчанию", () => {
    const result = formatPrice(1500);
    expect(result).toContain("1");
    expect(result).toContain("500");
    // Символ рубля или слово
    expect(result).toMatch(/[₽RUB]/);
  });

  it("форматирует нулевую цену", () => {
    const result = formatPrice(0);
    expect(result).toMatch(/0/);
  });

  it("форматирует большое число без дробной части", () => {
    const result = formatPrice(100000);
    // Не должно быть точки или запятой + дробных цифр (maximumFractionDigits: 0)
    expect(result).not.toMatch(/[.,]\d{2}(?!\d)/);
  });

  it("форматирует USD с правильной валютой", () => {
    const result = formatPrice(100, "USD", "en-US");
    expect(result).toMatch(/\$/);
    expect(result).toMatch(/100/);
  });

  it("форматирует EUR", () => {
    const result = formatPrice(250, "EUR", "de-DE");
    expect(result).toMatch(/250/);
    expect(result).toMatch(/€/);
  });
});

describe("slugify", () => {
  it("транслитерирует русские буквы", () => {
    expect(slugify("Привет")).toBe("privet");
  });

  it("транслитерирует полное слово", () => {
    expect(slugify("строительство")).toBe("stroitelstvo");
  });

  it("заменяет пробелы дефисом", () => {
    expect(slugify("нева билд")).toBe("neva-bild");
  });

  it("переводит в нижний регистр", () => {
    expect(slugify("HELLO WORLD")).toBe("hello-world");
  });

  it("убирает дефисы в начале и конце", () => {
    expect(slugify("  тест  ")).toBe("test");
  });

  it("заменяет специальные символы дефисом", () => {
    expect(slugify("hello, world!")).toBe("hello-world");
  });

  it("схлопывает несколько спецсимволов в один дефис", () => {
    expect(slugify("foo   bar---baz")).toBe("foo-bar-baz");
  });

  it("обрабатывает ё → e", () => {
    expect(slugify("ёлка")).toBe("elka");
  });

  it("обрабатывает щ → sch", () => {
    expect(slugify("щит")).toBe("schit");
  });

  it("обрабатывает ъ и ь как пустые", () => {
    expect(slugify("объект")).toBe("obekt");
  });

  it("обрабатывает смешанный ввод", () => {
    expect(slugify("NEVA BUILD 2025")).toBe("neva-build-2025");
  });

  it("возвращает пустую строку для пустого ввода", () => {
    expect(slugify("")).toBe("");
  });

  it("сохраняет цифры", () => {
    expect(slugify("зал 3")).toBe("zal-3");
  });
});
