"use client";

import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  tone?: "light" | "dark";
};

export function LanguageSwitcher({ className }: Props) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  function switchTo(next: string) {
    if (next === locale) return;
    startTransition(() => {
      // @ts-expect-error — pathname здесь динамический
      router.replace({ pathname, params }, { locale: next });
    });
  }

  return (
    <div
      className={cn(
        "inline-flex items-center border border-border text-xs font-semibold",
        isPending && "opacity-60",
        className,
      )}
      role="group"
      aria-label="Language switcher"
    >
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => switchTo(loc)}
          aria-current={loc === locale}
          className={cn(
            "h-8 px-3 uppercase transition-colors",
            loc === locale
              ? "bg-foreground text-background"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {loc}
        </button>
      ))}
    </div>
  );
}
