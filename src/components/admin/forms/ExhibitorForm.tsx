import Link from "next/link";
import type { Exhibitor, ExhibitorCategory } from "@prisma/client";
import { ExhibitorStatus } from "@prisma/client";
import { saveExhibitor } from "@/server/actions/admin/content";
import { FormField } from "@/components/forms/FormField";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SelectNative } from "@/components/ui/select-native";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { Panel } from "@/components/admin/AdminUI";

export function ExhibitorForm({
  exhibitor,
  categories,
  selectedCategoryIds = [],
}: {
  exhibitor?: Exhibitor | null;
  categories: ExhibitorCategory[];
  selectedCategoryIds?: string[];
}) {
  const e = exhibitor;
  return (
    <form action={saveExhibitor} className="space-y-6">
      {e && <input type="hidden" name="id" value={e.id} />}

      <Panel className="space-y-4 p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Название" htmlFor="name" required>
            <Input id="name" name="name" defaultValue={e?.name} required />
          </FormField>
          <FormField label="Slug" htmlFor="slug">
            <Input id="slug" name="slug" defaultValue={e?.slug} placeholder="авто из названия" />
          </FormField>
          <FormField label="Статус" htmlFor="status">
            <SelectNative id="status" name="status" defaultValue={e?.status ?? ExhibitorStatus.EXHIBITOR}>
              {Object.values(ExhibitorStatus).map((s) => <option key={s} value={s}>{s}</option>)}
            </SelectNative>
          </FormField>
          <FormField label="Стенд №" htmlFor="boothNumber">
            <Input id="boothNumber" name="boothNumber" defaultValue={e?.boothNumber ?? ""} />
          </FormField>
          <FormField label="Страна (RU)" htmlFor="countryRu">
            <Input id="countryRu" name="countryRu" defaultValue={e?.countryRu ?? ""} />
          </FormField>
          <FormField label="Страна (EN)" htmlFor="countryEn">
            <Input id="countryEn" name="countryEn" defaultValue={e?.countryEn ?? ""} />
          </FormField>
          <FormField label="Город (RU)" htmlFor="cityRu">
            <Input id="cityRu" name="cityRu" defaultValue={e?.cityRu ?? ""} />
          </FormField>
          <FormField label="Город (EN)" htmlFor="cityEn">
            <Input id="cityEn" name="cityEn" defaultValue={e?.cityEn ?? ""} />
          </FormField>
          <FormField label="Сайт" htmlFor="website">
            <Input id="website" name="website" defaultValue={e?.website ?? ""} />
          </FormField>
          <FormField label="Логотип URL" htmlFor="logoUrl">
            <Input id="logoUrl" name="logoUrl" defaultValue={e?.logoUrl ?? ""} />
          </FormField>
          <FormField label="Email" htmlFor="email">
            <Input id="email" name="email" defaultValue={e?.email ?? ""} />
          </FormField>
          <FormField label="Телефон" htmlFor="phone">
            <Input id="phone" name="phone" defaultValue={e?.phone ?? ""} />
          </FormField>
        </div>

        <FormField label="Описание (RU)" htmlFor="descriptionRu">
          <Textarea id="descriptionRu" name="descriptionRu" defaultValue={e?.descriptionRu ?? ""} />
        </FormField>
        <FormField label="Описание (EN)" htmlFor="descriptionEn">
          <Textarea id="descriptionEn" name="descriptionEn" defaultValue={e?.descriptionEn ?? ""} />
        </FormField>
        <FormField label="Галерея (URL по строке)" htmlFor="gallery">
          <Textarea id="gallery" name="gallery" defaultValue={(e?.gallery ?? []).join("\n")} />
        </FormField>

        <div>
          <p className="mb-2 text-sm font-medium">Категории</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {categories.map((c) => (
              <label key={c.id} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name="categories"
                  value={c.id}
                  defaultChecked={selectedCategoryIds.includes(c.id)}
                  className="size-4"
                />
                {c.titleRu}
              </label>
            ))}
          </div>
        </div>

        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="isPublished" defaultChecked={e?.isPublished ?? true} className="size-4" />
            Опубликован
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="isFeatured" defaultChecked={e?.isFeatured ?? false} className="size-4" />
            На главной
          </label>
        </div>
      </Panel>

      <div className="flex gap-3">
        <SubmitButton>Сохранить</SubmitButton>
        <Link href="/admin/exhibitors" className="h-11 rounded-full border px-6 text-sm leading-[2.75rem] hover:bg-secondary">
          Отмена
        </Link>
      </div>
    </form>
  );
}
