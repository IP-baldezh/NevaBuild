"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const form = new FormData(e.currentTarget);
    const res = await signIn("credentials", {
      email: String(form.get("email")),
      password: String(form.get("password")),
      redirect: false,
    });
    setLoading(false);
    if (res?.error) {
      setError("Неверный email или пароль");
    } else {
      const cb = new URLSearchParams(window.location.search).get("callbackUrl") ?? "/admin";
      router.push(cb);
      router.refresh();
    }
  }

  return (
    <div className="flex min-h-dvh items-center justify-center p-4">
      <div className="w-full max-w-sm rounded-3xl border bg-card p-8 shadow-sm">
        {/* eslint-disable-next-line @next/next/no-img-element -- SVG, без IntlProvider в /admin */}
        <img
          src="/logo-ru.svg"
          alt="НЕВА БИЛД"
          className="h-10 w-auto select-none"
          draggable={false}
        />
        <h1 className="mt-6 text-2xl font-bold">Вход в админ-панель</h1>
        <p className="mt-1 text-sm text-muted-foreground">Доступ только для сотрудников.</p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required autoComplete="email" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Пароль</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
            />
          </div>
          {error && (
            <p className="rounded-lg bg-destructive/10 px-4 py-2 text-sm text-destructive">
              {error}
            </p>
          )}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="size-4 animate-spin" />}
            Войти
          </Button>
        </form>
      </div>
    </div>
  );
}
