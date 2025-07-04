"use client";
import { useState } from "react";
import { UserPlus, LogIn } from "lucide-react";
import LoginModal from "./loginModal"; // adjust path

const HeaderActions = () => {
  const [showModal, setShowModal] = useState(false);

  const handleHireUs = () => {
    console.log("Hire Us clicked");
  };

  return (
    <>
      <div
        className="absolute top-auto bottom-40 md:bottom-50 left-1/2 -translate-x-1/2
        xl:top-6 xl:bottom-auto xl:left-auto xl:right-6 xl:translate-x-0
        flex items-center gap-4 z-[998] w-max xl:w-auto"
      >
        <button
          onClick={handleHireUs}
          className="bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-700 hover:to-amber-600 
              text-white font-semibold px-6 py-2.5 rounded-full
              shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300
              border border-white/20 backdrop-blur-sm flex items-center hover:cursor-pointer"
        >
          <UserPlus size={18} className="mr-2" />
          Hire Us
        </button>

        <button
          onClick={() => setShowModal(true)}
          className="bg-white/10 hover:bg-white/20 text-white border border-white/30 hover:border-white/50
              font-semibold px-6 py-2.5 rounded-full backdrop-blur-sm
              shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center hover:cursor-pointer "
        >
          <LogIn size={18} className="mr-2" />
          Login
        </button>
      </div>

      {showModal && (
        <LoginModal
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            setShowModal(false);
            window.location.href = "/admin/home"; // or any route
          }}
        />
      )}
    </>
  );
};

export default HeaderActions;
