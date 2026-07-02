import Image from "next/image";

const SPONSORS = [
  { name: "Knauf", logo: "/images/partners/knauf.svg" },
  { name: "Rockwool", logo: "/images/partners/rockwool.svg" },
  { name: "Saint-Gobain", logo: "/images/partners/saint-gobain.svg" },
  { name: "Rehau", logo: "/images/partners/rehau.svg" },
  { name: "Grundfos", logo: "/images/partners/grundfos.svg" },
];

export function ProgramSponsors({ ru }: { ru: boolean }) {
  return (
    <div className="pb-10 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
      <p
        className="text-[10px] font-bold uppercase tracking-[0.22em] mb-5"
        style={{ color: "rgba(255,255,255,0.28)", fontFamily: "var(--font-mulish)" }}
      >
        {ru ? "Партнёры программы" : "Programme Partners"}
      </p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {SPONSORS.map((s) => (
          <div
            key={s.name}
            className="flex items-center justify-center rounded-2xl px-5 py-5 transition-all duration-200 hover:border-white/20"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              minHeight: "72px",
            }}
          >
            <Image
              src={s.logo}
              alt={s.name}
              width={100}
              height={36}
              className="object-contain max-h-9 w-auto opacity-70 hover:opacity-95 transition-opacity duration-200"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
