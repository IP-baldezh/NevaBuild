import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft, Clock, MapPin, CalendarDays } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { buildAlternates } from "@/lib/seo";
import { Link } from "@/i18n/navigation";
import { pick } from "@/lib/content";
import { formatTime, formatDate } from "@/lib/format";
import { getSessionBySlug, getAllSessionSlugs } from "@/server/services/program";
import { DarkBackground } from "@/components/layout/DarkBackground";
import { ScrollReveal, StaggerReveal, StaggerItem } from "@/components/ui/scroll-reveal";
import { Reveal } from "@/components/ui/reveal";

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

const TYPE_COLOR: Record<string, string> = {
  LECTURE: "rgba(18,182,105,0.12)",
  DISCUSSION: "rgba(169,236,70,0.1)",
  WORKSHOP: "rgba(225,27,34,0.12)",
  PRESENTATION: "rgba(255,255,255,0.08)",
  NETWORKING: "rgba(255,200,0,0.1)",
};
const TYPE_TEXT: Record<string, string> = {
  LECTURE: "#12B669",
  DISCUSSION: "#a9ec46",
  WORKSHOP: "#E11B22",
  PRESENTATION: "rgba(255,255,255,0.5)",
  NETWORKING: "#f5c842",
};

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

  const metaItems = [
    { Icon: CalendarDays, value: formatDate(s.startTime, lc) },
    { Icon: Clock, value: `${formatTime(s.startTime, lc)} – ${formatTime(s.endTime, lc)}` },
    ...(hall ? [{ Icon: MapPin, value: hall }] : []),
  ];

  return (
    <div className="relative pb-24" style={{ background: "#07100a" }}>
      <DarkBackground sentinelId="session-slug-end" />

      {/* Header */}
      <div
        className="relative z-10"
        style={{ paddingTop: "clamp(100px, 16vh, 160px)", paddingBottom: "clamp(40px, 6vh, 72px)" }}
      >
        <div className="container-neva max-w-3xl">
          <ScrollReveal>
            <Link
              href="/program"
              className="inline-flex items-center gap-2 text-sm font-semibold mb-8 transition-colors hover:text-[#a9ec46]"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              <ArrowLeft className="size-4" />
              {t("title")}
            </Link>

            <span
              className="text-[10px] font-bold uppercase tracking-[0.14em] px-3 py-1 rounded-full"
              style={{
                background: TYPE_COLOR[s.type] ?? TYPE_COLOR.PRESENTATION,
                color: TYPE_TEXT[s.type] ?? TYPE_TEXT.PRESENTATION,
              }}
            >
              {t(`type.${s.type}`)}
            </span>

            <h1
              className="mt-4 font-black text-white leading-[1.06]"
              style={{ fontSize: "clamp(22px, 3.5vw, 48px)", letterSpacing: "-0.01em" }}
            >
              {title}
            </h1>

            <div className="mt-4 flex flex-wrap gap-5">
              {metaItems.map(({ Icon, value }) => (
                <span
                  key={value}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  <Icon className="size-4" style={{ color: "#12B669" }} />
                  {value}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Content */}
      <div
        className="relative z-10 py-12 border-t"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="container-neva max-w-3xl">
          {description && (
            <Reveal>
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
            </Reveal>
          )}

          {s.speakers.length > 0 && (
            <div className="mt-10">
              <ScrollReveal>
                <h2
                  className="font-black text-white mb-5"
                  style={{ fontSize: "clamp(18px, 2vw, 26px)" }}
                >
                  {t("speakers")}
                </h2>
              </ScrollReveal>
              <StaggerReveal className="grid gap-4 sm:grid-cols-2">
                {s.speakers.map((sp) => (
                  <StaggerItem key={sp.id}>
                    <div
                      className="flex items-center gap-4 rounded-2xl p-4"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      <div
                        className="flex size-14 shrink-0 items-center justify-center rounded-full text-lg font-black"
                        style={{ background: "rgba(18,182,105,0.15)", color: "#12B669" }}
                      >
                        {pick(lc, sp.nameRu, sp.nameEn).charAt(0)}
                      </div>
                      <div>
                        <div className="font-black text-white">
                          {pick(lc, sp.nameRu, sp.nameEn)}
                        </div>
                        <div
                          className="text-sm mt-0.5"
                          style={{
                            color: "rgba(255,255,255,0.45)",
                            fontFamily: "var(--font-mulish)",
                          }}
                        >
                          {pick(lc, sp.positionRu, sp.positionEn)}
                          {sp.company ? `, ${sp.company}` : ""}
                        </div>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerReveal>
            </div>
          )}

          {s.tags.length > 0 && (
            <Reveal delay={0.1}>
              <div className="mt-8 flex flex-wrap gap-2">
                {s.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-bold px-3 py-1.5 rounded-full"
                    style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.4)" }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </Reveal>
          )}

          <div className="mt-12 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            <Link
              href="/program"
              className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:text-[#a9ec46]"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              <ArrowLeft className="size-4" />
              {t("title")}
            </Link>
          </div>
        </div>
      </div>

      <div id="session-slug-end" aria-hidden />
    </div>
  );
}
