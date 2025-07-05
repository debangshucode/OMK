"use client";
import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Zap } from "lucide-react";
import PortfolioHero from "./PortfolioHero";
import PortfolioFilters from "./PortfolioFilters";
import PortfolioGrid from "./PortfolioGrid";
import PortfolioModal from "./PortfolioModal";
import { PortfolioItem } from "./types";

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Portfolio items with local image paths
  const portfolioItems: PortfolioItem[] = [
    {
      id: 1,
      type: "photo",
      category: "wedding",
      title: "Sarah & Michael Wedding",
      description: "Beautiful wedding ceremony at Central Park",
      image: "/images/weadingHome2.jpg",
      date: "2024-01-15",
      location: "New York",
      tags: ["wedding", "ceremony", "couple", "outdoor"],
      likes: 234,
      views: 1250,
      featured: true,
    },
    {
      id: 2,
      type: "video",
      category: "wedding",
      title: "Wedding Highlights Reel",
      description: "Cinematic wedding video with emotional moments",
      image: "/images/weadingHome2.jpg",
      date: "2024-01-15",
      location: "New York",
      tags: ["wedding", "video", "cinematic", "highlights"],
      likes: 189,
      views: 2340,
      duration: "3:45",
      featured: true,
    },
    {
      id: 3,
      type: "album",
      category: "pre-wedding",
      title: "Emma & David Pre-Wedding",
      description: "Romantic pre-wedding shoot in the countryside",
      image: "/images/weadingHome3.jpg",
      date: "2024-01-12",
      location: "California",
      tags: ["pre-wedding", "couple", "romantic", "outdoor"],
      likes: 156,
      views: 890,
      photoCount: 45,
      featured: false,
    },
    {
      id: 4,
      type: "photo",
      category: "corporate",
      title: "TechCorp Annual Event",
      description: "Corporate event photography and team shots",
      image: "/images/weadingHome4.jpg",
      date: "2024-01-10",
      location: "San Francisco",
      tags: ["corporate", "event", "business", "professional"],
      likes: 89,
      views: 567,
      featured: false,
    },
    {
      id: 5,
      type: "video",
      category: "corporate",
      title: "Company Promotional Video",
      description: "Professional corporate video production",
      image: "/images/weadingHome5.jpg",
      date: "2024-01-08",
      location: "San Francisco",
      tags: ["corporate", "promotional", "business", "video"],
      likes: 67,
      views: 1120,
      duration: "2:30",
      featured: false,
    },
    {
      id: 6,
      type: "album",
      category: "family",
      title: "Wilson Family Portrait",
      description: "Beautiful family photography session",
      image: "/images/weadingHome6.jpg",
      date: "2024-01-05",
      location: "Chicago",
      tags: ["family", "portrait", "children", "indoor"],
      likes: 123,
      views: 678,
      photoCount: 32,
      featured: false,
    },
    {
      id: 7,
      type: "photo",
      category: "portrait",
      title: "Professional Headshots",
      description: "Corporate headshot photography session",
      image: "/images/weadingHome1.jpg",
      date: "2024-01-03",
      location: "Seattle",
      tags: ["portrait", "headshot", "professional", "studio"],
      likes: 98,
      views: 445,
      featured: false,
    },
    {
      id: 8,
      type: "video",
      category: "event",
      title: "Birthday Celebration",
      description: "Fun event videography for special celebration",
      image: "/images/weadingHome2.jpg",
      date: "2024-01-01",
      location: "Miami",
      tags: ["event", "celebration", "party", "fun"],
      likes: 145,
      views: 823,
      duration: "4:20",
      featured: false,
    },
    {
      id: 9,
      type: "album",
      category: "wedding",
      title: "Garden Wedding Collection",
      description: "Outdoor garden wedding photography",
      image: "/images/weadingHome3.jpg",
      date: "2023-12-28",
      location: "Portland",
      tags: ["wedding", "garden", "outdoor", "nature"],
      likes: 267,
      views: 1456,
      photoCount: 78,
      featured: true,
    },
    {
      id: 10,
      type: "photo",
      category: "fashion",
      title: "Fashion Portrait Series",
      description: "Creative fashion photography session",
      image: "/images/weadingHome4.jpg",
      date: "2023-12-25",
      location: "Los Angeles",
      tags: ["fashion", "portrait", "creative", "studio"],
      likes: 178,
      views: 934,
      featured: false,
    },
    {
      id: 11,
      type: "video",
      category: "pre-wedding",
      title: "Love Story Film",
      description: "Cinematic pre-wedding love story",
      image: "/images/weadingHome5.jpg",
      date: "2023-12-20",
      location: "Hawaii",
      tags: ["pre-wedding", "cinematic", "love", "beach"],
      likes: 298,
      views: 2156,
      duration: "5:15",
      featured: true,
    },
    {
      id: 12,
      type: "album",
      category: "event",
      title: "Corporate Gala Night",
      description: "Elegant corporate gala event coverage",
      image: "/images/weadingHome6.jpg",
      date: "2023-12-15",
      location: "Las Vegas",
      tags: ["corporate", "gala", "elegant", "event"],
      likes: 134,
      views: 756,
      photoCount: 56,
      featured: false,
    },
  ];

  // Filter portfolio items
  const filteredItems = useMemo(() => {
    const filter = activeFilter.toLowerCase(); // normalize for consistent matching
    return portfolioItems.filter((item) => {
      const typeMatch = item.type.toLowerCase() === filter;
      const categoryMatch = item.category.toLowerCase() === filter;
      const allMatch = filter === "all";

      const searchMatch =
        searchTerm.trim() === "" ||
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );

      return (typeMatch || categoryMatch || allMatch) && searchMatch;
    });
  }, [portfolioItems, activeFilter, searchTerm]);
  

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-red-50">
      {/* Hero Slider Section */}
      <PortfolioHero />

      {/* Main Portfolio Section */}
      <section className="py-12 lg:py-20 px-4 lg:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-12 lg:mb-16"
          >
            <motion.div variants={itemVariants}>
              <span className="inline-block px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-medium mb-6">
                Our Work
              </span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-red-700 via-red-600 to-amber-600 bg-clip-text text-transparent">
                Portfolio
                <br />
                <span className="text-slate-800">Showcase</span>
              </h2>
              <p className="text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Explore our diverse collection of photography and videography
                work. Each project tells a unique story captured with passion
                and creativity.
              </p>
            </motion.div>
          </motion.div>

          {/* Filters and Search */}
          <PortfolioFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            viewMode={viewMode}
            setViewMode={setViewMode}
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            portfolioItems={portfolioItems}
          />

          {/* Portfolio Grid */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            {filteredItems.length > 0 ? (
              <PortfolioGrid
                key={activeFilter} // ✅ THIS LINE
                items={filteredItems}
                viewMode={viewMode}
                onItemClick={setSelectedItem}
              />
            ) : (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={itemVariants}
                className="text-center py-16"
              >
                <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-12 h-12 text-slate-400" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">
                  No Results Found
                </h3>
                <p className="text-slate-600 mb-8">
                  Try adjusting your search terms or filters to find what you're
                  looking for.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setActiveFilter("all");
                    setSearchTerm("");
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300"
                >
                  Clear Filters
                </motion.button>
              </motion.div>
            )}
          </div>

          {/* Load More Button */}
          {filteredItems.length > 0 && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={itemVariants}
              className="text-center mt-12 lg:mt-16"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 mx-auto"
              >
                <span>Load More Work</span>
                <Zap className="w-5 h-5" />
              </motion.button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Item Detail Modal */}
      <PortfolioModal
        selectedItem={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
};

export default Portfolio;
