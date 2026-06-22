import { cn } from "@/lib/utils";

type Props = {
  title: string;
  lead?: string;
  children?: React.ReactNode;
  className?: string;
};

/** Компактный hero для внутренних страниц. */
export function PageHero({ title, lead, children, className }: Props) {
  return (
    <section className={cn("relative overflow-hidden border-b border-border bg-background", className)}>
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-blueprint opacity-40" />
      <div className="container-neva relative pb-12 pt-28 md:pt-36">
        <div className="flex items-center gap-3">
          <span className="size-2 bg-brand-red" />
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">NEVA BUILD</span>
        </div>
        <h1 className="mt-6 max-w-3xl text-balance text-4xl font-black uppercase leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl">
          {title}
        </h1>
        {lead && (
          <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            {lead}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
