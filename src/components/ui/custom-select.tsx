"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  options: SelectOption[];
  invalid?: boolean;
  className?: string;
}

export function CustomSelect({
  value,
  onChange,
  placeholder,
  options,
  invalid,
  className,
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={cn(
          "flex h-11 w-full items-center justify-between rounded-xl border px-3.5 text-sm transition-all duration-200 bg-background",
          open
            ? "border-nb-dark ring-[3px] ring-nb-dark/10"
            : "border-input hover:border-nb-dark/30",
          invalid && !open && "border-destructive",
        )}
      >
        <span className={selected ? "font-medium text-nb-dark" : "text-muted-foreground"}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          className={cn(
            "size-4 flex-shrink-0 text-muted-foreground transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>

      {open && (
        <div
          className="absolute left-0 right-0 z-50 mt-1.5 overflow-hidden rounded-2xl border border-nb-border bg-white shadow-2xl shadow-black/10"
          style={{ top: "100%" }}
        >
          <div
            className="h-[3px]"
            style={{ background: "linear-gradient(90deg, #a9ec46, #a9ec46)" }}
          />
          <ul role="listbox" className="py-2 px-1.5 max-h-60 overflow-y-auto">
            {options.map((option) => {
              const isSelected = option.value === value;
              return (
                <li
                  key={option.value}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex items-center justify-between rounded-xl px-3.5 py-2.5 cursor-pointer transition-all duration-150 select-none",
                    isSelected
                      ? "bg-nb-dark text-nb-lime-acid"
                      : "text-nb-dark hover:bg-nb-bg-light",
                  )}
                >
                  <span className="font-semibold text-[14px]">{option.label}</span>
                  {isSelected && <Check className="size-4 text-nb-lime-acid flex-shrink-0" />}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
