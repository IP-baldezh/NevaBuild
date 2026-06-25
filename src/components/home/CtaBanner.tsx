import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

const TRUST = [
  { value: "40 000+", label: "посетителей" },
  { value: "15 лет", label: "на рынке" },
  { value: "№ 1", label: "в регионе" },
];

export function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-nb-dark">
      {/* Green glow accents */}
      <div
        className="absolute -left-40 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(18,182,105,0.18) 0%, transparent 70%)",
        }}
        aria-hidden
      />
      <div
        className="absolute -right-40 bottom-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(169,236,70,0.08) 0%, transparent 70%)",
        }}
        aria-hidden
      />

      {/* Top green line */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-nb-green to-transparent" />

      <div className="container-neva relative py-24 md:py-32">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-nb-green animate-pulse" />
          <span className="text-[11px] uppercase tracking-[0.3em] text-white/50">
            Санкт-Петербург · Экспофорум
          </span>
        </div>

        <h2
          className="font-black leading-[0.92] tracking-tight text-white mb-6"
          style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
        >
          Станьте частью <span style={{ color: "#12B669" }}>NEVA BUILD</span>
        </h2>

        <p className="max-w-2xl text-[16px] leading-relaxed text-white/60 mb-10">
          Покажите свои решения профессиональной аудитории строительной индустрии. Присоединяйтесь к
          500+ компаниям из 35 стран.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/exhibit"
            className="inline-flex items-center gap-2 font-bold text-[14px] px-7 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 text-white"
            style={{
              background: "#12B669",
              boxShadow: "0 8px 24px rgba(18,182,105,0.35)",
            }}
          >
            Стать участником
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/tickets"
            className="inline-flex items-center gap-2 font-bold text-[14px] px-7 py-3.5 rounded-xl text-white transition-all duration-200 hover:bg-white/10"
            style={{ border: "1px solid rgba(255,255,255,0.25)" }}
          >
            Получить билет
          </Link>
        </div>

        {/* Trust signals */}
        <div className="mt-16 flex flex-wrap gap-8 lg:gap-16">
          {TRUST.map(({ value, label }) => (
            <div key={label} className="flex flex-col">
              <span
                className="font-black text-white leading-none"
                style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}
              >
                {value}
              </span>
              <span className="text-[12px] uppercase tracking-[0.2em] text-white/45 mt-1">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom green line */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-nb-green to-transparent" />
    </section>
  );
}
