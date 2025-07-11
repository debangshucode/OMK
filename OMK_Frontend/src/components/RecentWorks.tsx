"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Camera,
  Video,
  FolderOpen,
  ArrowRight,
  ArrowLeftCircle,
  ArrowRightCircle,
} from "lucide-react";
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
    },
    {
      id: 2,
      type: "video",
      title: "Corporate Event Video",
      image: "images/weadingHome3.jpg",
      category: "Corporate",
    },
    {
      id: 3,
      type: "album",
      title: "Pre-Wedding Shoot",
      image: "images/weadingHome5.jpg",
      category: "Pre-Wedding",
    },
    {
      id: 4,
      type: "video",
      title: "Engagement Day Highlights",
      image: "images/weadingHome2.jpg",
      category: "Engagement",
    },
    {
      id: 5,
      type: "photo",
      title: "Destination Wedding Goa",
      image: "images/weadingHome1.jpg",
      category: "Wedding",
    },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "photo": return Camera;
      case "video": return Video;
      case "album": return FolderOpen;
      default: return Camera;
    }
  };

  

  // Infinite Auto Scroll
  useEffect(() => {
    const container = scrollRef.current;

    const startAutoScroll = () => {
      autoScrollInterval.current = setInterval(() => {
        if (container) {
          // When we reach near end, reset scroll
          if (container.scrollLeft >= container.scrollWidth / 2) {
            container.scrollLeft = 0;
          } else {
            container.scrollLeft += 1;
          }
        }
      }, 16); // ~60fps
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
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Recent <span className="text-red-600">Works</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Check out our latest photography and videography projects
          </p>
        </div>


        {/* Scrollable Row with Duplicated Items */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth hide-scrollbar pb-4 px-2 whitespace-nowrap"
        >
          {[...recentWorks, ...recentWorks].map((work, index) => {
            const TypeIcon = getTypeIcon(work.type);
            return (
              <motion.div
                key={index}
                onClick={() => router.push("/portfolio")}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                whileHover={{ y: -5 }}
                className="min-w-[250px] max-w-[250px] flex-shrink-0 bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className="relative aspect-[3/4]">
                  <img
                    src={work.image}
                    alt={work.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <div className="bg-black/50 backdrop-blur-sm text-white p-2 rounded-full">
                      <TypeIcon className="w-4 h-4" />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <span className="text-xs text-red-600 font-medium">
                    {work.category}
                  </span>
                  <h3 className="font-semibold text-gray-900 mt-1">
                    {work.title}
                  </h3>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All */}
        <div className="text-center mt-6">
          <motion.button
            onClick={() => router.push("/portfolio")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-semibold flex items-center space-x-2 mx-auto transition-colors duration-300"
          >
            <span>View All Works</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default RecentWorks;
