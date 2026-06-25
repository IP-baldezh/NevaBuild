import "@/styles/globals.css";
import type { Metadata } from "next";
import { manrope } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Личный кабинет — NEVA BUILD",
  robots: { index: false, follow: false },
};

// Заготовка под будущие личные кабинеты (отдельная нелокализованная зона).
export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={manrope.variable} suppressHydrationWarning>
      <body className="flex min-h-dvh items-center justify-center bg-neva-gradient-soft p-4 font-sans">
        {children}
      </body>
    </html>
  );
}
