import "@/styles/globals.css";
import type { Metadata } from "next";
import { manrope } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "NEVA BUILD — Админ-панель",
  robots: { index: false, follow: false },
};

// Корневой layout админки (нелокализованная зона). Отдельный root от публичного сайта.
export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={manrope.variable} suppressHydrationWarning>
      <body className="min-h-dvh bg-muted font-sans text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
