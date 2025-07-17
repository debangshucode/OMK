export interface PortfolioItem {
  id: number;
  type: 'photo' | 'video' | 'album';
  category: string;
  title: string;
  description: string;
  image: string;
  date: string;
  location: string;
  tags: string[];
  likes: number;
  views: number;
  featured: boolean;
  duration?: string;
  photoCount?: number;
}
export interface MediaItem {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnail?: string; // For videos and YouTube links
  type: 'photo' | 'video' | 'youtube' | 'thumbnail';
  category: string;
  date: string;
  tags: string[];
}

export interface Album {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  date: string;
  itemCount: number;
  items: MediaItem[];
  thumbnail?: string;
}

export interface Booking {
  _id: string;
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  date: string;
  timeSlot: string;
  status: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}
export interface testimonials {
  _id: string
  user: string
  name: string
  rating: number
  comment: string
  approved: boolean
  createdAt: string
  updatedAt: string
}