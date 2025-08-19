"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  Video,
  Heart,
  Users,
  Building,
  Scan,
  Baby,
  Image as ImageIcon,
  Album,
} from "lucide-react";
import CategorySection from "./CategorySection";
import FullScreenViewer from "./FullScreenViewer";
import AlbumView from "./AlbumView";
import CategoryView from "./CategoryView";
import AllAlbumsView from "./AllAlbumsView";
// import { portfolioData } from "../../data/index"; // Replaced with API data
import { usePortfolioData } from "../../hooks/usePortfolio";
import { LoadingSection, ErrorState, FullPageLoading } from "../../components/ui/LoadingStates";
import { MediaItem, Album as AlbumType } from "../../types/types";
import FaceSearch from "./FaceSearch";
import { useSearchParams, useRouter } from "next/navigation";
const Portfolio: React.FC = () => {
  const [mediaGroup, setMediaGroup] = useState<MediaItem[]>([]);
  const [currentView, setCurrentView] = useState<
    "home" | "album" | "category" | "all-albums"
  >("home");
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showFaceSearch, setShowFaceSearch] = useState(false);
  
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Use API data instead of static data
  const { loading, error, data: portfolioData, refetch } = usePortfolioData();

  useEffect(() => {
    const view = searchParams.get("view");
    const albumId = searchParams.get("album");
    const categoryId = searchParams.get("category");

    if (view === "album" && albumId) {
      setSelectedAlbum(albumId);
      setCurrentView("album");
    } else if (view === "category" && categoryId) {
      setSelectedCategory(categoryId);
      setCurrentView("category");
    } else if (view === "all-albums") {
      setCurrentView("all-albums");
    } else {
      setCurrentView("home");
      setSelectedAlbum(null);
      setSelectedCategory(null);
    }
  }, [searchParams]);

  // Show loading state while data is being fetched
  if (loading) {
    return <FullPageLoading />;
  }

  // Show error state if data fetching failed
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-red-50">
        <ErrorState 
          message={error}
          onRetry={refetch}
          className="min-h-screen"
        />
      </div>
    );
  }

  // Get all photos and videos from API data
  const allPhotos = portfolioData.photos;
  const allVideos = portfolioData.videos;

  const handleMediaClick = (media: MediaItem, group: MediaItem[]) => {
    setSelectedMedia(media);
    setMediaGroup(group);
  };

  const handleAlbumClick = (album: AlbumType) => {
    router.push(`?view=album&album=${album.id}`);
    setCurrentView("album");
  };
  const handleViewMore = (section: string) => {
    if (section === "albums") {
       router.push(`?view=all-albums`);
    } else if (section === "photos") {
      setSelectedCategory("photos");
      router.push(`?view=category&category=${section}`);
    } else if (section === "videos") {
      setSelectedCategory("videos");
      router.push(`?view=category&category=${section}`);
    } else {
      setSelectedCategory(section);
      router.push(`?view=category&category=${section}`);
    }
  };

  const handleBackToHome = () => {
    setCurrentView("home");
    setSelectedAlbum(null);
    setSelectedCategory(null);
  };

  if (currentView === "all-albums") {
    return (
      <>
        <AllAlbumsView
          albums={portfolioData.albums}
          onBack={handleBackToHome}
          onAlbumClick={handleAlbumClick}
          onMediaClick={handleMediaClick}
        />
        {selectedMedia && (
          <FullScreenViewer
            media={selectedMedia}
            allMedia={mediaGroup}
            onClose={() => setSelectedMedia(null)}
          />
        )}
      </>
    );
  }

  if (currentView === "album" && selectedAlbum) {
    return (
      <>
        <AlbumView
          album={portfolioData.albums.find((a) => a.id === selectedAlbum)!}
          onBack={handleBackToHome}
          onMediaClick={handleMediaClick}
        />
        {selectedMedia && (
          <FullScreenViewer
            media={selectedMedia}
            allMedia={mediaGroup}
            onClose={() => setSelectedMedia(null)}
          />
        )}
      </>
    );
  }

  if (currentView === "category" && selectedCategory === "photos") {
    return (
      <>
        <CategoryView
          category={{
            id: "photos",
            name: "Photos",
            icon: ImageIcon,
            color: "bg-gradient-to-r from-red-700 via-red-600 to-amber-600",
          }}
          items={allPhotos}
          onBack={handleBackToHome}
          onMediaClick={handleMediaClick}
          onAlbumClick={handleAlbumClick}
        />
        {selectedMedia && (
          <FullScreenViewer
            media={selectedMedia}
            allMedia={mediaGroup}
            onClose={() => setSelectedMedia(null)}
          />
        )}
      </>
    );
  }

  if (currentView === "category" && selectedCategory === "videos") {
    return (
      <>
        <CategoryView
          category={{
            id: "videos",
            name: "Videos",
            icon: Video,
            color: "bg-gradient-to-r from-red-700 via-red-600 to-amber-600",
          }}
          items={allVideos}
          onBack={handleBackToHome}
          onMediaClick={handleMediaClick}
          onAlbumClick={handleAlbumClick}
        />
        {selectedMedia && (
          <FullScreenViewer
            media={selectedMedia}
            allMedia={mediaGroup}
            onClose={() => setSelectedMedia(null)}
          />
        )}
      </>
    );
  }

  if (currentView === "category" && selectedCategory) {
    const categoryData = portfolioData.categories[
      selectedCategory as keyof typeof portfolioData.categories
    ] || [];
    
    const categoryIcons = {
      wedding: Heart,
      prewedding: Users,
      corporate: Building,
      family: Users,
      baby: Baby,
    };

    return (
      <>
        <CategoryView
          category={{
            id: selectedCategory,
            name:
              selectedCategory.charAt(0).toUpperCase() +
              selectedCategory.slice(1),
            icon:
              categoryIcons[selectedCategory as keyof typeof categoryIcons] ||
              ImageIcon,
            color: "bg-gradient-to-r from-red-700 via-red-600 to-amber-600",
          }}
          items={categoryData}
          onBack={handleBackToHome}
          onMediaClick={handleMediaClick}
          onAlbumClick={handleAlbumClick}
        />
        {selectedMedia && (
          <FullScreenViewer
            media={selectedMedia}
            allMedia={mediaGroup}
            onClose={() => setSelectedMedia(null)}
          />
        )}
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-red-50">
      {/* Header with Background and Centered Text */}
      <div className="relative h-[60vh] w-full bg-gray-100 to-black flex items-center justify-center px-4">
        <div className="absolute inset-0 flex items-center justify-center text-center px-4 ">
          <h1 className="text-7xl font-bold bg-gradient-to-br from-amber-900 via-amber-700 to-amber-600 bg-clip-text text-transparent">
            Portfolio
          </h1>

          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-white text-lg font-semibold xl:bottom-10">
            <h1 className="text-2xl font-bold bg-gradient-to-br from-amber-900 via-amber-700 to-amber-600 bg-clip-text text-transparent">
              Explore Our Stunning Collection of Memories
            </h1>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6 mb-6">
        {/* Controls */}
        <div className="flex items-center justify-center my-5 w-full">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFaceSearch(!showFaceSearch)}
            className={`flex items-center space-x-2 px-4 py-3 rounded-xl border transition-all duration-300 ${
              showFaceSearch
                ? "bg-red-50 border-red-200 text-red-600 hover:cursor-pointer"
                : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:cursor-pointer"
            }`}
          >
            <Scan className="w-5 h-5" />
            <span className="inline ">Face Search</span>
          </motion.button>
        </div>
      </div>

      {/* Portfolio Content */}
      <div className="max-w-7xl my-2 mx-auto px-4 sm:px-6 lg:px-2 py-8">
        <AnimatePresence>
          {showFaceSearch && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-8"
            >
              <FaceSearch />
            </motion.div>
          )}
        </AnimatePresence>
        {/* Albums Section */}
        <CategorySection
          title="Albums"
          items={portfolioData.albums}
          onItemClick={handleAlbumClick}
          onViewMore={() => handleViewMore("albums")}
          icon={Album}
        />

        {/* Photos Section */}
        <CategorySection
          title="Photos"
          items={allPhotos}
          onItemClick={(media) => handleMediaClick(media, allPhotos)}
          onViewMore={() => handleViewMore("photos")}
          icon={ImageIcon}
        />

        {/* Videos Section */}
        <CategorySection
          title="Videos"
          items={allVideos}
          onItemClick={(media) => handleMediaClick(media, allVideos)}
          onViewMore={() => handleViewMore("videos")}
          icon={Video}
        />

        {/* Wedding Section */}
        <CategorySection
          title="Wedding"
          items={portfolioData.categories.wedding}
          onItemClick={(media) =>
            handleMediaClick(media, portfolioData.categories.wedding)
          }
          onViewMore={() => handleViewMore("wedding")}
          icon={Heart}
        />

        {/* Pre-Wedding Section */}
        <CategorySection
          title="Pre-Wedding"
          items={portfolioData.categories.prewedding}
          onItemClick={(media) =>
            handleMediaClick(media, portfolioData.categories.prewedding)
          }
          onViewMore={() => handleViewMore("prewedding")}
          icon={Users}
        />

        {/* Corporate Section */}
        <CategorySection
          title="Corporate"
          items={portfolioData.categories.corporate}
          onItemClick={(media) =>
            handleMediaClick(media, portfolioData.categories.corporate)
          }
          onViewMore={() => handleViewMore("corporate")}
          icon={Building}
        />

        {/* Family Section */}
        <CategorySection
          title="Family"
          items={portfolioData.categories.family}
          onItemClick={(media) =>
            handleMediaClick(media, portfolioData.categories.family)
          }
          onViewMore={() => handleViewMore("family")}
          icon={Users}
        />

        {/* Baby Section */}
        <CategorySection
          title="Baby"
          items={portfolioData.categories.baby}
          onItemClick={(media) =>
            handleMediaClick(media, portfolioData.categories.baby)
          }
          onViewMore={() => handleViewMore("baby")}
          icon={Baby}
        />
      </div>

      {/* Full Screen Viewer */}
      {selectedMedia && (
        <FullScreenViewer
          media={selectedMedia}
          allMedia={mediaGroup}
          onClose={() => setSelectedMedia(null)}
        />
      )}
    </div>
  );
};

export default Portfolio;
