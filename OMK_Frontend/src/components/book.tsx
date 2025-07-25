"use client";
import React, { useEffect, useRef, useState } from "react";
import { BookOpen } from "lucide-react";
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

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dragDistance = e.clientX - dragStartX;
    const maxDrag = 200;
    setDragProgress(Math.max(-1, Math.min(1, dragDistance / maxDrag)));
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (Math.abs(dragProgress) > 0.3) {
      const direction = dragProgress > 0 ? -1 : 1;
      const newPage = Math.max(
        0,
        Math.min(totalPages - 1, currentPage + direction)
      );

      if (containerRef.current) {
        const container = containerRef.current;
        const targetProgress = newPage / (totalPages - 1);
        const scrollDistance = container.offsetHeight - window.innerHeight;
        const targetScroll =
          container.offsetTop +
          targetProgress * scrollDistance -
          window.innerHeight * 0.5;

        window.scrollTo({ top: targetScroll, behavior: "smooth" });
      }
    }

    setDragProgress(0);
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dragDistance = e.clientX - dragStartX;
      const maxDrag = 200;
      setDragProgress(Math.max(-1, Math.min(1, dragDistance / maxDrag)));
    };

    const handleGlobalMouseUp = () => {
      if (!isDragging) return;
      handleMouseUp();
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleGlobalMouseMove);
      document.addEventListener("mouseup", handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleGlobalMouseMove);
      document.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [isDragging, dragStartX, dragProgress, currentPage, totalPages]);

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
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
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
                  <div className="absolute inset-0 rounded-r-2xl bg-gradient-to-r from-red-600 to-red-700  flex items-center justify-center">
                    <h2 className="text-white text-center text-3xl font-bold">
                      {index === 0
                        ? "Welcome to the Album"
                        : "Thank You for Watching"}
                    </h2>
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
                        <div className="absolute bottom-4 left-4 right-4 bg-amber-700/60 text-white font-semibold text-center py-2 rounded-md text-md">
                          {page.label || "Captured Moment"}
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
              <div className="flex items-center space-x-4 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-red-200">
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
