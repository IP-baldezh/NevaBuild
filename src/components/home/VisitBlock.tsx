import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export function VisitBlock() {
  const t = useTranslations("VisitBlock");
  const tc = useTranslations("Common");

  return (
    <div className="relative h-full overflow-hidden rounded-3xl bg-neva-gradient p-8 text-brand-black sm:p-10">
      <div
        aria-hidden
        className="absolute -bottom-16 -right-10 size-60 rounded-[40%] bg-brand-red/80 blur-2xl"
      />
      <div className="relative">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-black backdrop-blur">
          {t("label")}
        </span>
        <h3 className="mt-4 text-2xl font-extrabold leading-tight sm:text-3xl">{t("title")}</h3>
        <p className="mt-3 max-w-md text-brand-black/75">{t("text")}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/tickets">{tc("getTicket")}</Link>
          </Button>
          <Button asChild size="lg" variant="dark">
            <Link href="/program">{t("ctaProgram")}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
