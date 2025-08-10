"use client";
import React from "react";
import { motion } from "framer-motion";
import MasonryGrid from "./ui/misonary-grid";
const Services = () => {

  return (
    <section className="min-h-screen py-5 xl:py-15 bg-gradient-to-br from-slate-50 to-red-50 px-6">
      <motion.section className="px-6 mb-20" initial="hidden" animate="visible">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div>
            <span className="inline-block px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-medium mb-6">
              Our Services
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-red-700 via-red-600 to-amber-600 bg-clip-text text-transparent">
              Creative
              <br />
              <span className="text-slate-800">Visual Solutions</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              From intimate portraits to grand celebrations, we offer
              comprehensive visual services tailored to capture your unique
              story with creativity and professionalism.
            </p>
          </motion.div>
        </div>
      </motion.section>

     

      <MasonryGrid />
    </section>
  );
};

export default Services;
