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
  const { user, authenticated, logout, loading } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

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

   if (pathname.startsWith("/admin") || pathname.startsWith("/client") || pathname.startsWith("/portfolio") || pathname.startsWith("/blog")) {
    return null
  }

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

  // Enhanced logout handler
  const handleLogout = async () => {
    try {
      setIsDropdownOpen(false);
      await logout();
      // Force a small delay to ensure state updates
      setTimeout(() => {
        // Optional: You can add any additional cleanup here
      }, 100);
    } catch (error) {
      console.error("Logout error:", error);
    }
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
        } else {
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
      onClick: handleLogout,
      danger: true,
    },
  ];

  // Enhanced login success handler
  const handleLoginSuccess = (userData: any) => {
    setShowModal(false);
    // Force close any open dropdowns
    setIsDropdownOpen(false);
    // Optional: Add any additional success handling
  };

  return (
    <>
      {/* FIXED: Single container with proper responsive positioning */}
      <div className=" z-[998] flex items-center justify-center">
        {/* Mobile positioning: bottom center */}
        <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 xl:hidden">
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
          ) : authenticated && user ? (
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
                <div className="absolute bottom-full mb-2 right-0 w-56 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/50 overflow-hidden z-[999]">
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
                          {user?.name || ""}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {user?.email || ""}
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

        {/* Desktop positioning: top right */}
        <div className="hidden xl:block fixed top-6 right-6">
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
          ) : authenticated && user ? (
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
                          {user?.name || ""}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {user?.email || ""}
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
      </div>

      {showModal && (
        <LoginModal
          onClose={() => setShowModal(false)}
          onSuccess={handleLoginSuccess}
        />
      )}
    </>
  );
};

export default HeaderActions;