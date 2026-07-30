"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import type { Partner } from "@prisma/client";
import { SimpleLeadModal } from "@/components/modals/SimpleLeadModal";

export function PartnersSection({ partners }: { partners: Partner[] }) {
  const locale = useLocale();
  const ru = locale === "ru";
  const [exhibitorOpen, setExhibitorOpen] = useState(false);

  return (
    <section
      className="relative z-10 py-10 sm:py-16"
      style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
    >
      <div className="container-neva">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <span
              className="text-[11px] uppercase tracking-[0.28em] font-bold block mb-1"
              style={{ color: "#a9ec46", fontFamily: "var(--font-mulish)" }}
            >
              {ru ? "Партнёры" : "Partners"}
            </span>
            <h2 className="font-black text-white" style={{ fontSize: "clamp(20px, 2.5vw, 28px)" }}>
              {ru ? "Генеральные партнёры и спонсоры" : "General Partners & Sponsors"}
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setExhibitorOpen(true)}
            className="inline-flex items-center justify-center rounded-xl font-black text-[12px] tracking-[0.14em] uppercase px-8 py-4 border transition-all duration-200 hover:bg-white/10 touch-manipulation self-start sm:self-auto flex-shrink-0"
            style={{ borderColor: "rgba(169,236,70,0.5)", color: "#a9ec46" }}
          >
            {ru ? "Стать партнёром на особых условиях" : "Become a Partner on Special Terms"}
          </button>
        </div>

        {partners.filter((p) => p.logoUrl).length > 0 && (
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {partners
              .filter((p) => p.logoUrl)
              .map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-center rounded-xl overflow-hidden"
                  style={{
                    height: "72px",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.logoUrl!}
                    alt={p.name}
                    className="w-full h-full object-contain p-2"
                    draggable={false}
                    style={{ opacity: 0.8 }}
                  />
                </div>
              ))}
          </div>
        )}
      </div>

      <SimpleLeadModal
        open={exhibitorOpen}
        onClose={() => setExhibitorOpen(false)}
        eyebrowRu="NEVA BUILD 2027 · ПАРТНЁРСТВО"
        eyebrowEn="NEVA BUILD 2027 · PARTNERSHIP"
        titleRu="Стать партнёром выставки"
        titleEn="Become an Exhibition Partner"
        subtitleRu="Оставьте заявку — мы свяжемся с вами в течение рабочего дня"
        subtitleEn="Leave a request — we will contact you within the working day"
        notifyTitle="Заявка партнёра"
      />
    </section>
  );
}
