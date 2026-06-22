"use client";

import { m, type Transition } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// Только transform + opacity — compositor-only, 60fps
const BASE_TRANSITION: Transition = {
  duration: 0.45,
  ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number],
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: BASE_TRANSITION },
};

/** Одиночное появление блока при скролле (opacity + translateY, compositor-only) */
export function ScrollReveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <m.div
      className={cn(className)}
      style={{ willChange: "transform, opacity" }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: itemVariants.hidden,
        visible: {
          ...itemVariants.visible,
          transition: { ...BASE_TRANSITION, delay },
        },
      }}
    >
      {children}
    </m.div>
  );
}

/** Контейнер stagger-анимации (один IntersectionObserver на всю группу) */
export function StaggerReveal({
  children,
  className,
  stagger = 0.06,
  margin = "-60px",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  margin?: string;
}) {
  return (
    <m.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </m.div>
  );
}

/** Элемент внутри StaggerReveal */
export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <m.div
      className={cn(className)}
      style={{ willChange: "transform, opacity" }}
      variants={itemVariants}
    >
      {children}
    </m.div>
  );
}
