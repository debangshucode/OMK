"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Bell, Settings, User, Search } from "lucide-react";

interface AdminHeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({
  searchTerm,
  setSearchTerm,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4"
    >
      <div className="flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center space-x-3 lg:space-x-4">
          <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
            <Camera className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl lg:text-2xl font-bold text-gray-900">
              OMK Admin
            </h1>
            <p className="text-xs lg:text-sm text-gray-500">
              Manage your content and reviews
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-4 lg:mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 lg:w-5 lg:h-5 text-gray-700" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 lg:pl-10 pr-4 py-2 border border-gray-300 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm lg:text-base"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2 lg:space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowNotifications((prev) => !prev)}
            className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <Bell className="w-4 h-4 lg:w-5 lg:h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </motion.button>

          {/* Notification Popup */}
          {showNotifications && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-12 right-0 w-64 bg-white shadow-xl border border-gray-200 rounded-lg p-4 z-50"
            >
              <h4 className="font-semibold mb-2 text-gray-800">
                Notifications
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>📸 New photo uploaded</li>
                <li>💬 You have 3 new messages</li>
                <li>⚙️ Settings updated</li>
              </ul>
            </motion.div>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden sm:block p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <Settings className="w-4 h-4 lg:w-5 lg:h-5" />
          </motion.button>

          <div className="w-7 h-7 lg:w-8 lg:h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
            <User className="w-3 h-3 lg:w-4 lg:h-4 text-white" />
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default AdminHeader;
