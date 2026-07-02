"use client";

import { m } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { MapPin, Phone, Mail, Clock, Navigation, ExternalLink } from "lucide-react";
import { StaggerReveal, StaggerItem } from "@/components/ui/scroll-reveal";
import type { Locale } from "@/i18n/routing";

const ease = [0.21, 0.47, 0.32, 0.98] as [number, number, number, number];

const MAP_SRC =
  "https://yandex.ru/map-widget/v1/?ll=30.37660%2C59.74720&z=15&pt=30.37660%2C59.74720%2Cpm2rdl&l=map";

const DIRECTIONS = "https://yandex.ru/maps/?rtext=~59.74720,30.37660&rtt=auto";

interface Props {
  venue: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  social?: Record<string, string>;
}

export function ContactsMapSection({ venue, city, address, phone, email, social }: Props) {
  const locale = useLocale() as Locale;
  const ru = locale === "ru";
  const t = useTranslations("Contacts");

  const infoItems = [
    { icon: MapPin, label: t("address"), value: `${city}, ${address}`, href: null },
    { icon: Phone, label: t("phone"), value: phone, href: `tel:${phone.replace(/[^+\d]/g, "")}` },
    { icon: Mail, label: t("email"), value: email, href: `mailto:${email}` },
    { icon: Clock, label: t("schedule"), value: t("scheduleValue"), href: null },
  ];

  const socialEntries = Object.entries(social ?? {}).filter(([, url]) => !!url);

  return (
    <section className="border-t border-border">
      <div className="grid lg:grid-cols-2">
        {/* Map */}
        <m.div
          className="relative overflow-hidden bg-nb-dark"
          style={{ minHeight: "420px" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease }}
        >
          {/* Lime accent bar */}
          <div
            className="absolute top-0 left-0 right-0 h-[3px] z-10 pointer-events-none"
            style={{
              background: "linear-gradient(90deg, #a9ec46 0%, #a9ec46 50%, #a9ec46 100%)",
            }}
            aria-hidden
          />

          <iframe
            src={MAP_SRC}
            title={
              ru ? "Карта — КВЦ Экспофорум, Санкт-Петербург" : "Map — Expoforum, Saint Petersburg"
            }
            className="absolute inset-0 w-full h-full border-0"
            loading="lazy"
            allowFullScreen
          />

          {/* Venue badge */}
          <div className="absolute bottom-4 left-4 z-10 pointer-events-none">
            <div
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-white text-[11px] font-bold uppercase tracking-wider"
              style={{
                background: "rgba(22,34,28,0.88)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(169,236,70,0.18)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse flex-shrink-0" />
              {venue}
            </div>
          </div>
        </m.div>

        {/* Info panel */}
        <div className="flex flex-col justify-center bg-card border-l border-border px-8 py-12 md:px-12 lg:px-14">
          {/* Sub-header */}
          <m.div
            className="flex items-center gap-4 mb-10"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease }}
          >
            <span className="text-sm font-bold text-lime tabular-nums">08.01</span>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">
              {ru ? "КАК НАС НАЙТИ" : "HOW TO FIND US"}
            </span>
            <span className="h-px flex-1 bg-border" />
          </m.div>

          {/* Contact details */}
          <StaggerReveal stagger={0.09} className="space-y-7">
            {infoItems.map(({ icon: Icon, label, value, href }) => (
              <StaggerItem key={label}>
                <div className="flex items-start gap-4">
                  <div className="mt-0.5 flex-shrink-0 w-10 h-10 rounded-xl bg-nb-dark flex items-center justify-center">
                    <Icon className="size-[17px] text-lime" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-0.5">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="text-[15px] font-semibold text-foreground hover:text-lime transition-colors break-all"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-[15px] font-semibold text-foreground">{value}</p>
                    )}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>

          {/* Social links */}
          {socialEntries.length > 0 && (
            <m.div
              className="mt-8 pt-7 border-t border-border"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3, ease }}
            >
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-3">
                {t("social")}
              </p>
              <div className="flex flex-wrap gap-2">
                {socialEntries.map(([key, url]) => (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border border-border hover:border-lime hover:text-lime transition-colors"
                  >
                    <ExternalLink className="size-3" />
                    {key}
                  </a>
                ))}
              </div>
            </m.div>
          )}

          {/* Directions CTA */}
          <m.div
            className="mt-8"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.38, ease }}
          >
            <a
              href={DIRECTIONS}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 h-12 px-6 rounded-xl font-bold text-sm transition-all duration-200 hover:-translate-y-0.5 touch-manipulation"
              style={{
                background: "linear-gradient(135deg, #a9ec46 0%, #8dd62e 100%)",
                color: "#0d2d06",
                boxShadow: "0 6px 20px rgba(169,236,70,0.22)",
              }}
            >
              <Navigation className="size-4" />
              {ru ? "Построить маршрут" : "Get directions"}
            </a>
          </m.div>
        </div>
      </div>
    </section>
  );
}
