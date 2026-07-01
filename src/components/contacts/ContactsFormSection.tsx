"use client";

import { m } from "framer-motion";
import { useLocale } from "next-intl";
import { ContactForm } from "@/components/forms/ContactForm";
import type { Locale } from "@/i18n/routing";

const ease = [0.21, 0.47, 0.32, 0.98] as [number, number, number, number];

export function ContactsFormSection() {
  const locale = useLocale() as Locale;
  const ru = locale === "ru";

  return (
    <section className="py-20 sm:py-28 bg-background border-t border-border">
      <div className="container-neva">
        {/* Sub-header */}
        <m.div
          className="flex items-center gap-4 mb-12"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease }}
        >
          <span className="text-sm font-bold text-lime tabular-nums">08.02</span>
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">
            {ru ? "НАПИСАТЬ НАМ" : "CONTACT US"}
          </span>
          <span className="h-px flex-1 bg-border" />
        </m.div>

        <div className="grid gap-10 lg:gap-16 lg:grid-cols-2 lg:items-start">
          {/* Left: heading + description */}
          <m.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease }}
          >
            <h2
              className="font-black uppercase leading-[0.92] tracking-tight text-foreground mb-5"
              style={{ fontSize: "clamp(34px, 5vw, 60px)" }}
            >
              {ru ? (
                <>
                  ОСТАЛИСЬ
                  <br />
                  <span className="text-lime">ВОПРОСЫ?</span>
                </>
              ) : (
                <>
                  HAVE A
                  <br />
                  <span className="text-lime">QUESTION?</span>
                </>
              )}
            </h2>
            <p
              className="text-[15px] sm:text-[16px] text-muted-foreground leading-relaxed max-w-md"
              style={{ fontFamily: "var(--font-mulish)" }}
            >
              {ru
                ? "Заполните форму — наш менеджер свяжется с вами в течение рабочего дня. Или напишите нам напрямую."
                : "Fill out the form and our manager will get back to you within a business day. Or reach us directly."}
            </p>
          </m.div>

          {/* Right: form in card */}
          <m.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.1, ease }}
            className="rounded-2xl border border-border bg-card p-6 sm:p-8"
          >
            <ContactForm />
          </m.div>
        </div>
      </div>
    </section>
  );
}
