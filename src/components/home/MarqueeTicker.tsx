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
  return <span className="mx-6 size-1.5 shrink-0 bg-lime" aria-hidden />;
}

export function MarqueeTicker({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="border-y border-border bg-card py-4 overflow-hidden">
        <Marquee speed="normal" pauseOnHover={false}>
          {ITEMS.map((item) => (
            <span
              key={item}
              className="flex shrink-0 items-center text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground"
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
