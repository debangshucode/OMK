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

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false); // Scrolling down
      } else {
        setIsVisible(true); // Scrolling up
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
        pathname === "/" ? scrollToSection("services") : router.push("/#services"),
    },
    {
      icon: <VscDeviceCameraVideo size={22} />,
      label: "Portfolio",
      onClick: () =>
        pathname === "/" ? scrollToSection("portfolio") : router.push("/#portfolio"),
    },
    {
      icon: <VscComment size={22} />,
      label: "Testimonials",
      onClick: () =>
        pathname === "/" ? scrollToSection("testimonials") : router.push("/#testimonials"),
    },
    {
      icon: <VscMail size={22} />,
      label: "Contact",
      onClick: () =>
        pathname === "/" ? scrollToSection("contact") : router.push("/#contact"),
    },
  ];

  return (
    <div
      className={`
        fixed top-6 left-1/2 -translate-x-1/2 z-[999] transition-opacity duration-500 
        ${isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
      `}
    >
      <Dock
        items={navItems}
        panelHeight={64}
        baseItemSize={isMobile ? 42 : 52}
        magnification={70}
        className="bg-gradient-to-r from-red-800/80 via-red-700/80 to-amber-600/80 
          backdrop-blur-md border border-white/20 shadow-lg rounded-2xl px-4 py-2 
          transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.25)] hover:cursor-pointer"
      />
    </div>
  );
};

export default DockNavbar;
