import { z } from "zod";

// Сообщения — ключи из namespace Forms.validation (переводятся в формах).
const required = { message: "required" };
const emailMsg = { message: "email" };
const phoneMsg = { message: "phone" };
const consentMsg = { message: "consent" };

const optionalString = z.string().trim().optional().or(z.literal(""));

/** Заявка на участие (экспонент). */
export const participationSchema = z.object({
  company: z.string().trim().min(2, required),
  fullName: z.string().trim().min(2, required),
  phone: z.string().trim().min(5, phoneMsg),
  email: z.email(emailMsg),
  website: optionalString,
  category: optionalString,
  message: optionalString,
  consent: z.boolean().refine((v) => v === true, consentMsg),
  // honeypot — должен оставаться пустым
  hp: z.string().optional(),
});
export type ParticipationInput = z.infer<typeof participationSchema>;

/** Обратная связь. */
export const contactSchema = z.object({
  fullName: z.string().trim().min(2, required),
  email: z.email(emailMsg),
  phone: optionalString,
  message: z.string().trim().min(5, { message: "min" }),
  consent: z.boolean().refine((v) => v === true, consentMsg),
  hp: z.string().optional(),
});
export type ContactInput = z.infer<typeof contactSchema>;

/** Оформление заказа билета. */
export const ticketOrderSchema = z.object({
  ticketProductId: z.string().min(1, required),
  fullName: z.string().trim().min(2, required),
  email: z.email(emailMsg),
  phone: z.string().trim().min(5, phoneMsg),
  company: optionalString,
  position: optionalString,
  consent: z.boolean().refine((v) => v === true, consentMsg),
  offerConsent: z.boolean().refine((v) => v === true, consentMsg),
  hp: z.string().optional(),
});
export type TicketOrderInput = z.infer<typeof ticketOrderSchema>;
