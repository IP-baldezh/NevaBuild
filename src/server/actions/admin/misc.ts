"use server";

import { revalidatePath } from "next/cache";
import { LeadStatus, OrderStatus, Role } from "@prisma/client";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { requireAdmin, requireRole } from "@/lib/authz";
import { issueTicketForOrder } from "@/server/services/orders";

const s = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim();

// --- Заявки ---
export async function updateLead(fd: FormData) {
  await requireAdmin();
  const id = s(fd, "id");
  await prisma.lead.update({
    where: { id },
    data: {
      status: s(fd, "status") as LeadStatus,
      managerComment: s(fd, "managerComment") || null,
    },
  });
  revalidatePath("/admin/leads");
}

// --- Заказы (ручное подтверждение оплаты, напр. при оплате по счёту) ---
export async function markOrderPaidManually(fd: FormData) {
  await requireRole([Role.SUPER_ADMIN, Role.SALES_MANAGER]);
  const id = s(fd, "id");
  await issueTicketForOrder(id);
  revalidatePath("/admin/orders");
}

export async function cancelOrder(fd: FormData) {
  await requireRole([Role.SUPER_ADMIN, Role.SALES_MANAGER]);
  const id = s(fd, "id");
  await prisma.ticketOrder.update({
    where: { id },
    data: { status: OrderStatus.CANCELLED },
  });
  revalidatePath("/admin/orders");
}

// --- Пользователи админки ---
export async function createUser(fd: FormData) {
  await requireRole([Role.SUPER_ADMIN]);
  const email = s(fd, "email").toLowerCase();
  const password = s(fd, "password");
  if (!email || password.length < 6) return;
  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.user.upsert({
    where: { email },
    update: { name: s(fd, "name"), role: s(fd, "role") as Role, passwordHash },
    create: {
      email,
      name: s(fd, "name"),
      role: s(fd, "role") as Role,
      passwordHash,
    },
  });
  revalidatePath("/admin/users");
}

export async function toggleUserActive(fd: FormData) {
  await requireRole([Role.SUPER_ADMIN]);
  const id = s(fd, "id");
  const user = await prisma.user.findUnique({ where: { id } });
  if (user) {
    await prisma.user.update({
      where: { id },
      data: { isActive: !user.isActive },
    });
  }
  revalidatePath("/admin/users");
}
