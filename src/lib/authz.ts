import "server-only";
import { redirect } from "next/navigation";
import { Role } from "@prisma/client";
import { auth } from "./auth";

// Роли с доступом в админ-панель.
export const ADMIN_ROLES: Role[] = [
  Role.SUPER_ADMIN,
  Role.CONTENT_MANAGER,
  Role.SALES_MANAGER,
  Role.VIEWER,
];

// Роли, которым разрешено изменять контент (не VIEWER).
export const EDITOR_ROLES: Role[] = [
  Role.SUPER_ADMIN,
  Role.CONTENT_MANAGER,
  Role.SALES_MANAGER,
];

/** Гарантирует, что текущий пользователь — администратор. Иначе редирект на логин. */
export async function requireAdmin() {
  const session = await auth();
  if (!session?.user || !ADMIN_ROLES.includes(session.user.role)) {
    redirect("/admin/login");
  }
  return session;
}

/** Гарантирует одну из переданных ролей. Иначе — на дашборд. */
export async function requireRole(roles: Role[]) {
  const session = await requireAdmin();
  if (!roles.includes(session.user.role)) {
    redirect("/admin");
  }
  return session;
}

export function canEdit(role: Role | undefined) {
  return !!role && EDITOR_ROLES.includes(role);
}
