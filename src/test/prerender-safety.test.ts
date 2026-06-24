/**
 * Тест-стражник: гарантирует, что нелокализованные зоны (/admin, /account)
 * не используют next-intl хуки или компоненты, которые их вызывают.
 *
 * Причина: (admin) и (account) — отдельные root layouts без NextIntlClientProvider.
 * useLocale() / useTranslations() в них бросают исключение при пре-рендере,
 * что ломает production build ("Export encountered an error prerendering page").
 *
 * Эти тесты заменяют ручную проверку и не дают регрессии вернуться.
 */
import { readFileSync, readdirSync, statSync } from "fs";
import { join } from "path";
import { describe, it, expect } from "vitest";

const ROOT = join(process.cwd(), "src");

/** Рекурсивно собирает все .ts/.tsx файлы в директории */
function collectFiles(dir: string): string[] {
  const entries = readdirSync(dir);
  return entries.flatMap((entry) => {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) return collectFiles(full);
    if (full.endsWith(".ts") || full.endsWith(".tsx")) return [full];
    return [];
  });
}

/** Нелокализованные зоны — отдельные root layouts, нет NextIntlClientProvider */
const NON_INTL_ZONES = [join(ROOT, "app", "(admin)"), join(ROOT, "app", "(account)")];

/**
 * Паттерны, запрещённые в нелокализованных зонах.
 * Logo reexports useLocale(), поэтому оба под запретом.
 */
const FORBIDDEN_PATTERNS = [
  { pattern: /from\s+['"]next-intl['"]/, label: "next-intl import" },
  { pattern: /from\s+['"]next-intl\//, label: "next-intl sub-import" },
  {
    pattern: /from\s+['"]@\/components\/layout\/Logo['"]/,
    label: "@/components/layout/Logo (uses useLocale internally)",
  },
];

describe("Prerender safety — нелокализованные зоны", () => {
  for (const zone of NON_INTL_ZONES) {
    const zoneName = zone.split(/[\\/]/).slice(-2).join("/");
    const files = collectFiles(zone);

    describe(`${zoneName}`, () => {
      for (const file of files) {
        const relPath = file.replace(ROOT, "src").replace(/\\/g, "/");
        const content = readFileSync(file, "utf-8");

        for (const { pattern, label } of FORBIDDEN_PATTERNS) {
          if (pattern.test(content)) {
            it(`${relPath} — НЕ должен содержать «${label}»`, () => {
              // Тест специально написан так, чтобы падать с понятным сообщением
              expect(
                content,
                `Файл ${relPath} использует ${label}.\n` +
                  `Эта зона не имеет NextIntlClientProvider — useLocale()/useTranslations() ` +
                  `бросят исключение при пре-рендере.\n` +
                  `Решение: используйте статичный <img src="/logo-ru.svg"> вместо <Logo />, ` +
                  `или добавьте IntlProvider в корневой layout зоны.`,
              ).not.toMatch(pattern);
            });
          }
        }
      }

      it(`все файлы в ${zoneName} проверены (${files.length} файлов)`, () => {
        expect(files.length).toBeGreaterThan(0);
      });
    });
  }
});
