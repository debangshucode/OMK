"use client";
import CountUp from "react-countup";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Easing } from "framer-motion";
import { Award, Users, Clock, Sparkles } from "lucide-react";

const AboutUs = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    "/images/weadingHome.jpg",
    "/images/weadingHome1.jpg",
    "/images/weadingHome2.jpg",
    "/images/weadingHome3.jpg",
    "/images/weadingHome4.jpg",
    "/images/weadingHome5.jpg",
  ];
  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const easeBezier: Easing = [0.25, 0.1, 0.25, 1];
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: easeBezier
      },
    },
  };

  const slideVariants = {
    enter: { x: 300, opacity: 0 },
    center: { x: 0, opacity: 1, zIndex: 1 },
    exit: { x: -300, opacity: 0, zIndex: 0 },
  };

  const stats = [
    { icon: Award, value: 500, label: "Projects Completed", suffix: "+" },
    { icon: Users, value: 300, label: "Happy Clients", suffix: "+" },
    { icon: Clock, value: 5, label: "Years Experience", suffix: "+" },
    { icon: Sparkles, value: 50, label: "Awards Won", suffix: "+" },
  ];

  const services = [
    {
      name: "Photography",
      color: "red-600",
      bg: "bg-red-600/20",
      border: "border-red-600",
      text: "text-red-600",
      dot: "bg-red-600",
    },
    {
      name: "Videography",
      color: "red-600",
      bg: "bg-red-600/20",
      border: "border-red-600",
      text: "text-red-600",
      dot: "bg-red-600",
    },
    {
      name: "Pre-Wedding",
      color: "amber-500",
      bg: "bg-amber-500/20",
      border: "border-amber-500",
      text: "text-amber-500",
      dot: "bg-amber-500",
    },
    {
      name: "Cinematography",
      color: "amber-500",
      bg: "bg-amber-500/20",
      border: "border-amber-500",
      text: "text-amber-500",
      dot: "bg-amber-500",
    },
  ];

  return (
    <div id="about" className="min-h-screen bg-gradient-to-br from-white to-red-50">
      {/* Hero Section */}
      <motion.section
        id="about"
        className="relative py-24 px-6 overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-red-100/10 to-red-200/5"></div>
        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div variants={itemVariants} className="space-y-8 z-10">
            <span className="inline-block px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-medium">
              About Our Studio
            </span>

            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-red-700 via-red-600 to-amber-500 bg-clip-text text-transparent">
              Capturing Life’s
              <br />
              <span className="text-slate-800">Beautiful Moments</span>
            </h1>

            <div className="space-y-6 text-slate-700 text-lg">
              <p>
                We are a passionate team of visual storytellers dedicated to
                preserving your most cherished memories.
              </p>
              <p>
                Specializing in photography, videography, pre-wedding shoots,
                and cinematography, we bring fresh vision and creative
                excellence to every project.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4">
                {services.map((service, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3 px-4 py-2 rounded-full backdrop-blur-md ${service.bg} ${service.border} ${service.text} shadow-[0_4px_30px_rgba(18,1,18,0.1)] transition-transform duration-300 hover:scale-105`}
                  >
                    <div className={`w-3 h-3 rounded-full ${service.dot}`} />
                    <span className="font-semibold xl:text-md text-sm">{service.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Image Mockup */}
          <motion.div variants={itemVariants} className="relative z-10">
            <div className="relative z-50 w-80 h-[600px] bg-black rounded-[3rem] p-2 shadow-2xl mx-auto">
              <div className="w-full h-full bg-white rounded-[2.5rem] relative overflow-hidden">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-10"></div>

                <AnimatePresence mode="sync">
                  <motion.img
                    key={currentImageIndex}
                    src={images[currentImageIndex]}
                    alt="Photography Showcase"
                    className="absolute inset-0 w-full h-full object-cover rounded-[2.5rem]"
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 },
                    }}
                  />
                </AnimatePresence>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />

                {/* Dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                  {images.map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        i === currentImageIndex
                          ? "bg-white scale-125"
                          : "bg-white/50"
                      } transition-all`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Icons */}
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg"
            >
              <span className="text-white text-2xl">📸</span>
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute -bottom-4 -right-4 w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg"
            >
              <span className="text-white text-lg">🎥</span>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        className="py-20 px-6 bg-gradient-to-r from-red-600 to-red-700"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Our <span className="text-amber-300">Journey</span>
            </h2>
            <p className="text-red-100 text-lg">
              Numbers that reflect our commitment to excellence and client
              satisfaction.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white/20 transition-colors duration-300">
                  <stat.icon className="w-8 h-8 text-amber-300" />
                </div>
                
                  <CountUp
                    end={stat.value}
                    duration={2.5}
                    enableScrollSpy
                    scrollSpyOnce
                    suffix={stat.suffix}
                    className="text-3xl md:text-4xl font-bold text-white mb-2"
                  />
                
                <div className="text-red-100 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default AboutUs;
