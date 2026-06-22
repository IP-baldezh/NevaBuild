import "server-only";
import nodemailer, { type Transporter } from "nodemailer";

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

const ORGANIZER = () => process.env.ORGANIZER_EMAIL ?? "info@neva-expo.ru";

/** Уведомление организатору о новой заявке. */
export async function notifyOrganizerLead(data: {
  title: string;
  fields: Record<string, string | undefined>;
}) {
  const rows = Object.entries(data.fields)
    .filter(([, v]) => v)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#666">${k}</td><td style="padding:4px 0"><b>${v}</b></td></tr>`,
    )
    .join("");
  await sendMail({
    to: ORGANIZER(),
    subject: `NEVA BUILD — ${data.title}`,
    html: `<h2>${data.title}</h2><table>${rows}</table>`,
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
    subject: "NEVA BUILD — ваш билет",
    html: `
      <h2>Спасибо за покупку, ${data.fullName}!</h2>
      <p>Ваш билет: <b>${data.productTitle}</b></p>
      <p>Код билета: <b>${data.ticketCode}</b></p>
      <p>Покажите QR-код на входе:</p>
      <img src="${data.qrDataUrl}" alt="QR" width="220" height="220" />
    `,
    text: `Ваш билет ${data.productTitle}. Код: ${data.ticketCode}`,
  });
}
