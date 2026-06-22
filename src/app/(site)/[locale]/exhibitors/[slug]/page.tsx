import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft, Globe, MapPin, Mail, Phone } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { buildAlternates } from "@/lib/seo";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GradientSection } from "@/components/ui/gradient-section";
import { pick } from "@/lib/content";
import {
  getExhibitorBySlug,
  getAllExhibitorSlugs,
} from "@/server/services/exhibitors";

export const revalidate = 300;
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getAllExhibitorSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const e = await getExhibitorBySlug(slug);
  if (!e) return {};
  return {
    title: e.name,
    description: pick(locale as Locale, e.descriptionRu, e.descriptionEn),
    alternates: buildAlternates(locale, `/exhibitors/${slug}`),
  };
}

export default async function ExhibitorPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations({ locale: locale as Locale, namespace: "ExhibitorsPage" });
  const tc = await getTranslations({ locale: locale as Locale, namespace: "Common" });

  const e = await getExhibitorBySlug(slug);
  if (!e) notFound();

  const lc = locale as Locale;
  const description = pick(lc, e.descriptionRu, e.descriptionEn);
  const country = pick(lc, e.countryRu, e.countryEn);
  const city = pick(lc, e.cityRu, e.cityEn);

  return (
    <>
      <div className="bg-neva-gradient-soft">
        <div className="container-neva py-10">
          <Button asChild variant="ghost" size="sm" className="-ml-2">
            <Link href="/exhibitors">
              <ArrowLeft className="size-4" />
              {tc("backToCatalog")}
            </Link>
          </Button>
          <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="flex size-24 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-sm">
              {e.logoUrl ? (
                <Image src={e.logoUrl} alt={e.name} width={96} height={96} className="object-contain" />
              ) : (
                <span className="text-4xl font-extrabold text-muted-foreground">
                  {e.name.charAt(0)}
                </span>
              )}
            </div>
            <div>
              <Badge variant="default">{t(`status.${e.status}`)}</Badge>
              <h1 className="mt-2 text-3xl font-extrabold text-brand-black sm:text-4xl">
                {e.name}
              </h1>
              <div className="mt-2 flex flex-wrap gap-4 text-sm text-brand-black/70">
                {(city || country) && (
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="size-4 text-brand-red" />
                    {[city, country].filter(Boolean).join(", ")}
                  </span>
                )}
                {e.boothNumber && (
                  <span className="font-semibold">
                    {t("booth")} {e.boothNumber}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <GradientSection variant="plain">
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div>
            {description && (
              <p className="text-pretty text-lg leading-relaxed text-foreground/90">
                {description}
              </p>
            )}
            {e.categories.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {e.categories.map(({ category }) => (
                  <Badge key={category.id} variant="secondary">
                    {pick(lc, category.titleRu, category.titleEn)}
                  </Badge>
                ))}
              </div>
            )}
            {e.gallery.length > 0 && (
              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {e.gallery.map((url, i) => (
                  <div key={i} className="relative aspect-square overflow-hidden rounded-xl bg-muted">
                    <Image src={url} alt={`${e.name} ${i + 1}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          <aside className="h-fit space-y-3 rounded-2xl border bg-card p-6">
            {e.website && (
              <ContactLine icon={<Globe className="size-4" />} href={e.website}>
                {e.website.replace(/^https?:\/\//, "")}
              </ContactLine>
            )}
            {e.email && (
              <ContactLine icon={<Mail className="size-4" />} href={`mailto:${e.email}`}>
                {e.email}
              </ContactLine>
            )}
            {e.phone && (
              <ContactLine icon={<Phone className="size-4" />} href={`tel:${e.phone}`}>
                {e.phone}
              </ContactLine>
            )}
          </aside>
        </div>
      </GradientSection>
    </>
  );
}

function ContactLine({
  icon,
  href,
  children,
}: {
  icon: React.ReactNode;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 text-sm font-medium hover:text-brand-red"
    >
      <span className="text-brand-red">{icon}</span>
      <span className="truncate">{children}</span>
    </a>
  );
}
