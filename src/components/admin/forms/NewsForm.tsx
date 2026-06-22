import Link from "next/link";
import type { News } from "@prisma/client";
import { ContentStatus } from "@prisma/client";
import { saveNews } from "@/server/actions/admin/content";
import { FormField } from "@/components/forms/FormField";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SelectNative } from "@/components/ui/select-native";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { Panel } from "@/components/admin/AdminUI";

export function NewsForm({ news }: { news?: News | null }) {
  return (
    <form action={saveNews} className="space-y-6">
      {news && <input type="hidden" name="id" value={news.id} />}
      <Panel className="space-y-4 p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Заголовок (RU)" htmlFor="titleRu" required>
            <Input id="titleRu" name="titleRu" defaultValue={news?.titleRu} required />
          </FormField>
          <FormField label="Заголовок (EN)" htmlFor="titleEn" required>
            <Input id="titleEn" name="titleEn" defaultValue={news?.titleEn} required />
          </FormField>
          <FormField label="Slug" htmlFor="slug">
            <Input id="slug" name="slug" defaultValue={news?.slug} placeholder="авто из EN" />
          </FormField>
          <FormField label="Обложка URL" htmlFor="coverImageUrl">
            <Input id="coverImageUrl" name="coverImageUrl" defaultValue={news?.coverImageUrl ?? ""} />
          </FormField>
          <FormField label="Категория (RU)" htmlFor="categoryRu">
            <Input id="categoryRu" name="categoryRu" defaultValue={news?.categoryRu ?? ""} />
          </FormField>
          <FormField label="Категория (EN)" htmlFor="categoryEn">
            <Input id="categoryEn" name="categoryEn" defaultValue={news?.categoryEn ?? ""} />
          </FormField>
          <FormField label="Статус" htmlFor="status">
            <SelectNative id="status" name="status" defaultValue={news?.status ?? ContentStatus.DRAFT}>
              <option value={ContentStatus.DRAFT}>Черновик</option>
              <option value={ContentStatus.PUBLISHED}>Опубликовано</option>
            </SelectNative>
          </FormField>
        </div>
        <FormField label="Анонс (RU)" htmlFor="excerptRu">
          <Textarea id="excerptRu" name="excerptRu" defaultValue={news?.excerptRu ?? ""} />
        </FormField>
        <FormField label="Анонс (EN)" htmlFor="excerptEn">
          <Textarea id="excerptEn" name="excerptEn" defaultValue={news?.excerptEn ?? ""} />
        </FormField>
        <FormField label="Текст (RU)" htmlFor="contentRu">
          <Textarea id="contentRu" name="contentRu" rows={8} defaultValue={news?.contentRu ?? ""} />
        </FormField>
        <FormField label="Текст (EN)" htmlFor="contentEn">
          <Textarea id="contentEn" name="contentEn" rows={8} defaultValue={news?.contentEn ?? ""} />
        </FormField>
      </Panel>
      <div className="flex gap-3">
        <SubmitButton>Сохранить</SubmitButton>
        <Link href="/admin/news" className="h-11 rounded-full border px-6 text-sm leading-[2.75rem] hover:bg-secondary">
          Отмена
        </Link>
      </div>
    </form>
  );
}
