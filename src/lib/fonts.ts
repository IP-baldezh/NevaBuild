import { Manrope, Mulish } from "next/font/google";

export const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const mulish = Mulish({
  subsets: ["latin", "cyrillic"],
  variable: "--font-mulish-var",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});
