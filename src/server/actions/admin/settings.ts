"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/authz";

export type FormState = { ok: boolean; message?: string };

function num(fd: FormData, key: string): number {
  return Number(fd.get(key) ?? 0) || 0;
}
function str(fd: FormData, key: string): string {
  return String(fd.get(key) ?? "").trim();
}

export async function updateEventSettings(
  _prev: FormState,
  fd: FormData,
): Promise<FormState> {
  await requireAdmin();

  const data = {
    titleRu: str(fd, "titleRu"),
    titleEn: str(fd, "titleEn"),
    dateStart: new Date(str(fd, "dateStart")),
    dateEnd: new Date(str(fd, "dateEnd")),
    venueRu: str(fd, "venueRu"),
    venueEn: str(fd, "venueEn"),
    cityRu: str(fd, "cityRu"),
    cityEn: str(fd, "cityEn"),
    phone: str(fd, "phone"),
    email: str(fd, "email"),
    addressRu: str(fd, "addressRu"),
    addressEn: str(fd, "addressEn"),
    visitorCount: num(fd, "visitorCount"),
    exhibitorCount: num(fd, "exhibitorCount"),
    areaSize: num(fd, "areaSize"),
    programEventsCount: num(fd, "programEventsCount"),
    programDays: num(fd, "programDays"),
    seoTitleRu: str(fd, "seoTitleRu") || null,
    seoTitleEn: str(fd, "seoTitleEn") || null,
    seoDescriptionRu: str(fd, "seoDescriptionRu") || null,
    seoDescriptionEn: str(fd, "seoDescriptionEn") || null,
    organizerRu: str(fd, "organizerRu") || null,
    organizerEn: str(fd, "organizerEn") || null,
    social: {
      telegram: str(fd, "social_telegram"),
      vk: str(fd, "social_vk"),
      youtube: str(fd, "social_youtube"),
      website: str(fd, "social_website"),
    },
    domains: str(fd, "domains")
      .split(",")
      .map((d) => d.trim())
      .filter(Boolean),
  };

  if (!data.titleRu || isNaN(data.dateStart.getTime())) {
    return { ok: false, message: "Проверьте обязательные поля и даты." };
  }

  await prisma.eventSettings.upsert({
    where: { id: "default" },
    update: data,
    create: { id: "default", ...data },
  });

  revalidatePath("/", "layout");
  return { ok: true, message: "Настройки сохранены." };
}
