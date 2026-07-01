import { Phone, Mail, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Logo } from "./Logo";
import { FooterNewsletterForm } from "@/components/layout/FooterNewsletterForm";
import { EVENT_DEFAULTS } from "@/lib/event-defaults";

const NAV_GROUPS = [
  {
    titleKey: "aboutSection" as const,
    items: [
      { key: "about" as const, href: "/about" },
      { key: "exhibit" as const, href: "/exhibit" },
      { key: "visit" as const, href: "/visit" },
    ],
  },
  {
    titleKey: "program" as const,
    items: [
      { key: "program" as const, href: "/program" },
      { key: "exhibitors" as const, href: "/exhibitors" },
      { key: "news" as const, href: "/news" },
    ],
  },
  {
    titleKey: "contacts" as const,
    items: [{ key: "contacts" as const, href: "/contacts" }],
  },
] as const;

const social = [
  {
    label: "VK",
    href: EVENT_DEFAULTS.social.vk,
    icon: (
      <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden>
        <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14C20.67 22 22 20.67 22 15.07V8.93C22 3.33 20.67 2 15.07 2zm2.19 13.27h-1.52c-.57 0-.75-.46-1.77-1.5-.9-.88-1.28-.99-1.5-.99-.3 0-.39.09-.39.51v1.37c0 .36-.11.57-1.06.57-1.56 0-3.29-.95-4.51-2.72C4.7 10.44 4.22 8.7 4.22 8.36c0-.22.09-.42.51-.42h1.52c.38 0 .52.17.67.58.73 2.12 1.96 3.98 2.47 3.98.19 0 .28-.09.28-.58V9.54c-.06-1.04-.61-1.13-.61-1.5 0-.18.15-.36.39-.36h2.39c.32 0 .43.17.43.54v2.9c0 .32.14.43.23.43.19 0 .35-.11.7-.46 1.08-1.21 1.85-3.07 1.85-3.07.1-.22.28-.43.66-.43h1.52c.46 0 .56.24.46.56-.19.88-2.06 3.53-2.06 3.53-.16.27-.22.39 0 .69.16.22.69.67 1.04 1.08.65.73 1.14 1.35 1.27 1.77.14.42-.08.63-.52.63z" />
      </svg>
    ),
  },
  {
    label: "TG",
    href: EVENT_DEFAULTS.social.telegram,
    icon: (
      <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8l-1.69 7.97c-.12.57-.46.71-.93.44l-2.57-1.89-1.24 1.19c-.14.14-.25.25-.51.25l.18-2.61 4.69-4.23c.2-.18-.04-.28-.32-.1L7.32 14.37l-2.52-.79c-.55-.17-.56-.55.12-.81l9.85-3.8c.46-.17.86.11.87.83z" />
      </svg>
    ),
  },
  {
    label: "YT",
    href: EVENT_DEFAULTS.social.youtube || "#",
    icon: (
      <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden>
        <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.54 3.5 12 3.5 12 3.5s-7.54 0-9.38.55A3.02 3.02 0 0 0 .5 6.19C0 8.03 0 12 0 12s0 3.97.5 5.81a3.02 3.02 0 0 0 2.12 2.14C4.46 20.5 12 20.5 12 20.5s7.54 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14C24 15.97 24 12 24 12s0-3.97-.5-5.81zM9.75 15.5v-7l6.25 3.5-6.25 3.5z" />
      </svg>
    ),
  },
];

export function Footer() {
  const t = useTranslations("Footer");
  const tn = useTranslations("Nav");
  const year = new Date().getFullYear();

  const groupTitles: Record<string, string> = {
    aboutSection: t("aboutSection"),
    program: tn("program"),
    contacts: tn("contacts"),
  };

  return (
    <footer className="px-4 sm:px-6 lg:px-8 pb-8" style={{ background: "#07100a" }}>
      <div
        className="relative overflow-hidden rounded-3xl ring-1 ring-white/10 text-white"
        style={{ background: "#0d1f12" }}
      >
        {/* Gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 0% 0%, rgba(18,182,105,0.08) 0%, transparent 60%), radial-gradient(ellipse at 100% 100%, rgba(169,236,70,0.05) 0%, transparent 50%)",
          }}
          aria-hidden
        />

        <div className="relative sm:px-10 lg:px-14 lg:py-16 pt-12 pr-6 pb-12 pl-6">
          {/* Top */}
          <div className="flex flex-col lg:flex-row items-start justify-between gap-10">
            {/* Left — brand + contacts + newsletter */}
            <div className="max-w-sm w-full">
              <Logo white className="mb-4" />

              <p className="text-sm text-white/60 leading-relaxed mb-5">{t("about")}</p>

              <div className="flex flex-col gap-2 mb-6">
                <a
                  href={`tel:${EVENT_DEFAULTS.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2.5 text-[13px] text-white/55 hover:text-white transition-colors"
                >
                  <Phone className="size-3.5 flex-shrink-0" style={{ color: "#12B669" }} />
                  {EVENT_DEFAULTS.phone}
                </a>
                <a
                  href={`mailto:${EVENT_DEFAULTS.email}`}
                  className="flex items-center gap-2.5 text-[13px] text-white/55 hover:text-white transition-colors"
                >
                  <Mail className="size-3.5 flex-shrink-0" style={{ color: "#12B669" }} />
                  {EVENT_DEFAULTS.email}
                </a>
                <p className="flex items-start gap-2.5 text-[13px] text-white/55">
                  <MapPin className="mt-0.5 size-3.5 flex-shrink-0" style={{ color: "#12B669" }} />
                  <span>
                    {EVENT_DEFAULTS.addressRu}, {EVENT_DEFAULTS.venueRu}
                  </span>
                </p>
              </div>

              <FooterNewsletterForm
                placeholder={t("emailPlaceholder")}
                submitLabel={t("subscribe")}
                noSpamLabel={t("newsletterText")}
              />
            </div>

            {/* Right — nav columns */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 w-full lg:w-auto">
              {NAV_GROUPS.map((group) => (
                <div key={group.titleKey}>
                  <p className="text-sm font-semibold text-white/75 tracking-tight mb-3">
                    {groupTitles[group.titleKey]}
                  </p>
                  <ul className="space-y-2">
                    {group.items.map((item) => (
                      <li key={item.key}>
                        <Link
                          href={item.href}
                          className="text-sm text-white/50 hover:text-white transition-colors"
                        >
                          {tn(item.key)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/40">
              © 2009–{year} NevaBuild. {t("rights")}
            </p>

            <div className="flex items-center gap-3">
              {/* Legal links */}
              <Link
                href="/legal/privacy"
                className="text-xs text-white/35 hover:text-white/70 transition-colors hidden sm:block"
              >
                {t("privacy")}
              </Link>
              <span className="text-white/15 hidden sm:block">·</span>
              <Link
                href="/legal/terms"
                className="text-xs text-white/35 hover:text-white/70 transition-colors hidden sm:block"
              >
                {t("termsUse")}
              </Link>
              <span className="text-white/15 hidden sm:block">·</span>

              {/* Social icons */}
              {social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="inline-flex size-8 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 hover:bg-white/10 text-white/70 hover:text-white transition-all"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
