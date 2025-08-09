"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Phone, Camera, Video, Heart, Film } from "lucide-react";
import { BentoGridThirdDemo } from "./ui/ServiceGrid";
import MasonryGrid from "./ui/misonary-grid";
const Services = () => {
  const [activeService, setActiveService] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const imageSectionRef = useRef<HTMLDivElement>(null);

  const services = [
    {
      id: 0,
      icon: Camera,
      title: "Photography",
      subtitle: "Capturing Timeless Moments",
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50",
      textColor: "#dc2626",
      subServices: [
        {
          name: "Wedding Photography",
          images: [
            "/images/weadingHome1.jpg",
            "/images/weadingHome2.jpg",
            "/images/weadingHome.jpg",
            "/images/weadingHome3.jpg",
          ],
        },
        {
          name: "Baby Photography",
          images: [
            "/images/weadingHome1.jpg",
            "/images/weadingHome2.jpg",
            "/images/weadingHome.jpg",
            "/images/weadingHome3.jpg",
          ],
        },
      ],
    },
    {
      id: 1,
      icon: Video,
      title: "Videography",
      subtitle: "Dynamic Visual Storytelling",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "#2563EB",
      subServices: [
        {
          name: "Event Videography",
          images: [
            "/images/weadingHome1.jpg",
            "/images/weadingHome2.jpg",
            "/images/weadingHome.jpg",
            "/images/weadingHome3.jpg",
          ],
        },
        {
          name: "Cinematic Wedding Film",
          images: [
            "/images/weadingHome1.jpg",
            "/images/weadingHome2.jpg",
            "/images/weadingHome.jpg",
            "/images/weadingHome3.jpg",
          ],
        },
      ],
    },
    {
      id: 2,
      icon: Heart,
      title: "Pre-Wedding",
      subtitle: "Romance in Every Frame",
      color: "from-pink-500 to-pink-600",
      bgColor: "bg-pink-50",
      textColor: "#DB2777",
      subServices: [
        {
          name: "Couple Shoot",
          images: [
            "/images/weadingHome4.jpg",
            "/images/weadingHome5.jpg",
            "/images/weadingHome6.jpg",
            "/images/weadingHome3.jpg",
          ],
        },
      ],
    },
    {
      id: 3,
      icon: Film,
      title: "Cinematography",
      subtitle: "Cinematic Excellence",
      color: "from-slate-500 to-slate-600",
      bgColor: "bg-slate-50",
      textColor: "#475569",
      subServices: [
        {
          name: "Music Videos",
          images: [
            "/images/albumcover_lg.png",
            "/images/weadingHome2.jpg",
            "/images/weadingHome.jpg",
            "/images/weadingHome3.jpg",
          ],
        },
      ],
    },
  ];

  const active = services[activeService];

  useEffect(() => {
    const scroll = () => {
      if (!carouselRef.current) return;
      const container = carouselRef.current;
      const scrollAmount = container.clientWidth;

      container.scrollBy({ left: scrollAmount, behavior: "smooth" });

      const maxScroll = container.scrollWidth - container.clientWidth;
      if (container.scrollLeft + scrollAmount >= maxScroll) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      }
    };

    const interval = setInterval(scroll, 3000);
    return () => clearInterval(interval);
  }, [activeService]);
  const [currentSubIndex, setCurrentSubIndex] = useState(0);

  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const itemWidth = container.clientWidth;

      const index = Math.round(scrollLeft / itemWidth);

      // Determine which sub-service this image belongs to
      let count = 0;
      for (let i = 0; i < active.subServices.length; i++) {
        count += active.subServices[i].images.length;
        if (index < count) {
          setCurrentSubIndex(i);
          break;
        }
      }
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [activeService]);

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
