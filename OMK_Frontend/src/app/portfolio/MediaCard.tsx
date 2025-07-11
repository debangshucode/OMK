"use client";
import React, { useState } from 'react';
import { Play, Image as ImageIcon, Calendar, Heart, Eye } from 'lucide-react';
import { MediaItem, Album } from '../../types/types';

interface MediaCardProps {
  item: MediaItem | Album;
  onClick: () => void;
  className?: string;
}

const MediaCard: React.FC<MediaCardProps> = ({ item, onClick, className = '' }) => {
  const isAlbum = 'coverImage' in item;
  const isVideo = !isAlbum && 'type' in item && item.type === 'video';
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className={`group cursor-pointer transition-all duration-300 flex-shrink-0 w-44 ${className}`}
      onClick={onClick}
    >
      {/* Main Card */}
      <div className="relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 bg-white h-full">
        {/* Fixed Height Image Container */}
        <div className="relative w-full h-50 bg-gray-100">
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
            src={isAlbum ? item.thumbnail || item.coverImage : item.thumbnail || item.url}
            alt={item.title}
            className={`w-full h-full object-cover transition-all duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            loading="lazy"
          />

          {/* Type Badge */}
          <div className="absolute top-3 right-3">
            <div className="bg-gradient-to-r from-red-700 via-red-600 to-amber-600 text-white px-2 py-1 rounded-md text-xs font-medium shadow-sm">
              {isAlbum ? 'Album' : isVideo ? 'Video' : 'Photo'}
            </div>
          </div>

          {/* Album Item Count */}
          {isAlbum && (
            <div className="absolute top-3 left-3 bg-black bg-opacity-60 text-white px-2 py-1 rounded-md text-xs font-medium shadow-sm">
              {item.itemCount} items
            </div>
          )}
        </div>

        {/* Fixed Height Content */}
        <div className="p-3 h-28 flex flex-col justify-between">
          <div className='h-[80%]'>
            <h3 className="font-semibold text-gray-800 mb-1 text-sm leading-tight line-clamp-2">
              {item.title}
            </h3>
            <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Metadata */}
          <div className="flex items-center justify-between text-xs text-gray-400 mt-2">
            <div className="flex items-center space-x-1">
              <Calendar className="w-3 h-3" />
              <span>11/12/2013</span>
            </div>
            {!isAlbum && (
              <div className="flex items-center space-x-1">
                <Heart className="w-3 h-3" />
                <span>20</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaCard;
