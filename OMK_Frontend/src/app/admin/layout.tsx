// app/admin/layout.tsx
import AdminGuard from "@/components/Protect/AdminGuard";
import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminGuard>
      {children}
    </AdminGuard>
  );
}
