"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

const STEP_KEYS = ["request", "consult", "format", "contract", "prepare"] as const;

const STEP_DESCS: Record<"ru" | "en", Record<string, string>> = {
  ru: {
    request:
      "Заполните короткую форму на сайте — укажите компанию, контактные данные и желаемый формат участия. Менеджер свяжется с вами в течение 1 рабочего дня.",
    consult:
      "Наш менеджер проведёт бесплатную консультацию: расскажет о форматах участия, возможностях стенда, деловой программе и ответит на все ваши вопросы.",
    format:
      "Выберите подходящий формат — стандартная застройка, индивидуальный стенд, партнёрство или участие в деловой программе. Возможно совмещение нескольких форматов.",
    contract:
      "После согласования условий подписываем договор и выставляем счёт. Бронирование места закрепляется после внесения предоплаты.",
    prepare:
      "Наша команда предоставит все технические регламенты и поможет подготовить стенд. За 2 недели до открытия получите полный пакет документов участника.",
  },
  en: {
    request:
      "Fill in the short form on the website — enter your company name, contact details and preferred participation format. A manager will contact you within 1 business day.",
    consult:
      "Our manager will provide a free consultation: formats, booth options, the business programme, and all your questions answered.",
    format:
      "Choose the right format — shell scheme booth, custom-designed stand, partnership, or speaker slot. Multiple formats can be combined.",
    contract:
      "After agreeing on terms we sign the contract and issue an invoice. Your spot is reserved after the advance payment is received.",
    prepare:
      "Our team provides all technical regulations and helps you prepare your stand. Two weeks before opening you'll receive the full exhibitor document pack.",
  },
};

export function ExhibitStepsDark() {
  const locale = useLocale() as Locale;
  const ru = locale === "ru";
  const t = useTranslations("ExhibitPage");
  const lang = ru ? "ru" : "en";

  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="e-steps" className="relative z-10 py-10 sm:py-20">
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
            {ru ? "Процесс" : "Process"}
          </span>
          <h2
            className="font-black text-white leading-[1.02]"
            style={{ fontSize: "clamp(32px, 5vw, 68px)" }}
          >
            {ru ? (
              <>
                {t("stepsTitle")}
                <br />
                <span style={{ color: "#ffffff" }}>5 простых шагов.</span>
              </>
            ) : (
              <>
                {t("stepsTitle")}
                <br />
                <span style={{ color: "#ffffff" }}>5 simple steps.</span>
              </>
            )}
          </h2>
        </m.div>

        <div className="max-w-3xl space-y-3">
          {STEP_KEYS.map((key, i) => (
            <div
              key={key}
              className="rounded-2xl overflow-hidden transition-all duration-200"
              style={{
                background: open === i ? "rgba(169,236,70,0.05)" : "rgba(255,255,255,0.04)",
                border:
                  open === i
                    ? "1px solid rgba(169,236,70,0.20)"
                    : "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center gap-4 p-5 sm:p-6 text-left"
              >
                <span
                  className="font-black tabular-nums flex-shrink-0 leading-none"
                  style={{
                    fontSize: "clamp(24px, 3vw, 36px)",
                    color: open === i ? "#a9ec46" : "rgba(255,255,255,0.15)",
                    minWidth: "2ch",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 font-black text-white text-[15px] sm:text-[16px] leading-snug">
                  {t(`steps.${key}`)}
                </span>
                <m.span
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="flex-shrink-0"
                  style={{ color: "#a9ec46" }}
                >
                  <ChevronDown className="size-5" />
                </m.span>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <m.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    style={{ overflow: "hidden" }}
                  >
                    <p
                      className="px-5 sm:px-6 pb-5 sm:pb-6 leading-relaxed"
                      style={{
                        paddingLeft: "calc(1.25rem + 2ch + 1rem)",
                        color: "rgba(255,255,255,0.75)",
                        fontFamily: "var(--font-mulish)",
                        fontSize: "clamp(13px, 1.1vw, 15px)",
                      }}
                    >
                      {STEP_DESCS[lang][key]}
                    </p>
                  </m.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <m.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10"
        >
          <Link
            href="#e-form"
            className="inline-flex items-center rounded-xl font-black text-[12px] tracking-[0.18em] uppercase px-8 py-4 transition-all duration-200 hover:brightness-110"
            style={{ background: "#a9ec46", color: "#0d2d06" }}
          >
            {ru ? "Оставить заявку" : "Submit Application"}
          </Link>
        </m.div>
      </div>
    </section>
  );
}
