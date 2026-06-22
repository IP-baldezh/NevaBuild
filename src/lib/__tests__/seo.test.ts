import { describe, it, expect } from "vitest";
import { buildAlternates } from "../seo";

describe("buildAlternates", () => {
  it("возвращает canonical с локалью", () => {
    const result = buildAlternates("ru", "/about");
    expect(result?.canonical).toBe("/ru/about");
  });

  it("canonical для пустого пути (главная)", () => {
    const result = buildAlternates("ru", "");
    expect(result?.canonical).toBe("/ru");
  });

  it("canonical для en локали", () => {
    const result = buildAlternates("en", "/news");
    expect(result?.canonical).toBe("/en/news");
  });

  it("languages содержит ru ссылку", () => {
    const result = buildAlternates("ru", "/about");
    expect((result?.languages as Record<string, string>)?.["ru"]).toBe("/ru/about");
  });

  it("languages содержит en ссылку", () => {
    const result = buildAlternates("ru", "/about");
    expect((result?.languages as Record<string, string>)?.["en"]).toBe("/en/about");
  });

  it("x-default всегда указывает на ru версию", () => {
    const result = buildAlternates("en", "/about");
    expect((result?.languages as Record<string, string>)?.["x-default"]).toBe("/ru/about");
  });

  it("корректно обрабатывает вложенный путь", () => {
    const result = buildAlternates("ru", "/exhibitors/firma-abc");
    expect(result?.canonical).toBe("/ru/exhibitors/firma-abc");
    expect((result?.languages as Record<string, string>)?.["en"]).toBe("/en/exhibitors/firma-abc");
  });

  it("locale не влияет на languages (всегда /ru и /en)", () => {
    const result1 = buildAlternates("ru", "/program");
    const result2 = buildAlternates("en", "/program");
    const langs1 = result1?.languages as Record<string, string>;
    const langs2 = result2?.languages as Record<string, string>;
    expect(langs1?.["ru"]).toBe("/ru/program");
    expect(langs2?.["ru"]).toBe("/ru/program");
    expect(langs1?.["en"]).toBe("/en/program");
    expect(langs2?.["en"]).toBe("/en/program");
  });
});
