"use client";
import React, { useState } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
} from "lucide-react";
import { MediaItem } from "../../types/types";

interface FullScreenViewerProps {
  media: MediaItem;
  allMedia: MediaItem[];
  onClose: () => void;
}

const FullScreenViewer: React.FC<FullScreenViewerProps> = ({
  media,
  allMedia,
  onClose,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentMedia, setCurrentMedia] = useState(media);

  React.useEffect(() => {
    const index = allMedia.findIndex((item) => item.id === media.id);
    setCurrentIndex(index);
    setCurrentMedia(media);
  }, [media, allMedia]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      setCurrentMedia(allMedia[newIndex]);
    }
  };

  const handleNext = () => {
    if (currentIndex < allMedia.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      setCurrentMedia(allMedia[newIndex]);
    }
  };

  React.useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrevious();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentIndex, allMedia.length]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Media Container */}
      <div className="relative w-full h-full flex items-center justify-center mx-4">
        {currentMedia.type === "video" ? (
          <div className="relative">
            <iframe
              src={
                currentMedia.url + "?autoplay=1&mute=" + (isMuted ? "1" : "0")
              }
              title={currentMedia.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-[90vw] h-[70vh] rounded-lg shadow-2xl"
            />

            {/* Custom Video Controls */}

          </div>
        ) : (
          <img
            src={currentMedia.url}
            alt={currentMedia.title}
            className="max-w-[95vw] max-h-[85vh] rounded-lg shadow-2xl object-contain"
          />
        )}

        {/* Media Info */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black to-transparent p-6 rounded-b-lg">
          <h2 className="text-2xl font-bold text-white mb-2">
            {currentMedia.title}
          </h2>
          <p className="text-gray-300 mb-2">{currentMedia.description}</p>
          <div className="flex items-center justify-between text-sm text-gray-400">
            <span>{new Date(currentMedia.date).toLocaleDateString()}</span>
            <div className="flex items-center space-x-4">
              <span className="capitalize">{currentMedia.category}</span>
              <span>
                {currentIndex + 1} of {allMedia.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrevious}
        disabled={currentIndex === 0}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={handleNext}
        disabled={currentIndex === allMedia.length - 1}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export default FullScreenViewer;
