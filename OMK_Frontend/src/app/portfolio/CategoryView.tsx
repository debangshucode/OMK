"use client";
import React from 'react';
import { ArrowLeft, DivideIcon as LucideIcon } from 'lucide-react';
import MediaCard from './MediaCard';
import { MediaItem, Album } from '../../types/types';

interface CategoryViewProps {
  category: { id: string; name: string; icon: typeof LucideIcon; color: string };
  items: MediaItem[];
  onBack: () => void;
  onMediaClick: (media: MediaItem, group: MediaItem[]) => void;
  onAlbumClick: (album: Album) => void;
}

const CategoryView: React.FC<CategoryViewProps> = ({
  category,
  items,
  onBack,
  onMediaClick,
  onAlbumClick
}) => {
  const Icon = category.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-amber-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-red-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 bg-gradient-to-r from-red-700 via-red-600 to-amber-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Portfolio</span>
            </button>
          </div>
          
          <div className="mt-4 flex items-center space-x-4">
            <div className={`p-3 rounded-full ${category.color}`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-red-700 via-red-600 to-amber-600 bg-clip-text text-transparent mb-2">{category.name}</h1>
              <p className="text-gray-600">
                {items.length} {items.length === 1 ? 'item' : 'items'} in this category
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Content */}
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4">
          {items.map((item) => (
            <MediaCard
              key={item.id}
              item={item}
              onClick={() => {
                console.log('CategoryView - Media clicked:', item);
                onMediaClick(item, items);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryView;