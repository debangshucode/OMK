import { useState, useEffect } from 'react';
import { MediaItem, Album } from '../types/types';
import { portfolioService } from '../lib/portfolioService';
import { ApiError } from '../lib/api';

interface UsePortfolioDataState {
  loading: boolean;
  error: string | null;
  data: {
    photos: MediaItem[];
    videos: MediaItem[];
    albums: Album[];
    categories: {
      wedding: MediaItem[];
      prewedding: MediaItem[];
      corporate: MediaItem[];
      family: MediaItem[];
      baby: MediaItem[];
    };
  };
  refetch: () => void;
}

// Main hook for portfolio page data
export const usePortfolioData = (): UsePortfolioDataState => {
  const [state, setState] = useState<UsePortfolioDataState>({
    loading: true,
    error: null,
    data: {
      photos: [],
      videos: [],
      albums: [],
      categories: {
        wedding: [],
        prewedding: [],
        corporate: [],
        family: [],
        baby: []
      }
    },
    refetch: () => {}
  });

  const fetchData = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      // Fetch all data concurrently
      const [photosData, videosData, albumsData, ...categoriesData] = await Promise.allSettled([
        portfolioService.getPhotos({ limit: 20 }),
        portfolioService.getVideos({ limit: 20 }),
        portfolioService.getAlbums({ limit: 10 }),
        portfolioService.getMediaByCategory('wedding', { limit: 20 }),
        portfolioService.getMediaByCategory('prewedding', { limit: 15 }),
        portfolioService.getMediaByCategory('corporate', { limit: 12 }),
        portfolioService.getMediaByCategory('family', { limit: 18 }),
        portfolioService.getMediaByCategory('baby', { limit: 10 })
      ]);

      // Process results
      const photos = photosData.status === 'fulfilled' ? photosData.value.items : [];
      const videos = videosData.status === 'fulfilled' ? videosData.value.items : [];
      const albums = albumsData.status === 'fulfilled' ? albumsData.value.albums : [];
      
      const categories = {
        wedding: categoriesData[0]?.status === 'fulfilled' ? categoriesData[0].value.items : [],
        prewedding: categoriesData[1]?.status === 'fulfilled' ? categoriesData[1].value.items : [],
        corporate: categoriesData[2]?.status === 'fulfilled' ? categoriesData[2].value.items : [],
        family: categoriesData[3]?.status === 'fulfilled' ? categoriesData[3].value.items : [],
        baby: categoriesData[4]?.status === 'fulfilled' ? categoriesData[4].value.items : []
      };

      setState(prev => ({
        ...prev,
        loading: false,
        data: {
          photos,
          videos,
          albums,
          categories
        }
      }));

    } catch (error) {
      const errorMessage = error instanceof ApiError 
        ? error.message 
        : 'Failed to load portfolio data';
      
      setState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage
      }));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Add refetch function
  useState(() => {
    setState(prev => ({ ...prev, refetch: fetchData }));
  });

  return state;
};

// Hook for individual category data
export const useCategoryData = (category: string) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<MediaItem[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);

  const fetchData = async (offset = 0, limit = 20) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await portfolioService.getMediaByCategory(category, { offset, limit });
      
      if (offset === 0) {
        setData(result.items);
      } else {
        setData(prev => [...prev, ...result.items]);
      }
      
      setHasMore(result.hasMore);
      setTotal(result.total);
    } catch (error) {
      const errorMessage = error instanceof ApiError 
        ? error.message 
        : `Failed to load ${category} data`;
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      fetchData(data.length);
    }
  };

  const refetch = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  return {
    loading,
    error,
    data,
    hasMore,
    total,
    loadMore,
    refetch
  };
};

// Hook for album data
export const useAlbumData = (albumId: string | null) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [album, setAlbum] = useState<Album | null>(null);

  useEffect(() => {
    if (!albumId) {
      setAlbum(null);
      setLoading(false);
      return;
    }

    const fetchAlbum = async () => {
      try {
        setLoading(true);
        setError(null);
        const albumData = await portfolioService.getAlbum(albumId);
        setAlbum(albumData);
      } catch (error) {
        const errorMessage = error instanceof ApiError 
          ? error.message 
          : 'Failed to load album';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbum();
  }, [albumId]);

  const refetch = () => {
    if (albumId) {
      // Re-fetch logic would go here
    }
  };

  return {
    loading,
    error,
    album,
    refetch
  };
};

// Hook for all albums
export const useAlbumsData = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);

  const fetchAlbums = async (offset = 0, limit = 20) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await portfolioService.getAlbums({ offset, limit });
      
      if (offset === 0) {
        setAlbums(result.albums);
      } else {
        setAlbums(prev => [...prev, ...result.albums]);
      }
      
      setHasMore(result.hasMore);
      setTotal(result.total);
    } catch (error) {
      const errorMessage = error instanceof ApiError 
        ? error.message 
        : 'Failed to load albums';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      fetchAlbums(albums.length);
    }
  };

  const refetch = () => {
    fetchAlbums();
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  return {
    loading,
    error,
    albums,
    hasMore,
    total,
    loadMore,
    refetch
  };
};

// Hook for search functionality
export const useSearchMedia = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<MediaItem[]>([]);
  const [total, setTotal] = useState(0);

  const search = async (query: string, filters?: {
    category?: string;
    type?: 'photo' | 'video';
  }) => {
    if (!query.trim()) {
      setResults([]);
      setTotal(0);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const result = await portfolioService.searchMedia(query, {
        ...filters,
        limit: 50
      });
      
      setResults(result.items);
      setTotal(result.total);
    } catch (error) {
      const errorMessage = error instanceof ApiError 
        ? error.message 
        : 'Search failed';
      setError(errorMessage);
      setResults([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  const clearResults = () => {
    setResults([]);
    setTotal(0);
    setError(null);
  };

  return {
    loading,
    error,
    results,
    total,
    search,
    clearResults
  };
};
