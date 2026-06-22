import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const t = useTranslations("NotFound");
  return (
    <section className="container-neva flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <span className="bg-neva-gradient bg-clip-text text-7xl font-extrabold text-transparent">
        404
      </span>
      <h1 className="mt-4 text-2xl font-bold">{t("title")}</h1>
      <p className="mt-2 max-w-md text-muted-foreground">{t("text")}</p>
      <Button asChild className="mt-8">
        <Link href="/">{t("home")}</Link>
      </Button>
    </section>
  );
}
