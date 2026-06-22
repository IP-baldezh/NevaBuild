import { cn } from "@/lib/utils";

type Variant = "plain" | "soft" | "dark" | "muted";

type Props = {
  children: React.ReactNode;
  id?: string;
  variant?: Variant;
  className?: string;
  containerClassName?: string;
};

const BG: Record<Variant, string> = {
  plain: "bg-background",
  soft: "bg-card",
  dark: "bg-card",
  muted: "bg-card",
};

/** Секция-обёртка с разделителем и стандартными отступами. */
export function GradientSection({
  children,
  id,
  variant = "plain",
  className,
  containerClassName,
}: Props) {
  return (
    <section
      id={id}
      className={cn("relative border-t border-border py-20 md:py-28", BG[variant], className)}
    >
      <div className={cn("container-neva", containerClassName)}>{children}</div>
    </section>
  );
}
