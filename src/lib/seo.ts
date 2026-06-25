import type { Metadata } from "next";

/** hreflang-альтернативы и canonical для страницы. path без локали, напр. "/about" или "". */
export function buildAlternates(locale: string, path: string): Metadata["alternates"] {
  return {
    canonical: `/${locale}${path}`,
    languages: {
      ru: `/ru${path}`,
      en: `/en${path}`,
      "x-default": `/ru${path}`,
    },
  };
}
