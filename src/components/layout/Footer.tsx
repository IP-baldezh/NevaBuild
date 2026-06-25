import { Phone, Mail, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Logo } from "./Logo";
import { FooterNewsletterForm } from "@/components/layout/FooterNewsletterForm";
import { EVENT_DEFAULTS } from "@/lib/event-defaults";

const NAV_ITEMS = [
  { key: "about", href: "/about" },
  { key: "exhibit", href: "/exhibit" },
  { key: "visit", href: "/visit" },
  { key: "program", href: "/program" },
  { key: "exhibitors", href: "/exhibitors" },
  { key: "news", href: "/news" },
  { key: "contacts", href: "/contacts" },
] as const;

const social = [
  { label: "ВК", href: EVENT_DEFAULTS.social.vk },
  { label: "TG", href: EVENT_DEFAULTS.social.telegram },
  { label: "YT", href: EVENT_DEFAULTS.social.youtube || "#" },
  { label: "OK", href: "#" },
];

export function Footer() {
  const t = useTranslations("Footer");
  const tn = useTranslations("Nav");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-nb-dark-deep">
      {/* Main body */}
      <div className="container-neva py-10 md:py-14 lg:py-20">
        <div className="grid gap-8 md:gap-6 lg:gap-12 lg:grid-cols-[1.5fr_1fr_1.4fr]">
          {/* Brand + contacts */}
          <div className="flex flex-col items-start gap-4 lg:gap-6">
            <Logo white className="self-start" />
            <p className="max-w-[300px] text-[14px] leading-relaxed text-white/50">{t("about")}</p>
            <div className="flex flex-col gap-2.5">
              <a
                href={`tel:${EVENT_DEFAULTS.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2.5 text-[13px] text-white/60 transition-colors hover:text-white"
              >
                <Phone className="size-3.5 flex-shrink-0 text-nb-green" />
                {EVENT_DEFAULTS.phone}
              </a>
              <a
                href={`mailto:${EVENT_DEFAULTS.email}`}
                className="flex items-center gap-2.5 text-[13px] text-white/60 transition-colors hover:text-white"
              >
                <Mail className="size-3.5 flex-shrink-0 text-nb-green" />
                {EVENT_DEFAULTS.email}
              </a>
              <p className="flex items-start gap-2.5 text-[13px] text-white/60">
                <MapPin className="mt-0.5 size-3.5 flex-shrink-0 text-nb-green" />
                <span>
                  {EVENT_DEFAULTS.addressRu}, {EVENT_DEFAULTS.venueRu}
                </span>
              </p>
            </div>
            {/* Social buttons */}
            <div className="flex gap-2">
              {social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="inline-flex h-7 items-center justify-center rounded-md border border-white/20 px-3 text-[11px] font-bold text-white/50 transition-colors hover:border-nb-green hover:text-nb-green"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation — two columns, offset on desktop to align with description */}
          <div className="lg:pt-16">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="font-mulish text-[13px] text-white/55 transition-colors hover:text-white"
                  >
                    {tn(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:pt-16">
            <h3 className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white">
              {t("followNews")}
            </h3>
            <p className="font-mulish mb-4 text-[13px] leading-relaxed text-white/50">
              {t("newsletterText")}
            </p>
            <FooterNewsletterForm
              placeholder={t("emailPlaceholder")}
              submitLabel={t("subscribe")}
            />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-neva flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex size-7 flex-shrink-0 items-center justify-center rounded-full bg-white/10">
              <span className="font-black text-[10px] text-white">N</span>
            </div>
            <p className="text-[12px] text-white/35">
              © 2009–{year} NevaBuild. {t("rights")}
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-[12px] text-white/35">
            <Link href="/legal/privacy" className="transition-colors hover:text-white">
              {t("privacy")}
            </Link>
            <Link href="/legal/terms" className="transition-colors hover:text-white">
              {t("termsUse")}
            </Link>
            <Link href="/sitemap.xml" className="transition-colors hover:text-white">
              {t("sitemap")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
