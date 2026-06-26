"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";

import { participationSchema, type ParticipationInput } from "@/lib/validations/forms";
import { submitParticipation } from "@/server/actions/leads";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { CustomSelect } from "@/components/ui/custom-select";
import { PhoneInput } from "@/components/ui/phone-input";
import { FormField } from "./FormField";
import { FormSuccess } from "./FormSuccess";
import { pick } from "@/lib/content";
import type { Locale } from "@/i18n/routing";
import type { ExhibitorCategory } from "@prisma/client";

export function LeadForm({ categories }: { categories: ExhibitorCategory[] }) {
  const t = useTranslations("Forms");
  const tc = useTranslations("Common");
  const locale = useLocale() as Locale;
  const ru = locale === "ru";
  const [done, setDone] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ParticipationInput>({
    resolver: zodResolver(participationSchema),
    defaultValues: { consent: false },
  });

  const err = (k: keyof ParticipationInput) => {
    const m = errors[k]?.message;
    return m ? t(`validation.${m}` as never) : undefined;
  };

  async function onSubmit(data: ParticipationInput) {
    setServerError(null);
    const res = await submitParticipation(data);
    if (res.ok) {
      setDone(true);
      reset();
    } else {
      setServerError(t("errorText"));
    }
  }

  if (done) {
    return <FormSuccess title={t("successTitle")} text={t("successText")} />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      {/* honeypot */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
        {...register("hp")}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label={t("company")} htmlFor="company" required error={err("company")}>
          <Input id="company" {...register("company")} aria-invalid={!!errors.company} />
        </FormField>
        <FormField label={t("fullName")} htmlFor="fullName" required error={err("fullName")}>
          <Input id="fullName" {...register("fullName")} aria-invalid={!!errors.fullName} />
        </FormField>
        <FormField label={t("phone")} htmlFor="phone" required error={err("phone")}>
          <Controller
            control={control}
            name="phone"
            render={({ field }) => (
              <PhoneInput
                id="phone"
                value={field.value ?? ""}
                onChange={field.onChange}
                onBlur={field.onBlur}
                invalid={!!errors.phone}
              />
            )}
          />
        </FormField>
        <FormField label={t("email")} htmlFor="email" required error={err("email")}>
          <Input id="email" type="email" {...register("email")} aria-invalid={!!errors.email} />
        </FormField>
        <FormField label={t("website")} htmlFor="website" error={err("website")}>
          <Input id="website" {...register("website")} placeholder="https://" />
        </FormField>
        <FormField label={t("category")} htmlFor="category" error={err("category")}>
          <Controller
            control={control}
            name="category"
            render={({ field }) => (
              <CustomSelect
                value={field.value ?? ""}
                onChange={field.onChange}
                placeholder={t("selectCategory")}
                options={categories.map((c) => ({
                  value: c.slug,
                  label: pick(locale, c.titleRu, c.titleEn),
                }))}
                invalid={!!errors.category}
              />
            )}
          />
        </FormField>
      </div>

      <FormField label={t("message")} htmlFor="message" error={err("message")}>
        <Textarea id="message" rows={4} {...register("message")} />
      </FormField>

      <Controller
        control={control}
        name="consent"
        render={({ field }) => (
          <label className="flex items-start gap-3 text-sm text-muted-foreground">
            <Checkbox
              checked={field.value}
              onCheckedChange={(v) => field.onChange(v === true)}
              aria-invalid={!!errors.consent}
              className="mt-0.5"
            />
            <span>
              {ru ? "Я согласен на " : "I agree to the "}
              <a
                href="/docs/personal-data-consent.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="underline underline-offset-2 hover:text-foreground transition-colors"
              >
                {ru ? "обработку персональных данных" : "processing of personal data"}
              </a>
            </span>
          </label>
        )}
      />
      {err("consent") && <p className="text-xs font-medium text-destructive">{err("consent")}</p>}

      {serverError && (
        <p className="rounded-lg bg-destructive/10 px-4 py-2 text-sm text-destructive">
          {serverError}
        </p>
      )}

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting && <Loader2 className="size-4 animate-spin" />}
        {isSubmitting ? tc("sending") : tc("submit")}
      </Button>
    </form>
  );
}
