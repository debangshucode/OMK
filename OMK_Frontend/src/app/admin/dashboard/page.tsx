"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Upload, Plus, FolderPlus } from "lucide-react";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import StatsCards from "./StatsCards";
import PhotosSection from "./PhotosSection";
import VideosSection from "./VideosSection";
import AlbumsSection from "./AlbumsSection";
import ReviewsSection from "./ReviewsSection";
import AnalyticsSection from "./AnalyticsSection";
import ClientsSection from "./ClientsSection";
import BlogsSection from "./BlogsSection";
import BookingSection from "./bookingsection";
import { useSearchParams, useRouter } from "next/navigation";

const AdminDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(
    () => searchParams.get("tab") || "overview"
  );

  useEffect(() => {
    const current = searchParams.get("tab") || "overview";

    if (activeTab !== current) {
      setActiveTab(current);
    }
  }, [searchParams]);

  useEffect(() => {
    const current = searchParams.get("tab") || "overview";

    if (current !== activeTab) {
      router.push(`?tab=${activeTab}`);
    }
  }, [activeTab]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    closeMobileMenu(); // Close mobile menu when tab is selected
  };

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6 lg:space-y-8">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                Dashboard Overview
              </h2>
              <p className="text-sm lg:text-base text-gray-600">
                Welcome back! Here's what's happening with your photography
                business.
              </p>
            </div>
            <StatsCards />

            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center space-x-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:cursor-pointer hover:to-red-700 text-white p-4 rounded-lg shadow-lg transition-all duration-300"
                >
                  <Upload className="w-5 h-5" />
                  <span className="font-medium">Upload Photos</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center space-x-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white p-4 rounded-lg shadow-lg transition-all duration-300"
                >
                  <Upload className="w-5 h-5" />
                  <span className="font-medium">Upload Videos</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center space-x-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-4 rounded-lg shadow-lg transition-all duration-300"
                >
                  <FolderPlus className="w-5 h-5" />
                  <span className="font-medium">Create Album</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleTabChange("blogs")}
                  className="flex items-center justify-center space-x-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-4 rounded-lg shadow-lg transition-all duration-300 cursor-pointer"
                >
                  <Plus className="w-5 h-5" />
                  <span className="font-medium">Create Blog</span>
                </motion.button>
              </div>
            </div>

            {/* Navigation Cards - 2 per row on mobile, 4 on desktop */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white p-4 lg:p-6 rounded-xl shadow-lg border border-gray-200 cursor-pointer"
                onClick={() => handleTabChange("photos")}
              >
                <h3 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base">
                  Recent Photos
                </h3>
                <p className="text-xs lg:text-sm text-gray-600 mb-3 lg:mb-4">
                  Manage your latest uploads
                </p>
                <div className="text-red-600 text-xs lg:text-sm font-medium">
                  View all photos →
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white p-4 lg:p-6 rounded-xl shadow-lg border border-gray-200 cursor-pointer"
                onClick={() => handleTabChange("videos")}
              >
                <h3 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base">
                  Video Library
                </h3>
                <p className="text-xs lg:text-sm text-gray-600 mb-3 lg:mb-4">
                  Organize your video content
                </p>
                <div className="text-purple-600 text-xs lg:text-sm font-medium">
                  Manage videos →
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white p-4 lg:p-6 rounded-xl shadow-lg border border-gray-200 cursor-pointer"
                onClick={() => handleTabChange("albums")}
              >
                <h3 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base">
                  Album Collections
                </h3>
                <p className="text-xs lg:text-sm text-gray-600 mb-3 lg:mb-4">
                  Create and manage albums
                </p>
                <div className="text-green-600 text-xs lg:text-sm font-medium">
                  View albums →
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white p-4 lg:p-6 rounded-xl shadow-lg border border-gray-200 cursor-pointer"
                onClick={() => handleTabChange("blogs")}
              >
                <h3 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base">
                  Blog Management
                </h3>
                <p className="text-xs lg:text-sm text-gray-600 mb-3 lg:mb-4">
                  Create and manage blog posts
                </p>
                <div className="text-blue-600 text-xs lg:text-sm font-medium">
                  Manage blogs →
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white p-4 lg:p-6 rounded-xl shadow-lg border border-gray-200 cursor-pointer"
                onClick={() => handleTabChange("reviews")}
              >
                <h3 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base">
                  Client Reviews
                </h3>
                <p className="text-xs lg:text-sm text-gray-600 mb-3 lg:mb-4">
                  Monitor testimonials
                </p>
                <div className="text-amber-600 text-xs lg:text-sm font-medium">
                  Check reviews →
                </div>
              </motion.div>
            </div>
          </div>
        );
      case "photos":
        return <PhotosSection />;
      case "videos":
        return <VideosSection />;
      case "albums":
        return <AlbumsSection />;
      case "reviews":
        return <ReviewsSection />;
      case "analytics":
        return <AnalyticsSection />;
      case "clients":
        return <ClientsSection />;
      case "bookings":
        return <BookingSection />;
      case "blogs":
        return <BlogsSection />;
      case "settings":
        return (
          <div className="bg-white rounded-lg p-6 lg:p-8 shadow-sm border border-gray-200">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4">
              Settings
            </h2>
            <p className="text-sm lg:text-base text-gray-600">
              Settings panel coming soon...
            </p>
          </div>
        );
      default:
        return (
          <div className="bg-white rounded-lg p-6 lg:p-8 shadow-sm border border-gray-200">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4">
              Page Not Found
            </h2>
            <p className="text-sm lg:text-base text-gray-600">
              The requested page could not be found.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex relative">
      {/* Mobile Menu Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleMobileMenu}
        className="lg:hidden fixed top-4 left-4 z-50 w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center border border-gray-200"
      >
        <AnimatePresence mode="wait">
          {isMobileMenuOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6 text-gray-700" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={closeMobileMenu}
          />
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="lg:hidden fixed left-0 top-0 bottom-0 z-50 w-80"
          >
            <AdminSidebar
              activeTab={activeTab}
              setActiveTab={handleTabChange}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="lg:pl-0 pl-16">
          <AdminHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>

        {/* Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
