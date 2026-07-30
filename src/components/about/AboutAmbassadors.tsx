"use client";

import { useState } from "react";
import { m } from "framer-motion";
import { useLocale } from "next-intl";
import { Star } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { ExhibitorModal } from "@/components/modals/ExhibitorModal";

export function AboutAmbassadors() {
  const locale = useLocale() as Locale;
  const ru = locale === "ru";
  const [exhibitorOpen, setExhibitorOpen] = useState(false);

  return (
    <section
      className="relative z-10 py-20 sm:py-28"
      style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
    >
      <div className="container-neva">
        <m.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl overflow-hidden p-10 sm:p-16 flex flex-col md:flex-row items-center gap-10"
          style={{
            background: "linear-gradient(135deg, #0e2a14 0%, #071510 60%, #0a1a10 100%)",
            border: "1px solid rgba(169,236,70,0.15)",
          }}
        >
          {/* Icon */}
          <div
            className="size-20 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{
              background: "rgba(169,236,70,0.10)",
              border: "1px solid rgba(169,236,70,0.20)",
            }}
          >
            <Star className="size-9" style={{ color: "#a9ec46" }} />
          </div>

          {/* Text */}
          <div className="flex-1 text-center md:text-left">
            <h2
              className="font-black text-white leading-tight mb-3"
              style={{ fontSize: "clamp(24px, 3vw, 44px)" }}
            >
              {ru ? "Амбассадоры" : "Ambassadors"}
            </h2>
            <p
              className="leading-relaxed"
              style={{
                color: "rgba(255,255,255,0.75)",
                fontFamily: "var(--font-mulish)",
                fontSize: "clamp(14px, 1.1vw, 17px)",
                maxWidth: "520px",
              }}
            >
              {ru
                ? "Приглашаем Вас стать лицом выставки НеваБилд"
                : "We invite you to become the face of the NevaBuild exhibition"}
            </p>
          </div>

          {/* CTA */}
          <button
            type="button"
            onClick={() => setExhibitorOpen(true)}
            className="flex-shrink-0 inline-flex items-center justify-center rounded-xl font-black text-[12px] tracking-[0.14em] uppercase px-8 py-4 border transition-all duration-200 hover:bg-white/10 touch-manipulation"
            style={{ borderColor: "rgba(169,236,70,0.5)", color: "#a9ec46" }}
          >
            {ru ? "Стать амбассадором" : "Become an Ambassador"}
          </button>
        </m.div>
      </div>

      <ExhibitorModal open={exhibitorOpen} onClose={() => setExhibitorOpen(false)} />
    </section>
  );
}
