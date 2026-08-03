import { prisma } from "@/lib/db";
import { CategoriesClient } from "./CategoriesClient";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
  const categories = await prisma.exhibitorCategory.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return <CategoriesClient initialCategories={categories} />;
}
