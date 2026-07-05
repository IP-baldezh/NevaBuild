const SPONSORS = [
  { name: "Knauf", logo: "/images/partners/knauf.svg" },
  { name: "Rockwool", logo: "/images/partners/rockwool.svg" },
  { name: "Saint-Gobain", logo: "/images/partners/saint-gobain.svg" },
  { name: "Rehau", logo: "/images/partners/rehau.svg" },
  { name: "Grundfos", logo: "/images/partners/grundfos.svg" },
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
        className="text-[10px] font-bold uppercase tracking-[0.22em] mb-6"
        style={{ color: "rgba(255,255,255,0.60)", fontFamily: "var(--font-mulish)" }}
      >
        {ru ? "Партнёры программы" : "Programme Partners"}
      </p>

      {/* Edge-to-edge marquee — без горизонтального padding и боковых затемнений */}
      <div className="overflow-hidden -mx-5 md:-mx-10 lg:-mx-16">
        <div className="flex animate-scroll-x" style={{ width: "max-content" }}>
          {SPONSORS.map((s, i) => (
            <div
              key={`${s.name}-${i}`}
              className="flex-shrink-0 mx-2 flex items-center justify-center rounded-xl transition-all duration-200"
              style={{
                width: "200px",
                height: "72px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.logo}
                alt={s.name}
                className="w-full h-full object-contain p-2"
                draggable={false}
                style={{ opacity: 0.75 }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
