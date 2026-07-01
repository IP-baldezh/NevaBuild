"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { MapPin, ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { pick } from "@/lib/content";
import type { Locale } from "@/i18n/routing";
import type { ExhibitorWithCategories } from "@/server/services/exhibitors";

const STATUS_COLOR: Record<string, string> = {
  EXHIBITOR: "rgba(255,255,255,0.1)",
  PARTNER: "rgba(18,182,105,0.15)",
  SPONSOR: "rgba(225,27,34,0.15)",
  AMBASSADOR: "rgba(169,236,70,0.12)",
};
const STATUS_TEXT: Record<string, string> = {
  EXHIBITOR: "rgba(255,255,255,0.5)",
  PARTNER: "#12B669",
  SPONSOR: "#E11B22",
  AMBASSADOR: "#a9ec46",
};

export function ExhibitorCardDark({ exhibitor }: { exhibitor: ExhibitorWithCategories }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("ExhibitorsPage");
  const country = pick(locale, exhibitor.countryRu, exhibitor.countryEn);
  const city = pick(locale, exhibitor.cityRu, exhibitor.cityEn);
  const category = exhibitor.categories[0]?.category;

  return (
    <Link
      href={`/exhibitors/${exhibitor.slug}`}
      className="group relative flex flex-col rounded-2xl p-5 transition-all hover:-translate-y-1"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div
          className="flex size-14 items-center justify-center overflow-hidden rounded-xl"
          style={{ background: "rgba(255,255,255,0.07)" }}
        >
          {exhibitor.logoUrl ? (
            <Image
              src={exhibitor.logoUrl}
              alt={exhibitor.name}
              width={56}
              height={56}
              className="object-contain"
            />
          ) : (
            <span className="text-xl font-black text-white/30">{exhibitor.name.charAt(0)}</span>
          )}
        </div>
        <span
          className="text-[10px] font-bold uppercase tracking-[0.14em] px-2.5 py-1 rounded-full flex-shrink-0"
          style={{
            background: STATUS_COLOR[exhibitor.status] ?? STATUS_COLOR.EXHIBITOR,
            color: STATUS_TEXT[exhibitor.status] ?? STATUS_TEXT.EXHIBITOR,
          }}
        >
          {t(`status.${exhibitor.status}`)}
        </span>
      </div>

      <h3
        className="mt-4 font-black text-white leading-tight"
        style={{ fontSize: "clamp(14px, 1.2vw, 17px)" }}
      >
        {exhibitor.name}
      </h3>

      {category && (
        <p
          className="mt-1 text-sm"
          style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-mulish)" }}
        >
          {pick(locale, category.titleRu, category.titleEn)}
        </p>
      )}

      <div
        className="mt-auto flex items-center justify-between pt-4 text-sm"
        style={{ color: "rgba(255,255,255,0.35)" }}
      >
        {(city || country) && (
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-3.5" style={{ color: "#12B669" }} />
            {[city, country].filter(Boolean).join(", ")}
          </span>
        )}
        {exhibitor.boothNumber && (
          <span className="font-bold text-white/60">
            {t("booth")} {exhibitor.boothNumber}
          </span>
        )}
      </div>

      <ArrowUpRight
        className="absolute right-4 top-4 size-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{ color: "#a9ec46" }}
      />
    </Link>
  );
}
