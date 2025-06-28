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
  VscSettingsGear,
} from "react-icons/vsc";

const DockNavbar = () => {
  const router = useRouter();
  const pathname = usePathname();

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
    <Dock
      items={navItems}
      panelHeight={64}
      baseItemSize={52}
      magnification={70}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-[999] 
        bg-white/5 backdrop-blur-md 
        border border-red-500/30 
        shadow-[0_0_20px_rgba(255,0,0,0.4)] 
        rounded-2xl px-4 py-2"
    />
  );
};

export default DockNavbar;
