import "server-only";
import { customAlphabet } from "nanoid";
import { OrderStatus, TicketStatus } from "@prisma/client";
import { prisma } from "@/lib/db";
import { generateQrDataUrl } from "@/lib/qr";
import { sendTicketEmail } from "@/lib/email";

const orderCode = customAlphabet("0123456789", 8);
const ticketCodeGen = customAlphabet("ABCDEFGHJKLMNPQRSTUVWXYZ23456789", 10);

export type CreateOrderInput = {
  ticketProductId: string;
  fullName: string;
  email: string;
  phone: string;
  company?: string;
  position?: string;
  amount: number;
  currency: string;
};

export async function createPendingOrder(input: CreateOrderInput) {
  return prisma.ticketOrder.create({
    data: {
      orderNumber: `NB-${orderCode()}`,
      ticketProductId: input.ticketProductId,
      fullName: input.fullName,
      email: input.email,
      phone: input.phone,
      company: input.company || null,
      position: input.position || null,
      amount: input.amount,
      currency: input.currency,
      status: OrderStatus.PENDING,
    },
  });
}

export async function updateOrderPayment(orderId: string, paymentId: string) {
  return prisma.ticketOrder.update({
    where: { id: orderId },
    data: { paymentId },
  });
}

export async function markOrderFailed(orderId: string) {
  return prisma.ticketOrder.update({
    where: { id: orderId },
    data: { status: OrderStatus.FAILED },
  });
}

/**
 * Помечает заказ оплаченным и выпускает билет с QR-кодом.
 * Идемпотентно: повторный вызов (повторный webhook) не создаёт второй билет.
 */
export async function issueTicketForOrder(orderId: string) {
  const order = await prisma.ticketOrder.findUnique({
    where: { id: orderId },
    include: { ticket: true, ticketProduct: true },
  });
  if (!order) return null;
  if (order.ticket) return order.ticket; // уже выпущен

  const code = `TKT-${ticketCodeGen()}`;

  const ticket = await prisma.$transaction(async (tx) => {
    await tx.ticketOrder.update({
      where: { id: orderId },
      data: { status: OrderStatus.PAID },
    });
    return tx.ticket.create({
      data: { orderId, ticketCode: code, status: TicketStatus.VALID },
    });
  });

  // Письмо с QR — не блокирует основной поток при сбое SMTP.
  try {
    const qr = await generateQrDataUrl(code);
    await sendTicketEmail({
      to: order.email,
      fullName: order.fullName,
      ticketCode: code,
      qrDataUrl: qr,
      productTitle: order.ticketProduct.titleRu,
    });
  } catch (e) {
    console.error("[issueTicketForOrder] email failed", e);
  }

  return ticket;
}

export async function getOrderByNumber(orderNumber: string) {
  try {
    return await prisma.ticketOrder.findUnique({
      where: { orderNumber },
      include: { ticket: true, ticketProduct: true },
    });
  } catch {
    return null;
  }
}
