// src/components/ClientLayout.tsx
"use client";

import { usePathname } from "next/navigation";
import DockNavbar from "./docknavbar";
import Footer from "./footer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

 const hideDock =
  pathname.startsWith("/admin") ||
  pathname.startsWith("/login") ||
  pathname.startsWith("/client/dashboard") ||
  pathname.startsWith("/admin/dashboard") ||
  pathname.startsWith("/unauthorized") ||
  pathname.startsWith("/clients") ;



  return (
    <>
      {children}
      <Footer />
      {!hideDock && <DockNavbar />}
    </>
  );
}
