"use server";

import { LeadType } from "@prisma/client";
import { prisma } from "@/lib/db";
import { notifyOrganizerLead } from "@/lib/email";
import {
  participationSchema,
  contactSchema,
  type ParticipationInput,
  type ContactInput,
} from "@/lib/validations/forms";

export type ActionResult = { ok: true } | { ok: false; error: string };

/** Заявка на участие. Серверная валидация + сохранение + письмо организатору. */
export async function submitParticipation(
  input: ParticipationInput,
): Promise<ActionResult> {
  // Honeypot: бот заполнил скрытое поле — молча принимаем (без сохранения).
  if (input.hp) return { ok: true };

  const parsed = participationSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "validation" };
  const d = parsed.data;

  try {
    await prisma.lead.create({
      data: {
        type: LeadType.PARTICIPATION,
        company: d.company,
        fullName: d.fullName,
        phone: d.phone,
        email: d.email,
        website: d.website || null,
        category: d.category || null,
        message: d.message || null,
      },
    });

    await notifyOrganizerLead({
      title: "Заявка на участие",
      fields: {
        Компания: d.company,
        Контакт: d.fullName,
        Телефон: d.phone,
        Email: d.email,
        Сайт: d.website || undefined,
        Категория: d.category || undefined,
        Комментарий: d.message || undefined,
      },
    }).catch((e) => console.error("[email] notify failed", e));

    return { ok: true };
  } catch (e) {
    console.error("[submitParticipation]", e);
    return { ok: false, error: "server" };
  }
}

/** Обратная связь. */
export async function submitContact(
  input: ContactInput,
): Promise<ActionResult> {
  if (input.hp) return { ok: true };

  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "validation" };
  const d = parsed.data;

  try {
    await prisma.lead.create({
      data: {
        type: LeadType.CONTACT,
        fullName: d.fullName,
        email: d.email,
        phone: d.phone || null,
        message: d.message,
      },
    });

    await notifyOrganizerLead({
      title: "Обратная связь",
      fields: {
        Имя: d.fullName,
        Email: d.email,
        Телефон: d.phone || undefined,
        Сообщение: d.message,
      },
    }).catch((e) => console.error("[email] notify failed", e));

    return { ok: true };
  } catch (e) {
    console.error("[submitContact]", e);
    return { ok: false, error: "server" };
  }
}
