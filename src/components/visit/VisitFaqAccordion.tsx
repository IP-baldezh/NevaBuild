"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  q: string;
  a: string;
}

export function VisitFaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div
          key={i}
          className="rounded-2xl overflow-hidden transition-all duration-200"
          style={{
            background: open === i ? "rgba(169,236,70,0.05)" : "rgba(255,255,255,0.04)",
            border:
              open === i ? "1px solid rgba(169,236,70,0.20)" : "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left"
          >
            <span className="font-black text-white text-[15px] sm:text-[16px] leading-snug">
              {item.q}
            </span>
            <m.span
              animate={{ rotate: open === i ? 180 : 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="flex-shrink-0"
              style={{ color: "#a9ec46" }}
            >
              <ChevronDown className="size-5" />
            </m.span>
          </button>

          <AnimatePresence initial={false}>
            {open === i && (
              <m.div
                key="content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                style={{ overflow: "hidden" }}
              >
                <p
                  className="px-5 sm:px-6 pb-5 sm:pb-6 leading-relaxed"
                  style={{
                    color: "rgba(255,255,255,0.80)",
                    fontFamily: "var(--font-mulish)",
                    fontSize: "clamp(13px, 1.1vw, 15px)",
                  }}
                >
                  {item.a}
                </p>
              </m.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
