"use client"

import Dock from "@/components/dock"
import { useRouter, usePathname } from "next/navigation"
import { useIsMobile } from "@/components/hooks/useIsMobile"
import { useEffect, useState } from "react"

const DockNavbar = () => {
  const router = useRouter()
  const pathname = usePathname()
  const isMobile = useIsMobile()
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)

  if (pathname.startsWith("/admin") || pathname.startsWith("/clients")) {
    return null
  }

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsScrolled(currentScrollY > 50)

      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  const navItems = [
    
    {
      label: "About",
      id: "about",
      onClick: () => pathname === "/" ? scrollToSection("about") : router.push("/#about"),
    },
    {
      label: "Blog",
      id: "blog",
      onClick: () => router.push("/blog", { scroll: true }),

    },
    {
      label: "Portfolio",
      id: "portfolio",
      onClick: () => router.push("/portfolio", { scroll: true }),

    },
    {
      label: "Testimonials",
      id: "testimonials",
      onClick: () => pathname === "/" ? scrollToSection("testimonials") : router.push("/#testimonials"),
    },
    {
      label: "Contact",
      id: "contact",
      onClick: () => pathname === "/" ? scrollToSection("contact") : router.push("/#contact"),
    },
  ]

  return (
    <div
      className={` fixed top-0 left-1/2 -translate-x-1/2 z-[999] transition-all duration-300 ease-out
        ${isVisible ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-4"}`}
    >
      <Dock
        items={navItems}
        className={`
          fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-[999]
          px-4 sm:px-6 py-2
          rounded-xl shadow-xl backdrop-blur-xl border
          transition-all duration-300 ease-out
          ${
            isScrolled
              ? "bg-white/95 border-red-200/50"
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
  )
}

export default DockNavbar
