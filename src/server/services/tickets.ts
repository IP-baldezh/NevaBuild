import "server-only";
import { prisma } from "@/lib/db";

export async function getActiveTicketProducts() {
  try {
    return await prisma.ticketProduct.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    });
  } catch {
    return [];
  }
}

export async function getTicketProductBySlug(slug: string) {
  try {
    return await prisma.ticketProduct.findFirst({
      where: { slug, isActive: true },
    });
  } catch {
    return null;
  }
}

export async function getTicketProductById(id: string) {
  try {
    return await prisma.ticketProduct.findUnique({ where: { id } });
  } catch {
    return null;
  }
}
