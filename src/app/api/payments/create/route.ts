import { NextResponse } from "next/server";
import { ticketOrderSchema } from "@/lib/validations/forms";
import { getTicketProductById } from "@/server/services/tickets";
import {
  createPendingOrder,
  updateOrderPayment,
  issueTicketForOrder,
} from "@/server/services/orders";
import * as yookassa from "@/lib/payments/yookassa";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const parsed = ticketOrderSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 400 });
  }
  const data = parsed.data;
  if (data.hp) {
    return NextResponse.json({ ok: false, error: "spam" }, { status: 400 });
  }

  const product = await getTicketProductById(data.ticketProductId);
  if (!product || !product.isActive) {
    return NextResponse.json({ ok: false, error: "product" }, { status: 400 });
  }

  const locale =
    typeof (body as { locale?: string }).locale === "string" &&
    (body as { locale?: string }).locale === "en"
      ? "en"
      : "ru";

  const order = await createPendingOrder({
    ticketProductId: product.id,
    fullName: data.fullName,
    email: data.email,
    phone: data.phone,
    company: data.company || undefined,
    position: data.position || undefined,
    amount: product.price,
    currency: product.currency,
  });

  const returnUrl = `${SITE_URL}/${locale}/tickets/success?order=${order.orderNumber}`;
  const failUrl = `${SITE_URL}/${locale}/tickets/fail?order=${order.orderNumber}`;

  // --- DEV-режим без ключей ЮKassa ---
  // TODO: удалить mock-ветку в проде. Без YOOKASSA_SHOP_ID/SECRET_KEY платёж
  // не создаётся; для тестирования флоу сразу выпускаем билет и ведём на success.
  if (!yookassa.isConfigured()) {
    await issueTicketForOrder(order.id);
    return NextResponse.json({ ok: true, confirmationUrl: returnUrl, mock: true });
  }

  try {
    const payment = await yookassa.createPayment({
      amount: product.price,
      currency: product.currency,
      description: `NEVA BUILD — ${product.titleRu} (${order.orderNumber})`,
      returnUrl,
      idempotenceKey: order.id,
      metadata: { orderId: order.id },
    });
    if (payment.id) await updateOrderPayment(order.id, payment.id);

    const url = payment.confirmation?.confirmation_url;
    if (!url) {
      return NextResponse.json({ ok: false, error: "no_confirmation" }, { status: 502 });
    }
    return NextResponse.json({ ok: true, confirmationUrl: url, failUrl });
  } catch (e) {
    console.error("[payments/create]", e);
    return NextResponse.json({ ok: false, error: "payment" }, { status: 502 });
  }
}
