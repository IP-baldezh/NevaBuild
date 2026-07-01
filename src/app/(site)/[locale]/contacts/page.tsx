import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Globe, MapPin, Phone, Mail, Clock } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { buildAlternates } from "@/lib/seo";
import { ContactForm } from "@/components/forms/ContactForm";
import { getEventSettings, localizeEvent } from "@/server/services/event";
import { DarkBackground } from "@/components/layout/DarkBackground";
import { DarkPageHero } from "@/components/layout/DarkPageHero";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Reveal } from "@/components/ui/reveal";

export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "ContactsPage" });
  return {
    title: t("title"),
    description: t("lead"),
    alternates: buildAlternates(locale, "/contacts"),
  };
}

export default async function ContactsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations({ locale: locale as Locale, namespace: "ContactsPage" });
  const tc = await getTranslations({ locale: locale as Locale, namespace: "Contacts" });
  const ru = locale === "ru";

  const settings = await getEventSettings();
  const ev = localizeEvent(settings, locale as Locale);

  const mapsUrl = `https://yandex.ru/maps/?text=${encodeURIComponent(`${ev.venue} ${ev.address}`)}`;

  return (
    <div className="relative" style={{ background: "#07100a" }}>
      <DarkBackground sentinelId="contacts-end" />

      <DarkPageHero eyebrow={ru ? "Контакты" : "Contacts"} title={t("title")} lead={t("lead")} />

      {/* Contacts Info */}
      <section
        className="relative z-10 py-20 border-t"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="container-neva">
          <div className="grid gap-8 lg:grid-cols-2">
            <Reveal>
              <div
                className="rounded-3xl p-8 h-full"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <h2
                  className="font-black text-white mb-6"
                  style={{ fontSize: "clamp(20px, 2.5vw, 32px)" }}
                >
                  {ev.city}
                  <br />
                  <span style={{ color: "#12B669" }}>{ev.venue}</span>
                </h2>
                <div className="space-y-5">
                  {[
                    { Icon: MapPin, label: tc("address"), value: ev.address, href: mapsUrl },
                    {
                      Icon: Phone,
                      label: tc("phone"),
                      value: ev.phone,
                      href: `tel:${ev.phone.replace(/\s/g, "")}`,
                    },
                    { Icon: Mail, label: tc("email"), value: ev.email, href: `mailto:${ev.email}` },
                    { Icon: Clock, label: tc("schedule"), value: tc("scheduleValue"), href: null },
                  ].map(({ Icon, label, value, href }) => (
                    <div key={label} className="flex items-start gap-4">
                      <div
                        className="size-9 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{
                          background: "rgba(18,182,105,0.1)",
                          border: "1px solid rgba(18,182,105,0.2)",
                        }}
                      >
                        <Icon className="size-4" style={{ color: "#12B669" }} />
                      </div>
                      <div>
                        <p
                          className="text-xs font-bold uppercase tracking-[0.12em] mb-0.5"
                          style={{ color: "rgba(255,255,255,0.35)" }}
                        >
                          {label}
                        </p>
                        {href ? (
                          <a
                            href={href}
                            target={href.startsWith("http") ? "_blank" : undefined}
                            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="font-semibold text-white/80 hover:text-[#a9ec46] transition-colors"
                            style={{ fontFamily: "var(--font-mulish)" }}
                          >
                            {value}
                          </a>
                        ) : (
                          <p
                            className="font-semibold text-white/80"
                            style={{ fontFamily: "var(--font-mulish)" }}
                          >
                            {value}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                {ev.domains.length > 0 && (
                  <div
                    className="mt-6 pt-6"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    <p
                      className="text-xs font-bold uppercase tracking-[0.12em] mb-3"
                      style={{ color: "rgba(255,255,255,0.35)" }}
                    >
                      {t("domains")}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {ev.domains.map((d) => (
                        <a
                          key={d}
                          href={`https://${d}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors hover:text-[#a9ec46]"
                          style={{ color: "#12B669" }}
                        >
                          <Globe className="size-3.5" />
                          {d}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div
                className="rounded-3xl p-8 h-full"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <h2
                  className="font-black text-white mb-6"
                  style={{ fontSize: "clamp(20px, 2.5vw, 32px)" }}
                >
                  {t("requisitesTitle")}
                </h2>
                <p className="font-black text-white/80 mb-4">{ev.organizer}</p>
                <div className="space-y-0">
                  {[
                    { label: tc("phone"), value: ev.phone },
                    { label: tc("email"), value: ev.email },
                    { label: tc("address"), value: ev.address },
                  ].map(({ label, value }) => (
                    <div
                      key={label}
                      className="flex justify-between items-start gap-4 py-3"
                      style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                    >
                      <dt
                        className="text-sm"
                        style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-mulish)" }}
                      >
                        {label}
                      </dt>
                      <dd
                        className="text-sm font-semibold text-right text-white/75"
                        style={{ fontFamily: "var(--font-mulish)" }}
                      >
                        {value}
                      </dd>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section
        className="relative z-10 py-20 border-t"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="container-neva max-w-2xl">
          <ScrollReveal>
            <span
              className="text-[11px] uppercase tracking-[0.28em] mb-4 block font-bold"
              style={{ color: "#a9ec46", fontFamily: "var(--font-mulish)" }}
            >
              {tc("writeUs")}
            </span>
            <h2
              className="font-black text-white mb-8"
              style={{ fontSize: "clamp(22px, 3.5vw, 44px)" }}
            >
              {tc("title")}
            </h2>
          </ScrollReveal>
          <Reveal delay={0.1}>
            <div
              className="rounded-3xl p-6 sm:p-8"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>

      <div id="contacts-end" aria-hidden />
    </div>
  );
}
