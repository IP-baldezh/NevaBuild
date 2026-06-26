"use client";

import { useEffect } from "react";
import { AnimatePresence, m } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

export function Modal({ open, onClose, children, size = "md" }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4"
          aria-modal="true"
          role="dialog"
        >
          <m.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden
          />
          <m.div
            className={cn(
              "relative z-10 w-full bg-white shadow-2xl overflow-hidden flex flex-col",
              "rounded-t-3xl sm:rounded-3xl max-h-[92dvh]",
              size === "sm" && "sm:max-w-[480px]",
              size === "md" && "sm:max-w-[660px]",
              size === "lg" && "sm:max-w-[780px]",
            )}
            initial={{ opacity: 0, y: 48, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
          >
            {children}
          </m.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export function ModalCloseButton({
  onClose,
  variant = "dark",
}: {
  onClose: () => void;
  variant?: "dark" | "light";
}) {
  return (
    <button
      type="button"
      onClick={onClose}
      aria-label="Закрыть"
      className={cn(
        "absolute top-4 right-4 z-20 size-9 flex items-center justify-center rounded-full transition-colors",
        variant === "dark"
          ? "bg-white/15 hover:bg-white/25 text-white"
          : "bg-black/10 hover:bg-black/20 text-nb-dark",
      )}
    >
      <X className="size-[18px]" />
    </button>
  );
}
