import Image from "next/image";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { pick } from "@/lib/content";
import { formatDate } from "@/lib/format";
import type { Locale } from "@/i18n/routing";
import type { News } from "@prisma/client";

export function NewsCard({ item }: { item: News }) {
  const locale = useLocale() as Locale;
  const title = pick(locale, item.titleRu, item.titleEn);
  const excerpt = pick(locale, item.excerptRu, item.excerptEn);
  const category = pick(locale, item.categoryRu, item.categoryEn);

  return (
    <Link
      href={`/news/${item.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border bg-card transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-neva-gradient-soft">
        {item.coverImageUrl ? (
          <Image
            src={item.coverImageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-4xl font-extrabold text-brand-black/15">NEVA BUILD</span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          {category && <Badge variant="muted">{category}</Badge>}
          {item.publishedAt && <time>{formatDate(item.publishedAt, locale)}</time>}
        </div>
        <h3 className="mt-3 text-lg font-bold leading-tight transition-colors group-hover:text-brand-red">
          {title}
        </h3>
        {excerpt && <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{excerpt}</p>}
      </div>
    </Link>
  );
}
