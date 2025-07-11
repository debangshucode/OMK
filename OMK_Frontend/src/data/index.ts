

export interface GridItem {
  image?: string;
  label?: string;
}

export const customItems: GridItem[] = [
  { label: "Hire Us" },
  { image: "/images/weadingHome.jpg", label: "Nature" },
  { image: "/images/weadingHome1.jpg", label: "Tech" },
  { image: "/images/weadingHome.jpg", label: "Nature" },
  { image: "/images/weadingHome3.jpg", label: "Tech" },
  { image: "/images/weadingHome2.jpg", label: "Nature" },
  { label: "Photography" },
  { image: "/images/weadingHome6.jpg", label: "City" },
  { image: "/images/weadingHome5.jpg", label: "Nature" },
  { label: "Cinematography" },
  { image: "/images/weadingHome1.jpg", label: "Nature" },
  { image: "/images/weadingHome6.jpg", label: "Nature" },
  { label: "Pre-Weading" },
  { image: "/images/weadingHome2.jpg", label: "Space" },
  { label: "Hire Us" },
  { image: "/images/weadingHome6.jpg", label: "Ocean" },
  { image: "/images/weadingHome3.jpg", label: "Ocean" },
  { label: "Videography" },
  { image: "/images/weadingHome4.jpg", label: "Forest" },
  { label: "Photo-Shoot" },
  { image: "/images/weadingHome1.jpg", label: "Forest" },
  { label: "Weading-Album" },
  { label: "Photography" },
  { image: "/images/weadingHome5.jpg", label: "Mountain" },
  { image: "/images/weadingHome6.jpg", label: "City" },
  { label: "Hire Us" },
  { image: "/images/weadingHome2.jpg", label: "City" },
  { image: "/images/weadingHome6.jpg", label: "City" },
];
import { MediaItem, Album } from '../types/types';

const samplePhotos = [
  '/images/weadingHome.jpg',
  '/images/weadingHome.jpg',
  '/images/weadingHome.jpg',
  '/images/weadingHome.jpg',
  '/images/weadingHome.jpg',
  '/images/weadingHome.jpg',
  '/images/weadingHome.jpg',
  '/images/weadingHome.jpg',
  '/images/weadingHome.jpg',
  '/images/weadingHome.jpg'
];

// Using placeholder for videos since external video URLs may not work
const sampleVideos = [
  "https://youtu.be/Uy6Nk-T2YX4?si=9L5NopDqGPa4Q8ai",
  "https://youtu.be/kVMZ2lLEFFM?si=nCTR_l4Cpwk6amLF",
  "https://youtu.be/83gpCFmzbEo?si=Q1JuSBaTZkKyus2U"
];
// Will be treated as videos in the data structure
const sampleVideoIDs = [
  "Uy6Nk-T2YX4",
  "kVMZ2lLEFFM",
  "83gpCFmzbEo",
];
// Generate sample media items for each category
const generateMediaItems = (category: string, count: number): MediaItem[] => {
  return Array.from({ length: count }, (_, i) => {
    const isVideo = i % 5 === 0;
    const videoId = sampleVideoIDs[i % sampleVideoIDs.length];
    return {
      id: `${category}-${i + 1}`,
      title: `${category.charAt(0).toUpperCase() + category.slice(1)} Moment ${i + 1}`,
      description: `Beautiful ${category} media capturing precious moments and emotions.`,
      url: isVideo
        ? `https://www.youtube.com/embed/${videoId}`
        : samplePhotos[i % samplePhotos.length],
      thumbnail: isVideo
        ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
        : samplePhotos[i % samplePhotos.length],
      type: isVideo ? 'video' : 'photo',
      category,
      date: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
      tags: [category, 'photography', 'professional']
    };
  });
};


// Generate albums
const generateAlbums = (): Album[] => {
  const albumTypes = [
    { name: 'Sarah & John Wedding', category: 'wedding' },
    { name: 'Emma & Michael Pre-Wedding', category: 'prewedding' },
    { name: 'Corporate Event 2024', category: 'corporate' },
    { name: 'Johnson Family Portrait', category: 'family' },
    { name: 'Baby Olivia Newborn', category: 'baby' }
  ];

  return albumTypes.map((album, index) => {
    const items = generateMediaItems(album.category, 12);
    return {
      id: `album-${index + 1}`,
      title: album.name,
      description: `A beautiful collection of ${album.category} moments captured with love and care.`,
      coverImage: items[0].thumbnail || items[0].url,
      date: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
      itemCount: items.length,
      items
    };
  });
};

export const portfolioData = {
  categories: {
    wedding: generateMediaItems('wedding', 20),
    prewedding: generateMediaItems('prewedding', 15),
    corporate: generateMediaItems('corporate', 12),
    family: generateMediaItems('family', 18),
    baby: generateMediaItems('baby', 10)
  },
  albums: generateAlbums()
};