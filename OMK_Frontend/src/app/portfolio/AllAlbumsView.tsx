"use client";
import React from 'react';
import { ArrowLeft, Album as AlbumIcon } from 'lucide-react';
import MediaCard from './MediaCard';
import { Album,MediaItem } from '../../types/types';

interface AllAlbumsViewProps {
  albums: Album[];
  onBack: () => void;
  onAlbumClick: (album: Album) => void;
  onMediaClick: (media: MediaItem, group: MediaItem[]) => void;
}

const AllAlbumsView: React.FC<AllAlbumsViewProps> = ({
  albums,
  onBack,
  onAlbumClick,
  onMediaClick,
}) => {
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
            <div className="p-3 rounded-full bg-gradient-to-r from-red-700 via-red-600 to-amber-600">
              <AlbumIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-red-700 via-red-600 to-amber-600 bg-clip-text text-transparent mb-2">All Albums</h1>
              <p className="text-gray-600">
                {albums.length} {albums.length === 1 ? 'album' : 'albums'} available
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Albums Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {albums.map((album) => (
            <MediaCard
              key={album.id}
              item={album}
              onClick={() => {
                console.log('AllAlbumsView - Album clicked:', album);
                onAlbumClick(album);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllAlbumsView;