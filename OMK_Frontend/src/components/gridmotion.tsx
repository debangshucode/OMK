"use client";

import { useEffect, useRef, FC } from "react";
import { gsap } from "gsap";
import type { GridItem } from "@/data";
import HeroOverlay from "@/components/ui/herooverlay";
import HeaderAction from "@/components/headeraction";

interface GridMotionProps {
  items?: GridItem[];
  gradientColor?: string;
}

const GridMotion: FC<GridMotionProps> = ({
  items = [],
  gradientColor = "#dc2626",
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  const totalItems = 28;

  const defaultItems: GridItem[] = Array.from(
    { length: totalItems },
    (_, i) => ({
      image: `https://source.unsplash.com/random/300x300?sig=${i}`,
      label: `Item ${i + 1}`,
    })
  );

  const combinedItems: GridItem[] =
    items.length >= totalItems
      ? items.slice(0, totalItems)
      : [...items, ...defaultItems.slice(items.length, totalItems)];

  useEffect(() => {
    gsap.ticker.lagSmoothing(0);

    rowRefs.current.forEach((row, index) => {
      if (row) {
        const direction = index % 2 === 0 ? 1 : -1;
        const moveAmount = 100; // Customize scroll distance
        const duration = 6 + index; // Vary duration slightly per row

        gsap.to(row, {
          x: direction * moveAmount,
          duration,
          ease: "none",
          repeat: -1,
          yoyo: true,
        });
      }
    });
  }, []);

  return (
    <div ref={gridRef} className="h-full w-full overflow-hidden">
      {/* <SplashCursor /> */}
     
      <section id="home"
        className="w-full h-screen overflow-hidden relative flex items-center justify-center"
        style={{
          background: `radial-gradient(circle, ${gradientColor} 0%, transparent 100%)`,
        }}
      >
         <HeaderAction />
        <div className="absolute inset-0 bg-black/50 z-[3] pointer-events-none"></div>
        <div className="absolute inset-0 pointer-events-none z-[4] bg-[length:250px]"></div>
        <div className="gap-4 flex-none relative w-[310vw] h-[110vh] grid grid-rows-4 grid-cols-1 rotate-[-15deg] origin-center z-[2] xl:w-[150vw] xl:h-[150vh]">
          {Array.from({ length: 4 }, (_, rowIndex) => (
            <div
              key={rowIndex}
              className="grid gap-4 grid-cols-7"
              style={{ willChange: "transform, filter" }}
              ref={(el) => {
                rowRefs.current[rowIndex] = el;
              }}
            >
              {Array.from({ length: 7 }, (_, itemIndex) => {
                const index = rowIndex * 7 + itemIndex;
                const content = combinedItems[index];
                if (!content) return null;

                return (
                  <div key={itemIndex} className="relative">
                    <div className="relative w-full h-full overflow-hidden rounded-xl bg-neutral-50 text-red-700 border border-red-300 shadow-lg flex items-center justify-center">
                      {/* Image only or image + text */}
                      {content.image && (
                        <div
                          className="w-full h-full bg-cover bg-center absolute top-0 left-0"
                          style={{ backgroundImage: `url(${content.image})` }}
                        ></div>
                      )}

                      {/* Label - modern card (text-only) */}
                      {content.label && !content.image && (
                        <div className="z-[1] text-center px-4 py-3 font-semibold text-lg sm:text-xl tracking-wide">
                          {content.label}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <HeroOverlay />
      </section>
    </div>
  );
};

export default GridMotion;
