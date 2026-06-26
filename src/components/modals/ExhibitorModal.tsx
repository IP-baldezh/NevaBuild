"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { Loader2, ArrowRight } from "lucide-react";
import type { ExhibitorCategory } from "@prisma/client";

import { Modal, ModalCloseButton } from "@/components/ui/modal";
import { CustomSelect } from "@/components/ui/custom-select";
import { PhoneInput } from "@/components/ui/phone-input";
import { FormField } from "@/components/forms/FormField";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { participationSchema, type ParticipationInput } from "@/lib/validations/forms";
import { submitParticipation } from "@/server/actions/leads";
import { pick } from "@/lib/content";
import type { Locale } from "@/i18n/routing";

const AREA_OPTIONS_RU = [
  { value: "9", label: "9 м²" },
  { value: "18", label: "18 м²" },
  { value: "36", label: "36 м²" },
  { value: "50", label: "50 м²" },
  { value: "50+", label: "Более 50 м²" },
];
const AREA_OPTIONS_EN = [
  { value: "9", label: "9 m²" },
  { value: "18", label: "18 m²" },
  { value: "36", label: "36 m²" },
  { value: "50", label: "50 m²" },
  { value: "50+", label: "More than 50 m²" },
];

interface ExhibitorModalProps {
  open: boolean;
  onClose: () => void;
  categories?: ExhibitorCategory[];
}

export function ExhibitorModal({ open, onClose, categories = [] }: ExhibitorModalProps) {
  const t = useTranslations("Forms");
  const locale = useLocale() as Locale;
  const ru = locale === "ru";
  const [done, setDone] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const areaOptions = ru ? AREA_OPTIONS_RU : AREA_OPTIONS_EN;

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
    const msg = errors[k]?.message;
    return msg ? t(`validation.${msg}` as never) : undefined;
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

  function handleClose() {
    onClose();
    setTimeout(() => {
      setDone(false);
      setServerError(null);
      reset();
    }, 300);
  }

  return (
    <Modal open={open} onClose={handleClose} size="lg">
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
          NEVA BUILD 2027 · {ru ? "УЧАСТИЕ СО СТЕНДОМ" : "BOOTH PARTICIPATION"}
        </span>
        <h2
          className="font-black text-white leading-tight mb-2"
          style={{ fontSize: "clamp(22px, 3vw, 30px)" }}
        >
          {ru ? "Забронировать стенд" : "Book a Stand"}
        </h2>
        <p className="text-white/50 text-[14px]" style={{ fontFamily: "var(--font-mulish)" }}>
          {ru
            ? "Оставьте заявку — менеджер свяжется с вами в течение рабочего дня"
            : "Leave a request — a manager will contact you within the working day"}
        </p>
      </div>

      {/* Body */}
      <div className="overflow-y-auto flex-1 px-7 sm:px-10 py-7">
        {done ? (
          <div className="flex flex-col items-center text-center py-10">
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

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField label={t("company")} htmlFor="ex-company" required error={err("company")}>
                <Input id="ex-company" {...register("company")} aria-invalid={!!errors.company} />
              </FormField>
              <FormField
                label={t("fullName")}
                htmlFor="ex-fullName"
                required
                error={err("fullName")}
              >
                <Input
                  id="ex-fullName"
                  {...register("fullName")}
                  aria-invalid={!!errors.fullName}
                />
              </FormField>
              <FormField label={t("phone")} htmlFor="ex-phone" required error={err("phone")}>
                <Controller
                  control={control}
                  name="phone"
                  render={({ field }) => (
                    <PhoneInput
                      id="ex-phone"
                      value={field.value ?? ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      invalid={!!errors.phone}
                    />
                  )}
                />
              </FormField>
              <FormField label={t("email")} htmlFor="ex-email" required error={err("email")}>
                <Input
                  id="ex-email"
                  type="email"
                  {...register("email")}
                  aria-invalid={!!errors.email}
                />
              </FormField>
              <FormField label={t("website")} htmlFor="ex-website" error={err("website")}>
                <Input id="ex-website" {...register("website")} placeholder="https://" />
              </FormField>
              {categories.length > 0 && (
                <FormField label={t("category")} htmlFor="ex-category" error={err("category")}>
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
              )}
            </div>

            <FormField label={t("area")} htmlFor="ex-area" error={err("area")}>
              <Controller
                control={control}
                name="area"
                render={({ field }) => (
                  <CustomSelect
                    value={field.value ?? ""}
                    onChange={field.onChange}
                    placeholder={t("selectArea")}
                    options={areaOptions}
                    invalid={!!errors.area}
                  />
                )}
              />
            </FormField>

            <FormField label={t("message")} htmlFor="ex-message" error={err("message")}>
              <Textarea id="ex-message" rows={3} {...register("message")} />
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
              className="inline-flex items-center justify-center gap-2.5 font-bold text-[15px] h-14 px-8 rounded-2xl w-full sm:w-auto disabled:opacity-60 transition-all duration-200 hover:-translate-y-0.5 touch-manipulation"
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
