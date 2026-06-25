import { Marquee } from "@/components/ui/marquee";

const ITEMS = [
  "СТРОИТЕЛЬСТВО",
  "АРХИТЕКТУРА",
  "ИНТЕРЬЕР",
  "ДИЗАЙН",
  "ТЕХНОЛОГИИ",
  "МАТЕРИАЛЫ",
  "ИННОВАЦИИ",
  "ДЕВЕЛОПМЕНТ",
  "ИНЖИНИРИНГ",
  "ЭКСПОФОРУМ",
];

function Dot() {
  return <span className="mx-6 size-1.5 shrink-0 rounded-full " aria-hidden />;
}

export function MarqueeTicker({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div
        className="py-[13px] overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, rgb(18, 182, 105) 0%, rgb(169, 236, 70) 55%, rgb(212, 247, 114) 100%)",
        }}
      >
        <Marquee speed="normal" pauseOnHover={false}>
          {ITEMS.map((item) => (
            <span
              key={item}
              className="flex shrink-0 items-center text-[11px] font-bold uppercase tracking-[0.35em] text-black"
            >
              {item}
              <Dot />
            </span>
          ))}
        </Marquee>
      </div>
    </div>
  );
}
