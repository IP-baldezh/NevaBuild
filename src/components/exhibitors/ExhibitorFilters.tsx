"use client";

import { useCallback, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CustomSelect } from "@/components/ui/custom-select";
import { pick } from "@/lib/content";
import type { Locale } from "@/i18n/routing";
import type { ExhibitorCategory } from "@prisma/client";

const STATUSES = ["EXHIBITOR", "PARTNER", "SPONSOR", "AMBASSADOR"] as const;

export function ExhibitorFilters({
  categories,
  countries,
}: {
  categories: ExhibitorCategory[];
  countries: string[];
}) {
  const t = useTranslations("ExhibitorsPage");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [, startTransition] = useTransition();

  const update = useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams(params.toString());
      if (value) next.set(key, value);
      else next.delete(key);
      startTransition(() => {
        router.replace(`${pathname}?${next.toString()}`, { scroll: false });
      });
    },
    [params, pathname, router],
  );

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <div className="relative sm:col-span-2 lg:col-span-1">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          defaultValue={params.get("q") ?? ""}
          onChange={(e) => update("q", e.target.value)}
          placeholder={t("search")}
          className="pl-10"
          aria-label={t("search")}
        />
      </div>

      <CustomSelect
        value={params.get("category") ?? ""}
        onChange={(v) => update("category", v)}
        options={[
          { value: "", label: t("allCategories") },
          ...categories.map((c) => ({
            value: c.slug,
            label: pick(locale, c.titleRu, c.titleEn),
          })),
        ]}
      />

      <CustomSelect
        value={params.get("country") ?? ""}
        onChange={(v) => update("country", v)}
        options={[
          { value: "", label: t("allCountries") },
          ...countries.map((c) => ({ value: c, label: c })),
        ]}
      />

      <CustomSelect
        value={params.get("status") ?? ""}
        onChange={(v) => update("status", v)}
        options={[
          { value: "", label: t("allStatuses") },
          ...STATUSES.map((s) => ({ value: s, label: t(`status.${s}`) })),
        ]}
      />
    </div>
  );
}
