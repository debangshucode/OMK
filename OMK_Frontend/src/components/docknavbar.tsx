"use client";

import Dock from "@/components/dock";
import { useRouter, usePathname } from "next/navigation";
import {
  VscHome,
  VscAccount,
  VscBriefcase,
  VscDeviceCameraVideo,
  VscComment,
  VscMail,
} from "react-icons/vsc";
import { useIsMobile } from "@/components/hooks/useIsMobile";
import { useEffect, useState } from "react";

const DockNavbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  // Hide on admin routes
  if (pathname.startsWith("/admin") || pathname.startsWith("/clients")) {
    return null;
  }

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Update scroll state for styling
      setIsScrolled(currentScrollY > 50);
      
      // Hide/show logic - more refined
      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const navItems = [
    {
      icon: <VscHome size={isMobile ? 16 : 20} />,
      label: "Home",
      onClick: () =>
        pathname === "/" ? scrollToSection("home") : router.push("/#home"),
    },
    {
      icon: <VscAccount size={isMobile ? 16 : 20} />,
      label: "About",
      onClick: () =>
        pathname === "/" ? scrollToSection("about") : router.push("/#about"),
    },
    {
      icon: <VscBriefcase size={isMobile ? 16 : 20} />,
      label: "Services",
      onClick: () =>
        pathname === "/"
          ? scrollToSection("services")
          : router.push("/#services"),
    },
    {
      icon: <VscDeviceCameraVideo size={isMobile ? 16 : 20} />,
      label: "Portfolio",
      onClick: () => router.push("/portfolio"),
    },
    {
      icon: <VscComment size={isMobile ? 16 : 20} />,
      label: "Testimonials",
      onClick: () =>
        pathname === "/"
          ? scrollToSection("testimonials")
          : router.push("/#testimonials"),
    },
    {
      icon: <VscMail size={isMobile ? 16 : 20} />,
      label: "Contact",
      onClick: () =>
        pathname === "/"
          ? scrollToSection("contact")
          : router.push("/#contact"),
    },
  ];

  return (
    <div
      className={`fixed top-0 left-1/2 -translate-x-1/2 z-[999] transition-all duration-300 ease-out
        ${
          isVisible
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-4"
        }`}
    >
      <Dock
        id="dock-nav"
        items={navItems}
        panelHeight={isMobile ? 70 : 65}
        baseItemSize={isMobile ? 40 : 45}
        magnification={isMobile ? 52 : 65}
        distance={isMobile ? 120 : 180}
        spring={{ mass: 0.1, stiffness: 250, damping: 18 }}
        isMobile={isMobile}
        className={`
          fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-[999]
          transition-all duration-300 ease-out
          backdrop-blur-xl border
          shadow-2xl hover:shadow-3xl
          ${
            isScrolled
              ? "bg-white/95 border-red-200/50 shadow-red-500/20"
              : "bg-gradient-to-r from-white/95 via-orange-50/95 to-red-50/95 border-orange-200/50"
          }
          ${
            isVisible
              ? "opacity-100 pointer-events-auto translate-y-0 scale-100"
              : "opacity-0 pointer-events-none -translate-y-2 scale-95"
          }
        `}
      />
    </div>
  );
};

export default DockNavbar;