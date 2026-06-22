import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getAllExhibitorSlugs } from "@/server/services/exhibitors";
import { getAllNewsSlugs } from "@/server/services/news";
import { getAllSessionSlugs } from "@/server/services/program";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nevabuildexpo.ru";

const STATIC_PATHS = [
  "",
  "/about",
  "/exhibit",
  "/visit",
  "/exhibitors",
  "/program",
  "/news",
  "/tickets",
  "/contacts",
];

function withLanguages(path: string) {
  return {
    languages: {
      ru: `${SITE_URL}/ru${path}`,
      en: `${SITE_URL}/en${path}`,
    },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [exhibitorSlugs, newsSlugs, sessionSlugs] = await Promise.all([
    getAllExhibitorSlugs(),
    getAllNewsSlugs(),
    getAllSessionSlugs(),
  ]);

  const entries: MetadataRoute.Sitemap = [];

  const add = (path: string, priority = 0.7) => {
    for (const locale of routing.locales) {
      entries.push({
        url: `${SITE_URL}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: path === "" ? 1 : priority,
        alternates: withLanguages(path),
      });
    }
  };

  STATIC_PATHS.forEach((p) => add(p, p === "" ? 1 : 0.8));
  exhibitorSlugs.forEach((s) => add(`/exhibitors/${s}`, 0.6));
  newsSlugs.forEach((s) => add(`/news/${s}`, 0.6));
  sessionSlugs.forEach((s) => add(`/program/${s}`, 0.5));

  return entries;
}
