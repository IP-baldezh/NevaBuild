import Link from "next/link";
import { Clock } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/button";

export function AccountStub({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="w-full max-w-md rounded-3xl border bg-card p-8 text-center shadow-sm">
      <div className="flex justify-center">
        <Logo />
      </div>
      <span className="mx-auto mt-6 flex size-14 items-center justify-center rounded-full bg-secondary text-brand-red">
        <Clock className="size-7" />
      </span>
      <h1 className="mt-4 text-xl font-bold">{title}</h1>
      <p className="mt-2 text-muted-foreground">{text}</p>
      <Button asChild className="mt-6">
        <Link href="/">На главную</Link>
      </Button>
    </div>
  );
}
