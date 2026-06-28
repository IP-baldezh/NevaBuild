import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { buildAlternates } from "@/lib/seo";
import { ProgramView } from "@/components/program/ProgramView";
import { getProgramDays } from "@/server/services/program";
import { DarkBackground } from "@/components/layout/DarkBackground";
import { DarkPageHero } from "@/components/layout/DarkPageHero";
import { Reveal } from "@/components/ui/reveal";

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

  return (
    <div className="relative" style={{ background: "#07100a" }}>
      <DarkBackground sentinelId="program-end" />

      <DarkPageHero
        eyebrow={locale === "ru" ? "Программа" : "Programme"}
        title={t("title")}
        lead={t("lead")}
      />

      <section
        className="relative z-10 py-16 border-t"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="container-neva">
          <Reveal>
            <ProgramView days={days} />
          </Reveal>
        </div>
      </section>

      <div id="program-end" aria-hidden />
    </div>
  );
}
