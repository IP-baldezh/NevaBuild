import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { buildAlternates } from "@/lib/seo";
import { TicketCheckout } from "@/components/tickets/TicketCheckout";
import { getActiveTicketProducts } from "@/server/services/tickets";
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
  const t = await getTranslations({ locale: locale as Locale, namespace: "TicketsPage" });
  return {
    title: t("title"),
    description: t("lead"),
    alternates: buildAlternates(locale, "/tickets"),
  };
}

export default async function TicketsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations({ locale: locale as Locale, namespace: "TicketsPage" });
  const products = await getActiveTicketProducts();

  return (
    <div className="relative" style={{ background: "#07100a" }}>
      <DarkBackground sentinelId="tickets-end" />

      <DarkPageHero
        eyebrow={locale === "ru" ? "Билеты" : "Tickets"}
        title={t("title")}
        lead={t("lead")}
      />

      <section
        className="relative z-10 py-16 border-t"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="container-neva">
          <Reveal>
            <TicketCheckout products={products} />
          </Reveal>
        </div>
      </section>

      <div id="tickets-end" aria-hidden />
    </div>
  );
}
