"use client";

import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  transparent?: boolean;
};

export function LanguageSwitcher({ className, transparent }: Props) {
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
        "flex items-center rounded-full p-[3px] transition-colors duration-300",
        transparent ? "bg-white/15" : "bg-nb-bg-light",
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
            "font-bold text-[12.5px] px-3 py-1.5 rounded-full uppercase transition-all duration-200 cursor-pointer",
            loc === locale
              ? "bg-white text-nb-dark shadow-sm"
              : transparent
                ? "text-white/70 hover:text-white"
                : "text-nb-muted-dark hover:text-nb-dark",
          )}
        >
          {loc}
        </button>
      ))}
    </div>
  );
}
