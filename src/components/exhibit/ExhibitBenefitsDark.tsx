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
    <section
      id="e-benefits"
      className="relative z-10 min-h-screen flex flex-col justify-center py-24"
    >
      <div className="container-neva">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
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
                <span style={{ color: "rgba(255,255,255,0.28)" }}>участвуя в выставке.</span>
              </>
            ) : (
              <>
                {t("benefitsTitle")}
                <br />
                <span style={{ color: "rgba(255,255,255,0.28)" }}>by exhibiting.</span>
              </>
            )}
          </h2>
        </m.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {KEYS.map((key, i) => {
            const Icon = ICONS[i];
            return (
              <m.div
                key={key}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-2xl p-6 sm:p-8 flex flex-col gap-4"
                style={{
                  background: i % 2 === 0 ? "rgba(169,236,70,0.06)" : "rgba(255,255,255,0.04)",
                  border:
                    i % 2 === 0
                      ? "1px solid rgba(169,236,70,0.16)"
                      : "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div
                  className="size-11 rounded-xl flex items-center justify-center border"
                  style={{
                    background: "rgba(169,236,70,0.07)",
                    borderColor: "rgba(169,236,70,0.18)",
                  }}
                >
                  <Icon className="size-5" style={{ color: "#a9ec46" }} />
                </div>
                <div>
                  <p className="font-black text-white text-base leading-snug mb-1">
                    {tb(`points.${key}`)}
                  </p>
                  <p
                    className="text-[13px] leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-mulish)" }}
                  >
                    {subs[i]}
                  </p>
                </div>
              </m.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
