"use client";
import React, { useState } from "react";
import { Play, Image as ImageIcon, Calendar, Heart, Eye } from "lucide-react";
import { MediaItem, Album } from "../../types/types";

interface MediaCardProps {
  item: MediaItem | Album;
  onClick: () => void;
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
    <div
      className={`group cursor-pointer transition-all duration-300 flex-shrink-0  ${className}`}
      onClick={onClick}
    >
      {/* Main Card */}
      <div className="p-2 min-w-[170px] max-w-[170px] xl:min-w-[250px] xl:max-w-[250px] flex-shrink-0 bg-gray-200  overflow-hidden  shadow-md transition-all duration-300 cursor-pointer relative">
        {/* Image container */}
        <div className="relative aspect-[3/4] bg-gray-100">
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          {imageError && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <ImageIcon className="w-12 h-12 text-gray-400" />
            </div>
          )}
          <img
            src={
              isAlbum
                ? item.thumbnail || item.coverImage
                : item.thumbnail || item.url
            }
            alt={item.title}
            className={`w-full h-full object-cover transition-all duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            loading="lazy"
          />

          {/* Overlay Content */}
          {/* <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent px-3 py-2 text-white">
            <h3 className="text-sm font-semibold line-clamp-1">{item.title}</h3>
            <p className="text-xs text-gray-300 line-clamp-1">
              {item.description}
            </p>
            <div className="flex justify-between items-center mt-1 text-[10px] text-gray-300">
              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span>05/11/2003</span>
              </div>
              {!isAlbum && (
                <div className="flex items-center space-x-1">
                  <Heart className="w-3 h-3" />
                  <span>20</span>
                </div>
              )}
            </div>
          </div> */}

          {/* Type Badge */}
          <div className="absolute top-3 right-3">
            <div className="bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-md text-xs font-medium shadow">
              {isAlbum ? "Album" : isVideo ? "Video" : "Photo"}
            </div>
          </div>

          {/* Album Item Count */}
          {isAlbum && (
            <div className="absolute top-3 left-3 bg-black bg-opacity-60 text-white px-2 py-1 rounded-md text-xs font-medium shadow-sm">
              {item.itemCount} items
            </div>
          )}
        </div>

        {/* Static Bottom Info */}
        <div className="p-3">
          <span className="text-xs text-gray-600 font-medium">
            {item.description}
          </span>
          <h4 className="font-semibold text-gray-900 text-sm mt-1 line-clamp-1">
            {item.title}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default MediaCard;
