import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Boxes, Cpu, Truck, Handshake, Lightbulb, Plus } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { buildAlternates } from "@/lib/seo";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { GradientSection } from "@/components/ui/gradient-section";
import { SectionTitle } from "@/components/ui/section-title";
import { PageHero } from "@/components/layout/PageHero";

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

const WHO = ["architects", "designers", "developers", "builders", "buyers", "owners", "private"] as const;
const FIND = [
  { key: "materials", icon: Boxes },
  { key: "tech", icon: Cpu },
  { key: "suppliers", icon: Truck },
  { key: "partners", icon: Handshake },
  { key: "ideas", icon: Lightbulb },
] as const;
const FAQ = ["1", "2", "3", "4"] as const;

export default async function VisitPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations({ locale: locale as Locale, namespace: "VisitPage" });
  const tc = await getTranslations({ locale: locale as Locale, namespace: "Common" });

  return (
    <>
      <PageHero title={t("title")} lead={t("lead")}>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg"><Link href="/tickets">{tc("buyTicket")}</Link></Button>
          <Button asChild size="lg" variant="dark"><Link href="/program">{tc("viewProgram")}</Link></Button>
        </div>
      </PageHero>

      <GradientSection variant="plain">
        <div className="mx-auto max-w-3xl text-center">
          <SectionTitle align="center" title={t("whyTitle")} description={t("whyText")} />
        </div>
      </GradientSection>

      <GradientSection variant="muted">
        <SectionTitle align="center" title={t("whoTitle")} className="mb-10" />
        <div className="flex flex-wrap justify-center gap-3">
          {WHO.map((k) => (
            <span key={k} className="rounded-full border bg-card px-5 py-2.5 text-sm font-semibold">
              {t(`who.${k}`)}
            </span>
          ))}
        </div>
      </GradientSection>

      <GradientSection variant="plain">
        <SectionTitle align="center" title={t("findTitle")} className="mb-10" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {FIND.map(({ key, icon: Icon }) => (
            <div key={key} className="flex flex-col items-center gap-3 rounded-2xl border bg-card p-6 text-center">
              <span className="flex size-12 items-center justify-center rounded-xl bg-secondary text-brand-red">
                <Icon className="size-6" />
              </span>
              <span className="text-sm font-semibold">{t(`find.${key}`)}</span>
            </div>
          ))}
        </div>
      </GradientSection>

      <GradientSection variant="muted">
        <div className="mx-auto max-w-3xl">
          <SectionTitle align="center" title={t("faqTitle")} className="mb-8" />
          <div className="space-y-3">
            {FAQ.map((n) => (
              <details key={n} className="group rounded-2xl border bg-card p-5 [&_summary]:cursor-pointer">
                <summary className="flex items-center justify-between gap-4 font-semibold marker:content-none">
                  {t(`faq.q${n}`)}
                  <Plus className="size-5 shrink-0 text-brand-red transition-transform group-open:rotate-45" />
                </summary>
                <p className="mt-3 text-muted-foreground">{t(`faq.a${n}`)}</p>
              </details>
            ))}
          </div>
        </div>
      </GradientSection>
    </>
  );
}
