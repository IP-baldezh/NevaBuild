import "server-only";
import { type PartnerType } from "@prisma/client";
import { prisma } from "@/lib/db";

export async function getPartners(type?: PartnerType) {
  try {
    return await prisma.partner.findMany({
      where: { isActive: true, ...(type ? { type } : {}) },
      orderBy: { sortOrder: "asc" },
    });
  } catch {
    return [];
  }
}
