"use client";


import { motion } from "framer-motion";
import { Camera,LogOut } from "lucide-react";
import { useRouter } from "next/navigation"; 
interface AdminHeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({
 
}) => {
    const router = useRouter();
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

        {/* Actions */}
        <div className="flex items-center space-x-2 lg:space-x-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push("/")}
            className="w-full flex items-center space-x-3 px-3 lg:px-4 py-2.5 lg:py-3 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 text-sm lg:text-base"
          >
            <LogOut className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0" />
            <span className="font-medium ">Logout</span>
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};

export default AdminHeader;
