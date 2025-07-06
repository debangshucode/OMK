"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Bell, Settings, User, Search, LogOut } from 'lucide-react';

interface ClientHeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  clientName: string;
  onLogout: () => void;
  onSettingsClick: () => void;
}

const ClientHeader: React.FC<ClientHeaderProps> = ({ 
  searchTerm, 
  setSearchTerm, 
  clientName,
  onLogout,
  onSettingsClick
}) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    {
      id: 1,
      title: 'New photos uploaded',
      message: '45 wedding ceremony photos added to your gallery',
      time: '2 hours ago',
      type: 'upload',
      unread: true
    },
    {
      id: 2,
      title: 'Video processing complete',
      message: 'Your wedding highlights video is ready to view',
      time: '1 day ago',
      type: 'process',
      unread: true
    },
    {
      id: 3,
      title: 'Album created',
      message: 'Reception moments album has been created',
      time: '2 days ago',
      type: 'create',
      unread: false
    },
    {
      id: 4,
      title: 'Download ready',
      message: 'High-resolution photos are ready for download',
      time: '3 days ago',
      type: 'download',
      unread: false
    }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4"
    >
      <div className="flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center space-x-3 lg:space-x-4">
          <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
            <Camera className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Client Portal</h1>
            <p className="text-xs lg:text-sm text-gray-500">Welcome back, {clientName}</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-4 lg:mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 lg:w-5 lg:h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search albums, photos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 lg:pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm lg:text-base text-gray-900"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2 lg:space-x-4">
          {/* Notifications */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200 cursor-pointer"
            >
              <Bell className="w-4 h-4 lg:w-5 lg:h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                  {unreadCount}
                </span>
              )}
            </motion.button>

            {/* Notifications Popup */}
            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50"
                >
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900">Notifications</h3>
                      <span className="text-xs text-blue-600 font-medium">{unreadCount} new</span>
                    </div>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((notification) => (
                      <motion.div
                        key={notification.id}
                        whileHover={{ backgroundColor: '#f9fafb' }}
                        className={`p-4 border-b border-gray-100 last:border-b-0 cursor-pointer ${
                          notification.unread ? 'bg-blue-50' : ''
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            notification.unread ? 'bg-blue-500' : 'bg-gray-300'
                          }`} />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-gray-900 truncate">
                              {notification.title}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-gray-200">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
                    >
                      View all notifications
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onSettingsClick}
            className="hidden sm:block p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200 cursor-pointer"
          >
            <Settings className="w-4 h-4 lg:w-5 lg:h-5" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onLogout}
            className="hidden sm:block p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 cursor-pointer"
          >
            <LogOut className="w-4 h-4 lg:w-5 lg:h-5" />
          </motion.button>
          
          <div className="w-7 h-7 lg:w-8 lg:h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center cursor-pointer">
            <User className="w-3 h-3 lg:w-4 lg:h-4 text-white" />
          </div>
        </div>
      </div>

      {/* Click outside to close notifications */}
      {showNotifications && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowNotifications(false)}
        />
      )}
    </motion.header>
  );
};

export default ClientHeader;