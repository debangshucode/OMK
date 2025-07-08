// src/components/ClientLayout.tsx
"use client";

import { usePathname } from "next/navigation";
import DockNavbar from "./docknavbar";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

 const hideDock =
  pathname.startsWith("/admin") ||
  pathname.startsWith("/login") ||
  pathname.startsWith("/clients");

  return (
    <>
      {children}
      {!hideDock && <DockNavbar />}
    </>
  );
}
