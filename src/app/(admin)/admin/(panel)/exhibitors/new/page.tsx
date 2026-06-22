import { getExhibitorCategories } from "@/server/services/exhibitors";
import { PageHeader } from "@/components/admin/AdminUI";
import { ExhibitorForm } from "@/components/admin/forms/ExhibitorForm";

export const dynamic = "force-dynamic";

export default async function NewExhibitorPage() {
  const categories = await getExhibitorCategories();
  return (
    <>
      <PageHeader title="Новый участник" />
      <ExhibitorForm categories={categories} />
    </>
  );
}
