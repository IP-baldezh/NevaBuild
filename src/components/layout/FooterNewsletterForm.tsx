"use client";

import { Send } from "lucide-react";

type Props = {
  placeholder: string;
  submitLabel: string;
  noSpamLabel: string;
};

export function FooterNewsletterForm({ placeholder, submitLabel, noSpamLabel }: Props) {
  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2">
        <div className="flex-1">
          <label htmlFor="footer-email" className="sr-only">
            Email
          </label>
          <input
            id="footer-email"
            type="email"
            required
            placeholder={placeholder}
            className="w-full rounded-full bg-white/5 text-white placeholder-white/40 px-4 py-3 text-sm ring-1 ring-white/10 focus:ring-2 focus:ring-white/25 outline-none transition-all"
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-full bg-white text-zinc-900 px-4 py-3 text-sm font-bold ring-1 ring-white/10 hover:bg-white/90 transition-colors whitespace-nowrap"
        >
          {submitLabel}
          <Send className="size-3.5" />
        </button>
      </form>
      <p className="mt-2 text-xs text-white/40">{noSpamLabel}</p>
    </div>
  );
}
