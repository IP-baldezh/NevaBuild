import { formatPrice } from "@/lib/utils";
import { getDashboardStats } from "@/server/services/admin-stats";
import { PageHeader, StatCard, Panel, StatusBadge } from "@/components/admin/AdminUI";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const s = await getDashboardStats();
  const dt = (d: Date) => new Date(d).toLocaleDateString("ru-RU");

  return (
    <>
      <PageHeader title="Дашборд" description="Сводка по заявкам, заказам и участникам" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Заявки" value={s.leads} hint={`Новых: ${s.newLeads}`} />
        <StatCard label="Заказы билетов" value={s.orders} />
        <StatCard label="Оплачено билетов" value={s.paidOrders} />
        <StatCard label="Выручка" value={formatPrice(s.revenue)} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Panel className="overflow-hidden">
          <div className="border-b p-4 font-semibold">Последние заявки</div>
          {s.recentLeads.length === 0 ? (
            <p className="p-4 text-sm text-muted-foreground">Заявок пока нет</p>
          ) : (
            <table className="w-full text-sm">
              <tbody>
                {s.recentLeads.map((l) => (
                  <tr key={l.id} className="border-b last:border-0">
                    <td className="p-3">
                      <div className="font-medium">{l.fullName}</div>
                      <div className="text-xs text-muted-foreground">{l.email}</div>
                    </td>
                    <td className="p-3 text-muted-foreground">{l.type}</td>
                    <td className="p-3">
                      <StatusBadge status={l.status} />
                    </td>
                    <td className="p-3 text-right text-xs text-muted-foreground">
                      {dt(l.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Panel>

        <Panel className="overflow-hidden">
          <div className="border-b p-4 font-semibold">Последние заказы</div>
          {s.recentOrders.length === 0 ? (
            <p className="p-4 text-sm text-muted-foreground">Заказов пока нет</p>
          ) : (
            <table className="w-full text-sm">
              <tbody>
                {s.recentOrders.map((o) => (
                  <tr key={o.id} className="border-b last:border-0">
                    <td className="p-3">
                      <div className="font-medium">{o.orderNumber}</div>
                      <div className="text-xs text-muted-foreground">{o.fullName}</div>
                    </td>
                    <td className="p-3 text-muted-foreground">{o.ticketProduct.titleRu}</td>
                    <td className="p-3">
                      <StatusBadge status={o.status} />
                    </td>
                    <td className="p-3 text-right font-medium">{formatPrice(o.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Panel>
      </div>
    </>
  );
}
