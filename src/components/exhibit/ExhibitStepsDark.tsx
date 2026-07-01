"use client";

import { m } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/i18n/routing";

const STEP_KEYS = ["request", "consult", "format", "contract", "prepare"] as const;

export function ExhibitStepsDark() {
  const locale = useLocale() as Locale;
  const ru = locale === "ru";
  const t = useTranslations("ExhibitPage");

  return (
    <section id="e-steps" className="relative z-10 py-20 sm:py-28">
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
                <span style={{ color: "rgba(255,255,255,0.28)" }}>5 простых шагов.</span>
              </>
            ) : (
              <>
                {t("stepsTitle")}
                <br />
                <span style={{ color: "rgba(255,255,255,0.28)" }}>5 simple steps.</span>
              </>
            )}
          </h2>
        </m.div>

        <div className="flex flex-col gap-0">
          {STEP_KEYS.map((key, i) => (
            <m.div
              key={key}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.09 }}
              className="flex items-start gap-6 sm:gap-10 py-6 border-b group"
              style={{ borderColor: "rgba(255,255,255,0.07)" }}
            >
              {/* Number */}
              <span
                className="font-black leading-none flex-shrink-0 tabular-nums transition-colors duration-300 group-hover:opacity-100"
                style={{
                  fontSize: "clamp(36px, 5vw, 64px)",
                  color: i === 0 ? "#a9ec46" : "rgba(255,255,255,0.12)",
                  lineHeight: 1,
                  minWidth: "3ch",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Text */}
              <div className="flex-1 pt-1 sm:pt-2">
                <p
                  className="font-black text-white leading-snug"
                  style={{ fontSize: "clamp(16px, 1.8vw, 24px)" }}
                >
                  {t(`steps.${key}`)}
                </p>
              </div>

              {/* Arrow (visible on hover) */}
              <div
                className="flex-shrink-0 size-10 rounded-full flex items-center justify-center mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: "rgba(169,236,70,0.08)",
                  border: "1px solid rgba(169,236,70,0.2)",
                }}
              >
                <ArrowRight className="size-4" style={{ color: "#a9ec46" }} />
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
