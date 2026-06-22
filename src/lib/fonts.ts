import { Manrope } from "next/font/google";

// Современный гротеск с поддержкой кириллицы и латиницы — высокая читаемость RU/EN.
export const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});
