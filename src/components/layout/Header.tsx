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
  const p = pathname as string;
  const isDarkPage =
    p.startsWith("/about") ||
    p.startsWith("/exhibit") ||
    p.startsWith("/visit") ||
    p.startsWith("/contacts") ||
    p.startsWith("/news") ||
    p.startsWith("/exhibitors") ||
    p.startsWith("/program") ||
    p.startsWith("/tickets");
  const transparent = (isHome || isDarkPage) && !scrolled;
  const darkScrolled = (isDarkPage || isHome) && scrolled;
  const useWhite = transparent || darkScrolled;

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
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          transparent
            ? "bg-transparent border-b border-white/10"
            : darkScrolled
              ? "bg-[#07100a]/85 backdrop-blur-md border-b border-white/10"
              : "bg-background/95 backdrop-blur-md border-b border-border shadow-sm",
        )}
      >
        <div className="container-neva flex h-[72px] items-center justify-between gap-6">
          <Link href="/" aria-label="NEVA BUILD — на главную">
            <Logo white={useWhite} />
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
                    useWhite
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
            <LanguageSwitcher transparent={useWhite} />
            <Link
              href="/exhibit"
              className={cn(
                "inline-flex items-center justify-center gap-2 border px-6 py-3 rounded-xl text-[14px] font-bold transition-all duration-200",
                useWhite
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
                useWhite
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
              "inline-flex size-10 items-center justify-center border lg:hidden transition-colors",
              useWhite
                ? "border-white/40 text-white hover:bg-white/15"
                : "border-border text-foreground",
            )}
            aria-label={open ? t("close") : t("menu")}
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </header>

      {/* Мобильное меню — вне <header>, чтобы backdrop-filter не ломал fixed-позиционирование */}
      <div
        className={cn(
          "fixed inset-0 z-[60] flex flex-col bg-white transition-transform duration-300 lg:hidden",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        {/* Шапка меню: лого + переключатель языка + кнопка закрытия */}
        <div className="flex h-[72px] items-center border-b border-border px-5 md:px-10 gap-4 flex-none">
          <Logo />
          <div className="flex-1 flex justify-center">
            <div style={{ transform: "scale(1.3)", transformOrigin: "center" }}>
              <LanguageSwitcher />
            </div>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="inline-flex size-10 items-center justify-center text-foreground flex-none"
            aria-label={t("close")}
          >
            <X className="size-5" />
          </button>
        </div>

        <nav
          className="flex flex-1 flex-col px-5 py-4 md:px-10 overflow-y-auto"
          aria-label="Мобильное меню"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-4 border-b border-border py-5 text-2xl font-black uppercase tracking-tight",
                pathname === item.href ? "text-nb-green" : "text-foreground",
              )}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-3 border-t border-border p-5 md:px-10 flex-none">
          <Link
            href="/exhibit"
            onClick={() => setOpen(false)}
            className="inline-flex h-14 items-center justify-center rounded-2xl border border-border text-sm font-semibold uppercase tracking-wide text-foreground transition-colors hover:border-nb-green hover:text-nb-green-dark"
          >
            {t("exhibit")}
          </Link>
          <Link
            href="/tickets"
            onClick={() => setOpen(false)}
            className="inline-flex h-14 items-center justify-center rounded-2xl bg-brand-red text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:opacity-90"
          >
            {t("getTicket")}
          </Link>
        </div>
      </div>
    </>
  );
}
