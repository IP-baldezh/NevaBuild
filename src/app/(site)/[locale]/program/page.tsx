import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { buildAlternates } from "@/lib/seo";
import { Link } from "@/i18n/navigation";
import { ProgramView } from "@/components/program/ProgramView";
import { ProgramSponsors } from "@/components/program/ProgramSponsors";
import { getProgramDays } from "@/server/services/program";
import { DarkBackground } from "@/components/layout/DarkBackground";
import { DarkPageHero } from "@/components/layout/DarkPageHero";

export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "ProgramPage" });
  return {
    title: t("title"),
    description: t("lead"),
    alternates: buildAlternates(locale, "/program"),
  };
}

export default async function ProgramPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations({ locale: locale as Locale, namespace: "ProgramPage" });
  const days = await getProgramDays();
  const ru = locale === "ru";

  return (
    <div className="relative" style={{ background: "#07100a" }}>
      <DarkBackground sentinelId="program-end" />

      <DarkPageHero eyebrow={ru ? "Программа" : "Programme"} title={t("title")} lead={t("lead")} />

      <section
        className="relative z-10 py-10 sm:py-16 border-t"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="container-neva space-y-10">
          <ProgramSponsors ru={ru} />
          <ProgramView days={days} />
        </div>
      </section>

      {/* CTA */}
      <section
        className="relative z-10 py-14 sm:py-20 border-t"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="container-neva text-center max-w-2xl mx-auto">
          <span
            className="text-[11px] uppercase tracking-[0.28em] mb-4 block font-bold"
            style={{ color: "#a9ec46", fontFamily: "var(--font-mulish)" }}
          >
            {ru ? "Хотите участвовать?" : "Want to participate?"}
          </span>
          <h2
            className="font-black text-white leading-[1.02] mb-4"
            style={{ fontSize: "clamp(24px, 4vw, 52px)" }}
          >
            {ru ? "Станьте частью" : "Become part of"}{" "}
            <span style={{ color: "#a9ec46" }}>NEVA BUILD</span>
          </h2>
          <p
            className="mb-10 leading-relaxed"
            style={{
              color: "rgba(255,255,255,0.75)",
              fontFamily: "var(--font-mulish)",
              fontSize: "clamp(14px, 1.2vw, 17px)",
            }}
          >
            {ru
              ? "Получите билет посетителя или оформите участие в качестве экспонента — выберите удобный формат."
              : "Get a visitor ticket or register as an exhibitor — choose the format that works for you."}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/tickets"
              className="inline-flex items-center rounded-xl font-black text-[12px] tracking-[0.18em] uppercase px-8 py-4 transition-all duration-200 hover:brightness-110"
              style={{ background: "#a9ec46", color: "#0d2d06" }}
            >
              {ru ? "Получить билет" : "Get a Ticket"}
            </Link>
            <Link
              href="/exhibit"
              className="inline-flex items-center rounded-xl font-black text-[12px] tracking-[0.14em] uppercase px-8 py-4 border transition-all duration-200 hover:bg-white/10"
              style={{ borderColor: "rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.90)" }}
            >
              {ru ? "Стать экспонентом" : "Become Exhibitor"}
            </Link>
          </div>
        </div>
      </section>

      <div id="program-end" aria-hidden />
    </div>
  );
}
