"use client";

import Image from "next/image";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "lucide-react";
import { pick } from "@/lib/content";
import { formatDate } from "@/lib/format";
import type { Locale } from "@/i18n/routing";
import type { News } from "@prisma/client";

const FALLBACK_COVERS = [
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&fit=crop",
  "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=800&fit=crop",
  "https://images.unsplash.com/photo-1590644365607-7eff9b2ce5b1?q=80&w=800&fit=crop",
  "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&fit=crop",
  "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?q=80&w=800&fit=crop",
];

let _fbIdx = 0;
const fallbackMap = new Map<string, string>();
function getFallback(id: string) {
  if (!fallbackMap.has(id)) {
    fallbackMap.set(id, FALLBACK_COVERS[_fbIdx % FALLBACK_COVERS.length]);
    _fbIdx++;
  }
  return fallbackMap.get(id)!;
}

export function NewsCardDark({ item }: { item: News }) {
  const locale = useLocale() as Locale;
  const title = pick(locale, item.titleRu, item.titleEn);
  const excerpt = pick(locale, item.excerptRu, item.excerptEn);
  const category = pick(locale, item.categoryRu, item.categoryEn);
  const coverSrc = item.coverImageUrl || getFallback(item.id);

  return (
    <Link
      href={`/news/${item.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl transition-all hover:-translate-y-1"
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      <div
        className="relative aspect-[16/10] overflow-hidden"
        style={{ background: "rgba(169,236,70,0.06)" }}
      >
        <Image
          src={coverSrc}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Lime top-bar on hover */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: "#a9ec46" }}
          aria-hidden
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            {category && (
              <span
                className="text-[10px] font-bold uppercase tracking-[0.16em] px-2.5 py-1 rounded-full"
                style={{ background: "rgba(169,236,70,0.1)", color: "#a9ec46" }}
              >
                {category}
              </span>
            )}
            {item.publishedAt && (
              <time
                className="text-[11px]"
                style={{ color: "rgba(255,255,255,0.65)", fontFamily: "var(--font-mulish)" }}
              >
                {formatDate(item.publishedAt, locale)}
              </time>
            )}
          </div>
          <ArrowUpRight
            className="size-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0"
            style={{ color: "#a9ec46" }}
          />
        </div>

        <h3
          className="font-black text-white leading-tight transition-colors duration-200 group-hover:text-[#a9ec46]"
          style={{ fontSize: "clamp(15px, 1.4vw, 19px)" }}
        >
          {title}
        </h3>
        {excerpt && (
          <p
            className="mt-2 line-clamp-2 text-sm leading-relaxed"
            style={{ color: "rgba(255,255,255,0.75)", fontFamily: "var(--font-mulish)" }}
          >
            {excerpt}
          </p>
        )}
      </div>
    </Link>
  );
}
