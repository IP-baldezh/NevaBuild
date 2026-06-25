import { prisma } from "@/lib/db";
import { Role } from "@prisma/client";
import { createUser, toggleUserActive } from "@/server/actions/admin/misc";
import { PageHeader, Panel } from "@/components/admin/AdminUI";
import { FormField } from "@/components/forms/FormField";
import { Input } from "@/components/ui/input";
import { SelectNative } from "@/components/ui/select-native";
import { SubmitButton } from "@/components/admin/SubmitButton";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <>
      <PageHeader title="Пользователи админки" description="Сотрудники с доступом в панель" />

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <Panel className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b text-left text-muted-foreground">
              <tr>
                <th className="p-3">Пользователь</th>
                <th className="p-3">Роль</th>
                <th className="p-3">Статус</th>
                <th className="p-3 text-right">Действия</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b last:border-0">
                  <td className="p-3">
                    <div className="font-medium">{u.name ?? "—"}</div>
                    <div className="text-xs text-muted-foreground">{u.email}</div>
                  </td>
                  <td className="p-3 text-muted-foreground">{u.role}</td>
                  <td className="p-3">
                    {u.isActive ? (
                      <span className="text-emerald-600">активен</span>
                    ) : (
                      <span className="text-muted-foreground">отключён</span>
                    )}
                  </td>
                  <td className="p-3 text-right">
                    <form action={toggleUserActive}>
                      <input type="hidden" name="id" value={u.id} />
                      <button className="h-8 rounded-full border px-3 text-xs hover:bg-secondary">
                        {u.isActive ? "Отключить" : "Включить"}
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>

        <Panel className="h-fit p-6">
          <h2 className="mb-4 font-semibold">Добавить / обновить</h2>
          <form action={createUser} className="space-y-4">
            <FormField label="Имя" htmlFor="u-name">
              <Input id="u-name" name="name" />
            </FormField>
            <FormField label="Email" htmlFor="u-email" required>
              <Input id="u-email" name="email" type="email" required />
            </FormField>
            <FormField label="Пароль (мин. 6)" htmlFor="u-pass" required>
              <Input id="u-pass" name="password" type="text" required />
            </FormField>
            <FormField label="Роль" htmlFor="u-role">
              <SelectNative id="u-role" name="role" defaultValue={Role.CONTENT_MANAGER}>
                {Object.values(Role).map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </SelectNative>
            </FormField>
            <SubmitButton className="w-full">Сохранить</SubmitButton>
          </form>
        </Panel>
      </div>
    </>
  );
}
