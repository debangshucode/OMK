"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

export type DockItemData = {
  label: string;
  id: string;
  onClick: () => void;
};

export type DockProps = {
  items: DockItemData[];
  className?: string;
};

export default function Dock({ items, className = "" }: DockProps) {
  const [activeId, setActiveId] = useState<string>("");
  const indicatorX = useMotionValue(0);
  const indicatorWidth = useMotionValue(0);
  const spring = { mass: 0.1, stiffness: 250, damping: 18 };
  const x = useSpring(indicatorX, spring);
  const width = useSpring(indicatorWidth, spring);
  const refs = useRef<Record<string, HTMLDivElement | null>>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const isLastItem = items[items.length - 1]?.id === activeId;

  useEffect(() => {
    const onScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 2;
      let currentSection = "";
      items.forEach(({ id }) => {
        const section = document.getElementById(id);
        if (section) {
          const { offsetTop, offsetHeight } = section;
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            currentSection = id;
          }
        }
      });
      setActiveId(currentSection);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);

  useEffect(() => {
    if (activeId && refs.current[activeId] && containerRef.current) {
      const el = refs.current[activeId];
      const container = containerRef.current;

      const elRect = el.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      const offsetLeft =
        elRect.left - containerRect.left + container.scrollLeft;

      const isLastItem = items[items.length - 1]?.id === activeId;

      // Apply extra right shift (e.g., 10px) if it's the last item
      indicatorX.set(offsetLeft + el.offsetWidth / 2 + (isLastItem ? 5 : 0));
      indicatorWidth.set(el.offsetWidth);
    }
  }, [activeId, indicatorX, indicatorWidth, items]);

  return (
    <nav
      className={`relative flex items-center justify-center xl:gap-4 gap-0 font-medium text-sm sm:text-base text-black ${className}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div
        ref={containerRef}
        className="relative flex gap-0 xl:gap-4 overflow-x-auto whitespace-nowrap no-scrollbar hide-scrollbar"
      >
        {items.map((item) => (
          <div
            key={item.id}
            ref={(el) => {
              refs.current[item.id] = el;
            }}
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

        {activeId && (
          <motion.div
            className="absolute bottom-0 h-[2px] bg-red-500 rounded-full"
            style={{
              left: x,
              width,
              opacity: activeId ? 1 : 0,
              x: "-50%",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </div>
    </nav>
  );
}
