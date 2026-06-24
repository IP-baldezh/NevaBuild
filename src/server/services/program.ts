import "server-only";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- used via typeof for Prisma type inference
const dayWithSessions = Prisma.validator<Prisma.ProgramDayDefaultArgs>()({
  include: {
    sessions: {
      include: { speakers: true },
      orderBy: { startTime: "asc" },
    },
  },
});
export type ProgramDayWithSessions = Prisma.ProgramDayGetPayload<typeof dayWithSessions>;

export async function getProgramDays() {
  try {
    return await prisma.programDay.findMany({
      include: {
        sessions: {
          include: { speakers: true },
          orderBy: { startTime: "asc" },
        },
      },
      orderBy: { sortOrder: "asc" },
    });
  } catch {
    return [];
  }
}

export async function getSessionBySlug(slug: string) {
  try {
    return await prisma.programSession.findUnique({
      where: { slug },
      include: { speakers: true, day: true },
    });
  } catch {
    return null;
  }
}

export async function getAllSessionSlugs(): Promise<string[]> {
  try {
    const rows = await prisma.programSession.findMany({
      select: { slug: true },
    });
    return rows.map((r) => r.slug);
  } catch {
    return [];
  }
}
