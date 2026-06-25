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
    <section className="py-16 bg-nb-bg-light border-y border-nb-border overflow-hidden">
      <div className="container-neva mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2
              className="font-black text-nb-dark mt-1"
              style={{ fontSize: "clamp(20px, 2.5vw, 28px)" }}
            >
              {locale === "ru" ? "Генеральные партнёры и спонсоры" : "General Partners & Sponsors"}
            </h2>
          </div>
          <a
            href="#"
            className="font-bold text-[13px] text-nb-green-dark hover:text-nb-lime-acid border-b border-nb-green/30 pb-0.5 transition-colors duration-200 self-start sm:self-auto"
          >
            {locale === "ru" ? "Стать партнёром" : "Become a Partner"}
          </a>
        </div>
      </div>

      {/* Scrolling ticker */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-nb-bg-light to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-nb-bg-light to-transparent z-10 pointer-events-none" />

        <div className="flex animate-scroll-x" style={{ width: "max-content" }}>
          {doubled.map(({ name, src }, i) => (
            <div
              key={`${name}-${i}`}
              className="flex-shrink-0 mx-3 flex items-center justify-center h-16 bg-white border border-nb-border rounded-xl hover:border-nb-lime-acid hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden"
              style={{ width: "160px", padding: "0" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={name}
                className="w-full h-full object-contain p-2"
                draggable={false}
                style={{ width: "160px", padding: "0" }}
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = "none";
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = `<span class="text-xs font-bold text-nb-muted-dark uppercase tracking-wider px-2 text-center">${name}</span>`;
                  }
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* DB partners grid — only company logos, no person names */}
      {partners.filter((p) => p.logoUrl).length > 0 && (
        <div className="container-neva mt-10">
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {partners
              .filter((p) => p.logoUrl)
              .map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-center h-14 bg-white border border-nb-border rounded-xl overflow-hidden"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.logoUrl!}
                    alt={p.name}
                    className="w-full h-full object-contain p-2"
                    draggable={false}
                  />
                </div>
              ))}
          </div>
        </div>
      )}
    </section>
  );
}
