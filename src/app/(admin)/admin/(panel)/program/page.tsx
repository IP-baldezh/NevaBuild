import Link from "next/link";
import { prisma } from "@/lib/db";
import { SessionType } from "@prisma/client";
import {
  saveProgramDay,
  deleteProgramDay,
  saveSpeaker,
  saveSession,
  deleteSession,
} from "@/server/actions/admin/content";
import { PageHeader, Panel } from "@/components/admin/AdminUI";
import { FormField } from "@/components/forms/FormField";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SelectNative } from "@/components/ui/select-native";
import { SubmitButton } from "@/components/admin/SubmitButton";

export const dynamic = "force-dynamic";

const hhmm = (d: Date) => new Date(d).toISOString().slice(11, 16);
const dateVal = (d: Date) => new Date(d).toISOString().slice(0, 10);

export default async function AdminProgramPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>;
}) {
  const { edit } = await searchParams;
  const [days, speakers, sessions] = await Promise.all([
    prisma.programDay.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.speaker.findMany({ orderBy: { nameRu: "asc" } }),
    prisma.programSession.findMany({
      orderBy: { startTime: "asc" },
      include: { speakers: true, day: true },
    }),
  ]);
  const editing = edit ? sessions.find((s) => s.id === edit) : null;

  return (
    <>
      <PageHeader title="Деловая программа" description="Дни, спикеры и события" />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Дни */}
        <Panel className="p-6">
          <h2 className="mb-4 font-semibold">Дни</h2>
          <ul className="mb-4 space-y-2">
            {days.map((d) => (
              <li
                key={d.id}
                className="flex items-center justify-between rounded-lg border px-3 py-2 text-sm"
              >
                <span>
                  {d.titleRu} — {dateVal(d.date)}
                </span>
                <form action={deleteProgramDay}>
                  <input type="hidden" name="id" value={d.id} />
                  <button className="text-xs text-destructive hover:underline">удалить</button>
                </form>
              </li>
            ))}
          </ul>
          <form action={saveProgramDay} className="grid grid-cols-2 gap-3">
            <FormField label="Название RU" htmlFor="d-ru">
              <Input id="d-ru" name="titleRu" required />
            </FormField>
            <FormField label="Название EN" htmlFor="d-en">
              <Input id="d-en" name="titleEn" required />
            </FormField>
            <FormField label="Дата" htmlFor="d-date">
              <Input id="d-date" name="date" type="date" required />
            </FormField>
            <FormField label="Порядок" htmlFor="d-sort">
              <Input id="d-sort" name="sortOrder" type="number" defaultValue={0} />
            </FormField>
            <div className="col-span-2">
              <SubmitButton>Добавить день</SubmitButton>
            </div>
          </form>
        </Panel>

        {/* Спикеры */}
        <Panel className="p-6">
          <h2 className="mb-4 font-semibold">Спикеры</h2>
          <ul className="mb-4 max-h-40 space-y-1 overflow-y-auto text-sm">
            {speakers.map((s) => (
              <li key={s.id} className="rounded-lg border px-3 py-1.5">
                {s.nameRu} — <span className="text-muted-foreground">{s.positionRu}</span>
              </li>
            ))}
          </ul>
          <form action={saveSpeaker} className="grid grid-cols-2 gap-3">
            <FormField label="Имя RU" htmlFor="sp-ru">
              <Input id="sp-ru" name="nameRu" required />
            </FormField>
            <FormField label="Имя EN" htmlFor="sp-en">
              <Input id="sp-en" name="nameEn" required />
            </FormField>
            <FormField label="Должность RU" htmlFor="sp-pru">
              <Input id="sp-pru" name="positionRu" />
            </FormField>
            <FormField label="Должность EN" htmlFor="sp-pen">
              <Input id="sp-pen" name="positionEn" />
            </FormField>
            <FormField label="Компания" htmlFor="sp-co" className="col-span-2">
              <Input id="sp-co" name="company" />
            </FormField>
            <div className="col-span-2">
              <SubmitButton>Добавить спикера</SubmitButton>
            </div>
          </form>
        </Panel>
      </div>

      {/* Сессии */}
      <Panel className="mt-6 p-6">
        <h2 className="mb-4 font-semibold">
          {editing ? "Редактировать событие" : "Добавить событие"}
        </h2>
        <form action={saveSession} className="grid gap-3 sm:grid-cols-2" key={editing?.id ?? "new"}>
          {editing && <input type="hidden" name="id" value={editing.id} />}
          <FormField label="День" htmlFor="se-day">
            <SelectNative id="se-day" name="dayId" defaultValue={editing?.dayId ?? days[0]?.id}>
              {days.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.titleRu}
                </option>
              ))}
            </SelectNative>
          </FormField>
          <FormField label="Тип" htmlFor="se-type">
            <SelectNative
              id="se-type"
              name="type"
              defaultValue={editing?.type ?? SessionType.LECTURE}
            >
              {Object.values(SessionType).map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </SelectNative>
          </FormField>
          <FormField label="Заголовок RU" htmlFor="se-ru">
            <Input id="se-ru" name="titleRu" defaultValue={editing?.titleRu} required />
          </FormField>
          <FormField label="Заголовок EN" htmlFor="se-en">
            <Input id="se-en" name="titleEn" defaultValue={editing?.titleEn} required />
          </FormField>
          <FormField label="Начало" htmlFor="se-start">
            <Input
              id="se-start"
              name="startTime"
              type="time"
              defaultValue={editing ? hhmm(editing.startTime) : "10:00"}
              required
            />
          </FormField>
          <FormField label="Конец" htmlFor="se-end">
            <Input
              id="se-end"
              name="endTime"
              type="time"
              defaultValue={editing ? hhmm(editing.endTime) : "11:00"}
              required
            />
          </FormField>
          <FormField label="Зал RU" htmlFor="se-hru">
            <Input id="se-hru" name="hallRu" defaultValue={editing?.hallRu ?? ""} />
          </FormField>
          <FormField label="Зал EN" htmlFor="se-hen">
            <Input id="se-hen" name="hallEn" defaultValue={editing?.hallEn ?? ""} />
          </FormField>
          <FormField label="Описание RU" htmlFor="se-dru" className="sm:col-span-2">
            <Textarea
              id="se-dru"
              name="descriptionRu"
              defaultValue={editing?.descriptionRu ?? ""}
            />
          </FormField>
          <FormField label="Описание EN" htmlFor="se-den" className="sm:col-span-2">
            <Textarea
              id="se-den"
              name="descriptionEn"
              defaultValue={editing?.descriptionEn ?? ""}
            />
          </FormField>
          <FormField label="Теги (через запятую)" htmlFor="se-tags" className="sm:col-span-2">
            <Input id="se-tags" name="tags" defaultValue={editing?.tags.join(", ")} />
          </FormField>
          <div className="sm:col-span-2">
            <p className="mb-2 text-sm font-medium">Спикеры</p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {speakers.map((sp) => (
                <label key={sp.id} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    name="speakers"
                    value={sp.id}
                    defaultChecked={editing?.speakers.some((x) => x.id === sp.id)}
                    className="size-4"
                  />
                  {sp.nameRu}
                </label>
              ))}
            </div>
          </div>
          <div className="flex gap-2 sm:col-span-2">
            <SubmitButton>Сохранить событие</SubmitButton>
            {editing && (
              <Link
                href="/admin/program"
                className="h-11 rounded-full border px-5 text-sm leading-[2.75rem] hover:bg-secondary"
              >
                Отмена
              </Link>
            )}
          </div>
        </form>

        <div className="mt-6 space-y-2">
          {sessions.map((s) => (
            <div
              key={s.id}
              className="flex items-center justify-between gap-3 rounded-lg border px-3 py-2 text-sm"
            >
              <div>
                <span className="font-medium">{s.titleRu}</span>{" "}
                <span className="text-muted-foreground">
                  — {s.day.titleRu}, {hhmm(s.startTime)}
                </span>
              </div>
              <div className="flex gap-3">
                <Link href={`/admin/program?edit=${s.id}`} className="text-xs hover:underline">
                  изменить
                </Link>
                <form action={deleteSession}>
                  <input type="hidden" name="id" value={s.id} />
                  <button className="text-xs text-destructive hover:underline">удалить</button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </>
  );
}
