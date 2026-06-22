import { PageHeader } from "@/components/admin/AdminUI";
import { NewsForm } from "@/components/admin/forms/NewsForm";

export default function NewNewsPage() {
  return (
    <>
      <PageHeader title="Новая новость" />
      <NewsForm />
    </>
  );
}
