"use client";

import { useState } from "react";
import { Send, Check, Loader2 } from "lucide-react";
import { submitNewsletter } from "@/server/actions/leads";

type Props = {
  placeholder: string;
  submitLabel: string;
  noSpamLabel: string;
};

export function FooterNewsletterForm({ placeholder, submitLabel, noSpamLabel }: Props) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await submitNewsletter(email);
    setLoading(false);
    if (res.ok) {
      setDone(true);
    } else {
      setError("Проверьте адрес и попробуйте ещё раз.");
    }
  }

  if (done) {
    return (
      <div className="flex items-center gap-2.5 rounded-full bg-white/5 ring-1 ring-white/10 px-4 py-3">
        <Check className="size-4 shrink-0" style={{ color: "#a9ec46" }} />
        <span className="text-sm text-white/80">Вы подписаны. Спасибо!</span>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <div className="flex-1">
          <label htmlFor="footer-email" className="sr-only">
            Email
          </label>
          <input
            id="footer-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            className="w-full rounded-full bg-white/5 text-white placeholder-white/40 px-4 py-3 text-sm ring-1 ring-white/10 focus:ring-2 focus:ring-white/25 outline-none transition-all"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-full bg-white text-zinc-900 px-4 py-3 text-sm font-bold ring-1 ring-white/10 hover:bg-white/90 transition-colors whitespace-nowrap disabled:opacity-60"
        >
          {loading ? <Loader2 className="size-3.5 animate-spin" /> : <Send className="size-3.5" />}
          {submitLabel}
        </button>
      </form>
      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
      {!error && <p className="mt-2 text-xs text-white/65">{noSpamLabel}</p>}
    </div>
  );
}
