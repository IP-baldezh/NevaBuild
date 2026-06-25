"use client";

import { useActionState } from "react";
import type { EventSettings } from "@prisma/client";
import { updateEventSettings, type FormState } from "@/server/actions/admin/settings";
import { FormField } from "@/components/forms/FormField";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { Panel } from "@/components/admin/AdminUI";

const dateVal = (d: Date) => new Date(d).toISOString().slice(0, 10);

export function SettingsForm({ settings }: { settings: EventSettings }) {
  const [state, action] = useActionState<FormState, FormData>(updateEventSettings, { ok: false });
  const social = (settings.social ?? {}) as Record<string, string>;

  return (
    <form action={action} className="space-y-6">
      <Panel className="p-6">
        <h2 className="mb-4 font-semibold">Основное</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Название (RU)" htmlFor="titleRu">
            <Input id="titleRu" name="titleRu" defaultValue={settings.titleRu} />
          </FormField>
          <FormField label="Название (EN)" htmlFor="titleEn">
            <Input id="titleEn" name="titleEn" defaultValue={settings.titleEn} />
          </FormField>
          <FormField label="Дата начала" htmlFor="dateStart">
            <Input
              id="dateStart"
              name="dateStart"
              type="date"
              defaultValue={dateVal(settings.dateStart)}
            />
          </FormField>
          <FormField label="Дата окончания" htmlFor="dateEnd">
            <Input
              id="dateEnd"
              name="dateEnd"
              type="date"
              defaultValue={dateVal(settings.dateEnd)}
            />
          </FormField>
          <FormField label="Площадка (RU)" htmlFor="venueRu">
            <Input id="venueRu" name="venueRu" defaultValue={settings.venueRu} />
          </FormField>
          <FormField label="Площадка (EN)" htmlFor="venueEn">
            <Input id="venueEn" name="venueEn" defaultValue={settings.venueEn} />
          </FormField>
          <FormField label="Город (RU)" htmlFor="cityRu">
            <Input id="cityRu" name="cityRu" defaultValue={settings.cityRu} />
          </FormField>
          <FormField label="Город (EN)" htmlFor="cityEn">
            <Input id="cityEn" name="cityEn" defaultValue={settings.cityEn} />
          </FormField>
          <FormField label="Телефон" htmlFor="phone">
            <Input id="phone" name="phone" defaultValue={settings.phone} />
          </FormField>
          <FormField label="Email" htmlFor="email">
            <Input id="email" name="email" defaultValue={settings.email} />
          </FormField>
          <FormField label="Адрес (RU)" htmlFor="addressRu" className="sm:col-span-2">
            <Input id="addressRu" name="addressRu" defaultValue={settings.addressRu} />
          </FormField>
          <FormField label="Адрес (EN)" htmlFor="addressEn" className="sm:col-span-2">
            <Input id="addressEn" name="addressEn" defaultValue={settings.addressEn} />
          </FormField>
        </div>
      </Panel>

      <Panel className="p-6">
        <h2 className="mb-4 font-semibold">Цифры</h2>
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
          <FormField label="Посетители" htmlFor="visitorCount">
            <Input
              id="visitorCount"
              name="visitorCount"
              type="number"
              defaultValue={settings.visitorCount}
            />
          </FormField>
          <FormField label="Компании" htmlFor="exhibitorCount">
            <Input
              id="exhibitorCount"
              name="exhibitorCount"
              type="number"
              defaultValue={settings.exhibitorCount}
            />
          </FormField>
          <FormField label="Площадь, м²" htmlFor="areaSize">
            <Input id="areaSize" name="areaSize" type="number" defaultValue={settings.areaSize} />
          </FormField>
          <FormField label="Мероприятий" htmlFor="programEventsCount">
            <Input
              id="programEventsCount"
              name="programEventsCount"
              type="number"
              defaultValue={settings.programEventsCount}
            />
          </FormField>
          <FormField label="Дней программы" htmlFor="programDays">
            <Input
              id="programDays"
              name="programDays"
              type="number"
              defaultValue={settings.programDays}
            />
          </FormField>
        </div>
      </Panel>

      <Panel className="p-6">
        <h2 className="mb-4 font-semibold">SEO и организатор</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="SEO title (RU)" htmlFor="seoTitleRu">
            <Input id="seoTitleRu" name="seoTitleRu" defaultValue={settings.seoTitleRu ?? ""} />
          </FormField>
          <FormField label="SEO title (EN)" htmlFor="seoTitleEn">
            <Input id="seoTitleEn" name="seoTitleEn" defaultValue={settings.seoTitleEn ?? ""} />
          </FormField>
          <FormField label="SEO description (RU)" htmlFor="seoDescriptionRu">
            <Textarea
              id="seoDescriptionRu"
              name="seoDescriptionRu"
              defaultValue={settings.seoDescriptionRu ?? ""}
            />
          </FormField>
          <FormField label="SEO description (EN)" htmlFor="seoDescriptionEn">
            <Textarea
              id="seoDescriptionEn"
              name="seoDescriptionEn"
              defaultValue={settings.seoDescriptionEn ?? ""}
            />
          </FormField>
          <FormField label="Организатор (RU)" htmlFor="organizerRu">
            <Input id="organizerRu" name="organizerRu" defaultValue={settings.organizerRu ?? ""} />
          </FormField>
          <FormField label="Организатор (EN)" htmlFor="organizerEn">
            <Input id="organizerEn" name="organizerEn" defaultValue={settings.organizerEn ?? ""} />
          </FormField>
        </div>
      </Panel>

      <Panel className="p-6">
        <h2 className="mb-4 font-semibold">Соцсети и домены</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Telegram" htmlFor="social_telegram">
            <Input
              id="social_telegram"
              name="social_telegram"
              defaultValue={social.telegram ?? ""}
            />
          </FormField>
          <FormField label="VK" htmlFor="social_vk">
            <Input id="social_vk" name="social_vk" defaultValue={social.vk ?? ""} />
          </FormField>
          <FormField label="YouTube" htmlFor="social_youtube">
            <Input id="social_youtube" name="social_youtube" defaultValue={social.youtube ?? ""} />
          </FormField>
          <FormField label="Сайт" htmlFor="social_website">
            <Input id="social_website" name="social_website" defaultValue={social.website ?? ""} />
          </FormField>
          <FormField label="Домены (через запятую)" htmlFor="domains" className="sm:col-span-2">
            <Input id="domains" name="domains" defaultValue={settings.domains.join(", ")} />
          </FormField>
        </div>
      </Panel>

      <div className="flex items-center gap-4">
        <SubmitButton>Сохранить</SubmitButton>
        {state.message && (
          <span className={state.ok ? "text-sm text-emerald-600" : "text-sm text-destructive"}>
            {state.message}
          </span>
        )}
      </div>
    </form>
  );
}
