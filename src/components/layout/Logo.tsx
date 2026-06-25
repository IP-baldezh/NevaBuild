"use client";

import { useLocale } from "next-intl";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  white?: boolean;
};

export function Logo({ className, white }: LogoProps) {
  const locale = useLocale();
  const isEn = locale === "en";

  return (
    // eslint-disable-next-line @next/next/no-img-element -- SVG логотип не нуждается в оптимизации next/image
    <img
      src={isEn ? "/logo-en.svg" : "/logo-ru.svg"}
      alt={isEn ? "NEVA BUILD" : "НЕВА БИЛД"}
      className={cn("h-10 w-auto select-none transition-[filter] duration-300", className)}
      style={white ? { filter: "brightness(0) invert(1)" } : undefined}
      height={40}
      draggable={false}
    />
  );
}
