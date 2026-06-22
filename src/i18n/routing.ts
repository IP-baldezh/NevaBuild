import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ru", "en"],
  defaultLocale: "ru",
  // Всегда показываем префикс локали в URL: /ru/..., /en/...
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
