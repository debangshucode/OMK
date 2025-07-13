"use client";
import React from 'react';
import { ArrowLeft, Calendar, Image as ImageIcon, Video, Play } from 'lucide-react';
import { Album, MediaItem } from '../../types/types';
import MediaCard from './MediaCard';

interface AlbumViewProps {
  album: Album;
  onBack: () => void;
  onMediaClick: (media: MediaItem, group: MediaItem[]) => void;
}

const AlbumView: React.FC<AlbumViewProps> = ({ album, onBack, onMediaClick }) => {
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
          
          <div className="mt-4">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-red-700 via-red-600 to-amber-600 bg-clip-text text-transparent mb-2">{album.title}</h1>
            <p className="text-gray-600 mb-4">{album.description}</p>
            
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(album.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <ImageIcon className="w-4 h-4" />
                <span>{album.itemCount} items</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Album Content */}
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4">
          {album.items.map((item, index) => (
            <MediaCard
              key={item.id}
              item={item}
              onClick={() => {
                console.log('AlbumView - Media clicked:', item);
                onMediaClick(item, album.items);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlbumView;