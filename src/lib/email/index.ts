import "server-only";
import nodemailer, { type Transporter } from "nodemailer";
import { buildNotificationHtml, buildTicketHtml } from "./templates";

let transporter: Transporter | null = null;

function getTransport(): Transporter | null {
  if (!process.env.SMTP_HOST) return null;
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: Number(process.env.SMTP_PORT ?? 587) === 465,
      auth:
        process.env.SMTP_USER && process.env.SMTP_PASSWORD
          ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD }
          : undefined,
    });
  }
  return transporter;
}

type MailInput = {
  to: string;
  subject: string;
  html: string;
  text?: string;
};

/**
 * Отправка письма. Если SMTP не настроен (dev) — пишет предупреждение в лог
 * и не падает, чтобы формы продолжали работать.
 */
export async function sendMail({ to, subject, html, text }: MailInput) {
  const t = getTransport();
  const from = process.env.SMTP_FROM ?? "NEVA BUILD <noreply@nevabuildexpo.ru>";
  if (!t) {
    console.warn(`[email] SMTP не настроен — письмо «${subject}» не отправлено (to: ${to}).`);
    return { sent: false };
  }
  await t.sendMail({ from, to, subject, html, text });
  return { sent: true };
}

// На этот адрес приходят все заявки с форм сайта
const ORGANIZER = () =>
  process.env.ORGANIZER_EMAIL ?? process.env.ADMIN_EMAIL ?? "info@neva-expo.ru";

/** Уведомление организатору о новой заявке. */
export async function notifyOrganizerLead(data: {
  title: string;
  fields: Record<string, string | undefined>;
}) {
  await sendMail({
    to: ORGANIZER(),
    subject: `НЕВА BUILD — ${data.title}`,
    html: buildNotificationHtml(data),
    text: Object.entries(data.fields)
      .filter(([, v]) => v)
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n"),
  });
}

/** Письмо покупателю с билетом и QR-кодом. */
export async function sendTicketEmail(data: {
  to: string;
  fullName: string;
  ticketCode: string;
  qrDataUrl: string;
  productTitle: string;
}) {
  await sendMail({
    to: data.to,
    subject: "НЕВА BUILD — ваш билет",
    html: buildTicketHtml(data),
    text: `Ваш билет: ${data.productTitle}\nКод билета: ${data.ticketCode}\nПокажите QR-код или продиктуйте код на входе.`,
  });
}
