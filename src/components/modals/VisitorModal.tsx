"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { Loader2, ArrowRight, Ticket } from "lucide-react";

import { Modal, ModalCloseButton } from "@/components/ui/modal";
import { FormField } from "@/components/forms/FormField";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { Checkbox } from "@/components/ui/checkbox";
import { visitorSchema, type VisitorInput } from "@/lib/validations/forms";
import { submitVisitorRegistration } from "@/server/actions/leads";
import type { Locale } from "@/i18n/routing";

interface VisitorModalProps {
  open: boolean;
  onClose: () => void;
}

export function VisitorModal({ open, onClose }: VisitorModalProps) {
  const t = useTranslations("Forms");
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
  } = useForm<VisitorInput>({
    resolver: zodResolver(visitorSchema),
    defaultValues: { consent: false },
  });

  const err = (k: keyof VisitorInput) => {
    const msg = errors[k]?.message;
    return msg ? t(`validation.${msg}` as never) : undefined;
  };

  async function onSubmit(data: VisitorInput) {
    setServerError(null);
    const res = await submitVisitorRegistration(data);
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
      {/* Header — green gradient */}
      <div
        className="relative flex-none px-7 pt-8 pb-7 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #12B669 0%, #a9ec46 60%, #d4f772 100%)" }}
      >
        <ModalCloseButton onClose={handleClose} variant="light" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 80% 20%, rgba(255,255,255,0.22) 0%, transparent 65%)",
          }}
          aria-hidden
        />
        <span
          className="relative z-10 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[3px] mb-3"
          style={{ color: "rgba(14,45,8,0.65)" }}
        >
          <Ticket className="size-3.5" />
          {ru ? "БЕСПЛАТНЫЙ ВХОД" : "FREE ENTRY"}
        </span>
        <h2
          className="relative z-10 font-black leading-tight mb-2"
          style={{ fontSize: "clamp(22px, 3vw, 28px)", color: "#0d2d06" }}
        >
          {ru ? "Регистрация" : "Registration"}
          <br />
          {ru ? "для профессионалов" : "for professionals"}
        </h2>
        <p
          className="relative z-10 text-[14px]"
          style={{ color: "rgba(14,45,8,0.65)", fontFamily: "var(--font-mulish)" }}
        >
          {ru
            ? "Зарегистрируйтесь онлайн — проходите без очереди"
            : "Register online — skip the queue at the entrance"}
        </p>
      </div>

      {/* Body */}
      <div className="px-7 py-7">
        {done ? (
          <div className="flex flex-col items-center text-center py-8">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mb-5 flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #12B669 0%, #a9ec46 100%)" }}
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
            <h3 className="text-[20px] font-black text-nb-dark mb-2">
              {ru ? "Вы зарегистрированы!" : "You're registered!"}
            </h3>
            <p
              className="text-nb-muted text-[14px] max-w-[280px]"
              style={{ fontFamily: "var(--font-mulish)" }}
            >
              {ru
                ? "Подтверждение придёт на указанный email. Ждём вас на выставке!"
                : "Confirmation will be sent to your email. See you at the exhibition!"}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden
              {...register("hp")}
            />

            <FormField
              label={ru ? "ФИО" : "Full Name"}
              htmlFor="vis-fullName"
              required
              error={err("fullName")}
            >
              <Input id="vis-fullName" {...register("fullName")} aria-invalid={!!errors.fullName} />
            </FormField>

            <FormField label="Email" htmlFor="vis-email" required error={err("email")}>
              <Input
                id="vis-email"
                type="email"
                {...register("email")}
                aria-invalid={!!errors.email}
              />
            </FormField>

            <FormField label={t("phone")} htmlFor="vis-phone" error={err("phone")}>
              <Controller
                control={control}
                name="phone"
                render={({ field }) => (
                  <PhoneInput
                    id="vis-phone"
                    value={field.value ?? ""}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    invalid={!!errors.phone}
                  />
                )}
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
                      className="underline underline-offset-2 text-[#0d2d06]/60 hover:text-[#0d2d06] transition-colors"
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
                background: "#0e2d08",
                color: "#a9ec46",
                boxShadow: "0 8px 24px rgba(14,45,8,0.20)",
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
                  ? "Зарегистрироваться"
                  : "Register Now"}
            </button>
          </form>
        )}
      </div>
    </Modal>
  );
}
