

export interface GridItem {
  image?: string;
  label?: string;
  details?: String;
}

export const customItems: GridItem[] = [
  { label: "Hire Us" },
  { image: "/images/weadingHome.jpg", label: "Pre-Wedding Shoot" , details: "Expert Pre-Wedding Photography & Videography | Capture Your Love Story with Stunning, Professional Shots"},
  { image: "/images/weadingHome1.jpg", label: "Candid Moment" ,  details: "Authentic Candid Photography | Natural, unscripted shots that beautifully capture emotions and timeless pre-wedding memories."},
  { image: "/images/weadingHome.jpg", label: "Behind the Scenes" ,  details: "Exclusive Behind-the-Scenes Photography | Relive the fun, laughter, and real moments from your pre-wedding journey."},
  { image: "/images/weadingHome3.jpg", label: "Perfect Shot" ,  details: "Perfectly Composed Photography | Stunning pre-wedding pictures that highlight your chemistry with professional artistry."},
  { image: "/images/weadingHome2.jpg", label: "Captured Beauty",  details: "Elegant Pre-Wedding Portraits | Showcase your beauty and love with magazine-style photography by experts." },
  { label: "Photography" , details: "Professional Wedding & Pre-Wedding Photography | Creative storytelling through high-quality photos that last a lifetime."},
  { image: "/images/weadingHome6.jpg", label: "City" ,  details: "Urban Pre-Wedding Photography | Stylish and modern shoots with iconic city backdrops to reflect your unique love story." },
  { image: "/images/weadingHome5.jpg", label: "Nature", details: "Nature-Inspired Photography | Romantic pre-wedding shoots in lush greenery, mountains, and scenic outdoor landscapes." },
  { label: "Cinematography" , details: "Cinematic Wedding Films | Professionally shot pre-wedding and wedding videos that bring your story to life like a movie." },
  { image: "/images/weadingHome1.jpg", label: "Nature" , details: "Romantic Outdoor Photography | Natural light, greenery, and candid moments for dreamy pre-wedding captures." },
  { image: "/images/weadingHome6.jpg", label: "Nature" ,  details: "Scenic Pre-Wedding Photoshoots | Elegant, emotional portraits surrounded by breathtaking natural beauty."},
  { label: "Pre-Wedding", details: "Stylish Pre-Wedding Shoots | Creative themes, cinematic storytelling, and stunning visuals crafted for your big day."  },
  { image: "/images/weadingHome2.jpg", label: "Space" , details: "Unique Pre-Wedding Concepts | Creative themes and artistic shots that stand out and showcase your personality." },
  { label: "Hire Us", details: "Hire our expert photographers & cinematographers for unforgettable pre-wedding and wedding coverage." },
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
export interface Photo {
  id: number
  src: string
  alt: string
}

export const photos: Photo[] = [
  { id: 1, src: '/images/weadingHome.jpg', alt: 'Nature view' },
  { id: 2, src: '/images/albumcover_lg.png', alt: 'Mountain landscape' },
  { id: 3, src: '/images/landscape1.jpg', alt: 'City skyline' },
  { id: 4, src: '/images/weadingHome3.jpg', alt: 'Ocean waves' },
  { id: 5, src: '/images/landscape2.jpg', alt: 'Forest trail' },
  { id: 13, src: '/images/albumcover_lg.png', alt: 'Morning mist' },
  { id: 6, src: '/images/weadingHome1.jpg', alt: 'Sunset horizon' },
  { id: 7, src: '/images/weadingHome3.jpg', alt: 'Coastal cliffs' },
  { id: 8, src: '/images/weadingHome.jpg', alt: 'Green valley' },
  { id: 9, src: '/images/weadingHome1.jpg', alt: 'Golden fields' },
  { id: 10, src: '/images/landscape2.jpg', alt: 'Snowy mountains' },
  { id: 11, src: '/images/albumcover_lg.png', alt: 'Urban sunset' },
  { id: 12, src: '/images/weadingHome.jpg', alt: 'Morning mist' },
  
]


const samplePhotos = [
  '/images/weadingHome.jpg',
  '/images/weadingHome1.jpg',
  '/images/weadingHome2.jpg',
  '/images/weadingHome3.jpg',
  '/images/weadingHome4.jpg',
  '/images/weadingHome5.jpg',
  '/images/weadingHome6.jpg',
  '/images/weadingHome2.jpg',
  '/images/weadingHome4.jpg',
  '/images/weadingHome5.jpg'
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

import { QuickLink } from "../types/types";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

export const getQuickLinks = (
  pathname: string,
  router: AppRouterInstance,
  scrollToSection: (id: string) => void
): QuickLink[] => [
  {
    label: "Home",
    onClick: () =>
      pathname === "/" ? scrollToSection("home") : router.push("/#home"),
  },
  {
    label: "About",
    onClick: () =>
      pathname === "/" ? scrollToSection("about") : router.push("/#about"),
  },
  {
    label: "Services",
    onClick: () =>
      pathname === "/" ? scrollToSection("services") : router.push("/#services"),
  },
  {
    label: "Portfolio",
    onClick: () => router.push("/portfolio"),
  },
  {
    label: "Testimonials",
    onClick: () =>
      pathname === "/"
        ? scrollToSection("testimonials")
        : router.push("/#testimonials"),
  },
  {
    label: "Contact",
    onClick: () =>
      pathname === "/" ? scrollToSection("contact") : router.push("/#contact"),
  },
]
