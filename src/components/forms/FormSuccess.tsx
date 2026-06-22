import { CheckCircle2 } from "lucide-react";

export function FormSuccess({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-brand-mint/40 bg-secondary p-8 text-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-accent text-accent-foreground">
        <CheckCircle2 className="size-7" />
      </span>
      <h3 className="mt-4 text-xl font-bold">{title}</h3>
      <p className="mt-2 text-muted-foreground">{text}</p>
    </div>
  );
}
