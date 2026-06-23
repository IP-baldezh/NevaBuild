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
  return <span className="mx-6 size-1.5 shrink-0 rounded-full bg-lime" aria-hidden />;
}

export function MarqueeTicker({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="bg-foreground py-[13px] overflow-hidden">
        <Marquee speed="normal" pauseOnHover={false}>
          {ITEMS.map((item) => (
            <span
              key={item}
              className="flex shrink-0 items-center text-[11px] font-bold uppercase tracking-[0.35em] text-white/45"
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
