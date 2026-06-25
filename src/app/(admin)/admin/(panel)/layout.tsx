import { requireAdmin } from "@/lib/authz";
import { AdminShell } from "@/components/admin/AdminShell";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const session = await requireAdmin();
  return <AdminShell user={session.user}>{children}</AdminShell>;
}
