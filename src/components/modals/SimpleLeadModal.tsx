"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { Loader2, ArrowRight } from "lucide-react";

import { Modal, ModalCloseButton } from "@/components/ui/modal";
import { PhoneInput } from "@/components/ui/phone-input";
import { FormField } from "@/components/forms/FormField";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { simpleLeadSchema, type SimpleLeadInput } from "@/lib/validations/forms";
import { submitSimpleLead } from "@/server/actions/leads";

interface SimpleLeadModalProps {
  open: boolean;
  onClose: () => void;
  eyebrowRu: string;
  eyebrowEn: string;
  titleRu: string;
  titleEn: string;
  subtitleRu?: string;
  subtitleEn?: string;
  notifyTitle: string;
}

export function SimpleLeadModal({
  open,
  onClose,
  eyebrowRu,
  eyebrowEn,
  titleRu,
  titleEn,
  subtitleRu,
  subtitleEn,
  notifyTitle,
}: SimpleLeadModalProps) {
  const t = useTranslations("Forms");
  const locale = useLocale();
  const ru = locale === "ru";
  const [done, setDone] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SimpleLeadInput>({
    resolver: zodResolver(simpleLeadSchema),
    defaultValues: { consent: false },
  });

  const err = (k: keyof SimpleLeadInput) => {
    const msg = errors[k]?.message;
    return msg ? t(`validation.${msg}` as never) : undefined;
  };

  async function onSubmit(data: SimpleLeadInput) {
    setServerError(null);
    const res = await submitSimpleLead(data, notifyTitle);
    if (res.ok) {
      setDone(true);
      reset();
    } else {
      setServerError(t("errorText"));
    }
  }

  function handleClose() {
    onClose();
    setTimeout(() => {
      setDone(false);
      setServerError(null);
      reset();
    }, 300);
  }

  return (
    <Modal open={open} onClose={handleClose} size="sm">
      {/* Header */}
      <div
        className="relative flex-none px-7 sm:px-10 pt-8 pb-7 overflow-hidden"
        style={{ background: "#16221C" }}
      >
        <ModalCloseButton onClose={handleClose} variant="dark" />
        <div
          className="absolute -right-20 -top-20 w-72 h-72 rounded-full opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(circle, #a9ec46 0%, transparent 70%)" }}
          aria-hidden
        />
        <div
          className="absolute left-0 bottom-0 w-full h-px"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(169,236,70,0.2), transparent)",
          }}
          aria-hidden
        />
        <span
          className="block text-[11px] font-bold uppercase tracking-[3px] mb-3"
          style={{ color: "rgba(169,236,70,0.6)" }}
        >
          {ru ? eyebrowRu : eyebrowEn}
        </span>
        <h2
          className="font-black text-white leading-tight mb-2"
          style={{ fontSize: "clamp(20px, 3vw, 26px)" }}
        >
          {ru ? titleRu : titleEn}
        </h2>
        {(subtitleRu || subtitleEn) && (
          <p className="text-white/50 text-[14px]" style={{ fontFamily: "var(--font-mulish)" }}>
            {ru ? subtitleRu : subtitleEn}
          </p>
        )}
      </div>

      {/* Body */}
      <div className="overflow-y-auto flex-1 px-7 sm:px-10 py-7">
        {done ? (
          <div className="flex flex-col items-center text-center py-10">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mb-5 flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #a9ec46 0%, #a9ec46 100%)" }}
            >
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-[22px] font-black text-nb-dark mb-2">{t("successTitle")}</h3>
            <p
              className="text-nb-muted text-[14px] max-w-[320px]"
              style={{ fontFamily: "var(--font-mulish)" }}
            >
              {t("successText")}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden
              {...register("hp")}
            />

            <FormField label={t("fullName")} htmlFor="sl-fullName" required error={err("fullName")}>
              <Input id="sl-fullName" {...register("fullName")} aria-invalid={!!errors.fullName} />
            </FormField>

            <FormField label={t("phone")} htmlFor="sl-phone" required error={err("phone")}>
              <Controller
                control={control}
                name="phone"
                render={({ field }) => (
                  <PhoneInput
                    id="sl-phone"
                    value={field.value ?? ""}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    invalid={!!errors.phone}
                  />
                )}
              />
            </FormField>

            <FormField label={t("email")} htmlFor="sl-email" required error={err("email")}>
              <Input
                id="sl-email"
                type="email"
                {...register("email")}
                aria-invalid={!!errors.email}
              />
            </FormField>

            <Controller
              control={control}
              name="consent"
              render={({ field }) => (
                <label className="flex items-start gap-3 text-sm text-muted-foreground cursor-pointer">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(v) => field.onChange(v === true)}
                    aria-invalid={!!errors.consent}
                    className="mt-0.5 flex-shrink-0"
                  />
                  <span>
                    {ru ? "Я согласен на " : "I agree to the "}
                    <a
                      href="/docs/personal-data-consent.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="underline underline-offset-2 text-foreground/70 hover:text-foreground transition-colors"
                    >
                      {ru ? "обработку персональных данных" : "processing of personal data"}
                    </a>
                  </span>
                </label>
              )}
            />
            {err("consent") && (
              <p className="text-xs font-medium text-destructive">{err("consent")}</p>
            )}

            {serverError && (
              <p className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {serverError}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-2.5 font-bold text-[15px] h-14 px-8 rounded-2xl w-full disabled:opacity-60 transition-all duration-200 hover:-translate-y-0.5 touch-manipulation"
              style={{
                background: "linear-gradient(135deg, #a9ec46 0%, #8dd62e 100%)",
                color: "#0d2d06",
                boxShadow: "0 8px 24px rgba(169,236,70,0.25)",
              }}
            >
              {isSubmitting ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <ArrowRight className="size-4" />
              )}
              {isSubmitting
                ? ru
                  ? "Отправляем..."
                  : "Sending..."
                : ru
                  ? "Отправить заявку"
                  : "Submit Request"}
            </button>
          </form>
        )}
      </div>
    </Modal>
  );
}
