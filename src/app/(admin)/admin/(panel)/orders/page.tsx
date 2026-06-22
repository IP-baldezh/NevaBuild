import { prisma } from "@/lib/db";
import { formatPrice } from "@/lib/utils";
import { markOrderPaidManually, cancelOrder } from "@/server/actions/admin/misc";
import { PageHeader, Panel, StatusBadge } from "@/components/admin/AdminUI";
import { SubmitButton } from "@/components/admin/SubmitButton";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const orders = await prisma.ticketOrder.findMany({
    orderBy: { createdAt: "desc" },
    include: { ticketProduct: true, ticket: true },
  });

  return (
    <>
      <PageHeader title="Заказы билетов" description="Покупки билетов и их статусы" />
      <Panel className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-sm">
          <thead className="border-b text-left text-muted-foreground">
            <tr>
              <th className="p-3">Заказ</th>
              <th className="p-3">Покупатель</th>
              <th className="p-3">Билет</th>
              <th className="p-3">Сумма</th>
              <th className="p-3">Статус</th>
              <th className="p-3">Код билета</th>
              <th className="p-3 text-right">Действия</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr><td colSpan={7} className="p-6 text-center text-muted-foreground">Заказов пока нет</td></tr>
            ) : (
              orders.map((o) => (
                <tr key={o.id} className="border-b last:border-0">
                  <td className="p-3 font-medium">{o.orderNumber}</td>
                  <td className="p-3">
                    <div>{o.fullName}</div>
                    <div className="text-xs text-muted-foreground">{o.email}</div>
                  </td>
                  <td className="p-3 text-muted-foreground">{o.ticketProduct.titleRu}</td>
                  <td className="p-3 font-medium">{formatPrice(o.amount)}</td>
                  <td className="p-3"><StatusBadge status={o.status} /></td>
                  <td className="p-3 font-mono text-xs">{o.ticket?.ticketCode ?? "—"}</td>
                  <td className="p-3">
                    {o.status !== "PAID" && (
                      <div className="flex justify-end gap-2">
                        <form action={markOrderPaidManually}>
                          <input type="hidden" name="id" value={o.id} />
                          <SubmitButton className="h-8 px-3 text-xs">Подтвердить</SubmitButton>
                        </form>
                        <form action={cancelOrder}>
                          <input type="hidden" name="id" value={o.id} />
                          <button className="h-8 rounded-full border px-3 text-xs hover:bg-secondary">Отменить</button>
                        </form>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Panel>
    </>
  );
}
