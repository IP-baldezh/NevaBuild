import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { buildAlternates } from "@/lib/seo";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { pick } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { getNewsBySlug, getAllNewsSlugs } from "@/server/services/news";

export const revalidate = 120;
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getAllNewsSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const item = await getNewsBySlug(slug);
  if (!item) return {};
  const title = pick(locale as Locale, item.titleRu, item.titleEn);
  const description = pick(locale as Locale, item.excerptRu, item.excerptEn);
  return {
    title,
    description,
    alternates: buildAlternates(locale, `/news/${slug}`),
    openGraph: {
      title,
      description,
      type: "article",
      images: item.coverImageUrl ? [item.coverImageUrl] : undefined,
    },
  };
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations({ locale: locale as Locale, namespace: "Common" });

  const item = await getNewsBySlug(slug);
  if (!item) notFound();

  const lc = locale as Locale;
  const title = pick(lc, item.titleRu, item.titleEn);
  const category = pick(lc, item.categoryRu, item.categoryEn);
  const content = pick(lc, item.contentRu, item.contentEn);

  return (
    <article className="pb-20">
      <div className="bg-neva-gradient-soft">
        <div className="container-neva max-w-3xl py-12">
          <Button asChild variant="ghost" size="sm" className="mb-6 -ml-2">
            <Link href="/news">
              <ArrowLeft className="size-4" />
              {t("allNews")}
            </Link>
          </Button>
          <div className="flex items-center gap-3 text-sm">
            {category && <Badge variant="default">{category}</Badge>}
            {item.publishedAt && (
              <time className="text-brand-black/60">
                {formatDate(item.publishedAt, lc)}
              </time>
            )}
          </div>
          <h1 className="mt-4 text-balance text-3xl font-extrabold text-brand-black sm:text-4xl">
            {title}
          </h1>
        </div>
      </div>

      <div className="container-neva max-w-3xl">
        {item.coverImageUrl && (
          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl">
            <Image src={item.coverImageUrl} alt={title} fill className="object-cover" />
          </div>
        )}
        <div className="mt-8 whitespace-pre-line text-lg leading-relaxed text-foreground/90">
          {content}
        </div>
      </div>
    </article>
  );
}
