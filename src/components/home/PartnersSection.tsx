"use client";

import { useLocale } from "next-intl";
import type { Partner } from "@prisma/client";

const STATIC_LOGOS = [
  { name: "ТЕХНОНИКОЛЬ", src: "/images/partners/tehnonikol.svg" },
  { name: "ROCKWOOL", src: "/images/partners/rockwool.svg" },
  { name: "KNAUF", src: "/images/partners/knauf.svg" },
  { name: "SAINT-GOBAIN", src: "/images/partners/saint-gobain.svg" },
  { name: "VELUX", src: "/images/partners/velux.svg" },
  { name: "REHAU", src: "/images/partners/rehau.svg" },
  { name: "GRUNDFOS", src: "/images/partners/grundfos.svg" },
  { name: "BOSCH", src: "/images/partners/bosch.svg" },
  { name: "SCHNEIDER", src: "/images/partners/schneider.svg" },
  { name: "ПИК", src: "/images/partners/pik.svg" },
  { name: "ЛСР", src: "/images/partners/lsr.svg" },
  { name: "SETL GROUP", src: "/images/partners/setl.svg" },
  { name: "ЭТАЛОН", src: "/images/partners/etalon.svg" },
];

export function PartnersSection({ partners }: { partners: Partner[] }) {
  const locale = useLocale();
  const doubled = [...STATIC_LOGOS, ...STATIC_LOGOS];

  return (
    <section
      className="relative z-10 py-16 overflow-hidden"
      style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
    >
      <div className="container-neva mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <span
            className="text-[11px] uppercase tracking-[0.28em] font-bold block mb-1"
            style={{ color: "#a9ec46", fontFamily: "var(--font-mulish)" }}
          >
            {locale === "ru" ? "Партнёры" : "Partners"}
          </span>
          <h2 className="font-black text-white" style={{ fontSize: "clamp(20px, 2.5vw, 28px)" }}>
            {locale === "ru" ? "Генеральные партнёры и спонсоры" : "General Partners & Sponsors"}
          </h2>
          <a
            href="#"
            className="font-bold text-[13px] pb-0.5 transition-colors duration-200 self-start sm:self-auto"
            style={{ color: "#a9ec46", borderBottom: "1px solid rgba(169,236,70,0.4)" }}
          >
            {locale === "ru" ? "Стать партнёром" : "Become a Partner"}
          </a>
        </div>
      </div>

      <div className="relative">
        <div
          className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, #07100a, transparent)" }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, #07100a, transparent)" }}
        />

        <div className="flex animate-scroll-x" style={{ width: "max-content" }}>
          {doubled.map(({ name, src }, i) => (
            <div
              key={`${name}-${i}`}
              className="flex-shrink-0 mx-3 flex items-center justify-center h-14 rounded-xl transition-all duration-200 cursor-pointer overflow-hidden"
              style={{
                width: "160px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={name}
                className="w-full h-full object-contain p-3"
                draggable={false}
                style={{ filter: "brightness(0) invert(1)", opacity: 0.55 }}
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = "none";
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = `<span style="font-size:11px;font-weight:700;color:rgba(255,255,255,0.4);text-align:center;padding:0 8px;letter-spacing:0.1em">${name}</span>`;
                  }
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {partners.filter((p) => p.logoUrl).length > 0 && (
        <div className="container-neva mt-10">
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {partners
              .filter((p) => p.logoUrl)
              .map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-center h-14 rounded-xl overflow-hidden"
                  style={{
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
                    style={{ filter: "brightness(0) invert(1)", opacity: 0.55 }}
                  />
                </div>
              ))}
          </div>
        </div>
      )}
    </section>
  );
}
