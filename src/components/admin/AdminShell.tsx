"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Settings,
  Building2,
  Tags,
  CalendarDays,
  Newspaper,
  Ticket,
  ShoppingCart,
  Inbox,
  Handshake,
  Users,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Role } from "@prisma/client";

const NAV = [
  { href: "/admin", label: "Дашборд", icon: LayoutDashboard, exact: true },
  { href: "/admin/settings", label: "Настройки", icon: Settings },
  { href: "/admin/exhibitors", label: "Участники", icon: Building2 },
  { href: "/admin/categories", label: "Категории", icon: Tags },
  { href: "/admin/program", label: "Программа", icon: CalendarDays },
  { href: "/admin/news", label: "Новости", icon: Newspaper },
  { href: "/admin/tickets", label: "Билеты", icon: Ticket },
  { href: "/admin/orders", label: "Заказы", icon: ShoppingCart },
  { href: "/admin/leads", label: "Заявки", icon: Inbox },
  { href: "/admin/partners", label: "Партнёры", icon: Handshake },
  { href: "/admin/users", label: "Пользователи", icon: Users },
];

function AdminLogo() {
  return (
    <span className="inline-flex items-center gap-2.5 select-none">
      <span className="relative inline-flex size-7 items-center justify-center">
        <span className="absolute inset-0 border-2 border-sidebar-foreground" />
        <span className="absolute -right-1 -top-1 size-2.5 bg-brand-red" />
        <span className="text-[0.55rem] font-black tracking-tight text-sidebar-foreground">NB</span>
      </span>
      <span className="text-sm font-extrabold tracking-tight text-sidebar-foreground">
        NEVA<span className="text-lime">BUILD</span>
        <span className="ml-1.5 text-xs font-normal text-sidebar-foreground/50">admin</span>
      </span>
    </span>
  );
}

export function AdminShell({
  user,
  children,
}: {
  user: { name?: string | null; email?: string | null; role: Role };
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);

  const nav = (
    <nav className="flex flex-1 flex-col overflow-y-auto p-3">
      {NAV.map((item) => {
        const Icon = item.icon;
        const active = isActive(item.href, item.exact);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-colors",
              active
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground/60 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
            )}
          >
            <Icon className="size-4 shrink-0" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  const SidebarInner = (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
        <AdminLogo />
        <button
          className="lg:hidden text-sidebar-foreground/60 hover:text-sidebar-foreground"
          onClick={() => setOpen(false)}
          aria-label="Закрыть"
        >
          <X className="size-5" />
        </button>
      </div>

      {nav}

      <div className="border-t border-sidebar-border p-3">
        <div className="px-3 py-2 text-xs text-sidebar-foreground/50">
          <div className="truncate font-semibold text-sidebar-foreground">
            {user.name ?? user.email}
          </div>
          <div className="uppercase tracking-wide">{user.role}</div>
        </div>
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 text-sm text-sidebar-foreground/60 transition-colors hover:text-sidebar-foreground"
        >
          <ExternalLink className="size-4" />
          Открыть сайт
        </Link>
        <button
          onClick={() => signOut({ redirectTo: "/admin/login" })}
          className="flex w-full items-center gap-3 px-3 py-2.5 text-sm text-sidebar-foreground/60 transition-colors hover:text-sidebar-foreground"
        >
          <LogOut className="size-4" />
          Выйти
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-dvh bg-background">
      {/* Desktop sidebar */}
      <aside className="hidden w-56 shrink-0 lg:block">
        <div className="fixed inset-y-0 left-0 w-56">{SidebarInner}</div>
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-64">{SidebarInner}</div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-background px-4 lg:hidden">
          <button
            onClick={() => setOpen(true)}
            aria-label="Меню"
            className="text-muted-foreground hover:text-foreground"
          >
            <Menu className="size-5" />
          </button>
          <AdminLogo />
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
