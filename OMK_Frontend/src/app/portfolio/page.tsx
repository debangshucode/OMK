"use client";
import React, { useState } from "react";
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
import { portfolioData } from "../../data/index";
import { MediaItem, Album as AlbumType } from "../../types/types";
import FaceSearch from "./FaceSearch";
const Portfolio: React.FC = () => {
  const [mediaGroup, setMediaGroup] = useState<MediaItem[]>([]);

  const [currentView, setCurrentView] = useState<
    "home" | "album" | "category" | "all-albums"
  >("home");
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Get all photos and videos
  const allPhotos = Object.values(portfolioData.categories)
    .flat()
    .filter((item) => item.type === "photo");
  const allVideos = Object.values(portfolioData.categories)
    .flat()
    .filter((item) => item.type === "video");

  const handleMediaClick = (media: MediaItem, group: MediaItem[]) => {
    setSelectedMedia(media);
    setMediaGroup(group);
  };

  const handleAlbumClick = (album: AlbumType) => {
    setSelectedAlbum(album.id);
    setCurrentView("album");
  };
  const [showFaceSearch, setShowFaceSearch] = useState(false);
  const handleViewMore = (section: string) => {
    if (section === "albums") {
      setCurrentView("all-albums");
    } else if (section === "photos") {
      setSelectedCategory("photos");
      setCurrentView("category");
    } else if (section === "videos") {
      setSelectedCategory("videos");
      setCurrentView("category");
    } else {
      setSelectedCategory(section);
      setCurrentView("category");
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
            allMedia={Object.values(portfolioData.categories).flat()}
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
            allMedia={Object.values(portfolioData.categories).flat()}
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
    const categoryData =
      portfolioData.categories[
        selectedCategory as keyof typeof portfolioData.categories
      ];
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
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-amber-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-red-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-red-800 mb-2">
              Eternal Moments
            </h1>
            <p className="text-gray-600 text-lg">
              Capturing love, joy, and precious memories
            </p>
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
                ? "bg-red-50 border-red-200 text-red-600"
                : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            <Scan className="w-5 h-5" />
            <span className="inline">Face Search</span>
          </motion.button>
        </div>
      </div>

      {/* Portfolio Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
