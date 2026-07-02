import Image from "next/image";
import { getPartners } from "@/server/services/partners";

const SLOTS = 5;

const FALLBACK_NAMES = [
  "Партнёр выставки",
  "Партнёр выставки",
  "Партнёр выставки",
  "Партнёр выставки",
  "Партнёр выставки",
];

export async function ProgramSponsors({ ru }: { ru: boolean }) {
  const partners = await getPartners();
  const displayed = partners.slice(0, SLOTS);
  const placeholderCount = Math.max(0, SLOTS - displayed.length);

  return (
    <div className="pb-10 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
      <p
        className="text-[10px] font-bold uppercase tracking-[0.22em] mb-5"
        style={{ color: "rgba(255,255,255,0.28)", fontFamily: "var(--font-mulish)" }}
      >
        {ru ? "Партнёры программы" : "Programme Partners"}
      </p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {displayed.map((p) => (
          <div
            key={p.id}
            className="last:col-span-2 last:sm:col-span-1 flex items-center justify-center rounded-2xl px-4 py-5"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              minHeight: "72px",
            }}
          >
            {p.logoUrl ? (
              <Image
                src={p.logoUrl}
                alt={p.name}
                width={120}
                height={40}
                className="object-contain max-h-10 w-auto opacity-70"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            ) : (
              <span
                className="text-sm font-black tracking-tight text-center leading-tight"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                {p.name}
              </span>
            )}
          </div>
        ))}

        {Array.from({ length: placeholderCount }).map((_, i) => (
          <div
            key={`ph-${i}`}
            className="last:col-span-2 last:sm:col-span-1 flex items-center justify-center rounded-2xl px-4 py-5"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px dashed rgba(255,255,255,0.08)",
              minHeight: "72px",
            }}
          >
            <span
              className="text-[11px] font-bold uppercase tracking-[0.12em] text-center"
              style={{ color: "rgba(255,255,255,0.18)" }}
            >
              {FALLBACK_NAMES[i] ?? "Партнёр"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
