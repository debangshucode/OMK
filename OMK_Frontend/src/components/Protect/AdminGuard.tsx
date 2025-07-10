"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/");
      } else if (user.role !== "admin") {
        router.push("/unauthorized"); // optional: create this page
      }
    }
  }, [user, loading]);

  if (loading || !user || user.role !== "admin") return null;

  return <>{children}</>;
}
