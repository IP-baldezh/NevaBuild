"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { key: "about", href: "/about" },
  { key: "exhibit", href: "/exhibit" },
  { key: "visit", href: "/visit" },
  { key: "program", href: "/program" },
  { key: "exhibitors", href: "/exhibitors" },
  { key: "news", href: "/news" },
  { key: "contacts", href: "/contacts" },
] as const;

export function Header() {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled
          ? "border-b border-border bg-background/90 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <div className="container-neva flex h-16 items-center justify-between gap-6 md:h-20">
        <Link href="/" aria-label="NEVA BUILD — на главную">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-7 xl:flex" aria-label="Главное меню">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <Link
            href="/exhibit"
            className="inline-flex h-10 items-center justify-center gap-2 border border-border px-4 text-sm font-semibold uppercase tracking-wide text-foreground transition-colors hover:border-lime hover:text-lime"
          >
            {t("exhibit")}
          </Link>
          <Link
            href="/tickets"
            className="inline-flex h-10 items-center justify-center gap-2 bg-lime px-4 text-sm font-semibold uppercase tracking-wide text-lime-foreground transition-colors hover:bg-foreground"
          >
            {t("getTicket")}
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex size-10 items-center justify-center border border-border text-foreground lg:hidden"
          aria-label={open ? t("close") : t("menu")}
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Мобильное меню */}
      <div
        className={cn(
          "fixed inset-0 z-50 flex flex-col bg-background transition-transform duration-300 lg:hidden",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-border px-5 md:px-10">
          <Logo />
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="inline-flex size-10 items-center justify-center border border-border text-foreground"
            aria-label={t("close")}
          >
            <X className="size-5" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col px-5 py-4 md:px-10" aria-label="Мобильное меню">
          {NAV_ITEMS.map((item, i) => (
            <Link
              key={item.key}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-4 border-b border-border py-5 text-2xl font-black uppercase tracking-tight text-foreground"
            >
              <span className="text-sm text-lime">{String(i + 1).padStart(2, "0")}</span>
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-3 border-t border-border p-5 md:px-10">
          <LanguageSwitcher />
          <Link
            href="/exhibit"
            onClick={() => setOpen(false)}
            className="inline-flex h-12 items-center justify-center border border-border text-sm font-semibold uppercase tracking-wide text-foreground transition-colors hover:border-lime hover:text-lime"
          >
            {t("exhibit")}
          </Link>
          <Link
            href="/tickets"
            onClick={() => setOpen(false)}
            className="inline-flex h-12 items-center justify-center bg-lime text-sm font-semibold uppercase tracking-wide text-lime-foreground transition-colors hover:bg-foreground"
          >
            {t("getTicket")}
          </Link>
        </div>
      </div>
    </header>
  );
}
