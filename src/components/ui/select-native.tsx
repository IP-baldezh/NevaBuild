import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Стилизованный нативный <select>: доступный, лёгкий, без лишнего клиентского JS.
 * Используется в формах и фильтрах каталога.
 */
function SelectNative({ className, children, ...props }: React.ComponentProps<"select">) {
  return (
    <div className="relative">
      <select
        data-slot="select-native"
        className={cn(
          "flex h-11 w-full appearance-none rounded-xl border border-input bg-background px-3.5 pr-10 text-sm shadow-sm outline-none transition-all duration-200 hover:border-foreground/30 focus-visible:border-foreground focus-visible:ring-[3px] focus-visible:ring-foreground/10 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
    </div>
  );
}

export { SelectNative };
