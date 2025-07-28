"use client";
import { useContext, useState, useRef, useEffect } from "react";
import { UserPlus, LogIn, LogOut, User, Settings, BarChart3, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation"
import LoginModal from "./loginModal"; // adjust path
import { useAuth } from "@/context/AuthContext";
import { CgSpinnerAlt } from "react-icons/cg";

const HeaderActions = () => {
  
  const pathname = usePathname()
  const [showModal, setShowModal] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, isAuthenticated, logout, loading } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

   if (pathname.startsWith("/admin") || pathname.startsWith("/clients")) {
    return null
  }
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Get user initials for avatar fallback
  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map(word => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleDropdownItemClick = (action: () => void) => {
    action();
    setIsDropdownOpen(false);
  };

  const dropdownItems = [
    // {
    //   icon: <User size={16} />,
    //   label: "Profile",
    //   onClick: () => {
    //     // Navigate to profile page
    //     window.location.href = "/profile";
    //   },
    // },
    {
      icon: <BarChart3 size={16} />,
      label: "Dashboard",
      onClick: () => {
        if(user?.role === "admin") {
          window.location.href = "/admin/dashboard";
        }else{
        window.location.href = "/client/dashboard";
        }
      },
    },
    // {
    //   icon: <Settings size={16} />,
    //   label: "Settings",
    //   onClick: () => {
    //     // Navigate to settings
    //     window.location.href = "/settings";
    //   },
    // },
    {
      icon: <LogOut size={16} />,
      label: "Logout",
      onClick: logout,
      danger: true,
    },
  ];

  return (
    <>
      <div
        className="absolute top-auto bottom-25 md:bottom-50 left-1/2 -translate-x-1/2
        xl:top-6 xl:bottom-auto xl:left-auto xl:right-6 xl:translate-x-0
        flex items-center gap-4 z-[998] w-max xl:w-auto"
      >
        {loading ? (
          <button
            disabled
            className="bg-white/10 text-white border border-white/30
                font-semibold px-6 py-2.5 rounded-full backdrop-blur-sm
                shadow-lg flex items-center cursor-not-allowed opacity-60"
          >
            <CgSpinnerAlt size={18} className="mr-2 animate-spin" />
            Loading...
          </button>
        ) : isAuthenticated ? (
          <div className="relative" ref={dropdownRef}>
            {/* User Button */}
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/30 hover:border-white/50
                  font-semibold px-4 py-2.5 rounded-full backdrop-blur-sm
                  shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 
                  flex items-center gap-3 min-w-[140px] justify-between"
            >
              <div className="flex items-center gap-2">
                {/* User Avatar */}
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold shadow-lg">
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name || "User"}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    getUserInitials(user?.name || "User")
                  )}
                </div>
                
                {/* User Name */}
                <span className="text-sm font-medium truncate max-w-[80px]">
                  {user?.name || "User"}
                </span>
              </div>

              {/* Dropdown Arrow */}
              <ChevronDown 
                size={16} 
                className={`transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-56 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/50 overflow-hidden z-[999]">
                {/* User Info Header */}
                <div className="px-4 py-3 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg">
                      {user?.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name || "User"}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        getUserInitials(user?.name || "User")
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                        {user?.name || "User"}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {user?.email || "user@example.com"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Dropdown Items */}
                <div className="py-2">
                  {dropdownItems.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handleDropdownItemClick(item.onClick)}
                      className={`w-full text-left px-4 py-3 text-sm font-medium transition-all duration-200 flex items-center gap-3 ${
                        item.danger
                          ? "text-red-600 hover:text-red-700 hover:bg-red-50/80 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20"
                          : "text-gray-700 hover:text-gray-900 hover:bg-gray-100/80 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800/50"
                      }`}
                    >
                      <div className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 ${
                        item.danger
                          ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                          : "bg-gray-100 dark:bg-gray-700/50 text-gray-600 dark:text-gray-400"
                      }`}>
                        {item.icon}
                      </div>
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => setShowModal(true)}
            className="bg-white/10 hover:bg-white/20 text-white border border-white/30 hover:border-white/50
                font-semibold px-6 py-2.5 rounded-full backdrop-blur-sm
                shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center hover:cursor-pointer"
          >
            <LogIn size={18} className="mr-2" />
            Login
          </button>
        )}
      </div>

      {showModal && (
        <LoginModal
          onClose={() => setShowModal(false)}
          onSuccess={(user) => {
            setShowModal(false);
            // Handle successful login/signup
          }}
        />
      )}
    </>
  );
};

export default HeaderActions;