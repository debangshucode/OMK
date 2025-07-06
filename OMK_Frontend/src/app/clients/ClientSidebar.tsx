import React from "react";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Camera,
  Video,
  FolderOpen,
  Star,
  Download,
  Search,
  User,
  LogOut,
  Scan,
} from "lucide-react";

interface ClientSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

const ClientSidebar: React.FC<ClientSidebarProps> = ({
  activeTab,
  setActiveTab,
  onLogout,
}) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "gallery", label: "Gallery", icon: Camera },
    { id: "albums", label: "Albums", icon: FolderOpen },
    { id: "videos", label: "Videos", icon: Video },
    { id: "downloads", label: "Downloads", icon: Download },
    { id: "face-search", label: "Face Search", icon: Scan },
    { id: "reviews", label: "Reviews", icon: Star },
    { id: "profile", label: "Profile", icon: User },
  ];
  const router = useRouter();
  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-64 lg:w-64 bg-white border-r border-gray-200 h-full flex flex-col shadow-lg lg:shadow-none"
    >
      {/* Logo Section - Mobile */}
      <div className="lg:hidden p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
            <Camera className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">Client Portal</h1>
            <p className="text-xs text-gray-500">Your Gallery</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-3 lg:px-4 py-4 lg:py-6 space-y-1 lg:space-y-2 overflow-y-auto">
        {menuItems.map((item, index) => (
          <motion.button
            key={item.id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center space-x-3 px-3 lg:px-4 py-2.5 lg:py-3 rounded-lg text-left transition-all duration-200 text-sm lg:text-base cursor-pointer ${
              activeTab === item.id
                ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600 shadow-sm"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <item.icon className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0" />
            <span className="font-medium truncate">{item.label}</span>
          </motion.button>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="fixed bottom-4 left-0 w-64 px-3 lg:px-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => router.push("/")}
          className="w-full flex items-center space-x-3 px-3 lg:px-4 py-2.5 lg:py-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 text-sm lg:text-base"
        >
          <LogOut className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0" />
          <span className="font-medium ">Logout</span>
        </motion.button>
      </div>
    </motion.aside>
  );
};

export default ClientSidebar;
