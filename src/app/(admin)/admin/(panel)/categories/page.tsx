import Link from "next/link";
import { prisma } from "@/lib/db";
import { saveCategory, deleteCategory } from "@/server/actions/admin/content";
import { PageHeader, Panel } from "@/components/admin/AdminUI";
import { FormField } from "@/components/forms/FormField";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/admin/SubmitButton";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>;
}) {
  const { edit } = await searchParams;
  const categories = await prisma.exhibitorCategory.findMany({
    orderBy: { sortOrder: "asc" },
  });
  const editing = edit ? categories.find((c) => c.id === edit) : null;

  return (
    <>
      <PageHeader title="Категории участников" description="Разделы выставки" />
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <Panel className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b text-left text-muted-foreground">
              <tr>
                <th className="p-3">Название</th>
                <th className="p-3">Slug</th>
                <th className="p-3">Иконка</th>
                <th className="p-3 text-right">Действия</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((c) => (
                <tr key={c.id} className="border-b last:border-0">
                  <td className="p-3 font-medium">{c.titleRu}</td>
                  <td className="p-3 text-muted-foreground">{c.slug}</td>
                  <td className="p-3 text-muted-foreground">{c.icon}</td>
                  <td className="p-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/categories?edit=${c.id}`} className="h-8 rounded-full border px-3 text-xs leading-8 hover:bg-secondary">
                        Изменить
                      </Link>
                      <form action={deleteCategory}>
                        <input type="hidden" name="id" value={c.id} />
                        <button className="h-8 rounded-full border px-3 text-xs text-destructive hover:bg-destructive/10">Удалить</button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>

        <Panel className="h-fit p-6">
          <h2 className="mb-4 font-semibold">{editing ? "Редактировать" : "Добавить"}</h2>
          <form action={saveCategory} className="space-y-4" key={editing?.id ?? "new"}>
            {editing && <input type="hidden" name="id" value={editing.id} />}
            <FormField label="Название (RU)" htmlFor="titleRu" required>
              <Input id="titleRu" name="titleRu" defaultValue={editing?.titleRu} required />
            </FormField>
            <FormField label="Название (EN)" htmlFor="titleEn" required>
              <Input id="titleEn" name="titleEn" defaultValue={editing?.titleEn} required />
            </FormField>
            <FormField label="Slug" htmlFor="slug">
              <Input id="slug" name="slug" defaultValue={editing?.slug} placeholder="авто из EN" />
            </FormField>
            <FormField label="Иконка (lucide)" htmlFor="icon">
              <Input id="icon" name="icon" defaultValue={editing?.icon ?? ""} placeholder="BrickWall" />
            </FormField>
            <FormField label="Порядок" htmlFor="sortOrder">
              <Input id="sortOrder" name="sortOrder" type="number" defaultValue={editing?.sortOrder ?? 0} />
            </FormField>
            <div className="flex gap-2">
              <SubmitButton>Сохранить</SubmitButton>
              {editing && (
                <Link href="/admin/categories" className="h-11 rounded-full border px-5 text-sm leading-[2.75rem] hover:bg-secondary">
                  Отмена
                </Link>
              )}
            </div>
          </form>
        </Panel>
      </div>
    </>
  );
}
