"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ContentStatus, ExhibitorStatus, PartnerType, SessionType } from "@prisma/client";
import { prisma } from "@/lib/db";
import { requireRole } from "@/lib/authz";
import { EDITOR_ROLES } from "@/lib/authz";
import { slugify } from "@/lib/utils";

const s = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim();
const n = (fd: FormData, k: string) => Number(fd.get(k) ?? 0) || 0;
const b = (fd: FormData, k: string) => fd.get(k) === "on" || fd.get(k) === "true";
const lines = (fd: FormData, k: string) =>
  s(fd, k)
    .split("\n")
    .map((x) => x.trim())
    .filter(Boolean);

async function guard() {
  await requireRole(EDITOR_ROLES);
}

// ============================= Категории =============================
export async function saveCategory(fd: FormData) {
  await guard();
  const id = s(fd, "id");
  const data = {
    slug: s(fd, "slug") || slugify(s(fd, "titleEn") || s(fd, "titleRu")),
    titleRu: s(fd, "titleRu"),
    titleEn: s(fd, "titleEn"),
    icon: s(fd, "icon") || null,
    sortOrder: n(fd, "sortOrder"),
  };
  if (id) await prisma.exhibitorCategory.update({ where: { id }, data });
  else await prisma.exhibitorCategory.create({ data });
  revalidatePath("/admin/categories");
  revalidatePath("/", "layout");
}

export async function deleteCategory(fd: FormData) {
  await guard();
  await prisma.exhibitorCategory.delete({ where: { id: s(fd, "id") } });
  revalidatePath("/admin/categories");
}

// ============================= Партнёры =============================
export async function savePartner(fd: FormData) {
  await guard();
  const id = s(fd, "id");
  const data = {
    name: s(fd, "name"),
    type: s(fd, "type") as PartnerType,
    roleRu: s(fd, "roleRu") || null,
    roleEn: s(fd, "roleEn") || null,
    descriptionRu: s(fd, "descriptionRu") || null,
    descriptionEn: s(fd, "descriptionEn") || null,
    logoUrl: s(fd, "logoUrl") || null,
    website: s(fd, "website") || null,
    sortOrder: n(fd, "sortOrder"),
    isActive: b(fd, "isActive"),
  };
  if (id) await prisma.partner.update({ where: { id }, data });
  else await prisma.partner.create({ data });
  revalidatePath("/admin/partners");
  revalidatePath("/", "layout");
}

export async function deletePartner(fd: FormData) {
  await guard();
  await prisma.partner.delete({ where: { id: s(fd, "id") } });
  revalidatePath("/admin/partners");
}

// ============================= Билеты =============================
export async function saveTicketProduct(fd: FormData) {
  await guard();
  const id = s(fd, "id");
  const data = {
    slug: s(fd, "slug") || slugify(s(fd, "titleEn") || s(fd, "titleRu")),
    titleRu: s(fd, "titleRu"),
    titleEn: s(fd, "titleEn"),
    descriptionRu: s(fd, "descriptionRu") || null,
    descriptionEn: s(fd, "descriptionEn") || null,
    price: n(fd, "price"),
    benefitsRu: lines(fd, "benefitsRu"),
    benefitsEn: lines(fd, "benefitsEn"),
    sortOrder: n(fd, "sortOrder"),
    isActive: b(fd, "isActive"),
  };
  if (id) await prisma.ticketProduct.update({ where: { id }, data });
  else await prisma.ticketProduct.create({ data });
  revalidatePath("/admin/tickets");
  revalidatePath("/", "layout");
}

export async function deleteTicketProduct(fd: FormData) {
  await guard();
  await prisma.ticketProduct.delete({ where: { id: s(fd, "id") } });
  revalidatePath("/admin/tickets");
}

// ============================= Новости =============================
export async function saveNews(fd: FormData) {
  await guard();
  const id = s(fd, "id");
  const status = s(fd, "status") as ContentStatus;
  const data = {
    slug: s(fd, "slug") || slugify(s(fd, "titleEn") || s(fd, "titleRu")),
    titleRu: s(fd, "titleRu"),
    titleEn: s(fd, "titleEn"),
    excerptRu: s(fd, "excerptRu") || null,
    excerptEn: s(fd, "excerptEn") || null,
    contentRu: s(fd, "contentRu") || null,
    contentEn: s(fd, "contentEn") || null,
    coverImageUrl: s(fd, "coverImageUrl") || null,
    categoryRu: s(fd, "categoryRu") || null,
    categoryEn: s(fd, "categoryEn") || null,
    status,
    publishedAt: status === ContentStatus.PUBLISHED ? new Date() : null,
  };
  if (id) await prisma.news.update({ where: { id }, data });
  else await prisma.news.create({ data });
  revalidatePath("/admin/news");
  revalidatePath("/", "layout");
  redirect("/admin/news");
}

export async function deleteNews(fd: FormData) {
  await guard();
  await prisma.news.delete({ where: { id: s(fd, "id") } });
  revalidatePath("/admin/news");
}

// ============================= Участники =============================
export async function saveExhibitor(fd: FormData) {
  await guard();
  const id = s(fd, "id");
  const data = {
    slug: s(fd, "slug") || slugify(s(fd, "name")),
    name: s(fd, "name"),
    logoUrl: s(fd, "logoUrl") || null,
    descriptionRu: s(fd, "descriptionRu") || null,
    descriptionEn: s(fd, "descriptionEn") || null,
    countryRu: s(fd, "countryRu") || null,
    countryEn: s(fd, "countryEn") || null,
    cityRu: s(fd, "cityRu") || null,
    cityEn: s(fd, "cityEn") || null,
    boothNumber: s(fd, "boothNumber") || null,
    website: s(fd, "website") || null,
    email: s(fd, "email") || null,
    phone: s(fd, "phone") || null,
    status: s(fd, "status") as ExhibitorStatus,
    isFeatured: b(fd, "isFeatured"),
    isPublished: b(fd, "isPublished"),
    gallery: lines(fd, "gallery"),
  };
  const categoryIds = fd.getAll("categories").map(String).filter(Boolean);

  if (id) {
    await prisma.exhibitor.update({ where: { id }, data });
    await prisma.exhibitorCategoryRelation.deleteMany({ where: { exhibitorId: id } });
    if (categoryIds.length)
      await prisma.exhibitorCategoryRelation.createMany({
        data: categoryIds.map((categoryId) => ({ exhibitorId: id, categoryId })),
      });
  } else {
    const created = await prisma.exhibitor.create({ data });
    if (categoryIds.length)
      await prisma.exhibitorCategoryRelation.createMany({
        data: categoryIds.map((categoryId) => ({ exhibitorId: created.id, categoryId })),
      });
  }
  revalidatePath("/admin/exhibitors");
  revalidatePath("/", "layout");
  redirect("/admin/exhibitors");
}

export async function deleteExhibitor(fd: FormData) {
  await guard();
  await prisma.exhibitor.delete({ where: { id: s(fd, "id") } });
  revalidatePath("/admin/exhibitors");
}

// ============================= Программа =============================
export async function saveProgramDay(fd: FormData) {
  await guard();
  const id = s(fd, "id");
  const data = {
    date: new Date(s(fd, "date")),
    titleRu: s(fd, "titleRu"),
    titleEn: s(fd, "titleEn"),
    sortOrder: n(fd, "sortOrder"),
  };
  if (id) await prisma.programDay.update({ where: { id }, data });
  else await prisma.programDay.create({ data });
  revalidatePath("/admin/program");
  revalidatePath("/", "layout");
}

export async function deleteProgramDay(fd: FormData) {
  await guard();
  await prisma.programDay.delete({ where: { id: s(fd, "id") } });
  revalidatePath("/admin/program");
}

export async function saveSpeaker(fd: FormData) {
  await guard();
  const id = s(fd, "id");
  const data = {
    nameRu: s(fd, "nameRu"),
    nameEn: s(fd, "nameEn"),
    positionRu: s(fd, "positionRu") || null,
    positionEn: s(fd, "positionEn") || null,
    company: s(fd, "company") || null,
  };
  if (id) await prisma.speaker.update({ where: { id }, data });
  else await prisma.speaker.create({ data });
  revalidatePath("/admin/program");
}

export async function saveSession(fd: FormData) {
  await guard();
  const id = s(fd, "id");
  const dayId = s(fd, "dayId");
  const dateBase =
    (await prisma.programDay.findUnique({ where: { id: dayId } }))?.date ?? new Date();
  const mkTime = (hhmm: string) => {
    const [h, m] = hhmm.split(":").map(Number);
    const d = new Date(dateBase);
    d.setUTCHours(h || 0, m || 0, 0, 0);
    return d;
  };
  const data = {
    slug:
      s(fd, "slug") ||
      slugify(s(fd, "titleEn") || s(fd, "titleRu")) + "-" + Date.now().toString(36),
    dayId,
    titleRu: s(fd, "titleRu"),
    titleEn: s(fd, "titleEn"),
    descriptionRu: s(fd, "descriptionRu") || null,
    descriptionEn: s(fd, "descriptionEn") || null,
    startTime: mkTime(s(fd, "startTime")),
    endTime: mkTime(s(fd, "endTime")),
    hallRu: s(fd, "hallRu") || null,
    hallEn: s(fd, "hallEn") || null,
    type: s(fd, "type") as SessionType,
    tags: s(fd, "tags")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
  };
  const speakerIds = fd.getAll("speakers").map(String).filter(Boolean);

  if (id) {
    await prisma.programSession.update({
      where: { id },
      data: { ...data, speakers: { set: speakerIds.map((sid) => ({ id: sid })) } },
    });
  } else {
    await prisma.programSession.create({
      data: { ...data, speakers: { connect: speakerIds.map((sid) => ({ id: sid })) } },
    });
  }
  revalidatePath("/admin/program");
  revalidatePath("/", "layout");
}

export async function deleteSession(fd: FormData) {
  await guard();
  await prisma.programSession.delete({ where: { id: s(fd, "id") } });
  revalidatePath("/admin/program");
}

// ============================= Медиа =============================
export async function deleteMedia(fd: FormData) {
  await guard();
  await prisma.mediaAsset.delete({ where: { id: s(fd, "id") } });
  revalidatePath("/admin/media");
}
