import Link from "next/link";
import { prisma } from "@/lib/db";
import { PartnerType } from "@prisma/client";
import { savePartner, deletePartner } from "@/server/actions/admin/content";
import { PageHeader, Panel } from "@/components/admin/AdminUI";
import { FormField } from "@/components/forms/FormField";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SelectNative } from "@/components/ui/select-native";
import { SubmitButton } from "@/components/admin/SubmitButton";

export const dynamic = "force-dynamic";

export default async function AdminPartnersPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>;
}) {
  const { edit } = await searchParams;
  const partners = await prisma.partner.findMany({ orderBy: { sortOrder: "asc" } });
  const e = edit ? partners.find((p) => p.id === edit) : null;

  return (
    <>
      <PageHeader title="Партнёры и амбассадоры" />
      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <Panel className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b text-left text-muted-foreground">
              <tr><th className="p-3">Имя</th><th className="p-3">Тип</th><th className="p-3">Активен</th><th className="p-3 text-right">Действия</th></tr>
            </thead>
            <tbody>
              {partners.map((p) => (
                <tr key={p.id} className="border-b last:border-0">
                  <td className="p-3 font-medium">{p.name}</td>
                  <td className="p-3 text-muted-foreground">{p.type}</td>
                  <td className="p-3">{p.isActive ? "да" : "нет"}</td>
                  <td className="p-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/partners?edit=${p.id}`} className="h-8 rounded-full border px-3 text-xs leading-8 hover:bg-secondary">Изменить</Link>
                      <form action={deletePartner}><input type="hidden" name="id" value={p.id} /><button className="h-8 rounded-full border px-3 text-xs text-destructive hover:bg-destructive/10">Удалить</button></form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>

        <Panel className="h-fit p-6">
          <h2 className="mb-4 font-semibold">{e ? "Редактировать" : "Добавить"}</h2>
          <form action={savePartner} className="space-y-4" key={e?.id ?? "new"}>
            {e && <input type="hidden" name="id" value={e.id} />}
            <FormField label="Имя / название" htmlFor="name" required>
              <Input id="name" name="name" defaultValue={e?.name} required />
            </FormField>
            <FormField label="Тип" htmlFor="type">
              <SelectNative id="type" name="type" defaultValue={e?.type ?? PartnerType.PARTNER}>
                {Object.values(PartnerType).map((t) => <option key={t} value={t}>{t}</option>)}
              </SelectNative>
            </FormField>
            <FormField label="Роль (RU)" htmlFor="roleRu">
              <Input id="roleRu" name="roleRu" defaultValue={e?.roleRu ?? ""} />
            </FormField>
            <FormField label="Роль (EN)" htmlFor="roleEn">
              <Input id="roleEn" name="roleEn" defaultValue={e?.roleEn ?? ""} />
            </FormField>
            <FormField label="Описание (RU)" htmlFor="descriptionRu">
              <Textarea id="descriptionRu" name="descriptionRu" defaultValue={e?.descriptionRu ?? ""} />
            </FormField>
            <FormField label="Логотип URL" htmlFor="logoUrl">
              <Input id="logoUrl" name="logoUrl" defaultValue={e?.logoUrl ?? ""} />
            </FormField>
            <FormField label="Сайт" htmlFor="website">
              <Input id="website" name="website" defaultValue={e?.website ?? ""} />
            </FormField>
            <FormField label="Порядок" htmlFor="sortOrder">
              <Input id="sortOrder" name="sortOrder" type="number" defaultValue={e?.sortOrder ?? 0} />
            </FormField>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="isActive" defaultChecked={e?.isActive ?? true} className="size-4" />
              Активен
            </label>
            <div className="flex gap-2">
              <SubmitButton>Сохранить</SubmitButton>
              {e && <Link href="/admin/partners" className="h-11 rounded-full border px-5 text-sm leading-[2.75rem] hover:bg-secondary">Отмена</Link>}
            </div>
          </form>
        </Panel>
      </div>
    </>
  );
}
