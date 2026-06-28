"use client";

import { m } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { LeadForm } from "@/components/forms/LeadForm";
import type { ExhibitorCategory } from "@prisma/client";

export function ExhibitFormDark({ categories }: { categories: ExhibitorCategory[] }) {
  const locale = useLocale() as Locale;
  const ru = locale === "ru";
  const t = useTranslations("ExhibitPage");

  return (
    <section
      id="e-form"
      className="relative z-10 min-h-screen flex flex-col justify-center items-center py-24"
      style={{ paddingLeft: "clamp(16px, 5vw, 64px)", paddingRight: "clamp(16px, 5vw, 64px)" }}
    >
      <div className="w-full max-w-3xl">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <span
            className="text-[11px] uppercase tracking-[0.28em] mb-4 block font-bold"
            style={{ color: "#a9ec46", fontFamily: "var(--font-mulish)" }}
          >
            NEVA BUILD 2027
          </span>
          <h2
            className="font-black text-white leading-[0.95] tracking-[-0.03em] mb-4"
            style={{ fontSize: "clamp(2.4rem, 5vw, 6rem)" }}
          >
            {t("formTitle")}
          </h2>
          <p
            className="text-white/45 max-w-md mx-auto leading-relaxed"
            style={{ fontSize: "clamp(13px, 1.1vw, 16px)", fontFamily: "var(--font-mulish)" }}
          >
            {ru
              ? "Заполните форму — мы свяжемся с вами в течение одного рабочего дня."
              : "Fill in the form and we'll get back to you within one business day."}
          </p>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-3xl p-8 sm:p-10"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.09)",
          }}
        >
          <LeadForm categories={categories} />
        </m.div>
      </div>
    </section>
  );
}
