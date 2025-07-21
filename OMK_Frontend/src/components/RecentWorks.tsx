"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Camera, Video, FolderOpen, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

const RecentWorks = () => {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const autoScrollInterval = useRef<NodeJS.Timeout | null>(null);

  const recentWorks = [
    {
      id: 1,
      type: "photo",
      title: "Sarah & Michael Wedding",
      image: "images/weadingHome4.jpg",
      category: "Wedding",
      link: "https://www.youtube.com/watch?v=N0b7f6Rv9bA&list=RDdZw__YwzoAo&index=7",
    },
    {
      id: 2,
      type: "video",
      title: "Corporate Event Video",
      image: "images/weadingHome3.jpg",
      category: "Corporate",
      link: "https://www.youtube.com/watch?v=N0b7f6Rv9bA&list=RDdZw__YwzoAo&index=7",
    },
    {
      id: 3,
      type: "album",
      title: "Pre-Wedding Shoot",
      image: "images/weadingHome5.jpg",
      category: "Pre-Wedding",
      link: "https://www.youtube.com/watch?v=N0b7f6Rv9bA&list=RDdZw__YwzoAo&index=7",
    },
    {
      id: 4,
      type: "video",
      title: "Engagement Day Highlights",
      image: "images/weadingHome2.jpg",
      category: "Engagement",
      link: "https://www.youtube.com/watch?v=N0b7f6Rv9bA&list=RDdZw__YwzoAo&index=7",
    },
    {
      id: 5,
      type: "photo",
      title: "Destination Wedding Goa",
      image: "images/weadingHome1.jpg",
      category: "Wedding",
      link: "https://www.youtube.com/watch?v=N0b7f6Rv9bA&list=RDdZw__YwzoAo&index=7",
    },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "photo":
        return Camera;
      case "video":
        return Video;
      case "album":
        return FolderOpen;
      default:
        return Camera;
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    const startAutoScroll = () => {
      autoScrollInterval.current = setInterval(() => {
        if (container) {
          if (container.scrollLeft >= container.scrollWidth / 2) {
            container.scrollLeft = 0;
          } else {
            container.scrollLeft += 1;
          }
        }
      }, 16);
    };

    const stopAutoScroll = () => {
      if (autoScrollInterval.current) clearInterval(autoScrollInterval.current);
    };

    startAutoScroll();
    container?.addEventListener("mouseenter", stopAutoScroll);
    container?.addEventListener("mouseleave", startAutoScroll);

    return () => {
      stopAutoScroll();
      container?.removeEventListener("mouseenter", stopAutoScroll);
      container?.removeEventListener("mouseleave", startAutoScroll);
    };
  }, []);

  return (
    <section className="py-16 bg-gradient-to-br from-red-50 to-red-100 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
      <div className="flex flex-col mb-12 gap-4">
  {/* Top Row: Title and Button */}
  <div className="w-full flex items-center justify-between flex-wrap gap-4">
    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
      Recent <span className="text-red-600">Works</span>
    </h2>

    <motion.button
      onClick={() => router.push("/portfolio")}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-semibold transition-colors duration-300 flex items-center gap-2"
    >
      <span className="hidden sm:inline">View More</span>
      <ChevronRight className="w-4 h-4" />
    </motion.button>
  </div>

  {/* Description below title, only on sm and above */}
  <p className="text-gray-600 hidden sm:block">
    Check out our latest photography and videography projects
  </p>
</div>



        {/* Scrollable Row */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth hide-scrollbar pb-4 px-2 whitespace-nowrap"
        >
          {[...recentWorks, ...recentWorks].map((work, index) => {
            const TypeIcon = getTypeIcon(work.type);
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                className="group relative w-[170px] min-w-[170px] h-[260px] rounded-lg overflow-hidden bg-black shadow-md hover:shadow-lg transition-all duration-300 flex-shrink-0"
              >
                {/* Background Image */}
                <img
                  src={work.image}
                  alt={work.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col justify-between p-4 text-white">
                  {/* Icon Top Right */}
                  <div className="flex justify-end">
                    <div className="bg-white/20 p-1.5 rounded-full backdrop-blur-sm">
                      <TypeIcon className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  {/* Center Info */}
                  <div className="flex-1 flex flex-col justify-center text-center space-y-1">
                    <p className="text-sm font-medium">{work.category}</p>
                    <h3 className="text-md font-semibold leading-tight">{work.title}</h3>
                  </div>

                  {/* View Film Button */}
                  <div className="text-center">
                    <a
                      href={work.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-red-600 hover:bg-red-700 text-white text-xs px-4 py-1.5 rounded-full font-medium shadow-md transition-all duration-300"
                    >
                      View Film
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RecentWorks;
