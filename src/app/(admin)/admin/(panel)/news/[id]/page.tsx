import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { PageHeader } from "@/components/admin/AdminUI";
import { NewsForm } from "@/components/admin/forms/NewsForm";

export const dynamic = "force-dynamic";

export default async function EditNewsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const news = await prisma.news.findUnique({ where: { id } });
  if (!news) notFound();

  return (
    <>
      <PageHeader title="Редактировать новость" />
      <NewsForm news={news} />
    </>
  );
}
