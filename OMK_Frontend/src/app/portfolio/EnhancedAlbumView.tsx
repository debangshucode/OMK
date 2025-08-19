"use client";
import React from "react";
import { ArrowLeft, Calendar, Image as ImageIcon } from "lucide-react";
import { Album, MediaItem } from "../../types/types";
import { useAlbumData } from "../../hooks/usePortfolio";
import { MasonryLoading, ErrorState, EmptyState, LoadingSpinner } from "../../components/ui/LoadingStates";
import Image from "next/image";

interface EnhancedAlbumViewProps {
  albumId?: string | null;
  album?: Album; // For backwards compatibility with static data
  onBack: () => void;
  onMediaClick: (media: MediaItem, group: MediaItem[]) => void;
  useAPI?: boolean; // Flag to use API or provided album
}

const EnhancedAlbumView: React.FC<EnhancedAlbumViewProps> = ({
  albumId,
  album: providedAlbum,
  onBack,
  onMediaClick,
  useAPI = false
}) => {
  // Use API data if useAPI is true and albumId is provided
  const { loading, error, album: apiAlbum, refetch } = useAlbumData(useAPI ? (albumId ?? null) : null);
  
  // Determine which album data to use
  const album = useAPI ? apiAlbum : providedAlbum;
  const isLoading = useAPI ? loading : false;
  const hasError = useAPI ? error : null;

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-amber-50">
        {/* Header skeleton */}
        <div className="bg-white shadow-sm border-b border-red-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center space-x-4 mb-4">
              <button
                onClick={onBack}
                className="flex items-center space-x-2 bg-gradient-to-r from-red-700 via-red-600 to-amber-600 bg-clip-text text-transparent hover:opacity-80"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Portfolio</span>
              </button>
            </div>

            <div className="mt-4">
              <div className="h-8 w-64 bg-gray-200 rounded animate-pulse mb-2" />
              <div className="h-4 w-96 bg-gray-200 rounded animate-pulse mb-4" />
              <div className="flex items-center space-x-6">
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Content skeleton */}
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <MasonryLoading count={12} />
        </div>
      </div>
    );
  }

  // Error state
  if (hasError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-amber-50">
        <div className="bg-white shadow-sm border-b border-red-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 bg-gradient-to-r from-red-700 via-red-600 to-amber-600 bg-clip-text text-transparent hover:opacity-80"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Portfolio</span>
            </button>
          </div>
        </div>
        <ErrorState 
          message={hasError}
          onRetry={refetch}
          className="min-h-[50vh]"
        />
      </div>
    );
  }

  // No album found
  if (!album) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-amber-50">
        <div className="bg-white shadow-sm border-b border-red-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 bg-gradient-to-r from-red-700 via-red-600 to-amber-600 bg-clip-text text-transparent hover:opacity-80"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Portfolio</span>
            </button>
          </div>
        </div>
        <EmptyState
          title="Album not found"
          description="The requested album could not be found or may have been removed."
          icon={<ImageIcon className="w-16 h-16 text-gray-400" />}
          className="min-h-[50vh]"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-amber-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-red-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 bg-gradient-to-r from-red-700 via-red-600 to-amber-600 bg-clip-text text-transparent hover:opacity-80"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Portfolio</span>
            </button>
          </div>

          <div className="mt-4">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-red-700 via-red-600 to-amber-600 bg-clip-text text-transparent mb-2">
              {album.title}
            </h1>
            {album.description && (
              <p className="text-gray-600 mb-4">{album.description}</p>
            )}

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

      {/* Masonry Grid */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {album.items && album.items.length > 0 ? (
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4">
            {album.items.map((item) => (
              <div
                key={item.id}
                className="break-inside-avoid cursor-pointer bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
                onClick={() => onMediaClick(item, album.items)}
              >
                <Image
                  src={item.thumbnail || item.url}
                  alt={item.title || "Media"}
                  width={500}
                  height={500}
                  className="w-full h-auto object-contain"
                  unoptimized
                  onError={(e) => {
                    // Fallback for broken images
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
                {/* Optional overlay with item info */}
                {item.title && (
                  <div className="p-3">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {item.title}
                    </p>
                    {item.description && (
                      <p className="text-xs text-gray-600 truncate">
                        {item.description}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No items in this album"
            description="This album doesn't contain any photos or videos yet."
            icon={<ImageIcon className="w-16 h-16 text-gray-400" />}
          />
        )}
      </div>
    </div>
  );
};

export default EnhancedAlbumView;
