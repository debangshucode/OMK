import React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  Grid3X3,
  List,
  X,
  Sparkles,
  Heart,
  Camera,
  Video,
  FolderOpen,
  Star,
  Scan,
  Calendar,
} from "lucide-react";
import { PortfolioItem } from "./types";
import FaceSearch from "./FaceSearch";

interface Category {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  count: number;
}

interface PortfolioFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  portfolioItems: PortfolioItem[];
}

const PortfolioFilters: React.FC<PortfolioFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  activeFilter,
  setActiveFilter,
  viewMode,
  setViewMode,
  showFilters,
  setShowFilters,
  portfolioItems,
}) => {
  const categories: Category[] = [
    {
      id: "all",
      name: "All Work",
      icon: Sparkles,
      count: portfolioItems.length,
    },
    {
      id: "photo",
      name: "Photos",
      icon: Camera,
      count: portfolioItems.filter((item) => item.type === "photo").length,
    },
    {
      id: "video",
      name: "Videos",
      icon: Video,
      count: portfolioItems.filter((item) => item.type === "video").length,
    },
    {
      id: "album",
      name: "Albums",
      icon: FolderOpen,
      count: portfolioItems.filter((item) => item.type === "album").length,
    },
    {
      id: "wedding",
      name: "Weddings",
      icon: Heart,
      count: portfolioItems.filter((item) => item.category === "wedding")
        .length,
    },
    {
      id: "pre-wedding",
      name: "Pre-Wedding",
      icon: Camera,
      count: portfolioItems.filter((item) => item.category === "pre-wedding")
        .length,
    },
    {
      id: "corporate",
      name: "Corporate",
      icon: Star,
      count: portfolioItems.filter((item) => item.category === "corporate")
        .length,
    },
    {
      id: "family",
      name: "Family",
      icon: Heart,
      count: portfolioItems.filter((item) => item.category === "family").length,
    },
  ];
  const [showFaceSearch, setShowFaceSearch] = useState(false);

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
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="mb-8 lg:mb-12"
    >
      {/* Search and Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6 mb-6">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search portfolio..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-slate-200 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 bg-white shadow-sm"
          />
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-3">
          {/* Filter Toggle */}
          {/* Filter Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center space-x-2 px-4 py-3 rounded-xl border transition-all duration-300 ${
              showFilters
                ? "bg-red-50 border-red-200 text-red-600"
                : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            <Filter className="w-5 h-5" />
            <span className="hidden sm:inline">Filters</span>
          </motion.button>

          {/* 🔴 Face Search Toggle Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFaceSearch(!showFaceSearch)}
            className={`flex items-center space-x-2 px-4 py-3 rounded-xl border transition-all duration-300 ${
              showFaceSearch
                ? "bg-red-50 border-red-200 text-red-600"
                : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            <Scan className="w-5 h-5" />
            <span className="hidden sm:inline">Face Search</span>
          </motion.button>

          {/* View Mode */}
          <div className="flex items-center space-x-1 bg-white border border-slate-200 rounded-xl p-1">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-all duration-300 ${
                viewMode === "grid"
                  ? "bg-red-100 text-red-600"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Grid3X3 className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-all duration-300 ${
                viewMode === "list"
                  ? "bg-red-100 text-red-600"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <List className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Filter Categories */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border border-slate-200 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-900">
                  Filter by Category
                </h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-3">
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveFilter(category.id)}
                    className={`flex flex-col items-center p-3 lg:p-4 rounded-xl transition-all duration-300 ${
                      activeFilter === category.id
                        ? "bg-red-100 text-red-600 border-2 border-red-200"
                        : "bg-slate-50 text-slate-600 hover:bg-slate-100 border-2 border-transparent"
                    }`}
                  >
                    <category.icon className="w-5 h-5 lg:w-6 lg:h-6 mb-2" />
                    <span className="text-xs lg:text-sm font-medium text-center">
                      {category.name}
                    </span>
                    <span className="text-xs text-slate-500 mt-1">
                      ({category.count})
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Category Filters */}
      <div className="flex flex-wrap gap-2 lg:gap-3">
        {categories.slice(0, 6).map((category) => (
          <motion.button
            key={category.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveFilter(category.id)}
            className={`flex items-center space-x-2 px-3 lg:px-4 py-2 rounded-full transition-all duration-300 text-sm lg:text-base ${
              activeFilter === category.id
                ? "bg-red-600 text-white shadow-lg"
                : "bg-white text-slate-600 hover:bg-red-50 hover:text-red-600 border border-slate-200"
            }`}
          >
            <category.icon className="w-4 h-4" />
            <span>{category.name}</span>
            <span className="text-xs opacity-75">({category.count})</span>
          </motion.button>
        ))}
      </div>
      {/* Face Search Component (Outside Button Row) */}
      <AnimatePresence>
        {showFaceSearch && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-8"
          >
            <FaceSearch />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PortfolioFilters;
