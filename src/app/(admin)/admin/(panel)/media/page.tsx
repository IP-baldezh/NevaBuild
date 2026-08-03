import { prisma } from "@/lib/db";
import { uploadMedia, deleteMediaAsset } from "@/server/actions/admin/media";
import { uploadMedia, deleteMediaAsset } from "@/server/actions/admin/media";
import { PageHeader, Panel } from "@/components/admin/AdminUI";
import { SubmitButton } from "@/components/admin/SubmitButton";

export const dynamic = "force-dynamic";

async function doUpload(fd: FormData) {
  "use server";
  await uploadMedia(fd);
}

async function doUpload(fd: FormData) {
  "use server";
  await uploadMedia(fd);
}

export default async function AdminMediaPage() {
  const assets = await prisma.mediaAsset.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <>
      <PageHeader title="Медиа" description="Загрузка изображений (логотипы, обложки, фото)" />

      <Panel className="mb-6 p-6">
        <form action={doUpload} className="flex flex-wrap items-center gap-4">
        <form action={doUpload} className="flex flex-wrap items-center gap-4">
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
          Файл сохраняется в /public/uploads. Используйте пикер в формах или скопируйте URL отсюда.
        </p>
      </Panel>

      {assets.length === 0 ? (
        <Panel className="p-6 text-sm text-muted-foreground">Файлов пока нет</Panel>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {assets.map((a) => (
            <Panel key={a.id} className="overflow-hidden">
              <div className="aspect-video bg-muted flex items-center justify-center">
                {a.mimeType.startsWith("image/") ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={a.url} alt={a.filename} className="h-full w-full object-contain" />
                ) : (
                  <span className="text-xs text-muted-foreground">{a.mimeType}</span>
              <div className="aspect-video bg-muted flex items-center justify-center">
                {a.mimeType.startsWith("image/") ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={a.url} alt={a.filename} className="h-full w-full object-contain" />
                ) : (
                  <span className="text-xs text-muted-foreground">{a.mimeType}</span>
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
                  <form
                    action={async () => {
                      "use server";
                      await deleteMediaAsset(a.id);
                    }}
                  >
                  <form
                    action={async () => {
                      "use server";
                      await deleteMediaAsset(a.id);
                    }}
                  >
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
