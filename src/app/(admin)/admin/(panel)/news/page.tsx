import Link from "next/link";
import { prisma } from "@/lib/db";
import { deleteNews } from "@/server/actions/admin/content";
import { PageHeader, Panel, StatusBadge } from "@/components/admin/AdminUI";

export const dynamic = "force-dynamic";

export default async function AdminNewsPage() {
  const news = await prisma.news.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <>
      <PageHeader title="Новости" action={{ href: "/admin/news/new", label: "Добавить новость" }} />
      <Panel className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b text-left text-muted-foreground">
            <tr>
              <th className="p-3">Заголовок</th>
              <th className="p-3">Категория</th>
              <th className="p-3">Статус</th>
              <th className="p-3 text-right">Действия</th>
            </tr>
          </thead>
          <tbody>
            {news.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-6 text-center text-muted-foreground">
                  Новостей пока нет
                </td>
              </tr>
            ) : (
              news.map((n) => (
                <tr key={n.id} className="border-b last:border-0">
                  <td className="p-3 font-medium">{n.titleRu}</td>
                  <td className="p-3 text-muted-foreground">{n.categoryRu}</td>
                  <td className="p-3">
                    <StatusBadge status={n.status} />
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/news/${n.id}`}
                        className="h-8 rounded-full border px-3 text-xs leading-8 hover:bg-secondary"
                      >
                        Изменить
                      </Link>
                      <form action={deleteNews}>
                        <input type="hidden" name="id" value={n.id} />
                        <button className="h-8 rounded-full border px-3 text-xs text-destructive hover:bg-destructive/10">
                          Удалить
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Panel>
    </>
  );
}
