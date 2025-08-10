"use client";
import React, { useRef } from "react";
import {
  ChevronRight,
  ChevronLeft,
  DivideIcon as LucideIcon,
} from "lucide-react";
import MediaCard from "./MediaCard";
import { MediaItem, Album } from "../../types/types";

interface CategorySectionProps {
  title: string;
  items: MediaItem[] | Album[];
  onItemClick: (item: any) => void;
  onViewMore: () => void;
  showViewMore?: boolean;
  icon?: typeof LucideIcon;
  iconColor?: string;
}

const CategorySection: React.FC<CategorySectionProps> = ({
  title,
  items,
  onItemClick,
  onViewMore,
  showViewMore = true,
  icon: Icon,
  iconColor = "bg-gray-700",
}) => {
  const displayItems = items.slice(0, 8);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  return (
    <div className="mb-2  ">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          {Icon && (
            <div className={`p-2 rounded-full ${iconColor}`}>
              <Icon className="w-5 h-5 text-white" />
            </div>
          )}
          <h1 className="text-6xl font-bold text-transparent [-webkit-text-stroke:2px_black]">
            {title}
          </h1>
        </div>
        {showViewMore && (
          <button
            onClick={onViewMore}
            className="flex items-center space-x-2 text-gray-700 hover:opacity-80 transition-opacity duration-200 group font-medium"
          >
            <span>View More</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        )}
      </div>

      {/* Items Grid */}
      <div className="relative group">
        {/* Left Scroll Button */}
        <button
          onClick={scrollLeft}
          className="absolute z-999 left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 opacity-80 group-hover:opacity-100 transition-opacity duration-200 hover:bg-gray-50"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>

        {/* Right Scroll Button */}
        <button
          onClick={scrollRight}
          className="absolute z-999 right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 opacity-80 group-hover:opacity-100 transition-opacity duration-200 hover:bg-gray-50"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>

        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4">
            {displayItems.map((item, index) => (
              <div
                key={"id" in item && item.id ? item.id : `item-${index}`}
                className="break-inside-avoid cursor-pointer bg-white rounded-xl overflow-hidden shadow-sm"
              >
                <MediaCard item={item} onClick={() => onItemClick(item)} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
