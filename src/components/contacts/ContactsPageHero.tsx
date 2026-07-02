"use client";

import { m } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import type { Locale } from "@/i18n/routing";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

interface ContactsPageHeroProps {
  address: string;
  phone: string;
  email: string;
}

export function ContactsPageHero({ address, phone, email }: ContactsPageHeroProps) {
  const locale = useLocale() as Locale;
  const ru = locale === "ru";
  const t = useTranslations("Contacts");

  const pills = [
    { icon: MapPin, text: address, href: null },
    { icon: Phone, text: phone, href: `tel:${phone.replace(/[^+\d]/g, "")}` },
    { icon: Mail, text: email, href: `mailto:${email}` },
  ];

  return (
    <section className="relative overflow-hidden bg-nb-dark -mt-[72px] pt-[72px]">
      {/* Left green accent bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[3px]"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, #a9ec46 30%, #a9ec46 70%, transparent 100%)",
        }}
        aria-hidden
      />

      {/* Glow left */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 100% at 0% 55%, rgba(169,236,70,0.13) 0%, transparent 60%)",
        }}
        aria-hidden
      />
      {/* Glow right */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 45% 55% at 100% 100%, rgba(169,236,70,0.06) 0%, transparent 55%)",
        }}
        aria-hidden
      />

      <div className="container-neva relative py-20 md:py-28">
        {/* Index label */}
        <m.div
          className="flex items-center gap-4 mb-10"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease }}
        >
          <span className="text-sm font-bold tabular-nums" style={{ color: "#a9ec46" }}>
            08
          </span>
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-white/40">
            {t("label")}
          </span>
          <span className="h-px flex-1 bg-white/10" />
        </m.div>

        {/* Main heading */}
        <m.h1
          className="font-black uppercase leading-[0.88] tracking-tight text-white mb-10"
          style={{ fontSize: "clamp(50px, 9.5vw, 108px)" }}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.08, ease }}
        >
          {ru ? (
            <>
              <span className="block">СВЯЖИТЕСЬ</span>
              <span className="block" style={{ color: "#a9ec46" }}>
                С НАМИ
              </span>
            </>
          ) : (
            <>
              <span className="block">GET IN</span>
              <span className="block" style={{ color: "#a9ec46" }}>
                TOUCH
              </span>
            </>
          )}
        </m.h1>

        {/* Contact pills */}
        <m.div
          className="flex flex-wrap gap-2.5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.22, ease }}
        >
          {pills.map(({ icon: Icon, text, href }) => {
            const inner = (
              <>
                <Icon className="size-[15px] flex-shrink-0" style={{ color: "#a9ec46" }} />
                <span className="text-sm font-medium text-white/80 leading-snug">{text}</span>
              </>
            );
            const baseStyle = {
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.10)",
            };
            return href ? (
              <a
                key={text}
                href={href}
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl transition-all duration-200 hover:border-[rgba(169,236,70,0.35)] hover:bg-[rgba(169,236,70,0.06)]"
                style={baseStyle}
              >
                {inner}
              </a>
            ) : (
              <span
                key={text}
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl"
                style={baseStyle}
              >
                {inner}
              </span>
            );
          })}
        </m.div>

        {/* Schedule strip */}
        <m.div
          className="flex items-center gap-3 mt-12 pt-8 border-t border-white/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4, ease }}
        >
          <Clock className="size-4 flex-shrink-0 text-white/35" />
          <span className="text-sm text-white/45">
            {t("schedule")}:{" "}
            <span className="text-white/70 font-semibold">{t("scheduleValue")}</span>
          </span>
        </m.div>
      </div>
    </section>
  );
}
