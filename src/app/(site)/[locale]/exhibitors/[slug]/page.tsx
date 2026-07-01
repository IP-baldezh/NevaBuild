import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft, Globe, MapPin, Mail, Phone } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { buildAlternates } from "@/lib/seo";
import { Link } from "@/i18n/navigation";
import { pick } from "@/lib/content";
import { getExhibitorBySlug, getAllExhibitorSlugs } from "@/server/services/exhibitors";
import { DarkBackground } from "@/components/layout/DarkBackground";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Reveal } from "@/components/ui/reveal";

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

  const contacts = [
    e.website && { Icon: Globe, href: e.website, label: e.website.replace(/^https?:\/\//, "") },
    e.email && { Icon: Mail, href: `mailto:${e.email}`, label: e.email },
    e.phone && { Icon: Phone, href: `tel:${e.phone}`, label: e.phone },
  ].filter(Boolean) as { Icon: typeof Globe; href: string; label: string }[];

  return (
    <div className="relative pb-24" style={{ background: "#07100a" }}>
      <DarkBackground sentinelId="exhibitor-slug-end" />

      {/* Header */}
      <div
        className="relative z-10"
        style={{ paddingTop: "clamp(100px, 16vh, 160px)", paddingBottom: "clamp(40px, 6vh, 72px)" }}
      >
        <div className="container-neva">
          <ScrollReveal>
            <Link
              href="/exhibitors"
              className="inline-flex items-center gap-2 text-sm font-semibold mb-8 transition-colors hover:text-[#a9ec46]"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              <ArrowLeft className="size-4" />
              {tc("backToCatalog")}
            </Link>

            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              <div
                className="flex size-24 items-center justify-center overflow-hidden rounded-2xl flex-shrink-0"
                style={{
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                {e.logoUrl ? (
                  <Image
                    src={e.logoUrl}
                    alt={e.name}
                    width={96}
                    height={96}
                    className="object-contain"
                  />
                ) : (
                  <span className="text-4xl font-black text-white/25">{e.name.charAt(0)}</span>
                )}
              </div>
              <div>
                <span
                  className="text-[10px] font-bold uppercase tracking-[0.14em] px-3 py-1 rounded-full"
                  style={{
                    background: STATUS_COLOR[e.status] ?? STATUS_COLOR.EXHIBITOR,
                    color: STATUS_TEXT[e.status] ?? STATUS_TEXT.EXHIBITOR,
                  }}
                >
                  {t(`status.${e.status}`)}
                </span>
                <h1
                  className="mt-3 font-black text-white leading-[1.04]"
                  style={{ fontSize: "clamp(26px, 4vw, 54px)", letterSpacing: "-0.01em" }}
                >
                  {e.name}
                </h1>
                <div
                  className="mt-2 flex flex-wrap gap-4 text-sm"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                >
                  {(city || country) && (
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="size-3.5" style={{ color: "#12B669" }} />
                      {[city, country].filter(Boolean).join(", ")}
                    </span>
                  )}
                  {e.boothNumber && (
                    <span className="font-bold" style={{ color: "rgba(255,255,255,0.6)" }}>
                      {t("booth")} {e.boothNumber}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Content */}
      <div
        className="relative z-10 py-12 border-t"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="container-neva">
          <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
            <Reveal>
              <div>
                {description && (
                  <p
                    className="leading-relaxed"
                    style={{
                      fontSize: "clamp(15px, 1.2vw, 18px)",
                      color: "rgba(255,255,255,0.7)",
                      fontFamily: "var(--font-mulish)",
                    }}
                  >
                    {description}
                  </p>
                )}
                {e.categories.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {e.categories.map(({ category }) => (
                      <span
                        key={category.id}
                        className="text-[11px] font-bold uppercase tracking-[0.14em] px-3 py-1.5 rounded-full"
                        style={{ background: "rgba(18,182,105,0.1)", color: "#12B669" }}
                      >
                        {pick(lc, category.titleRu, category.titleEn)}
                      </span>
                    ))}
                  </div>
                )}
                {e.gallery.length > 0 && (
                  <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {e.gallery.map((url, i) => (
                      <div
                        key={i}
                        className="relative aspect-square overflow-hidden rounded-2xl"
                        style={{ background: "rgba(255,255,255,0.05)" }}
                      >
                        <Image src={url} alt={`${e.name} ${i + 1}`} fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Reveal>

            {contacts.length > 0 && (
              <Reveal delay={0.12}>
                <aside
                  className="h-fit rounded-3xl p-6 space-y-4"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  {contacts.map(({ Icon, href, label }) => (
                    <a
                      key={href}
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-3 text-sm font-semibold transition-colors hover:text-[#a9ec46]"
                      style={{ color: "rgba(255,255,255,0.6)" }}
                    >
                      <Icon className="size-4 flex-shrink-0" style={{ color: "#12B669" }} />
                      <span className="truncate">{label}</span>
                    </a>
                  ))}
                </aside>
              </Reveal>
            )}
          </div>
        </div>
      </div>

      <div id="exhibitor-slug-end" aria-hidden />
    </div>
  );
}
