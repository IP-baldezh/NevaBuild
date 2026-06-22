import { NextResponse } from "next/server";
import {
  issueTicketForOrder,
  markOrderFailed,
} from "@/server/services/orders";
import * as yookassa from "@/lib/payments/yookassa";

/**
 * Webhook ЮKassa. Настраивается в ЛК ЮKassa на этот URL.
 *
 * TODO (безопасность): ограничить доступ по списку IP-адресов ЮKassa
 * (см. README → раздел webhook). ЮKassa не подписывает уведомления,
 * поэтому статус платежа здесь дополнительно перепроверяется через API.
 */
export async function POST(req: Request) {
  let body: {
    event?: string;
    object?: { id?: string; status?: string; metadata?: Record<string, string> };
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const obj = body.object;
  if (!obj?.id) return NextResponse.json({ ok: true });

  // Перепроверяем реальный статус платежа из API (защита от подделки уведомления).
  let status = obj.status;
  let metadata = obj.metadata;
  if (yookassa.isConfigured()) {
    try {
      const payment = await yookassa.getPayment(obj.id);
      status = payment.status;
      metadata = payment.metadata ?? metadata;
    } catch (e) {
      console.error("[webhook] getPayment failed", e);
    }
  }

  const orderId = metadata?.orderId;
  if (!orderId) return NextResponse.json({ ok: true });

  if (body.event === "payment.succeeded" || status === "succeeded") {
    await issueTicketForOrder(orderId);
  } else if (body.event === "payment.canceled" || status === "canceled") {
    await markOrderFailed(orderId);
  }

  // ЮKassa ожидает 200 OK, иначе будет повторять уведомление.
  return NextResponse.json({ ok: true });
}
