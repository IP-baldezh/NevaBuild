import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  description?: string;
  priceLabel: string;
  benefits: string[];
  benefitsLabel: string;
  selected: boolean;
  featured?: boolean;
  onSelect: () => void;
};

export function TicketCard({
  title,
  description,
  priceLabel,
  benefits,
  benefitsLabel,
  selected,
  featured,
  onSelect,
}: Props) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        "flex h-full flex-col rounded-3xl border-2 bg-card p-6 text-left transition-all",
        selected
          ? "border-brand-red shadow-lg"
          : "border-border hover:border-brand-mint hover:shadow-md",
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-xl font-extrabold">{title}</h3>
        {featured && (
          <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-bold text-accent-foreground">
            ★
          </span>
        )}
      </div>
      {description && <p className="mt-2 text-sm text-muted-foreground">{description}</p>}
      <div className="mt-4 text-3xl font-extrabold text-neva-gradient">{priceLabel}</div>

      <div className="mt-5 border-t pt-5">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {benefitsLabel}
        </p>
        <ul className="space-y-2">
          {benefits.map((b) => (
            <li key={b} className="flex items-start gap-2 text-sm">
              <Check className="mt-0.5 size-4 shrink-0 text-brand-red" strokeWidth={3} />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>

      <div
        className={cn(
          "mt-6 rounded-full py-2.5 text-center text-sm font-semibold transition-colors",
          selected ? "bg-brand-red text-white" : "bg-secondary text-secondary-foreground",
        )}
      >
        {selected ? "✓" : ""} {title}
      </div>
    </button>
  );
}
