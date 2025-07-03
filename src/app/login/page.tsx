"use client";
import LoginModal from "@/components/loginModal";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  return (
    <LoginModal
      onClose={() => router.push("/")}
      onSuccess={() => router.push("/admin/home")}
    />
  );
}
