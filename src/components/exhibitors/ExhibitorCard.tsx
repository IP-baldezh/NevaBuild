import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { MapPin, ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { pick } from "@/lib/content";
import type { Locale } from "@/i18n/routing";
import type { ExhibitorWithCategories } from "@/server/services/exhibitors";

const STATUS_VARIANT = {
  EXHIBITOR: "secondary",
  PARTNER: "accent",
  SPONSOR: "default",
  AMBASSADOR: "outline",
} as const;

export function ExhibitorCard({ exhibitor }: { exhibitor: ExhibitorWithCategories }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("ExhibitorsPage");
  const country = pick(locale, exhibitor.countryRu, exhibitor.countryEn);
  const city = pick(locale, exhibitor.cityRu, exhibitor.cityEn);
  const category = exhibitor.categories[0]?.category;

  return (
    <Link
      href={`/exhibitors/${exhibitor.slug}`}
      className="group relative flex flex-col rounded-2xl border bg-card p-5 transition-all hover:-translate-y-1 hover:border-brand-mint hover:shadow-lg"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex size-14 items-center justify-center overflow-hidden rounded-xl bg-muted">
          {exhibitor.logoUrl ? (
            <Image
              src={exhibitor.logoUrl}
              alt={exhibitor.name}
              width={56}
              height={56}
              className="object-contain"
            />
          ) : (
            <span className="text-xl font-extrabold text-muted-foreground">
              {exhibitor.name.charAt(0)}
            </span>
          )}
        </div>
        <Badge variant={STATUS_VARIANT[exhibitor.status]}>{t(`status.${exhibitor.status}`)}</Badge>
      </div>

      <h3 className="mt-4 text-lg font-bold leading-tight">{exhibitor.name}</h3>

      {category && (
        <p className="mt-1 text-sm text-muted-foreground">
          {pick(locale, category.titleRu, category.titleEn)}
        </p>
      )}

      <div className="mt-auto flex items-center justify-between pt-4 text-sm text-muted-foreground">
        {(city || country) && (
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-3.5 text-brand-red" />
            {[city, country].filter(Boolean).join(", ")}
          </span>
        )}
        {exhibitor.boothNumber && (
          <span className="font-semibold text-foreground">
            {t("booth")} {exhibitor.boothNumber}
          </span>
        )}
      </div>

      <ArrowUpRight className="absolute right-5 top-1/2 size-5 -translate-y-1/2 text-brand-mint opacity-0 transition-opacity group-hover:opacity-100" />
    </Link>
  );
}
