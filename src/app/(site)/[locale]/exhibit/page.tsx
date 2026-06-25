import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  LayoutGrid,
  Sparkles,
  Handshake,
  Mic,
  Rocket,
  Target,
  TrendingUp,
  Megaphone,
  Network,
} from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { buildAlternates } from "@/lib/seo";
import { GradientSection } from "@/components/ui/gradient-section";
import { SectionTitle } from "@/components/ui/section-title";
import { PageHero } from "@/components/layout/PageHero";
import { LeadForm } from "@/components/forms/LeadForm";
import { getExhibitorCategories } from "@/server/services/exhibitors";

export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "ExhibitPage" });
  return {
    title: t("title"),
    description: t("lead"),
    alternates: buildAlternates(locale, "/exhibit"),
  };
}

const FORMATS = [
  { key: "standard", icon: LayoutGrid },
  { key: "custom", icon: Sparkles },
  { key: "partner", icon: Handshake },
  { key: "speaker", icon: Mic },
  { key: "special", icon: Rocket },
] as const;

const BENEFITS = [
  { key: "leads", icon: Target },
  { key: "networking", icon: Network },
  { key: "brand", icon: TrendingUp },
  { key: "media", icon: Megaphone },
] as const;

const STEPS = ["request", "consult", "format", "contract", "prepare"] as const;

export default async function ExhibitPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations({ locale: locale as Locale, namespace: "ExhibitPage" });
  const tb = await getTranslations({ locale: locale as Locale, namespace: "ExhibitBlock" });
  const categories = await getExhibitorCategories();

  return (
    <>
      <PageHero title={t("title")} lead={t("lead")} />

      <GradientSection variant="plain">
        <SectionTitle align="center" title={t("formatsTitle")} className="mb-10" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FORMATS.map(({ key, icon: Icon }) => (
            <div key={key} className="flex items-start gap-4 rounded-2xl border bg-card p-6">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-secondary text-brand-red">
                <Icon className="size-6" />
              </span>
              <span className="pt-1.5 font-semibold">{t(`formats.${key}`)}</span>
            </div>
          ))}
        </div>
      </GradientSection>

      <GradientSection variant="muted">
        <SectionTitle align="center" title={t("benefitsTitle")} className="mb-10" />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {BENEFITS.map(({ key, icon: Icon }) => (
            <div
              key={key}
              className="flex flex-col items-center gap-3 rounded-2xl border bg-card p-6 text-center"
            >
              <span className="flex size-12 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <Icon className="size-6" />
              </span>
              <span className="text-sm font-semibold">{tb(`points.${key}`)}</span>
            </div>
          ))}
        </div>
      </GradientSection>

      <GradientSection variant="plain">
        <SectionTitle align="center" title={t("stepsTitle")} className="mb-12" />
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((step, i) => (
            <li key={step} className="relative rounded-2xl border bg-card p-6">
              <span className="text-4xl font-extrabold text-neva-gradient">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-3 text-sm font-semibold">{t(`steps.${step}`)}</p>
            </li>
          ))}
        </ol>
      </GradientSection>

      <GradientSection variant="muted">
        <div className="mx-auto max-w-3xl">
          <SectionTitle align="center" title={t("formTitle")} className="mb-8" />
          <div className="rounded-3xl border bg-card p-6 sm:p-8">
            <LeadForm categories={categories} />
          </div>
        </div>
      </GradientSection>
    </>
  );
}
