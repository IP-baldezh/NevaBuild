import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold uppercase tracking-wide transition-colors duration-200 disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-lime text-lime-foreground hover:bg-foreground hover:text-background",
        accent: "bg-lime text-lime-foreground hover:bg-foreground hover:text-background",
        red: "bg-brand-red text-white hover:bg-foreground hover:text-background",
        dark: "bg-foreground text-background hover:bg-foreground/80",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/70",
        outline: "border border-border bg-transparent text-foreground hover:border-lime hover:text-lime",
        ghost: "hover:bg-secondary hover:text-secondary-foreground",
        link: "text-lime underline-offset-4 hover:underline px-0",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        default: "h-12 px-6",
        lg: "h-12 px-8",
        xl: "h-12 px-10",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
