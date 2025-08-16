"use client";
import React, { useEffect, useRef, useState } from "react";
import { BookOpen , Phone } from "lucide-react";
import { customItems } from "../data/index";
import { GridItem } from "../data/index";

const Book: React.FC = () => {
  const pages: GridItem[] = [
    {},
    ...customItems.filter((item) => item.image).slice(0, 4),
    {},
  ];

  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragProgress, setDragProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const totalPages = pages.length;

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollStart = rect.top + windowHeight * 0.5;
      const scrollEnd = rect.bottom - windowHeight * 0.5;
      const scrollDistance = scrollEnd - scrollStart;

      if (scrollStart > 0) {
        setScrollProgress(0);
        setCurrentPage(0);
      } else if (scrollEnd < 0) {
        setScrollProgress(1);
        setCurrentPage(totalPages - 1);
      } else {
        const rawProgress = Math.max(
          0,
          Math.min(1, -scrollStart / scrollDistance)
        );
        const smoothProgress =
          rawProgress * rawProgress * (3 - 2 * rawProgress);
        setScrollProgress(smoothProgress);
        const pageProgress = smoothProgress * (totalPages - 1);
        const currentStep = Math.floor(pageProgress + 0.3);
        setCurrentPage(Math.min(currentStep, totalPages - 1));
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [totalPages]);

  
  const getPageTransform = (pageIndex: number) => {
    const pageProgress = scrollProgress * (totalPages - 1);
    let dragEffect = 0;

    if (isDragging && pageIndex === currentPage) {
      dragEffect = dragProgress * 25;
    }

    const pageStartThreshold = pageIndex;
    const pageEndThreshold = pageIndex + 0.7;

    if (pageProgress < pageStartThreshold) {
      return `rotateY(${dragEffect}deg)`;
    } else if (pageProgress >= pageEndThreshold) {
      return "rotateY(-180deg)";
    } else {
      const turnProgress =
        (pageProgress - pageStartThreshold) /
        (pageEndThreshold - pageStartThreshold);
      const smoothTurnProgress =
        turnProgress * turnProgress * (3 - 2 * turnProgress);
      return `rotateY(${-smoothTurnProgress * 180 + dragEffect}deg)`;
    }
  };

  return (
    <div className="mb-50">
      <div className="text-center py-16 bg-gradient-to-b from-amber-50 to-white">
        <span className="inline-block px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-medium mb-6">
          Wedding Albums
        </span>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-red-700 via-red-600 to-amber-600 bg-clip-text text-transparent">
          Your Moments <br />
          <span className="text-slate-800">Captured Forever</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Crafting timeless memories from your special day, preserved in pages
          you can relive forever.
        </p>
        <div className="mt-6 flex justify-center">
          <BookOpen className="w-12 h-12 text-red-600" />
        </div>
      </div>

      <div
        ref={containerRef}
        style={{ minHeight: `${totalPages * 50}vh` }}
        className="flex items-start justify-center bg-white"
      >
        <div className="sticky top-[15vh]">
          <div
            className="relative w-[300px] lg:w-[800px] h-[500px] mx-auto transform-gpu"
          
            style={{
              perspective: "1400px",
              transformStyle: "preserve-3d",
              cursor: isDragging ? "grabbing" : "grab",
            }}
          >
            {pages.map((page, index) => (
              <div
                key={index}
                className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 rounded-r-2xl shadow-xl border border-red-200 transform-gpu origin-left"
                style={{
                  transform: getPageTransform(index),
                  transformStyle: "preserve-3d",
                  zIndex: pages.length - index,
                  backfaceVisibility: "hidden",
                  transition: isDragging
                    ? "none"
                    : "transform 600ms cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                {index === 0 || index === pages.length - 1 ? (
                  <div className="absolute inset-0 rounded-r-2xl bg-gradient-to-r from-red-600 to-red-700 border-l-20 border-l-red-700 flex items-center justify-center">
                    <img
                      src={
                        index === 0
                          ? "/images/albumcover_lg.png"
                          : "/images/albumend_lg.png"
                      }
                      alt={index === 0 ? "Welcome" : "Thank You"}
                      className="w-full h-full object-cover rounded-r-2xl hidden md:block"
                    />
                    {/*mobile view*/}
                    <img
                      src={
                        index === 0
                          ? "/images/albumcover.png"
                          : "/images/albumend.png"
                      }
                      alt={index === 0 ? "Welcome" : "Thank You"}
                      className="w-full h-full object-cover rounded-r-2xl md:hidden"
                    />
                  
                  </div>
                  
                ) : (
                  <div className="absolute inset-0 p-2 rounded-r-2xl flex flex-col items-end justify-end gap-2">
                    {page.image && (
                      <>
                        <img
                          src={page.image}
                          alt={page.label}
                          className="w-full h-full object-cover rounded-xl"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col justify-end p-4">
                        <h3 className="text-white text-center text-lg md:text-xl font-semibold">
                          {page.label || "Captured Moment"}
                        </h3>
                        {page.details && (
                          <p className="text-gray-200 text-center text-sm md:text-base mt-1 leading-relaxed">
                            {page.details}
                          </p>
                            )}
                            <a
  href="tel:+919876543210"
  className="mt-3 w-4/5 mx-auto inline-flex items-center justify-center gap-2 
             bg-gradient-to-r from-amber-500/80 via-amber-600/80 to-amber-700/80 
             hover:from-amber-600 hover:via-amber-700 hover:to-amber-800
             text-white text-sm md:text-base font-semibold 
             px-4 py-2 rounded-lg shadow-lg backdrop-blur-sm transition"
>
  <Phone size={18} />
  Call Now
</a>
                      </div>
                      </>
                    )}
                  </div>
                )}

                <div
                  className="absolute inset-0 bg-gradient-to-r from-red-700 via-red-600 to-amber-600  rounded-r-2xl p-8 border border-red-200"
                  style={{
                    transform: "rotateY(180deg)",
                    backfaceVisibility: "hidden",
                  }}
                >
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center">
                      <BookOpen className="w-16 h-16 text-white mx-auto mb-4" />
                      <p className="text-white text-xl italic font-light">
                        "Flip to uncover moments."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="absolute -bottom-24 left-1/2 transform -translate-x-1/2">
              <div className="flex items-center space-x-4 bg-white/80 backdrop-blur-sm px-3 xl:px-6 py-3 rounded-full shadow-lg border border-red-200">
                <span className="text-sm text-red-700 font-medium">
                  Scroll or drag to explore
                </span>
                <div className="w-48 h-3 bg-red-100 rounded-full overflow-hidden shadow-inner">
                  <div
                    className="h-full bg-gradient-to-r from-red-600 to-red-700 transition-all duration-300 shadow-sm rounded-full"
                    style={{ width: `${scrollProgress * 100}%` }}
                  />
                </div>
                <span className="text-sm text-red-600 font-semibold min-w-[60px]">
                  {currentPage + 1}/{totalPages}
                </span>
              </div>
            </div>
            <div className="absolute -bottom-64 left-1/2 transform -translate-x-1/2">
              <button
                onClick={() => {
                  containerRef.current?.scrollIntoView({ behavior: "smooth" });
                }}
                className="mt-12 mb-24 px-6 py-3 bg-red-700 text-white font-semibold rounded-full shadow-lg hover:bg-red-800 transition"
              >
                Skip to Top
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;
