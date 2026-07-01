import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Boxes, Cpu, Truck, Handshake, Lightbulb, ChevronDown } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { buildAlternates } from "@/lib/seo";
import { Link } from "@/i18n/navigation";
import { getEventSettings, localizeEvent } from "@/server/services/event";
import { formatDateRange } from "@/lib/format";
import { DarkBackground } from "@/components/layout/DarkBackground";
import { DarkPageHero } from "@/components/layout/DarkPageHero";
import { ScrollReveal, StaggerReveal, StaggerItem } from "@/components/ui/scroll-reveal";
import { Reveal } from "@/components/ui/reveal";

export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "VisitPage" });
  return {
    title: t("title"),
    description: t("lead"),
    alternates: buildAlternates(locale, "/visit"),
  };
}

const WHO = [
  "architects",
  "designers",
  "developers",
  "builders",
  "buyers",
  "owners",
  "private",
] as const;
const FIND = [
  { key: "materials", Icon: Boxes },
  { key: "tech", Icon: Cpu },
  { key: "suppliers", Icon: Truck },
  { key: "partners", Icon: Handshake },
  { key: "ideas", Icon: Lightbulb },
] as const;
const FAQ = ["1", "2", "3", "4"] as const;

export default async function VisitPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations({ locale: locale as Locale, namespace: "VisitPage" });
  const ru = locale === "ru";

  const settings = await getEventSettings();
  const ev = localizeEvent(settings, locale as Locale);
  const dateRange = formatDateRange(ev.dateStart, ev.dateEnd, locale as Locale);

  return (
    <div className="relative" style={{ background: "#07100a" }}>
      <DarkBackground sentinelId="visit-end" />

      <DarkPageHero
        eyebrow={ru ? "Посетителям" : "For Visitors"}
        title={ru ? "Посетите" : "Visit"}
        titleDim={ru ? "NEVA BUILD." : "NEVA BUILD."}
        lead={t("lead")}
      >
        <Link
          href="/tickets"
          className="inline-flex items-center rounded-xl font-black text-[12px] tracking-[0.18em] uppercase px-8 py-4 transition-all duration-200 hover:brightness-110"
          style={{ background: "#a9ec46", color: "#0d2d06" }}
        >
          {ru ? "Получить билет" : "Get a Ticket"}
        </Link>
        <Link
          href="/program"
          className="inline-flex items-center rounded-xl font-black text-[12px] tracking-[0.14em] uppercase px-8 py-4 border transition-all duration-200 hover:bg-white/10"
          style={{ borderColor: "rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.75)" }}
        >
          {ru ? "Программа" : "Programme"}
        </Link>
      </DarkPageHero>

      {/* Why */}
      <section className="relative z-10 py-20">
        <div className="container-neva max-w-3xl text-center mx-auto">
          <ScrollReveal>
            <span
              className="text-[11px] uppercase tracking-[0.28em] mb-4 block font-bold"
              style={{ color: "#a9ec46", fontFamily: "var(--font-mulish)" }}
            >
              {ru ? "Почему стоит прийти" : "Why attend"}
            </span>
            <h2
              className="font-black text-white leading-[1.02] mb-6"
              style={{ fontSize: "clamp(24px, 4vw, 54px)" }}
            >
              {t("whyTitle")}
            </h2>
            <p
              className="text-white/55 leading-relaxed"
              style={{ fontSize: "clamp(14px, 1.2vw, 18px)", fontFamily: "var(--font-mulish)" }}
            >
              {t("whyText")}
            </p>
            <p
              className="mt-6 font-bold text-white/30 tracking-[0.14em]"
              style={{ fontSize: "12px", fontFamily: "var(--font-mulish)" }}
            >
              {dateRange} · {ev.city.toUpperCase()} · {ev.venue.toUpperCase()}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Who */}
      <section
        className="relative z-10 py-20 border-t"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="container-neva">
          <ScrollReveal>
            <span
              className="text-[11px] uppercase tracking-[0.28em] mb-4 block font-bold"
              style={{ color: "#a9ec46", fontFamily: "var(--font-mulish)" }}
            >
              {ru ? "Аудитория" : "Audience"}
            </span>
            <h2
              className="font-black text-white leading-[1.02] mb-10"
              style={{ fontSize: "clamp(24px, 4vw, 54px)" }}
            >
              {t("whoTitle")}
            </h2>
          </ScrollReveal>
          <StaggerReveal className="flex flex-wrap gap-3">
            {WHO.map((k) => (
              <StaggerItem key={k}>
                <span
                  className="text-sm font-semibold px-5 py-2.5 rounded-full border transition-colors"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    borderColor: "rgba(255,255,255,0.12)",
                    color: "rgba(255,255,255,0.75)",
                  }}
                >
                  {t(`who.${k}`)}
                </span>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* Find */}
      <section
        className="relative z-10 py-20 border-t"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="container-neva">
          <ScrollReveal>
            <span
              className="text-[11px] uppercase tracking-[0.28em] mb-4 block font-bold"
              style={{ color: "#a9ec46", fontFamily: "var(--font-mulish)" }}
            >
              {ru ? "На выставке" : "At the exhibition"}
            </span>
            <h2
              className="font-black text-white leading-[1.02] mb-10"
              style={{ fontSize: "clamp(24px, 4vw, 54px)" }}
            >
              {t("findTitle")}
            </h2>
          </ScrollReveal>
          <StaggerReveal className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {FIND.map(({ key, Icon }) => (
              <StaggerItem key={key}>
                <div
                  className="flex flex-col items-center gap-4 rounded-2xl p-6 text-center"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <div
                    className="size-12 rounded-xl flex items-center justify-center"
                    style={{
                      background: "rgba(169,236,70,0.08)",
                      border: "1px solid rgba(169,236,70,0.18)",
                    }}
                  >
                    <Icon className="size-6" style={{ color: "#a9ec46" }} />
                  </div>
                  <span className="text-sm font-bold text-white/80">{t(`find.${key}`)}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="relative z-10 py-20 border-t"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="container-neva max-w-3xl">
          <ScrollReveal>
            <span
              className="text-[11px] uppercase tracking-[0.28em] mb-4 block font-bold"
              style={{ color: "#a9ec46", fontFamily: "var(--font-mulish)" }}
            >
              FAQ
            </span>
            <h2
              className="font-black text-white leading-[1.02] mb-10"
              style={{ fontSize: "clamp(24px, 4vw, 54px)" }}
            >
              {t("faqTitle")}
            </h2>
          </ScrollReveal>
          <div className="space-y-3">
            {FAQ.map((n, i) => (
              <Reveal key={n} delay={i * 0.07}>
                <details
                  className="group rounded-2xl p-5"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <summary className="flex items-center justify-between gap-4 font-black text-white cursor-pointer marker:content-none list-none">
                    {t(`faq.q${n}`)}
                    <ChevronDown
                      className="size-5 flex-shrink-0 transition-transform duration-200 group-open:rotate-180"
                      style={{ color: "#a9ec46" }}
                    />
                  </summary>
                  <p
                    className="mt-3 leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-mulish)" }}
                  >
                    {t(`faq.a${n}`)}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div id="visit-end" aria-hidden />
    </div>
  );
}
