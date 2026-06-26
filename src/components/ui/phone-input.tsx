"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { Check, ChevronDown } from "lucide-react";
import * as Flags from "country-flag-icons/react/3x2";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/routing";

interface Country {
  code: string;
  dial: string;
  nameRu: string;
  nameEn: string;
  /** Format mask: # = digit, rest is literal */
  mask: string;
  maxDigits: number;
}

const COUNTRIES: Country[] = [
  {
    code: "RU",
    dial: "7",
    nameRu: "Россия",
    nameEn: "Russia",
    mask: "(###) ###-##-##",
    maxDigits: 10,
  },
  {
    code: "BY",
    dial: "375",
    nameRu: "Беларусь",
    nameEn: "Belarus",
    mask: "(##) ###-##-##",
    maxDigits: 9,
  },
  {
    code: "KZ",
    dial: "7",
    nameRu: "Казахстан",
    nameEn: "Kazakhstan",
    mask: "(###) ###-##-##",
    maxDigits: 10,
  },
  {
    code: "UZ",
    dial: "998",
    nameRu: "Узбекистан",
    nameEn: "Uzbekistan",
    mask: "(##) ###-##-##",
    maxDigits: 9,
  },
  {
    code: "AZ",
    dial: "994",
    nameRu: "Азербайджан",
    nameEn: "Azerbaijan",
    mask: "##-###-##-##",
    maxDigits: 9,
  },
  {
    code: "AM",
    dial: "374",
    nameRu: "Армения",
    nameEn: "Armenia",
    mask: "(##) ###-###",
    maxDigits: 8,
  },
  {
    code: "GE",
    dial: "995",
    nameRu: "Грузия",
    nameEn: "Georgia",
    mask: "(###) ##-##-##",
    maxDigits: 9,
  },
  {
    code: "TJ",
    dial: "992",
    nameRu: "Таджикистан",
    nameEn: "Tajikistan",
    mask: "##-###-####",
    maxDigits: 9,
  },
  {
    code: "KG",
    dial: "996",
    nameRu: "Кыргызстан",
    nameEn: "Kyrgyzstan",
    mask: "(###) ###-###",
    maxDigits: 9,
  },
  {
    code: "MD",
    dial: "373",
    nameRu: "Молдова",
    nameEn: "Moldova",
    mask: "(##) ##-##-##",
    maxDigits: 8,
  },
  {
    code: "UA",
    dial: "380",
    nameRu: "Украина",
    nameEn: "Ukraine",
    mask: "(##) ###-##-##",
    maxDigits: 9,
  },
  {
    code: "TR",
    dial: "90",
    nameRu: "Турция",
    nameEn: "Turkey",
    mask: "(###) ###-##-##",
    maxDigits: 10,
  },
  { code: "AE", dial: "971", nameRu: "ОАЭ", nameEn: "UAE", mask: "##-###-####", maxDigits: 9 },
  {
    code: "DE",
    dial: "49",
    nameRu: "Германия",
    nameEn: "Germany",
    mask: "(####) #######",
    maxDigits: 11,
  },
  {
    code: "FR",
    dial: "33",
    nameRu: "Франция",
    nameEn: "France",
    mask: "# ## ## ## ##",
    maxDigits: 9,
  },
  {
    code: "GB",
    dial: "44",
    nameRu: "Великобритания",
    nameEn: "United Kingdom",
    mask: "#### ######",
    maxDigits: 10,
  },
  {
    code: "CN",
    dial: "86",
    nameRu: "Китай",
    nameEn: "China",
    mask: "### #### ####",
    maxDigits: 11,
  },
  {
    code: "US",
    dial: "1",
    nameRu: "США",
    nameEn: "United States",
    mask: "(###) ###-####",
    maxDigits: 10,
  },
];

function applyMask(digits: string, mask: string): string {
  let di = 0;
  let result = "";
  for (let mi = 0; mi < mask.length && di < digits.length; mi++) {
    if (mask[mi] === "#") {
      result += digits[di++];
    } else {
      result += mask[mi];
    }
  }
  return result;
}

function FlagIcon({ code, className }: { code: string; className?: string }) {
  const Flag = Flags[code as keyof typeof Flags];
  if (!Flag) return <span className={cn("text-xs font-bold", className)}>{code}</span>;
  return <Flag className={className} />;
}

export interface PhoneInputProps {
  value?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  invalid?: boolean;
  className?: string;
  id?: string;
}

export function PhoneInput({ onChange, onBlur, invalid, className, id }: PhoneInputProps) {
  const locale = useLocale() as Locale;
  const ru = locale === "ru";

  const [country, setCountry] = useState<Country>(COUNTRIES[0]);
  const [digits, setDigits] = useState("");
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, [open]);

  useEffect(() => {
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, []);

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/\D/g, "").slice(0, country.maxDigits);
    setDigits(raw);
    onChange(raw.length > 0 ? `+${country.dial} ${applyMask(raw, country.mask)}` : "");
  }

  function selectCountry(c: Country) {
    setCountry(c);
    setOpen(false);
    const limited = digits.slice(0, c.maxDigits);
    onChange(limited.length > 0 ? `+${c.dial} ${applyMask(limited, c.mask)}` : "");
  }

  const displayed = applyMask(digits, country.mask);
  const placeholder = country.mask.replace(/#/g, "_");
  const isActive = open || focused;

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {/* Combined input field */}
      <div
        className={cn(
          "flex h-11 w-full rounded-xl border border-input bg-background text-sm shadow-sm transition-all duration-200",
          isActive && "border-nb-dark ring-[3px] ring-nb-dark/10",
          invalid && !isActive && "border-destructive",
        )}
      >
        {/* Country selector trigger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={ru ? "Выбрать страну" : "Select country"}
          aria-haspopup="listbox"
          aria-expanded={open}
          className="flex items-center gap-1.5 pl-3 pr-2.5 shrink-0 border-r border-input hover:bg-muted/40 rounded-l-xl transition-colors duration-150"
        >
          <FlagIcon
            code={country.code}
            className="w-5 h-[14px] rounded-[2px] object-cover flex-shrink-0"
          />
          <span className="text-[13px] font-semibold tabular-nums text-foreground leading-none">
            +{country.dial}
          </span>
          <ChevronDown
            className={cn(
              "size-3 text-muted-foreground transition-transform duration-200",
              open && "rotate-180",
            )}
          />
        </button>

        {/* Phone number input */}
        <input
          id={id}
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          value={displayed}
          onChange={handleInput}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            onBlur?.();
          }}
          placeholder={placeholder}
          aria-invalid={invalid}
          className="flex-1 min-w-0 px-3 bg-transparent outline-none placeholder:text-muted-foreground/40 text-sm"
        />
      </div>

      {/* Country dropdown */}
      {open && (
        <div
          role="listbox"
          aria-label={ru ? "Выберите страну" : "Select country"}
          className="absolute top-full left-0 z-50 mt-1.5 w-64 rounded-2xl border border-nb-border bg-background shadow-xl overflow-hidden"
        >
          <div
            className="h-[3px] w-full"
            style={{ background: "linear-gradient(90deg, #12B669, #a9ec46)" }}
            aria-hidden
          />
          <div className="max-h-60 overflow-y-auto py-1.5">
            {COUNTRIES.map((c) => {
              const selected = c.code === country.code;
              return (
                <button
                  key={c.code}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => selectCountry(c)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors duration-100",
                    selected
                      ? "bg-nb-dark text-nb-lime-acid"
                      : "text-foreground hover:bg-nb-bg-light",
                  )}
                >
                  <FlagIcon
                    code={c.code}
                    className="w-5 h-[14px] rounded-[2px] object-cover flex-shrink-0"
                  />
                  <span className="flex-1 text-left truncate font-medium">
                    {ru ? c.nameRu : c.nameEn}
                  </span>
                  <span
                    className={cn(
                      "text-xs tabular-nums shrink-0",
                      selected ? "text-nb-lime-acid/70" : "text-muted-foreground",
                    )}
                  >
                    +{c.dial}
                  </span>
                  {selected && <Check className="size-3.5 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
