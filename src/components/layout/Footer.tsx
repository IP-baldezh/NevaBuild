import { useTranslations } from "next-intl";
import { Mail, Phone, MapPin } from "lucide-react";
import { NewsletterForm } from "./NewsletterForm";
import { Link } from "@/i18n/navigation";
import { Logo } from "./Logo";
import { EVENT_DEFAULTS } from "@/lib/event-defaults";

export function Footer() {
  const t = useTranslations("Footer");
  const tn = useTranslations("Nav");
  const year = new Date().getFullYear();

  const navLinks = [
    { key: "about", href: "/about" },
    { key: "exhibit", href: "/exhibit" },
    { key: "visit", href: "/visit" },
    { key: "program", href: "/program" },
    { key: "exhibitors", href: "/exhibitors" },
    { key: "news", href: "/news" },
  ] as const;

  const legalLinks = [
    { key: "privacy", href: "/legal/privacy" },
    { key: "terms", href: "/legal/terms" },
    { key: "consent", href: "/legal/consent" },
    { key: "offer", href: "/legal/offer" },
  ] as const;

  const social = ["TG", "VK", "YT"];

  return (
    <footer className="bg-nb-dark-deep border-t border-white/8">
      <div className="container-neva py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1.4fr]">
          {/* Brand */}
          <div className="flex flex-col gap-6">
            <Logo white />
            <p className="max-w-xs text-pretty text-sm leading-relaxed text-white/45">
              {t("about")}
            </p>
            <div className="flex gap-2">
              {social.map((s) => (
                <a
                  key={s}
                  href="#"
                  aria-label={s}
                  className="inline-flex size-10 items-center justify-center border border-white/15 font-mono text-xs font-bold text-white/50 transition-colors hover:border-nb-green hover:text-nb-green"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-5">
              {t("nav")}
            </h3>
            <ul className="flex flex-col gap-3">
              {navLinks.map((l) => (
                <li key={l.key}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {tn(l.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-5">
              {t("legal")}
            </h3>
            <ul className="flex flex-col gap-3">
              {legalLinks.map((l) => (
                <li key={l.key}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {t(l.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter + contacts */}
          <div className="flex flex-col gap-5">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
              {t("newsletter") || "Подписка на новости"}
            </h3>
            <p className="text-sm leading-relaxed text-white/45">
              {t("newsletterText") || "Получайте анонсы программы и новости выставки на почту."}
            </p>
            <NewsletterForm />
            <div className="mt-2 space-y-1.5 text-sm text-white/45">
              <p className="flex items-center gap-2">
                <Mail className="size-3.5 text-nb-green" />
                {EVENT_DEFAULTS.email}
              </p>
              <p className="flex items-center gap-2">
                <Phone className="size-3.5 text-nb-green" />
                {EVENT_DEFAULTS.phone}
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="size-3.5 text-nb-green" />
                {EVENT_DEFAULTS.cityRu}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/8 pt-8 text-sm text-white/30 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} NEVA BUILD. {t("rights")}
          </p>
          <p className="uppercase tracking-wide">
            {EVENT_DEFAULTS.cityRu} / {EVENT_DEFAULTS.venueRu}
          </p>
        </div>
      </div>
    </footer>
  );
}
