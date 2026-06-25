"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";

import { ticketOrderSchema, type TicketOrderInput } from "@/lib/validations/forms";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { FormField } from "@/components/forms/FormField";
import { TicketCard } from "./TicketCard";
import { pick } from "@/lib/content";
import { formatPrice } from "@/lib/utils";
import type { Locale } from "@/i18n/routing";
import type { TicketProduct } from "@prisma/client";

export function TicketCheckout({ products }: { products: TicketProduct[] }) {
  const t = useTranslations("TicketsPage");
  const tf = useTranslations("Forms");
  const locale = useLocale() as Locale;
  const [selectedId, setSelectedId] = useState(products[0]?.id ?? "");
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TicketOrderInput>({
    resolver: zodResolver(ticketOrderSchema),
    defaultValues: { consent: false, offerConsent: false, ticketProductId: selectedId },
  });

  const err = (k: keyof TicketOrderInput) => {
    const m = errors[k]?.message;
    return m ? tf(`validation.${m}` as never) : undefined;
  };

  const selected = products.find((p) => p.id === selectedId);

  async function onSubmit(data: TicketOrderInput) {
    setServerError(null);
    try {
      const res = await fetch("/api/payments/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, ticketProductId: selectedId, locale }),
      });
      const json = await res.json();
      if (json.ok && json.confirmationUrl) {
        window.location.href = json.confirmationUrl;
      } else {
        setServerError(tf("errorText"));
      }
    } catch {
      setServerError(tf("errorText"));
    }
  }

  if (products.length === 0) {
    return <p className="text-muted-foreground">—</p>;
  }

  return (
    <div className="space-y-12">
      <div className="grid gap-5 md:grid-cols-3">
        {products.map((p, i) => (
          <TicketCard
            key={p.id}
            title={pick(locale, p.titleRu, p.titleEn)}
            description={pick(locale, p.descriptionRu, p.descriptionEn)}
            priceLabel={`${formatPrice(p.price, p.currency, locale === "ru" ? "ru-RU" : "en-US")}`}
            benefits={locale === "ru" ? p.benefitsRu : p.benefitsEn}
            benefitsLabel={t("benefits")}
            selected={selectedId === p.id}
            featured={i === products.length - 1}
            onSelect={() => setSelectedId(p.id)}
          />
        ))}
      </div>

      <div className="mx-auto max-w-2xl rounded-3xl border bg-card p-6 sm:p-8">
        <h2 className="text-2xl font-bold">{t("checkout")}</h2>
        {selected && (
          <p className="mt-1 text-muted-foreground">
            {t("selectedTicket")}:{" "}
            <span className="font-semibold text-foreground">
              {pick(locale, selected.titleRu, selected.titleEn)}
            </span>{" "}
            — {formatPrice(selected.price, selected.currency, locale === "ru" ? "ru-RU" : "en-US")}
          </p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4" noValidate>
          <input type="text" tabIndex={-1} className="hidden" aria-hidden {...register("hp")} />

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label={tf("fullName")} htmlFor="tk-name" required error={err("fullName")}>
              <Input id="tk-name" {...register("fullName")} aria-invalid={!!errors.fullName} />
            </FormField>
            <FormField label={tf("email")} htmlFor="tk-email" required error={err("email")}>
              <Input
                id="tk-email"
                type="email"
                {...register("email")}
                aria-invalid={!!errors.email}
              />
            </FormField>
            <FormField label={tf("phone")} htmlFor="tk-phone" required error={err("phone")}>
              <Input
                id="tk-phone"
                type="tel"
                {...register("phone")}
                aria-invalid={!!errors.phone}
              />
            </FormField>
            <FormField label={tf("company")} htmlFor="tk-company" error={err("company")}>
              <Input id="tk-company" {...register("company")} />
            </FormField>
            <FormField
              label={tf("position")}
              htmlFor="tk-position"
              error={err("position")}
              className="sm:col-span-2"
            >
              <Input id="tk-position" {...register("position")} />
            </FormField>
          </div>

          <Consent
            control={control}
            name="consent"
            label={tf("consent")}
            error={err("consent")}
            invalid={!!errors.consent}
          />
          <Consent
            control={control}
            name="offerConsent"
            label={tf("offerConsent")}
            error={err("offerConsent")}
            invalid={!!errors.offerConsent}
          />

          {serverError && (
            <p className="rounded-lg bg-destructive/10 px-4 py-2 text-sm text-destructive">
              {serverError}
            </p>
          )}

          <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
            {isSubmitting && <Loader2 className="size-4 animate-spin" />}
            {t("pay")}
          </Button>
        </form>
      </div>
    </div>
  );
}

function Consent({
  control,
  name,
  label,
  error,
  invalid,
}: {
  control: ReturnType<typeof useForm<TicketOrderInput>>["control"];
  name: "consent" | "offerConsent";
  label: string;
  error?: string;
  invalid: boolean;
}) {
  return (
    <div>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <label className="flex items-start gap-3 text-sm text-muted-foreground">
            <Checkbox
              checked={field.value}
              onCheckedChange={(v) => field.onChange(v === true)}
              aria-invalid={invalid}
              className="mt-0.5"
            />
            <span>{label}</span>
          </label>
        )}
      />
      {error && <p className="mt-1 text-xs font-medium text-destructive">{error}</p>}
    </div>
  );
}
