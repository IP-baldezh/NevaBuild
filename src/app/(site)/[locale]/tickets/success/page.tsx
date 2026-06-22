import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CheckCircle2, Clock } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { GradientSection } from "@/components/ui/gradient-section";
import { getOrderByNumber } from "@/server/services/orders";
import { generateQrDataUrl } from "@/lib/qr";

export const dynamic = "force-dynamic";

export default async function TicketSuccessPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale } = await params;
  const sp = await searchParams;
  setRequestLocale(locale as Locale);
  const t = await getTranslations({ locale: locale as Locale, namespace: "TicketsPage" });
  const tc = await getTranslations({ locale: locale as Locale, namespace: "Common" });

  const orderNumber = typeof sp.order === "string" ? sp.order : undefined;
  const order = orderNumber ? await getOrderByNumber(orderNumber) : null;
  const paid = order?.status === "PAID" && order.ticket;
  const qr = paid ? await generateQrDataUrl(order!.ticket!.ticketCode) : null;

  return (
    <GradientSection variant="plain" className="min-h-[70vh]">
      <div className="mx-auto max-w-lg text-center">
        {paid ? (
          <>
            <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-accent text-accent-foreground">
              <CheckCircle2 className="size-8" />
            </span>
            <h1 className="mt-6 text-3xl font-extrabold">{t("successTitle")}</h1>
            <p className="mt-3 text-muted-foreground">{t("successText")}</p>

            {qr && (
              <div className="mt-8 inline-flex flex-col items-center rounded-3xl border bg-card p-6">
                <Image src={qr} alt="QR" width={220} height={220} />
                <span className="mt-3 font-mono text-sm font-semibold">
                  {order!.ticket!.ticketCode}
                </span>
              </div>
            )}
          </>
        ) : (
          <>
            <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-secondary text-brand-red">
              <Clock className="size-8" />
            </span>
            <h1 className="mt-6 text-3xl font-extrabold">{t("successTitle")}</h1>
            <p className="mt-3 text-muted-foreground">{t("successText")}</p>
          </>
        )}

        <Button asChild className="mt-8">
          <Link href="/">{tc("back")}</Link>
        </Button>
      </div>
    </GradientSection>
  );
}
