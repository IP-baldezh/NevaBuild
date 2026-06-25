import Link from "next/link";
import { prisma } from "@/lib/db";
import { deleteExhibitor } from "@/server/actions/admin/content";
import { PageHeader, Panel } from "@/components/admin/AdminUI";

export const dynamic = "force-dynamic";

export default async function AdminExhibitorsPage() {
  const exhibitors = await prisma.exhibitor.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <>
      <PageHeader
        title="Участники"
        action={{ href: "/admin/exhibitors/new", label: "Добавить участника" }}
      />
      <Panel className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b text-left text-muted-foreground">
            <tr>
              <th className="p-3">Название</th>
              <th className="p-3">Статус</th>
              <th className="p-3">Стенд</th>
              <th className="p-3">Публ.</th>
              <th className="p-3 text-right">Действия</th>
            </tr>
          </thead>
          <tbody>
            {exhibitors.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-6 text-center text-muted-foreground">
                  Участников пока нет
                </td>
              </tr>
            ) : (
              exhibitors.map((e) => (
                <tr key={e.id} className="border-b last:border-0">
                  <td className="p-3 font-medium">{e.name}</td>
                  <td className="p-3 text-muted-foreground">{e.status}</td>
                  <td className="p-3 text-muted-foreground">{e.boothNumber ?? "—"}</td>
                  <td className="p-3">{e.isPublished ? "да" : "нет"}</td>
                  <td className="p-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/exhibitors/${e.id}`}
                        className="h-8 rounded-full border px-3 text-xs leading-8 hover:bg-secondary"
                      >
                        Изменить
                      </Link>
                      <form action={deleteExhibitor}>
                        <input type="hidden" name="id" value={e.id} />
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
