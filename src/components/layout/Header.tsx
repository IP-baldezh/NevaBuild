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

  const isHome = pathname === "/";
  const transparent = isHome && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        transparent
          ? "bg-transparent border-b border-white/10"
          : "bg-background/95 backdrop-blur-md border-b border-border shadow-sm",
      )}
    >
      <div className="container-neva flex h-[72px] items-center justify-between gap-6">
        <Link href="/" aria-label="NEVA BUILD — на главную">
          <Logo white={transparent} />
        </Link>

        <nav
          className="hidden items-center gap-1 xl:flex flex-1 justify-center"
          aria-label="Главное меню"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = (pathname as string) === item.href;
            return (
              <Link
                key={item.key}
                href={item.href}
                className={cn(
                  "font-semibold text-[14px] whitespace-nowrap px-3 py-2 rounded-lg transition-all duration-200",
                  transparent
                    ? isActive
                      ? "text-white bg-white/15"
                      : "text-white/85 hover:text-white hover:bg-white/15"
                    : isActive
                      ? "text-nb-green bg-nb-bg-light"
                      : "text-nb-dark hover:text-nb-lime-acid hover:bg-nb-bg-light",
                )}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex flex-none">
          <LanguageSwitcher transparent={transparent} />
          <Link
            href="/exhibit"
            className={cn(
              "inline-flex items-center justify-center gap-2 border px-6 py-3 rounded-xl text-[14px] font-bold transition-all duration-200",
              transparent
                ? "border-white/40 text-white hover:border-white hover:bg-white/10"
                : "border-nb-border text-nb-dark hover:border-nb-lime-acid hover:text-nb-green-dark hover:bg-nb-bg-light",
            )}
          >
            {t("exhibit")}
          </Link>
          <Link
            href="/tickets"
            className={cn(
              "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-[14px] font-bold transition-all duration-200 hover:-translate-y-0.5",
              transparent
                ? "text-white shadow-[0_6px_20px_rgba(225,27,34,0.40)]"
                : "text-white shadow-[0_4px_12px_rgba(225,27,34,0.25)]",
            )}
            style={{ background: "#E11B22" }}
          >
            {t("getTicket")}
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "inline-flex size-10 items-center justify-center lg:hidden transition-colors",
            transparent ? "text-white hover:bg-white/15" : "text-foreground hover:bg-nb-bg-light",
          )}
          aria-label={open ? t("close") : t("menu")}
          aria-expanded={open}
        >
          {open ? (
            <X className="size-5" strokeWidth={2.5} strokeLinecap="round" />
          ) : (
            <Menu className="size-5" strokeWidth={2.5} strokeLinecap="round" />
          )}
        </button>
      </div>

      {/* Мобильное меню */}
      <div
        className={cn(
          "fixed inset-0 z-50 flex flex-col bg-background transition-transform duration-300 lg:hidden",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex h-[72px] items-center justify-between border-b border-border px-5 md:px-10">
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
              className={cn(
                "flex items-center gap-4 border-b border-border py-5 text-2xl font-black uppercase tracking-tight",
                pathname === item.href ? "text-nb-green" : "text-foreground",
              )}
            >
              <span className="text-sm text-nb-green">{String(i + 1).padStart(2, "0")}</span>
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-3 border-t border-border p-5 md:px-10">
          <LanguageSwitcher />
          <Link
            href="/exhibit"
            onClick={() => setOpen(false)}
            className="inline-flex h-12 items-center justify-center border border-border text-sm font-semibold uppercase tracking-wide text-foreground transition-colors hover:border-nb-green hover:text-nb-green-dark"
          >
            {t("exhibit")}
          </Link>
          <Link
            href="/tickets"
            onClick={() => setOpen(false)}
            className="inline-flex h-12 items-center justify-center bg-brand-red text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:opacity-90"
          >
            {t("getTicket")}
          </Link>
        </div>
      </div>
    </header>
  );
}
