"use client";

import RotatingText from "./rotatingtext";
import { motion } from "framer-motion";

export default function HeroOverlay() {
  return (
    <motion.div
      className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 md:px-8 text-center pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      {/* Subheading / Tagline */}
      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-sm sm:text-base md:text-lg tracking-widest text-white font-medium uppercase mb-4"
      >
        Creating Moments That Matter
      </motion.h2>

      {/* Heading with static + animated rotating text */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-amber-500 via-red-600 to-red-600 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(18,1,18,0.8)] tracking-tight">
          WE CAPTURE 
        </h1>
        <RotatingText
          texts={["Emotions", "Smiles", "Love", "Stories"]}
          splitBy="words"
          mainClassName="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white  drop-shadow-[0_0_10px_rgba(18,0,0,0.8)]"
          splitLevelClassName="gap-x-2"
          elementLevelClassName="inline-block"
          staggerDuration={0.12}
          rotationInterval={2500}
          loop
          auto
        />
      </div>

      {/* Supporting line */}
      <p className="mt-4 text-white text-sm sm:text-lg md:text-xl max-w-xl font-light leading-relaxed">
        Professional Wedding Photography & Cinematography – Told with elegance,
        style & soul.
      </p>

      {/* CTA Button */}
      <motion.button
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="mt-8 px-8 py-3 bg-transparent border-2 border-white text-white text-base sm:text-lg font-semibold rounded-full backdrop-blur-md shadow-md hover:scale-105 transition-transform duration-300 pointer-events-auto hover:border-amber-500  glow-border"
      >
        Book Your Special Day →
      </motion.button>
    </motion.div>
  );
}
