"use server";

import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { customAlphabet } from "nanoid";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireRole, EDITOR_ROLES } from "@/lib/authz";

const genId = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 12);

/**
 * Загрузка медиа. Для dev — в /public/uploads.
 * TODO (prod): при заданном S3 (см. .env) сохранять в объектное хранилище,
 * чтобы работало в нескольких репликах. Здесь — локальный диск.
 */
export async function uploadMedia(fd: FormData) {
  await requireRole(EDITOR_ROLES);
  const file = fd.get("file") as File | null;
  if (!file || file.size === 0) return;

  const ext = (file.name.split(".").pop() ?? "bin").toLowerCase().slice(0, 8);
  const filename = `${genId()}.${ext}`;
  const dir = path.join(process.cwd(), "public", "uploads");
  await mkdir(dir, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(dir, filename), buffer);

  await prisma.mediaAsset.create({
    data: {
      url: `/uploads/${filename}`,
      filename,
      mimeType: file.type || "application/octet-stream",
      size: file.size,
    },
  });
  revalidatePath("/admin/media");
}
