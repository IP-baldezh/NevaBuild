import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { getExhibitorCategories } from "@/server/services/exhibitors";
import { PageHeader } from "@/components/admin/AdminUI";
import { ExhibitorForm } from "@/components/admin/forms/ExhibitorForm";

export const dynamic = "force-dynamic";

export default async function EditExhibitorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [exhibitor, categories] = await Promise.all([
    prisma.exhibitor.findUnique({
      where: { id },
      include: { categories: true },
    }),
    getExhibitorCategories(),
  ]);
  if (!exhibitor) notFound();

  return (
    <>
      <PageHeader title={`Участник: ${exhibitor.name}`} />
      <ExhibitorForm
        exhibitor={exhibitor}
        categories={categories}
        selectedCategoryIds={exhibitor.categories.map((c) => c.categoryId)}
      />
    </>
  );
}
