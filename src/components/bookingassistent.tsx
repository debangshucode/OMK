"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";

const BookingAssistant = () => {
  const [show, setShow] = useState(false);
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    // Load animation data from /public
    fetch("/lottie/animation.json")
      .then((res) => res.json())
      .then(setAnimationData);
  }, []);

  useEffect(() => {
    const cycle = () => {
      setShow(true);
      setTimeout(() => setShow(false), 10000); // Show for 6 seconds
    };

    const interval = setInterval(cycle, 20000); // Repeat every 30s
    cycle(); // Show once initially

    return () => clearInterval(interval);
  }, []);

  if (!animationData) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ x: 200, y: 100, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          exit={{ x: 200, y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 12 }}
          className="fixed bottom-6 right-4 z-[9999] flex items-center space-x-3 bg-white/90 shadow-xl rounded-2xl px-4 py-3 backdrop-blur-sm border border-red-100"
        >
          <div className="w-16 h-16">
            <Lottie animationData={animationData} loop autoplay />
          </div>

          <div className="text-sm font-semibold text-red-700">
            Ready to book your shoot?
            <button
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="ml-2 text-white bg-red-500 hover:bg-red-600 px-2 py-1 rounded text-xs"
            >
              Book Now
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookingAssistant;
