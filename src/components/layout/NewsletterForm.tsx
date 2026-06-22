"use client";

import { ArrowRight } from "lucide-react";

export function NewsletterForm() {
  return (
    <form
      className="flex border border-border focus-within:border-lime"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="email"
        required
        placeholder="E-mail"
        aria-label="Электронная почта"
        className="h-12 w-full bg-transparent px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
      />
      <button
        type="submit"
        className="inline-flex size-12 shrink-0 items-center justify-center bg-lime text-lime-foreground transition-colors hover:bg-foreground"
        aria-label="Подписаться"
      >
        <ArrowRight className="size-5" />
      </button>
    </form>
  );
}
