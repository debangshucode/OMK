"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Play, Image as ImageIcon, Calendar, Heart, Eye } from "lucide-react";
import { MediaItem, Album } from "../../types/types";

interface MediaCardProps {
  item: MediaItem | Album;
  onClick?: () => void;
  className?: string;
}

const MediaCard: React.FC<MediaCardProps> = ({
  item,
  onClick,
  className = "",
}) => {
  const isAlbum = "coverImage" in item;
  const isVideo = !isAlbum && "type" in item && item.type === "video";
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      className={`group relative w-[170px] min-w-[170px] h-[260px] rounded-lg overflow-hidden bg-black shadow-md hover:shadow-lg transition-all duration-300 flex-shrink-0 ${className}`}
      onClick={onClick}
    >
      {/* Background image */}
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 flex items-center justify-center z-0 bg-gray-200">
          <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      {imageError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-0">
          <ImageIcon className="w-10 h-10 text-gray-400" />
        </div>
      )}
      <img
        src={
          isAlbum
            ? item.thumbnail || item.coverImage
            : item.thumbnail || item.url
        }
        alt={item.title}
        className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 ${
          !imageLoaded ? "opacity-0" : "opacity-100"
        }`}
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageError(true)}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col justify-between p-4 text-white">
        <div className="flex justify-end">
          <div className="bg-white/20 p-1.5 rounded-full backdrop-blur-sm">
            {isAlbum ? (
              <ImageIcon className="w-4 h-4 text-white" />
            ) : isVideo ? (
              <Play className="w-4 h-4 text-white" />
            ) : (
              <Eye className="w-4 h-4 text-white" />
            )}
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center text-center space-y-1">
          <p className="text-sm font-medium text-white/80">
            {item.description}
          </p>
          <h3 className="text-md font-semibold leading-tight">{item.title}</h3>
        </div>

        <div className="text-center">
          <button
            onClick={onClick}
            className="inline-block bg-red-600 hover:bg-red-700 text-white text-xs px-4 py-1.5 rounded-full font-medium shadow-md transition-all duration-300"
          >
            View {isAlbum ? "Album" : isVideo ? "Film" : "Media"}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default MediaCard;
