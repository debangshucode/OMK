import { apiFetch } from './api';
import { MediaItem, Album } from '../types/types';
import { albumService } from '../services/albumService';



interface MediaResponse {
  items: MediaItem[];
  total: number;
  hasMore: boolean;
}

export const portfolioService = {
  // Get all albums - using existing album service
  getAlbums: async (params?: { limit?: number; offset?: number }): Promise<{
    albums: Album[];
    total: number;
    hasMore: boolean;
  }> => {
    try {
      const response = await albumService.getAlbums(params || {});
      const albums = response.data || [];
      
      // Convert album service format to portfolio format
      const convertedAlbums: Album[] = albums.map((album: any) => ({
        id: album._id,
        type: 'album',
        title: album.title,
        description: album.description || '',
        category: album.category,
        date: album.createdAt,
        coverImage: album.coverImage || (album.mediaFiles?.[0]?.filePath ? 
          albumService.getPreviewUrl(album._id, album.mediaFiles[0].filename) : ''),
        itemCount: album.mediaFiles?.length || 0,
        items: album.mediaFiles?.map((file: any) => ({
          id: `${album._id}-${file.filename}`,
          type: file.fileType === 'image' ? 'photo' : 'video',
          title: file.originalName,
          url: albumService.getPreviewUrl(album._id, file.filename),
          thumbnail: file.fileType === 'video' ? albumService.getPreviewUrl(album._id, file.filename) : undefined,
          date: file.uploadedAt,
          category: album.category
        })) || []
      }));
      
      return {
        albums: convertedAlbums,
        total: albums.length,
        hasMore: false // Adjust based on your pagination needs
      };
    } catch (error) {
      throw new Error('Failed to fetch albums');
    }
  },

  // Get single album by ID
  getAlbum: async (id: string): Promise<Album> => {
    try {
      const response = await albumService.getAlbumById(id);
      const album = response.data;
      
      return {
        id: album._id,
        type: 'album',
        title: album.title,
        description: album.description || '',
        category: album.category,
        date: album.createdAt,
        coverImage: album.coverImage || (album.mediaFiles?.[0]?.filePath ? 
          albumService.getPreviewUrl(album._id, album.mediaFiles[0].filename) : ''),
        itemCount: album.mediaFiles?.length || 0,
        items: album.mediaFiles?.map((file: any) => ({
          id: `${album._id}-${file.filename}`,
          type: file.fileType === 'image' ? 'photo' : 'video',
          title: file.originalName,
          url: albumService.getPreviewUrl(album._id, file.filename),
          thumbnail: file.fileType === 'video' ? albumService.getPreviewUrl(album._id, file.filename) : undefined,
          date: file.uploadedAt,
          category: album.category
        })) || []
      };
    } catch (error) {
      throw new Error('Failed to fetch album');
    }
  },

  // Get photos from all albums
  getPhotos: async (params?: { limit?: number; offset?: number }): Promise<MediaResponse> => {
    try {
      const albumsResponse = await portfolioService.getAlbums();
      const allPhotos: MediaItem[] = [];
      
      albumsResponse.albums.forEach(album => {
        const photos = album.items.filter(item => item.type === 'photo');
        allPhotos.push(...photos);
      });
      
      const limit = params?.limit || 20;
      const offset = params?.offset || 0;
      const paginatedPhotos = allPhotos.slice(offset, offset + limit);
      
      return {
        items: paginatedPhotos,
        total: allPhotos.length,
        hasMore: offset + limit < allPhotos.length
      };
    } catch (error) {
      throw new Error('Failed to fetch photos');
    }
  },

  // Get videos from all albums
  getVideos: async (params?: { limit?: number; offset?: number }): Promise<MediaResponse> => {
    try {
      const albumsResponse = await portfolioService.getAlbums();
      const allVideos: MediaItem[] = [];
      
      albumsResponse.albums.forEach(album => {
        const videos = album.items.filter(item => item.type === 'video');
        allVideos.push(...videos);
      });
      
      const limit = params?.limit || 20;
      const offset = params?.offset || 0;
      const paginatedVideos = allVideos.slice(offset, offset + limit);
      
      return {
        items: paginatedVideos,
        total: allVideos.length,
        hasMore: offset + limit < allVideos.length
      };
    } catch (error) {
      throw new Error('Failed to fetch videos');
    }
  },

  // Get media by category
  getMediaByCategory: async (category: string, params?: { limit?: number; offset?: number }): Promise<MediaResponse> => {
    try {
      const albumsResponse = await portfolioService.getAlbums();
      const categoryMedia: MediaItem[] = [];
      
      albumsResponse.albums.forEach(album => {
        if (album.category.toLowerCase() === category.toLowerCase()) {
          categoryMedia.push(...album.items);
        }
      });
      
      const limit = params?.limit || 20;
      const offset = params?.offset || 0;
      const paginatedMedia = categoryMedia.slice(offset, offset + limit);
      
      return {
        items: paginatedMedia,
        total: categoryMedia.length,
        hasMore: offset + limit < categoryMedia.length
      };
    } catch (error) {
      throw new Error(`Failed to fetch ${category} media`);
    }
  },

  // Search media
  searchMedia: async (query: string, filters?: {
    category?: string;
    type?: 'photo' | 'video';
    limit?: number;
  }): Promise<MediaResponse> => {
    try {
      const albumsResponse = await portfolioService.getAlbums();
      let allMedia: MediaItem[] = [];
      
      albumsResponse.albums.forEach(album => {
        allMedia.push(...album.items);
      });
      
      // Filter by search query
      const searchResults = allMedia.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description?.toLowerCase().includes(query.toLowerCase()) ||
        item.category?.toLowerCase().includes(query.toLowerCase())
      );
      
      // Apply additional filters
      let filteredResults = searchResults;
      if (filters?.category) {
        filteredResults = filteredResults.filter(item => 
          item.category?.toLowerCase() === filters.category!.toLowerCase()
        );
      }
      if (filters?.type) {
        filteredResults = filteredResults.filter(item => item.type === filters.type);
      }
      
      const limit = filters?.limit || 50;
      const paginatedResults = filteredResults.slice(0, limit);
      
      return {
        items: paginatedResults,
        total: filteredResults.length,
        hasMore: limit < filteredResults.length
      };
    } catch (error) {
      throw new Error('Search failed');
    }
  },
};
