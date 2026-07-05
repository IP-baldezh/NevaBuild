import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  Boxes,
  Cpu,
  Truck,
  Handshake,
  Lightbulb,
  Compass,
  Palette,
  Building2,
  Wrench,
  ShoppingBag,
  Home,
  User,
} from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { buildAlternates } from "@/lib/seo";
import { Link } from "@/i18n/navigation";
import { getEventSettings, localizeEvent } from "@/server/services/event";
import { formatDateRange } from "@/lib/format";
import { DarkBackground } from "@/components/layout/DarkBackground";
import { DarkPageHero } from "@/components/layout/DarkPageHero";
import { ScrollReveal, StaggerReveal, StaggerItem } from "@/components/ui/scroll-reveal";
import { VisitFaqAccordion } from "@/components/visit/VisitFaqAccordion";

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
  { key: "architects", Icon: Compass },
  { key: "designers", Icon: Palette },
  { key: "developers", Icon: Building2 },
  { key: "builders", Icon: Wrench },
  { key: "buyers", Icon: ShoppingBag },
  { key: "owners", Icon: Home },
  { key: "private", Icon: User },
] as const;

const WHO_DESCS: Record<"ru" | "en", Record<string, string>> = {
  ru: {
    architects: "Архитекторы, конструкторы и проектировщики жилых и коммерческих объектов",
    designers: "Дизайнеры интерьеров, декораторы и творческие специалисты",
    developers: "Застройщики и девелоперы жилой и коммерческой недвижимости",
    builders: "Строительные и ремонтные компании, подрядчики и субподрядчики",
    buyers: "Специалисты закупочных служб и представители торговых сетей",
    owners: "Владельцы объектов, ищущие новых поставщиков и решения",
    private: "Частные лица, планирующие ремонт или строительство",
  },
  en: {
    architects: "Architects, structural engineers and project designers",
    designers: "Interior designers, decorators and creative professionals",
    developers: "Property developers in residential and commercial real estate",
    builders: "Construction and renovation companies, contractors and subcontractors",
    buyers: "Procurement specialists and retail chain representatives",
    owners: "Property owners seeking new suppliers and solutions",
    private: "Individuals planning renovation or new construction",
  },
};

const FIND = [
  { key: "materials", Icon: Boxes },
  { key: "tech", Icon: Cpu },
  { key: "suppliers", Icon: Truck },
  { key: "partners", Icon: Handshake },
  { key: "ideas", Icon: Lightbulb },
] as const;

const FIND_DESCS: Record<"ru" | "en", Record<string, string>> = {
  ru: {
    materials: "Строительные и отделочные материалы от 500+ производителей",
    tech: "Инновационные технологии, умные системы и BIM-решения",
    suppliers: "Прямые поставщики без посредников — договоры на выставке",
    partners: "Деловые партнёры и инвесторы для совместных проектов",
    ideas: "Актуальные тренды дизайна и архитектуры из первых уст",
  },
  en: {
    materials: "Construction and finishing materials from 500+ manufacturers",
    tech: "Innovative technologies, smart systems and BIM solutions",
    suppliers: "Direct suppliers, no middlemen — sign contracts on-site",
    partners: "Business partners and investors for joint projects",
    ideas: "Current design and architecture trends direct from the source",
  },
};

const FAQ = ["1", "2", "3", "4"] as const;

export default async function VisitPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations({ locale: locale as Locale, namespace: "VisitPage" });
  const ru = locale === "ru";
  const lang = ru ? "ru" : "en";

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
          style={{ borderColor: "rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.90)" }}
        >
          {ru ? "Программа" : "Programme"}
        </Link>
      </DarkPageHero>

      {/* Why */}
      <section className="relative z-10 py-10 sm:py-16">
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
              className="leading-relaxed"
              style={{
                color: "rgba(255,255,255,0.85)",
                fontSize: "clamp(14px, 1.2vw, 18px)",
                fontFamily: "var(--font-mulish)",
              }}
            >
              {t("whyText")}
            </p>
            <p
              className="mt-6 font-bold tracking-[0.14em]"
              style={{
                fontSize: "12px",
                fontFamily: "var(--font-mulish)",
                color: "rgba(255,255,255,0.60)",
              }}
            >
              {dateRange} · {ev.city.toUpperCase()} · {ev.venue.toUpperCase()}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Who */}
      <section
        className="relative z-10 py-10 sm:py-16 border-t"
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
          <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {WHO.map(({ key, Icon }) => (
              <StaggerItem key={key}>
                <div
                  className="flex flex-col gap-4 rounded-2xl p-5 h-full transition-colors duration-200"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <div
                    className="size-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: "rgba(169,236,70,0.08)",
                      border: "1px solid rgba(169,236,70,0.18)",
                    }}
                  >
                    <Icon className="size-5" style={{ color: "#a9ec46" }} />
                  </div>
                  <div>
                    <p className="font-black text-white text-[15px] leading-tight mb-1.5">
                      {t(`who.${key}`)}
                    </p>
                    <p
                      style={{
                        color: "rgba(255,255,255,0.70)",
                        fontFamily: "var(--font-mulish)",
                        fontSize: "13px",
                        lineHeight: "1.55",
                      }}
                    >
                      {WHO_DESCS[lang][key]}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* Find */}
      <section
        className="relative z-10 py-10 sm:py-16 border-t"
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
          <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {FIND.map(({ key, Icon }) => (
              <StaggerItem key={key}>
                <div
                  className="flex flex-col gap-4 rounded-2xl p-6 h-full"
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
                  <div>
                    <p className="font-black text-white text-[15px] leading-tight mb-1.5">
                      {t(`find.${key}`)}
                    </p>
                    <p
                      style={{
                        color: "rgba(255,255,255,0.70)",
                        fontFamily: "var(--font-mulish)",
                        fontSize: "13px",
                        lineHeight: "1.55",
                      }}
                    >
                      {FIND_DESCS[lang][key]}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="relative z-10 py-10 sm:py-16 border-t"
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
          <VisitFaqAccordion items={FAQ.map((n) => ({ q: t(`faq.q${n}`), a: t(`faq.a${n}`) }))} />
        </div>
      </section>

      <div id="visit-end" aria-hidden />
    </div>
  );
}
