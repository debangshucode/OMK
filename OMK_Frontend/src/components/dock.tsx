"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useEffect, useMemo, useRef, useState } from "react"

export type DockItemData = {
  label: string
  id: string
  onClick: () => void
}

export type DockProps = {
  items: DockItemData[]
  className?: string
}

export default function Dock({ items, className = "" }: DockProps) {
  const [activeId, setActiveId] = useState<string>("")
  const indicatorX = useMotionValue(0)
  const indicatorWidth = useMotionValue(0)
  const spring = { mass: 0.1, stiffness: 250, damping: 18 }
  const x = useSpring(indicatorX, spring)
  const width = useSpring(indicatorWidth, spring)
  const refs = useRef<Record<string, HTMLDivElement | null>>({})

  useEffect(() => {
    const onScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 2
      let currentSection = ""
      items.forEach(({ id }) => {
        const section = document.getElementById(id)
        if (section) {
          const { offsetTop, offsetHeight } = section
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            currentSection = id
          }
        }
      })
      setActiveId(currentSection)
    }

    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [items])

  useEffect(() => {
    if (activeId && refs.current[activeId]) {
      const el = refs.current[activeId]
      const rect = el?.getBoundingClientRect()
      const parentRect = el?.parentElement?.getBoundingClientRect()
      if (rect && parentRect) {
        indicatorX.set(rect.left - parentRect.left)
        indicatorWidth.set(rect.width)
      }
    }
  }, [activeId, indicatorX, indicatorWidth])

  return (
    <nav
      className={`relative flex items-center justify-center xl:gap-4 gap-0 font-medium text-sm sm:text-base text-black ${className}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="relative flex gap-0 xl:gap-4 overflow-x-auto no-scrollbar">
        {items.map((item) => (
          <div
            key={item.id}
            ref={(el) => { refs.current[item.id] = el; }}
            onClick={item.onClick}
            className={`cursor-pointer xl:px-3 px-1.5 py-1.5 rounded-md whitespace-nowrap transition-colors duration-200 ${
              activeId === item.id
                ? "text-black"
                : "text-black/70 hover:text-red-600"
            }`}
          >
            {item.label}
          </div>
        ))}

        <motion.div
          className="absolute bottom-0 h-[2px] bg-red-500 rounded-full"
          style={{ left: x, width }}
        />
      </div>
    </nav>
  )
}
