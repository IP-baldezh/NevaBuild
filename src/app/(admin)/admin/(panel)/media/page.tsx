import Image from "next/image";
import { prisma } from "@/lib/db";
import { uploadMedia } from "@/server/actions/admin/media";
import { deleteMedia } from "@/server/actions/admin/content";
import { PageHeader, Panel } from "@/components/admin/AdminUI";
import { SubmitButton } from "@/components/admin/SubmitButton";

export const dynamic = "force-dynamic";

export default async function AdminMediaPage() {
  const assets = await prisma.mediaAsset.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <>
      <PageHeader title="Медиа" description="Загрузка изображений (логотипы, обложки, фото)" />

      <Panel className="mb-6 p-6">
        <form action={uploadMedia} className="flex flex-wrap items-center gap-4">
          <input
            type="file"
            name="file"
            accept="image/*"
            required
            className="text-sm file:mr-4 file:rounded-full file:border-0 file:bg-secondary file:px-4 file:py-2 file:text-sm file:font-semibold"
          />
          <SubmitButton>Загрузить</SubmitButton>
        </form>
        <p className="mt-2 text-xs text-muted-foreground">
          Файл сохраняется в /public/uploads. Скопируйте URL и вставьте в нужное поле (логотип, обложка).
        </p>
      </Panel>

      {assets.length === 0 ? (
        <Panel className="p-6 text-sm text-muted-foreground">Файлов пока нет</Panel>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {assets.map((a) => (
            <Panel key={a.id} className="overflow-hidden">
              <div className="relative aspect-video bg-muted">
                {a.mimeType.startsWith("image/") && (
                  <Image src={a.url} alt={a.filename} fill className="object-contain" />
                )}
              </div>
              <div className="p-3">
                <input
                  readOnly
                  value={a.url}
                  className="w-full truncate rounded border bg-background px-2 py-1 text-xs"
                />
                <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{Math.round(a.size / 1024)} КБ</span>
                  <form action={deleteMedia}>
                    <input type="hidden" name="id" value={a.id} />
                    <button className="text-destructive hover:underline">удалить</button>
                  </form>
                </div>
              </div>
            </Panel>
          ))}
        </div>
      )}
    </>
  );
}
