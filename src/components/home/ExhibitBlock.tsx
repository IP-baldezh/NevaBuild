import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

const POINTS = ["audience", "leads", "brand", "media"] as const;

export function ExhibitBlock() {
  const t = useTranslations("ExhibitBlock");
  const tc = useTranslations("Common");

  return (
    <div className="relative h-full overflow-hidden rounded-3xl bg-neva-dark p-8 text-white sm:p-10">
      <div
        aria-hidden
        className="absolute -right-16 -top-16 size-64 rounded-[35%] bg-brand-red/50 blur-3xl"
      />
      <div className="relative">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
          {t("label")}
        </span>
        <h3 className="mt-4 text-2xl font-extrabold leading-tight sm:text-3xl">{t("title")}</h3>
        <p className="mt-3 max-w-md text-white/70">{t("text")}</p>
        <ul className="mt-6 space-y-3">
          {POINTS.map((p) => (
            <li key={p} className="flex items-start gap-3 text-sm">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
              <span className="text-white/85">{t(`points.${p}`)}</span>
            </li>
          ))}
        </ul>
        <Button asChild variant="accent" size="lg" className="mt-8">
          <Link href="/exhibit">{tc("bookStand")}</Link>
        </Button>
      </div>
    </div>
  );
}
