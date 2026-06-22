import "server-only";

/**
 * Слой интеграции с ЮKassa (YooKassa).
 * Документация: https://yookassa.ru/developers/api
 *
 * TODO (перед продакшном):
 *  - задать YOOKASSA_SHOP_ID и YOOKASSA_SECRET_KEY в .env (из ЛК ЮKassa);
 *  - настроить webhook в ЛК ЮKassa на {NEXT_PUBLIC_SITE_URL}/api/payments/yookassa-webhook
 *    (события payment.succeeded и payment.canceled);
 *  - ограничить доступ к webhook по списку IP ЮKassa (см. README).
 * Платёжные данные карт на сайте НЕ хранятся — оплата проходит на стороне ЮKassa.
 */

const API_BASE = "https://api.yookassa.ru/v3";

function getCreds() {
  return {
    shopId: process.env.YOOKASSA_SHOP_ID,
    secretKey: process.env.YOOKASSA_SECRET_KEY,
  };
}

/** Заданы ли реальные ключи ЮKassa. */
export function isConfigured(): boolean {
  const { shopId, secretKey } = getCreds();
  return Boolean(shopId && secretKey);
}

function authHeader(): string {
  const { shopId, secretKey } = getCreds();
  return "Basic " + Buffer.from(`${shopId}:${secretKey}`).toString("base64");
}

export type YooPayment = {
  id: string;
  status: "pending" | "waiting_for_capture" | "succeeded" | "canceled";
  paid: boolean;
  amount: { value: string; currency: string };
  confirmation?: { type: string; confirmation_url?: string };
  metadata?: Record<string, string>;
};

export async function createPayment(opts: {
  amount: number;
  currency?: string;
  description: string;
  returnUrl: string;
  idempotenceKey: string;
  metadata?: Record<string, string>;
}): Promise<YooPayment> {
  const res = await fetch(`${API_BASE}/payments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Idempotence-Key": opts.idempotenceKey,
      Authorization: authHeader(),
    },
    body: JSON.stringify({
      amount: {
        value: opts.amount.toFixed(2),
        currency: opts.currency ?? "RUB",
      },
      capture: true,
      confirmation: { type: "redirect", return_url: opts.returnUrl },
      description: opts.description,
      metadata: opts.metadata,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`YooKassa createPayment failed: ${res.status} ${text}`);
  }
  return (await res.json()) as YooPayment;
}

export async function getPayment(id: string): Promise<YooPayment> {
  const res = await fetch(`${API_BASE}/payments/${id}`, {
    headers: { Authorization: authHeader() },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`YooKassa getPayment failed: ${res.status} ${text}`);
  }
  return (await res.json()) as YooPayment;
}
