import type React from "react";
import type { LucideIcon } from "lucide-react";
import {
  Layers,
  Palette,
  Wrench,
  Sofa,
  SquareDashedBottom,
  Building2,
  Zap,
  Home,
  Compass,
  Wifi,
  Shield,
  Package,
  Paintbrush,
  Hammer,
  HardHat,
  Lightbulb,
  Thermometer,
  Wind,
  Droplets,
  Settings,
  Factory,
  Warehouse,
  LayoutGrid,
  PaintBucket,
  Ruler,
  DoorOpen,
  Truck,
  Cpu,
} from "lucide-react";

export const ICON_MAP: Record<string, LucideIcon> = {
  Layers,
  Palette,
  Wrench,
  Sofa,
  SquareDashedBottom,
  Building2,
  Zap,
  Home,
  Compass,
  Wifi,
  Shield,
  Package,
  Paintbrush,
  Hammer,
  HardHat,
  Lightbulb,
  Thermometer,
  Wind,
  Droplets,
  Settings,
  Factory,
  Warehouse,
  LayoutGrid,
  PaintBucket,
  Ruler,
  DoorOpen,
  Truck,
  Cpu,
};

// Matches SECTIONS_RU bgs + EXTRA_BGS from AboutSectionsDark
export const CARD_BGS = [
  "linear-gradient(150deg, #1e3a2b 0%, #0a1510 100%)",
  "linear-gradient(150deg, #1a2e38 0%, #0a1510 100%)",
  "linear-gradient(150deg, #18283a 0%, #0a1510 100%)",
  "linear-gradient(150deg, #2a3818 0%, #0a1510 100%)",
  "linear-gradient(150deg, #20183a 0%, #0a1510 100%)",
  "linear-gradient(150deg, #2a1e3a 0%, #0a0a15 100%)",
  "linear-gradient(150deg, #3a2a1e 0%, #150a05 100%)",
  "linear-gradient(150deg, #1e2a3a 0%, #050a15 100%)",
  "linear-gradient(150deg, #3a1e2a 0%, #15050a 100%)",
  "linear-gradient(150deg, #2a3a1e 0%, #0a1505 100%)",
  "linear-gradient(150deg, #1e3a3a 0%, #051515 100%)",
];

export function resolveIcon(name?: string | null): LucideIcon {
  return name && ICON_MAP[name] ? ICON_MAP[name] : Layers;
}

type CategoryCardProps = {
  num: string;
  /** Pass a LucideIcon component directly (public site) or use iconName (admin/DB). */
  Icon?: LucideIcon;
  iconName?: string | null;
  label: string;
  sub?: string | null;
  image?: string | null;
  bg: string;
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * Shared visual card used on both the public site (AboutSectionsDark) and the
 * admin panel (CategoriesClient). Pass admin controls or hover overlays as children.
 *
 * The default content div uses pointer-events:none so drag listeners spread via
 * {...rest} on the root div receive pointer events through it.
 */
export function CategoryCard({
  num,
  Icon: IconProp,
  iconName,
  label,
  sub,
  image,
  bg,
  children,
  className = "",
  style,
  ...rest
}: CategoryCardProps) {
  const Icon = IconProp ?? resolveIcon(iconName);

  return (
    <div
      className={`group relative rounded-3xl overflow-hidden w-full flex-shrink-0 ${className}`}
      style={{ background: bg, height: "clamp(300px, 32vw, 480px)", ...style }}
      {...rest}
    >
      {/* Photo layer */}
      {image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.22 }}
        />
      )}

      {/* Top lime accent on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "#a9ec46" }}
        aria-hidden
      />

      {/* Bottom gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65), transparent)" }}
        aria-hidden
      />

      {/* Decorative number */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden
      >
        <span
          className="font-black text-white"
          style={{ fontSize: "clamp(80px, 14vw, 180px)", opacity: 0.04, lineHeight: 1 }}
        >
          {num}
        </span>
      </div>

      {/* Default content — pointer-events:none lets drag listeners pass through */}
      <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8 z-10 pointer-events-none">
        <div
          className="size-11 rounded-xl flex items-center justify-center border shrink-0 transition-colors duration-300"
          style={{ background: "rgba(169,236,70,0.06)", borderColor: "rgba(169,236,70,0.18)" }}
        >
          <Icon className="size-5" style={{ color: "#a9ec46" }} />
        </div>
        <div>
          <p
            className="font-black text-white leading-tight mb-2"
            style={{ fontSize: "clamp(16px, 1.6vw, 22px)" }}
          >
            {label}
          </p>
          {sub && <p className="text-white/75 text-[12px] tracking-wide">{sub}</p>}
        </div>
      </div>

      {/* Slot for overlays: hover animation (public site) or admin controls */}
      {children}
    </div>
  );
}
