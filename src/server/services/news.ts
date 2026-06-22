import "server-only";
import { ContentStatus } from "@prisma/client";
import { prisma } from "@/lib/db";

export async function getLatestNews(limit = 4) {
  try {
    return await prisma.news.findMany({
      where: { status: ContentStatus.PUBLISHED },
      orderBy: { publishedAt: "desc" },
      take: limit,
    });
  } catch {
    return [];
  }
}

export async function getNewsList() {
  try {
    return await prisma.news.findMany({
      where: { status: ContentStatus.PUBLISHED },
      orderBy: { publishedAt: "desc" },
    });
  } catch {
    return [];
  }
}

export async function getNewsBySlug(slug: string) {
  try {
    return await prisma.news.findFirst({
      where: { slug, status: ContentStatus.PUBLISHED },
    });
  } catch {
    return null;
  }
}

export async function getAllNewsSlugs(): Promise<string[]> {
  try {
    const rows = await prisma.news.findMany({
      where: { status: ContentStatus.PUBLISHED },
      select: { slug: true },
    });
    return rows.map((r) => r.slug);
  } catch {
    return [];
  }
}
