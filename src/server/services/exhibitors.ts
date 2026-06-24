import "server-only";
import { Prisma, type ExhibitorStatus } from "@prisma/client";
import { prisma } from "@/lib/db";

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- used via typeof for Prisma type inference
const withCategories = Prisma.validator<Prisma.ExhibitorDefaultArgs>()({
  include: { categories: { include: { category: true } } },
});
export type ExhibitorWithCategories = Prisma.ExhibitorGetPayload<typeof withCategories>;

export async function getFeaturedExhibitors(limit = 7) {
  try {
    return await prisma.exhibitor.findMany({
      where: { isPublished: true, isFeatured: true },
      include: { categories: { include: { category: true } } },
      orderBy: { sortOrder: "asc" },
      take: limit,
    });
  } catch {
    return [];
  }
}

export type ExhibitorFilters = {
  search?: string;
  category?: string; // slug категории
  country?: string;
  status?: ExhibitorStatus;
};

export async function getExhibitors(filters: ExhibitorFilters = {}) {
  const where: Prisma.ExhibitorWhereInput = { isPublished: true };

  if (filters.search) {
    where.name = { contains: filters.search, mode: "insensitive" };
  }
  if (filters.status) {
    where.status = filters.status;
  }
  if (filters.country) {
    where.OR = [{ countryRu: filters.country }, { countryEn: filters.country }];
  }
  if (filters.category) {
    where.categories = {
      some: { category: { slug: filters.category } },
    };
  }

  try {
    return await prisma.exhibitor.findMany({
      where,
      include: { categories: { include: { category: true } } },
      orderBy: { name: "asc" },
    });
  } catch {
    return [];
  }
}

export async function getExhibitorBySlug(slug: string) {
  try {
    return await prisma.exhibitor.findFirst({
      where: { slug, isPublished: true },
      include: { categories: { include: { category: true } } },
    });
  } catch {
    return null;
  }
}

export async function getExhibitorCategories() {
  try {
    return await prisma.exhibitorCategory.findMany({
      orderBy: { sortOrder: "asc" },
    });
  } catch {
    return [];
  }
}

export async function getExhibitorCountries(): Promise<string[]> {
  try {
    const rows = await prisma.exhibitor.findMany({
      where: { isPublished: true },
      select: { countryRu: true },
      distinct: ["countryRu"],
    });
    return rows
      .map((r) => r.countryRu)
      .filter((c): c is string => Boolean(c))
      .sort((a, b) => a.localeCompare(b));
  } catch {
    return [];
  }
}

export async function getAllExhibitorSlugs(): Promise<string[]> {
  try {
    const rows = await prisma.exhibitor.findMany({
      where: { isPublished: true },
      select: { slug: true },
    });
    return rows.map((r) => r.slug);
  } catch {
    return [];
  }
}
