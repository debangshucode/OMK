"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";

const BookingAssistant = () => {
  const [show, setShow] = useState(false);
  const [animationData, setAnimationData] = useState<any>(null);

  // Load Lottie animation from public folder
  useEffect(() => {
    fetch("/lottie/animation.json")
      .then((res) => res.json())
      .then(setAnimationData);
  }, []);

  // Show animation for 6s every 30s
  useEffect(() => {
    const cycle = () => {
      setShow(true);
      setTimeout(() => setShow(false), 6000);
    };

    cycle(); // Initial show
    const interval = setInterval(cycle, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!animationData) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ x: 100, y: 100, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          exit={{ x: 100, y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 12 }}
          className="fixed bottom-6 right-6 z-[9999] flex flex-col items-center"
        >
          {/* Message Bubble */}
          <div className="relative mb-2">
            <div className="bg-white text-red-600 text-center text-sm px-4 py-2 rounded-2xl shadow-md max-w-[200px]">
              Ready to book your shoot?
              <button
                onClick={() => {
                  const contactSection = document.getElementById("contact");
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: "smooth" });
                    setTimeout(() => {
                      window.focusContactNameInput?.();
                    }, 600); 
                  }
                }}
                className="ml-2 text-white bg-red-500 hover:bg-red-600 px-2 py-1 rounded text-xs hover:cursor-pointer"
              >
                Book Now
              </button>
            </div>
            <div className="absolute left-1/2 -bottom-2 w-3 h-3 bg-red-600 rotate-45 transform -translate-x-1/2"></div>
          </div>

          {/* Lottie Character */}
          <div className="w-20 h-20">
            <Lottie animationData={animationData} loop={true} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookingAssistant;
