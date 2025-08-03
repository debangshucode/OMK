"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Camera, Video, FolderOpen, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

type RecentWork = {
  _id: string;
  type: "photo" | "video" | "album";
  title: string;
  image: string;
  category: string;
  link: string;
};

const RecentWorks = () => {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const autoScrollInterval = useRef<NodeJS.Timeout | null>(null);
  const [recentWorks, setRecentWorks] = useState<RecentWork[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
    const fetchRecentWorks = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/recentwork");
        if (!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json();
        setRecentWorks(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchRecentWorks();
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const startAutoScroll = () => {
      autoScrollInterval.current = setInterval(() => {
        if (!container) return;

        container.scrollLeft += 1;

        // Reset to start when half-scrolled (due to duplication)
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }, 10); // Increase speed here if needed
    };

    const stopAutoScroll = () => {
      if (autoScrollInterval.current) clearInterval(autoScrollInterval.current);
    };

    startAutoScroll();

    container.addEventListener("mouseenter", stopAutoScroll);
    container.addEventListener("mouseleave", startAutoScroll);

    return () => {
      stopAutoScroll();
      container.removeEventListener("mouseenter", stopAutoScroll);
      container.removeEventListener("mouseleave", startAutoScroll);
    };
  }, [recentWorks]); // run scroll effect when data is available

  return (
    <section className="py-16 bg-gradient-to-br from-red-50 to-red-100 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col mb-12 gap-4">
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
          <p className="text-gray-600 hidden sm:block">
            Check out our latest photography and videography projects
          </p>
        </div>

        {loading ? (
          <div className="text-center text-gray-500">
            Loading recent works...
          </div>
        ) : error ? (
          <div className="text-center text-red-500">Error: {error}</div>
        ) : (
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth hide-scrollbar pb-4 px-2 whitespace-nowrap"
          >
            {[...recentWorks, ...recentWorks].map((work, index) => {
              const TypeIcon = getTypeIcon(work.type);
              console.log("work.link", work.link);

              return (
                <motion.div
                  onClick={() => window.open(work.link, "_blank")}
                  key={work._id + "-" + index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="group relative w-[180px] min-w-[180px] h-[260px] rounded-lg overflow-hidden bg-black shadow-md hover:shadow-lg transition-all duration-300 flex-shrink-0"
                >
                  <img
                    src={work.image || "/images/fallback.jpg"}
                    alt={work.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col justify-between p-4 text-white">
                    <div className="flex justify-end">
                      <div className="bg-white/20 p-1.5 rounded-full backdrop-blur-sm">
                        <TypeIcon className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col justify-center text-center space-y-1">
                      <p className="text-sm font-medium  line-clamp-2">{work.category}</p>
                      <h3 className="text-md font-semibold leading-tight line-clamp-2">
                        {work.title}
                      </h3>
                    </div>
                    <div className="text-center">
                      <a
                        href={`https://${work.link
                          .replace(/^https?:\/\//, "")
                          .replace(/^\/+/, "")}`}
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
        )}
      </div>
    </section>
  );
};

export default RecentWorks;
