"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

import ClientHeader from "./ClientHeader";
import ClientSidebar from "./ClientSidebar";
import ClientDashboard from "./ClientDashboard";
import ClientGallery from "./ClientGallery";
import ClientReviews from "./ClientReviews";
import AlbumSearch from "./AlbumSearch";
import FaceSearch from "./FaceSearch";
import ClientProfile from "./ClientProfile";

const validTabs = [
  "dashboard",
  "gallery",
  "albums",
  "videos",
  "downloads",
  "face-search",
  "reviews",
  "profile",
];

const Clients: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentTab = searchParams.get("tab");
  const tab = validTabs.includes(currentTab || "") ? currentTab! : "dashboard";

  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const clientName = "Sarah Johnson";

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleTabChange = (newTab: string) => {
    closeMobileMenu();
    router.push(`?tab=${newTab}`, { scroll: false });
  };

  const handleLogout = () => {
    console.log("Logout clicked");
    // Implement actual logout logic here
  };

  const handleSettingsClick = () => {
    handleTabChange("profile");
  };

  const renderContent = () => {
    switch (tab) {
      case "dashboard":
        return <ClientDashboard setActiveTab={handleTabChange} />;
      case "gallery":
        return <ClientGallery />;
      case "albums":
        return <AlbumSearch />;
      case "videos":
        return <ClientGallery />; // Replace with video component if needed
      case "downloads":
        return <ClientGallery />; // Replace with download component if needed
      case "face-search":
        return <FaceSearch />;
      case "reviews":
        return <ClientReviews />;
      case "profile":
        return <ClientProfile />;
      default:
        return <ClientDashboard setActiveTab={handleTabChange} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex relative">
      {/* Mobile Menu Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleMobileMenu}
        className="lg:hidden fixed top-4 left-4 z-50 w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center border border-gray-200 cursor-pointer"
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
        <ClientSidebar
          activeTab={tab}
          setActiveTab={handleTabChange}
          onLogout={handleLogout}
        />
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
            <ClientSidebar
              activeTab={tab}
              setActiveTab={handleTabChange}
              onLogout={handleLogout}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="lg:pl-0 pl-16">
          <ClientHeader
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            clientName={clientName}
            onLogout={handleLogout}
            onSettingsClick={handleSettingsClick}
          />
        </div>

        {/* Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <motion.div
            key={tab}
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

export default Clients;
