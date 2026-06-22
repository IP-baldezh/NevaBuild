import {
  AppWindow,
  Armchair,
  BrickWall,
  Building2,
  Cable,
  Cpu,
  DraftingCompass,
  Hammer,
  HardHat,
  Lightbulb,
  PaintRoller,
  Sofa,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  BrickWall,
  PaintRoller,
  AppWindow,
  Cable,
  HardHat,
  Hammer,
  DraftingCompass,
  Cpu,
  Sofa,
  Armchair,
  Lightbulb,
  Sparkles,
};

/** Возвращает lucide-иконку по имени из БД, c фолбэком. */
export function getCategoryIcon(name?: string | null): LucideIcon {
  if (name && CATEGORY_ICONS[name]) return CATEGORY_ICONS[name];
  return Building2;
}
