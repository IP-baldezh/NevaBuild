"use client";

import { m } from "framer-motion";
import { useTranslations } from "next-intl";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { SectionTitle } from "@/components/ui/section-title";
import { ScrollReveal, StaggerReveal, StaggerItem } from "@/components/ui/scroll-reveal";

type Props = {
  venue: string;
  city: string;
  address: string;
  phone: string;
  email: string;
};

const ease = [0.21, 0.47, 0.32, 0.98] as [number, number, number, number];

const CONTACT_ITEMS = [
  { Icon: MapPin, key: "venue", valueKey: "address" as const },
  { Icon: Phone, key: "phone", valueKey: "phone" as const },
  { Icon: Mail, key: "email", valueKey: "email" as const },
  { Icon: Clock, key: "schedule", valueKey: null },
] as const;

export function ContactsSection({ venue, city, address, phone, email }: Props) {
  const t = useTranslations("Contacts");
  const mapsUrl = `https://yandex.ru/maps/?text=${encodeURIComponent(`${venue} ${address}`)}`;

  const contactValues: Record<string, string | null> = {
    address,
    phone,
    email,
  };

  return (
    <>
      <ScrollReveal>
        <SectionTitle
          index="08"
          label={t("label")}
          title={t("title")}
          className="mb-12"
        />
      </ScrollReveal>

      <div className="grid gap-px border border-border bg-border lg:grid-cols-2">
        {/* Info */}
        <m.div
          className="flex flex-col gap-8 bg-background p-8 md:p-12"
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease }}
        >
          <h2 className="text-3xl font-black uppercase leading-[1.05] tracking-tight text-foreground md:text-4xl">
            {city}
            <br />
            <span className="text-lime">{venue}</span>
          </h2>

          <StaggerReveal stagger={0.07} className="flex flex-col gap-6">
            {CONTACT_ITEMS.map(({ Icon, key, valueKey }) => (
              <StaggerItem key={key} className="flex items-start gap-4">
                <Icon className="mt-0.5 size-5 shrink-0 text-lime" />
                <div>
                  <div className="font-semibold text-foreground">{t(key)}</div>
                  {valueKey && key === "phone" ? (
                    <a href={`tel:${phone.replace(/\s/g, "")}`} className="text-muted-foreground transition-colors hover:text-lime">
                      {phone}
                    </a>
                  ) : valueKey && key === "email" ? (
                    <a href={`mailto:${email}`} className="text-muted-foreground transition-colors hover:text-lime">
                      {email}
                    </a>
                  ) : valueKey ? (
                    <p className="text-muted-foreground">{contactValues[valueKey]}</p>
                  ) : (
                    <p className="text-muted-foreground">{t("scheduleValue")}</p>
                  )}
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>

          <div>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-12 items-center gap-2 bg-lime px-6 text-sm font-semibold uppercase tracking-wide text-lime-foreground transition-colors hover:bg-foreground"
            >
              {t("address")}
              <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
        </m.div>

        {/* Blueprint map */}
        <m.div
          className="relative min-h-72 overflow-hidden bg-card"
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, delay: 0.1, ease }}
        >
          <div aria-hidden className="absolute inset-0 bg-blueprint opacity-60" />
          {/* Scan line */}
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-full overflow-hidden">
            <div className="animate-scan-line absolute inset-x-0 h-px bg-lime/30" />
          </div>
          <div aria-hidden className="absolute left-1/2 top-1/2 size-px -translate-x-1/2 -translate-y-1/2">
            <span className="absolute left-1/2 top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-red" />
            <span className="absolute left-1/2 top-1/2 size-16 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full border border-brand-red/50" />
            <span className="absolute left-1/2 top-1/2 size-32 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full border border-brand-red/20 [animation-delay:0.5s]" />
          </div>
          <div className="absolute bottom-5 left-5 flex items-center gap-2">
            <span className="animate-pulse-dot size-2 bg-lime" />
            <span className="text-xs uppercase tracking-wide text-muted-foreground">
              59.7472° N, 30.3766° E
            </span>
          </div>
        </m.div>
      </div>
    </>
  );
}
