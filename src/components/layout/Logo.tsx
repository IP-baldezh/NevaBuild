import { cn } from "@/lib/utils";

type LogoProps = {
  variant?: "dark" | "light";
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5 select-none", className)}>
      <span className="relative inline-flex size-8 items-center justify-center">
        <span className="absolute inset-0 border-2 border-foreground" />
        <span className="absolute -right-1 -top-1 size-3 bg-brand-red" />
        <span className="text-[0.6rem] font-black tracking-tight text-foreground">NB</span>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-extrabold text-base tracking-tight text-foreground">
          NEVA<span className="text-lime">BUILD</span>
        </span>
        <span className="mt-0.5 text-[0.58rem] uppercase tracking-[0.2em] text-muted-foreground">
          Expo · 2027
        </span>
      </span>
    </span>
  );
}
