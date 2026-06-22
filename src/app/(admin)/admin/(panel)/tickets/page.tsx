import Link from "next/link";
import { prisma } from "@/lib/db";
import { formatPrice } from "@/lib/utils";
import { saveTicketProduct, deleteTicketProduct } from "@/server/actions/admin/content";
import { PageHeader, Panel } from "@/components/admin/AdminUI";
import { FormField } from "@/components/forms/FormField";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SubmitButton } from "@/components/admin/SubmitButton";

export const dynamic = "force-dynamic";

export default async function AdminTicketsPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>;
}) {
  const { edit } = await searchParams;
  const products = await prisma.ticketProduct.findMany({ orderBy: { sortOrder: "asc" } });
  const e = edit ? products.find((p) => p.id === edit) : null;

  return (
    <>
      <PageHeader
        title="Билеты"
        description="Типы билетов. Заказы — в разделе «Заказы»."
        action={{ href: "/admin/orders", label: "К заказам" }}
      />
      <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
        <Panel className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b text-left text-muted-foreground">
              <tr><th className="p-3">Билет</th><th className="p-3">Цена</th><th className="p-3">Активен</th><th className="p-3 text-right">Действия</th></tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b last:border-0">
                  <td className="p-3 font-medium">{p.titleRu}</td>
                  <td className="p-3">{formatPrice(p.price)}</td>
                  <td className="p-3">{p.isActive ? "да" : "нет"}</td>
                  <td className="p-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/tickets?edit=${p.id}`} className="h-8 rounded-full border px-3 text-xs leading-8 hover:bg-secondary">Изменить</Link>
                      <form action={deleteTicketProduct}><input type="hidden" name="id" value={p.id} /><button className="h-8 rounded-full border px-3 text-xs text-destructive hover:bg-destructive/10">Удалить</button></form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>

        <Panel className="h-fit p-6">
          <h2 className="mb-4 font-semibold">{e ? "Редактировать" : "Добавить"}</h2>
          <form action={saveTicketProduct} className="space-y-4" key={e?.id ?? "new"}>
            {e && <input type="hidden" name="id" value={e.id} />}
            <FormField label="Название (RU)" htmlFor="titleRu" required>
              <Input id="titleRu" name="titleRu" defaultValue={e?.titleRu} required />
            </FormField>
            <FormField label="Название (EN)" htmlFor="titleEn" required>
              <Input id="titleEn" name="titleEn" defaultValue={e?.titleEn} required />
            </FormField>
            <FormField label="Цена, ₽" htmlFor="price" required>
              <Input id="price" name="price" type="number" defaultValue={e?.price ?? 0} required />
            </FormField>
            <FormField label="Описание (RU)" htmlFor="descriptionRu">
              <Textarea id="descriptionRu" name="descriptionRu" defaultValue={e?.descriptionRu ?? ""} />
            </FormField>
            <FormField label="Описание (EN)" htmlFor="descriptionEn">
              <Textarea id="descriptionEn" name="descriptionEn" defaultValue={e?.descriptionEn ?? ""} />
            </FormField>
            <FormField label="Преимущества RU (по строке)" htmlFor="benefitsRu">
              <Textarea id="benefitsRu" name="benefitsRu" defaultValue={(e?.benefitsRu ?? []).join("\n")} />
            </FormField>
            <FormField label="Преимущества EN (по строке)" htmlFor="benefitsEn">
              <Textarea id="benefitsEn" name="benefitsEn" defaultValue={(e?.benefitsEn ?? []).join("\n")} />
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
              {e && <Link href="/admin/tickets" className="h-11 rounded-full border px-5 text-sm leading-[2.75rem] hover:bg-secondary">Отмена</Link>}
            </div>
          </form>
        </Panel>
      </div>
    </>
  );
}
