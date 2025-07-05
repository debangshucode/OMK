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