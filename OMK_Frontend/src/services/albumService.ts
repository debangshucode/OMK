// services/albumService.ts

export interface Album {
  _id: string;
  title: string;
  description?: string;
  category: string;
  coverImage?: string;
  createdAt: string;
  updatedAt: string;
  mediaFiles?: MediaFile[];
  assignedTo?: string;
  parentAlbumId?: string | null;
}

export interface MediaFile {
  filename: string;
  originalName: string;
  filePath: string;
  fileType: 'image' | 'video';
  mimeType: string;
  fileSize: number;
  uploadedAt: string;
}

class AlbumService {
  baseURL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000/api';

  private async request<T = any>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      credentials: 'include',
      ...options,
    });

    const contentType = response.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      const raw = await response.text();
      throw new Error(`Expected JSON, got: ${raw}`);
    }

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'API request failed');
    }

    return response.json();
  }

  // 📁 Create new album
  createAlbum(data: object) {
    return this.request('/albums', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // 📂 Get all albums (optional filters)
  getAlbums(params: Record<string, any> = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/albums?${query}`);
  }

  // 📄 Get single album by ID
  getAlbumById(albumId: string) {
    return this.request(`/albums/${albumId}`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      
           
    });
  }

  // ✏️ Update album details
  updateAlbum(albumId: string, data: object) {
    return this.request(`/albums/${albumId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // ❌ Delete album
  deleteAlbum(albumId: string) {
    return this.request(`/albums/${albumId}`, { method: 'DELETE' });
  }

  assignAlbumToUser(albumId: string, clientId: string) {
  return this.request(`/albums/assign`, {
    method: 'POST',
    body: JSON.stringify({ albumId, clientId }),
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
}


  // ⬆️ Upload media files to album
  async uploadFiles(albumId: string, files: File[]) {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));

    const response = await fetch(`${this.baseURL}/albums/${albumId}/upload`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });

    const contentType = response.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      const raw = await response.text();
      console.error('❌ Upload non-JSON response:', raw);
      throw new Error('Upload failed: Invalid server response');
    }

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Upload failed');
    }

    return response.json();
  }

  // 🔗 Generate public preview URL
  getPreviewUrl(albumId: string, filename: string) {
    return `${this.baseURL.replace('/api', '')}/uploads/${albumId}/${filename}`;
  }

  // 📥 Generate download URL
  getDownloadUrl(albumId: string, filename: string) {
    return `${this.baseURL}/albums/${albumId}/download/${filename}`;
  }

  // 👤 Get albums assigned to a client (optional)
  getClientAlbums(clientId: string, params: Record<string, any> = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/albums/client/${clientId}?${query}`);
  }

  deleteFile(albumId: string, filename: string) {
    return this.request(`/albums/${albumId}/files/${filename}`, {
      method: 'DELETE',
    });
  }

  
}

export const albumService = new AlbumService();
