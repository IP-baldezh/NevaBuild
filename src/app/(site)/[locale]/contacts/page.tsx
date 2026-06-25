import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Globe } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { buildAlternates } from "@/lib/seo";
import { GradientSection } from "@/components/ui/gradient-section";
import { SectionTitle } from "@/components/ui/section-title";
import { PageHero } from "@/components/layout/PageHero";
import { ContactsSection } from "@/components/home/ContactsSection";
import { ContactForm } from "@/components/forms/ContactForm";
import { getEventSettings, localizeEvent } from "@/server/services/event";

export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "ContactsPage" });
  return {
    title: t("title"),
    description: t("lead"),
    alternates: buildAlternates(locale, "/contacts"),
  };
}

export default async function ContactsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations({ locale: locale as Locale, namespace: "ContactsPage" });
  const tcontacts = await getTranslations({ locale: locale as Locale, namespace: "Contacts" });

  const settings = await getEventSettings();
  const ev = localizeEvent(settings, locale as Locale);

  return (
    <>
      <PageHero title={t("title")} lead={t("lead")} />

      <GradientSection variant="plain">
        <ContactsSection
          venue={ev.venue}
          city={ev.city}
          address={ev.address}
          phone={ev.phone}
          email={ev.email}
        />
      </GradientSection>

      <GradientSection variant="muted">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionTitle title={tcontacts("writeUs")} className="mb-6" />
            <div className="rounded-3xl border bg-card p-6 sm:p-8">
              <ContactForm />
            </div>
          </div>

          <div>
            <SectionTitle title={t("requisitesTitle")} className="mb-6" />
            <div className="space-y-4 rounded-3xl border bg-card p-6 sm:p-8">
              <p className="text-lg font-bold">{ev.organizer}</p>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between gap-4 border-b py-2">
                  <dt className="text-muted-foreground">{tcontacts("phone")}</dt>
                  <dd className="font-medium">{ev.phone}</dd>
                </div>
                <div className="flex justify-between gap-4 border-b py-2">
                  <dt className="text-muted-foreground">{tcontacts("email")}</dt>
                  <dd className="font-medium">{ev.email}</dd>
                </div>
                <div className="flex justify-between gap-4 py-2">
                  <dt className="text-muted-foreground">{tcontacts("address")}</dt>
                  <dd className="text-right font-medium">{ev.address}</dd>
                </div>
              </dl>

              <div>
                <p className="mb-2 text-sm font-semibold text-muted-foreground">{t("domains")}</p>
                <ul className="space-y-1.5">
                  {ev.domains.map((d) => (
                    <li key={d}>
                      <a
                        href={`https://${d}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-brand-red hover:underline"
                      >
                        <Globe className="size-4" />
                        {d}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </GradientSection>
    </>
  );
}
