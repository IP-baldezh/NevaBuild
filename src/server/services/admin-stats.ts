import "server-only";
import { OrderStatus, LeadStatus } from "@prisma/client";
import { prisma } from "@/lib/db";

export async function getDashboardStats() {
  const [leads, newLeads, orders, paidOrders, exhibitors, recentLeads, recentOrders] =
    await Promise.all([
      prisma.lead.count(),
      prisma.lead.count({ where: { status: LeadStatus.NEW } }),
      prisma.ticketOrder.count(),
      prisma.ticketOrder.count({ where: { status: OrderStatus.PAID } }),
      prisma.exhibitor.count(),
      prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
      prisma.ticketOrder.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        include: { ticketProduct: true },
      }),
    ]);

  const revenue = await prisma.ticketOrder.aggregate({
    where: { status: OrderStatus.PAID },
    _sum: { amount: true },
  });

  return {
    leads,
    newLeads,
    orders,
    paidOrders,
    exhibitors,
    revenue: revenue._sum.amount ?? 0,
    recentLeads,
    recentOrders,
  };
}
