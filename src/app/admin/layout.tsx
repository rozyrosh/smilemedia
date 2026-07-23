import { AdminNav } from "@/components/admin/AdminNav";
import "./admin.css";

export const metadata = {
  title: "Smile Media Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-shell">
      <div className="admin-layout">
        <AdminNav />
        <div className="admin-main">{children}</div>
      </div>
    </div>
  );
}
