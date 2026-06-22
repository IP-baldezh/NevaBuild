import { prisma } from "@/lib/db";
import { updateLead } from "@/server/actions/admin/misc";
import { PageHeader, Panel } from "@/components/admin/AdminUI";
import { SelectNative } from "@/components/ui/select-native";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/admin/SubmitButton";

export const dynamic = "force-dynamic";

const STATUSES = ["NEW", "IN_PROGRESS", "CONTACTED", "CLOSED"] as const;

export default async function AdminLeadsPage() {
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <>
      <PageHeader title="Заявки" description="Заявки на участие и обратная связь" />
      {leads.length === 0 ? (
        <Panel className="p-6 text-sm text-muted-foreground">Заявок пока нет</Panel>
      ) : (
        <div className="space-y-3">
          {leads.map((l) => (
            <Panel key={l.id} className="p-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{l.fullName}</span>
                    <span className="rounded bg-muted px-2 py-0.5 text-xs">{l.type}</span>
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {l.company && <span>{l.company} · </span>}
                    <a href={`mailto:${l.email}`} className="hover:underline">{l.email}</a>
                    {l.phone && <span> · {l.phone}</span>}
                  </div>
                  {l.message && <p className="mt-2 max-w-2xl text-sm">{l.message}</p>}
                  {l.category && (
                    <p className="mt-1 text-xs text-muted-foreground">Категория: {l.category}</p>
                  )}
                </div>
                <span className="text-xs text-muted-foreground">
                  {new Date(l.createdAt).toLocaleString("ru-RU")}
                </span>
              </div>

              <form action={updateLead} className="mt-3 flex flex-wrap items-end gap-3 border-t pt-3">
                <input type="hidden" name="id" value={l.id} />
                <div className="w-40">
                  <SelectNative name="status" defaultValue={l.status}>
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </SelectNative>
                </div>
                <Input
                  name="managerComment"
                  defaultValue={l.managerComment ?? ""}
                  placeholder="Комментарий менеджера"
                  className="max-w-md flex-1"
                />
                <SubmitButton>Сохранить</SubmitButton>
              </form>
            </Panel>
          ))}
        </div>
      )}
    </>
  );
}
