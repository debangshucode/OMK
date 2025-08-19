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
// Base structure for shared fields
export interface BaseMedia {
  id: string
  title: string
  description?: string
  category?: string
  date: string
  tags?: string[]
}

// Individual media items
export interface MediaItem extends BaseMedia {
  type: 'photo' | 'video' | 'youtube' | 'thumbnail'
  url: string
  thumbnail?: string // for videos / YouTube
}

// Album containing media items
export interface Album extends BaseMedia {
  type: 'album'
  coverImage: string
  itemCount: number
  items: MediaItem[]
  thumbnail?: string
}

// Union type for easy handling
export type Media = MediaItem | Album


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
  image: string
}

export interface QuickLink {
  label: string
  onClick: () => void
}
