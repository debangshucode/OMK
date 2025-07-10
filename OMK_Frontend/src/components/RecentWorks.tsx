"use client";
import React from "react";
import { motion } from "framer-motion";
import { Camera, Video, FolderOpen, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
const RecentWorks = () => {
  const recentWorks = [
    {
      id: 1,
      type: "photo",
      title: "Sarah & Michael Wedding",
      image:
        "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      category: "Wedding",
    },
    {
      id: 2,
      type: "video",
      title: "Corporate Event Video",
      image:
        "https://images.pexels.com/photos/3062541/pexels-photo-3062541.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      category: "Corporate",
    },
    {
      id: 3,
      type: "album",
      title: "Pre-Wedding Shoot",
      image:
        "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      category: "Pre-Wedding",
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
  const router = useRouter();
  return (
    <section className="py-16 bg-gradient-to-br from-red-50 to-red-100">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Recent <span className="text-red-600">Works</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Check out our latest photography and videography projects
          </p>
        </div>

        {/* Works Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {recentWorks.map((work, index) => {
            const TypeIcon = getTypeIcon(work.type);
            return (
              <motion.div
                onClick={() => router.push("/portfolio")}
                key={work.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className="relative aspect-[4/3]">
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

        {/* View More Button */}
        <div className="text-center">
          <motion.button
            onClick={() => router.push("/portfolio")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-semibold flex items-center space-x-2 mx-auto transition-colors duration-300 cursor-pointer"
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
