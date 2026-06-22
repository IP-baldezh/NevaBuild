import { cn } from "@/lib/utils";

/**
 * Бесконечная бегущая строка. Контент дублируется дважды для бесшовного цикла.
 * Скорость: speed="normal" | "fast".
 */
export function Marquee({
  children,
  speed = "normal",
  className,
  reverse = false,
  pauseOnHover = true,
}: {
  children: React.ReactNode;
  speed?: "normal" | "fast";
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
}) {
  return (
    <div className={cn("group flex w-full overflow-hidden", className)}>
      <div
        className={cn(
          "flex shrink-0 items-center [will-change:transform]",
          speed === "fast" ? "animate-marquee-fast" : "animate-marquee",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover:[animation-play-state:paused]",
        )}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
