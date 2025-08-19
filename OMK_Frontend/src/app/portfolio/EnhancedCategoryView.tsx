"use client";
import React from 'react';
import { ArrowLeft, DivideIcon as LucideIcon } from 'lucide-react';
import MediaCard from './MediaCard';
import { MediaItem, Album } from '../../types/types';
import { LoadingCard, ErrorState, EmptyState } from '../../components/ui/LoadingStates';
import { useCategoryData } from '../../hooks/usePortfolio';

interface CategoryViewProps {
  category: { 
    id: string; 
    name: string; 
    icon: typeof LucideIcon; 
    color: string 
  };
  items?: MediaItem[]; // For backwards compatibility
  onBack: () => void;
  onMediaClick: (media: MediaItem, group: MediaItem[]) => void;
  onAlbumClick: (album: Album) => void;
  useAPI?: boolean; // Flag to use API or provided items
}

const CategoryView: React.FC<CategoryViewProps> = ({
  category,
  items: providedItems,
  onBack,
  onMediaClick,
  onAlbumClick,
  useAPI = false
}) => {
  const Icon = category.icon;
  
  // Use API data if useAPI is true, otherwise use provided items
  const { 
    loading, 
    error, 
    data: apiItems, 
    hasMore, 
    total, 
    loadMore, 
    refetch 
  } = useCategoryData(useAPI ? category.id : '');
  
  // Determine which data to use
  const items = useAPI ? apiItems : (providedItems || []);
  const isLoading = useAPI ? loading : false;
  const hasError = useAPI ? error : null;

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
              <h1 className="text-3xl font-bold bg-gradient-to-r from-red-700 via-red-600 to-amber-600 bg-clip-text text-transparent mb-2">
                {category.name}
              </h1>
              <p className="text-gray-600">
                {useAPI && !isLoading ? 
                  `${total} ${total === 1 ? 'item' : 'items'} in this category` :
                  `${items.length} ${items.length === 1 ? 'item' : 'items'} in this category`
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Content */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error State */}
        {hasError && (
          <ErrorState 
            message={hasError}
            onRetry={refetch}
          />
        )}

        {/* Empty State */}
        {!isLoading && !hasError && items.length === 0 && (
          <EmptyState
            title="No items found"
            description={`No ${category.name.toLowerCase()} items are available at the moment.`}
            icon={<Icon className="w-16 h-16 text-gray-400" />}
          />
        )}

        {/* Loading State */}
        {isLoading && items.length === 0 && (
          <LoadingCard count={12} />
        )}

        {/* Items Grid */}
        {items.length > 0 && (
          <>
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

            {/* Load More Button (for API pagination) */}
            {useAPI && hasMore && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={loadMore}
                  disabled={isLoading}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400 transition-colors duration-200 flex items-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Loading...</span>
                    </>
                  ) : (
                    <span>Load More</span>
                  )}
                </button>
              </div>
            )}

            {/* Loading more items */}
            {isLoading && items.length > 0 && (
              <div className="mt-8">
                <LoadingCard count={8} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CategoryView;
