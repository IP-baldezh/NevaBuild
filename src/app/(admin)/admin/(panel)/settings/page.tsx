import { getEventSettings } from "@/server/services/event";
import { PageHeader } from "@/components/admin/AdminUI";
import { SettingsForm } from "@/components/admin/forms/SettingsForm";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settings = await getEventSettings();
  return (
    <>
      <PageHeader
        title="Настройки события"
        description="Дата, площадка, контакты и основные цифры выставки"
      />
      <SettingsForm settings={settings} />
    </>
  );
}
