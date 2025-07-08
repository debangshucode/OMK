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
  // 👉 Hide on admin routes
  if (pathname.startsWith("/admin")) {
    return null;
  }
  if (pathname.startsWith("/clients")) {
    return null;
  }

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const navItems = [
    {
      icon: <VscHome size={22} />,
      label: "Home",
      onClick: () =>
        pathname === "/" ? scrollToSection("home") : router.push("/#home"),
    },
    {
      icon: <VscAccount size={22} />,
      label: "About",
      onClick: () =>
        pathname === "/" ? scrollToSection("about") : router.push("/#about"),
    },
    {
      icon: <VscBriefcase size={22} />,
      label: "Services",
      onClick: () =>
        pathname === "/"
          ? scrollToSection("services")
          : router.push("/#services"),
    },
    {
      icon: <VscDeviceCameraVideo size={22} />,
      label: "Portfolio",
      onClick: () => router.push("/portfolio"),
    },
    {
      icon: <VscComment size={22} />,
      label: "Testimonials",
      onClick: () =>
        pathname === "/"
          ? scrollToSection("testimonials")
          : router.push("/#testimonials"),
    },
    {
      icon: <VscMail size={22} />,
      label: "Contact",
      onClick: () =>
        pathname === "/"
          ? scrollToSection("contact")
          : router.push("/#contact"),
    },
  ];

  return (
    <div
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-[999] transition-opacity duration-500
    ${
      isVisible
        ? "opacity-100 pointer-events-auto"
        : "opacity-0 pointer-events-none"
    }`}
    >
      <Dock
        id="dock-nav"
        items={navItems}
        panelHeight={64}
        baseItemSize={isMobile ? 42 : 52}
        magnification={70}
        className={`glow-dock fixed top-6 left-1/2 -translate-x-1/2 z-[999]
    transition-opacity duration-500
    ${
      isVisible
        ? "opacity-100 pointer-events-auto"
        : "opacity-0 pointer-events-none"
    }
  `}
      />
    </div>
  );
};

export default DockNavbar;
