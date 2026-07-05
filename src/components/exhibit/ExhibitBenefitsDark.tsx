"use client";

import { m } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Target, Network, TrendingUp, Megaphone, Users } from "lucide-react";
import type { Locale } from "@/i18n/routing";

const ICONS = [Users, Target, Network, TrendingUp, Megaphone] as const;
const KEYS = ["audience", "leads", "networking", "brand", "media"] as const;

const SUBS: Record<"ru" | "en", string[]> = {
  ru: [
    "Байеры, архитекторы, девелоперы, подрядчики",
    "Прямые переговоры с потенциальными клиентами",
    "Встречи с коллегами и партнёрами по рынку",
    "Живая презентация продукта — не баннер, а опыт",
    "Упоминания в СМИ, соцсетях и отчётах выставки",
  ],
  en: [
    "Buyers, architects, developers, contractors",
    "Direct negotiations with potential clients",
    "Meetings with industry peers and partners",
    "Live product showcase — not a banner, an experience",
    "Coverage in media, socials and exhibition reports",
  ],
};

export function ExhibitBenefitsDark() {
  const locale = useLocale() as Locale;
  const ru = locale === "ru";
  const t = useTranslations("ExhibitPage");
  const tb = useTranslations("ExhibitBlock");
  const subs = SUBS[ru ? "ru" : "en"];

  return (
    <section id="e-benefits" className="relative z-10 py-10 sm:py-20">
      <div className="container-neva">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span
            className="text-[11px] uppercase tracking-[0.28em] mb-4 block font-bold"
            style={{ color: "#a9ec46", fontFamily: "var(--font-mulish)" }}
          >
            {ru ? "Преимущества" : "Benefits"}
          </span>
          <h2
            className="font-black text-white leading-[1.02]"
            style={{ fontSize: "clamp(32px, 5vw, 68px)" }}
          >
            {ru ? (
              <>
                {t("benefitsTitle")}
                <br />
                <span style={{ color: "#ffffff" }}>участвуя в выставке.</span>
              </>
            ) : (
              <>
                {t("benefitsTitle")}
                <br />
                <span style={{ color: "#ffffff" }}>by exhibiting.</span>
              </>
            )}
          </h2>
        </m.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start">
          {/* Photo */}
          <m.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="relative rounded-3xl overflow-hidden"
            style={{ aspectRatio: "4/5" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1400&auto=format&fit=crop"
              alt=""
              aria-hidden
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(165deg, rgba(7,16,10,0.25) 0%, rgba(7,16,10,0.70) 100%)",
              }}
            />
            {/* Stat badge */}
            <div
              className="absolute bottom-6 left-6 right-6 rounded-2xl p-5"
              style={{
                background: "rgba(7,16,10,0.82)",
                border: "1px solid rgba(255,255,255,0.10)",
                backdropFilter: "blur(12px)",
              }}
            >
              <p
                className="font-black text-white"
                style={{ fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1 }}
              >
                10 000+
              </p>
              <p
                className="text-[13px] mt-1"
                style={{ color: "rgba(255,255,255,0.65)", fontFamily: "var(--font-mulish)" }}
              >
                {ru ? "профессионалов отрасли за 4 дня" : "industry professionals over 4 days"}
              </p>
            </div>
          </m.div>

          {/* List */}
          <div className="flex flex-col gap-3 lg:pt-2">
            {KEYS.map((key, i) => {
              const Icon = ICONS[i];
              return (
                <m.div
                  key={key}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.07 }}
                  className="flex items-start gap-4 rounded-2xl p-5 transition-colors duration-200"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <div
                    className="size-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{
                      background: "rgba(169,236,70,0.08)",
                      border: "1px solid rgba(169,236,70,0.18)",
                    }}
                  >
                    <Icon className="size-4.5" style={{ color: "#a9ec46" }} />
                  </div>
                  <div>
                    <p className="font-black text-white text-[15px] leading-snug mb-1">
                      {tb(`points.${key}`)}
                    </p>
                    <p
                      className="text-[13px] leading-relaxed"
                      style={{ color: "rgba(255,255,255,0.70)", fontFamily: "var(--font-mulish)" }}
                    >
                      {subs[i]}
                    </p>
                  </div>
                </m.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
