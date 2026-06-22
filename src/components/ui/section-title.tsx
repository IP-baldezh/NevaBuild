import { cn } from "@/lib/utils";

type Props = {
  index?: string;
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
};

/** Заголовок секции: номер + кикер + разделитель + h2 */
export function SectionTitle({
  index,
  label,
  title,
  description,
  align = "left",
  className,
}: Props) {
  return (
    <div className={cn("flex flex-col gap-5", align === "center" && "items-center text-center", className)}>
      <div className="flex w-full items-center gap-4">
        {index && (
          <span className="shrink-0 text-sm text-lime">{index}</span>
        )}
        {label && (
          <span className="shrink-0 text-xs uppercase tracking-[0.25em] text-muted-foreground">
            {label}
          </span>
        )}
        <span className="h-px flex-1 bg-border" />
      </div>
      <h2 className="max-w-4xl text-balance text-3xl font-black uppercase leading-[1.05] tracking-tight text-foreground sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="max-w-2xl text-pretty leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}
