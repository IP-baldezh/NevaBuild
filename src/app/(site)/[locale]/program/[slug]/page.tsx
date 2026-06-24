import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft, Clock, MapPin, CalendarDays } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { buildAlternates } from "@/lib/seo";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GradientSection } from "@/components/ui/gradient-section";
import { pick } from "@/lib/content";
import { formatTime, formatDate } from "@/lib/format";
import {
  getSessionBySlug,
  getAllSessionSlugs,
} from "@/server/services/program";

export const revalidate = 300;
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getAllSessionSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const s = await getSessionBySlug(slug);
  if (!s) return {};
  return {
    title: pick(locale as Locale, s.titleRu, s.titleEn),
    description: pick(locale as Locale, s.descriptionRu, s.descriptionEn),
    alternates: buildAlternates(locale, `/program/${slug}`),
  };
}

export default async function SessionPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations({ locale: locale as Locale, namespace: "ProgramPage" });

  const s = await getSessionBySlug(slug);
  if (!s) notFound();

  const lc = locale as Locale;
  const title = pick(lc, s.titleRu, s.titleEn);
  const description = pick(lc, s.descriptionRu, s.descriptionEn);
  const hall = pick(lc, s.hallRu, s.hallEn);

  return (
    <>
      <div className="bg-neva-gradient-soft">
        <div className="container-neva max-w-3xl py-12">
          <Button asChild variant="ghost" size="sm" className="-ml-2 mb-6">
            <Link href="/program">
              <ArrowLeft className="size-4" />
              {t("title")}
            </Link>
          </Button>
          <Badge variant="default">{t(`type.${s.type}`)}</Badge>
          <h1 className="mt-3 text-balance text-3xl font-extrabold text-brand-black sm:text-4xl">
            {title}
          </h1>
          <div className="mt-4 flex flex-wrap gap-4 text-sm font-medium text-brand-black/70">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="size-4 text-brand-red" />
              {formatDate(s.startTime, lc)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-4 text-brand-red" />
              {formatTime(s.startTime, lc)} – {formatTime(s.endTime, lc)}
            </span>
            {hall && (
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-4 text-brand-red" />
                {hall}
              </span>
            )}
          </div>
        </div>
      </div>

      <GradientSection variant="plain">
        <div className="mx-auto max-w-3xl">
          {description && (
            <p className="text-pretty text-lg leading-relaxed text-foreground/90">
              {description}
            </p>
          )}

          {s.speakers.length > 0 && (
            <div className="mt-10">
              <h2 className="text-xl font-bold">{t("speakers")}</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {s.speakers.map((sp) => (
                  <div key={sp.id} className="flex items-center gap-4 rounded-2xl border bg-card p-4">
                    <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-neva-gradient text-lg font-extrabold text-brand-black">
                      {pick(lc, sp.nameRu, sp.nameEn).charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold">{pick(lc, sp.nameRu, sp.nameEn)}</div>
                      <div className="text-sm text-muted-foreground">
                        {pick(lc, sp.positionRu, sp.positionEn)}
                        {sp.company ? `, ${sp.company}` : ""}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {s.tags.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {s.tags.map((tag) => (
                <Badge key={tag} variant="muted">
                  #{tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </GradientSection>
    </>
  );
}
