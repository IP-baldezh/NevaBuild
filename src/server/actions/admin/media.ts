"use server";

import { writeFile, mkdir, unlink } from "fs/promises";
import { writeFile, mkdir, unlink } from "fs/promises";
import path from "path";
import { customAlphabet } from "nanoid";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireRole, EDITOR_ROLES } from "@/lib/authz";

const genId = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 12);

export type MediaAssetItem = {
  id: string;
  url: string;
  filename: string;
  mimeType: string;
  size: number;
};

export async function fetchMediaAssets(): Promise<MediaAssetItem[]> {
  await requireRole(EDITOR_ROLES);
  const rows = await prisma.mediaAsset.findMany({ orderBy: { createdAt: "desc" } });
  return rows.map((r) => ({
    id: r.id,
    url: r.url,
    filename: r.filename,
    mimeType: r.mimeType,
    size: r.size,
  }));
}

/**
 * Загрузка медиа. Для dev — в /public/uploads.
 * TODO (prod): при заданном S3 сохранять в объектное хранилище.
 */
export async function uploadMedia(fd: FormData): Promise<MediaAssetItem | null> {
  await requireRole(EDITOR_ROLES);
  const file = fd.get("file") as File | null;
  if (!file || file.size === 0) return null;
  if (!file || file.size === 0) return null;

  const ext = (file.name.split(".").pop() ?? "bin").toLowerCase().slice(0, 8);
  const filename = `${genId()}.${ext}`;
  const dir = path.join(process.cwd(), "public", "uploads");
  await mkdir(dir, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(dir, filename), buffer);

  const asset = await prisma.mediaAsset.create({
  const asset = await prisma.mediaAsset.create({
    data: {
      url: `/uploads/${filename}`,
      filename,
      mimeType: file.type || "application/octet-stream",
      size: file.size,
    },
  });
  revalidatePath("/admin/media");
  return {
    id: asset.id,
    url: asset.url,
    filename: asset.filename,
    mimeType: asset.mimeType,
    size: asset.size,
  };
}

export async function deleteMediaAsset(id: string): Promise<void> {
  await requireRole(EDITOR_ROLES);
  const asset = await prisma.mediaAsset.findUnique({ where: { id } });
  if (!asset) return;
  await prisma.mediaAsset.delete({ where: { id } });
  const filePath = path.join(process.cwd(), "public", asset.url.replace(/^\//, ""));
  await unlink(filePath).catch(() => undefined);
  revalidatePath("/admin/media");
  return {
    id: asset.id,
    url: asset.url,
    filename: asset.filename,
    mimeType: asset.mimeType,
    size: asset.size,
  };
}

export async function deleteMediaAsset(id: string): Promise<void> {
  await requireRole(EDITOR_ROLES);
  const asset = await prisma.mediaAsset.findUnique({ where: { id } });
  if (!asset) return;
  await prisma.mediaAsset.delete({ where: { id } });
  const filePath = path.join(process.cwd(), "public", asset.url.replace(/^\//, ""));
  await unlink(filePath).catch(() => undefined);
  revalidatePath("/admin/media");
}
