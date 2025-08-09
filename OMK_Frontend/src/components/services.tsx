"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Phone, Camera, Video, Heart, Film } from "lucide-react";
import { BentoGridThirdDemo } from "./ui/ServiceGrid";
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

      <motion.section
        className="px-3 xl:px-6  mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Side - Service List */}
            <motion.div className="space-y-4 ">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  className={`p-6 rounded-2xl cursor-pointer transition-all duration-500 ${
                    activeService === index
                      ? `${service.bgColor} shadow-lg scale-105`
                      : "bg-white hover:bg-gray-50 shadow-md hover:shadow-lg"
                  }`}
                  onClick={() => {
                    setActiveService(index);
                    setTimeout(() => {
                      imageSectionRef.current?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }, 100); // allow state update to finish
                  }}
                  whileHover={{ x: 10 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-16 h-16 rounded-xl flex items-center justify-center bg-gradient-to-br ${service.color} shadow-lg`}
                    >
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3
                        className="text-xl font-bold"
  style={{ color: service.textColor }} 
                      >
                        {service.title}
                      </h3>
                      <p className="text-slate-600 text-sm">
                        {service.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Sub-services for active service */}

                  {activeService === index && (
                    <motion.ul
                      className="mt-4 space-y-3 pl-4 border-l-2 border-gray-200"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {service.subServices.map((sub, idx) => {
                        const isActiveSub = currentSubIndex === idx; // from state

                        return (
                          <li
                            key={idx}
                            className="flex items-center space-x-3 cursor-pointer"
                            onClick={() => {
                              // Scroll carousel to this sub-service's first image
                              const imageIndex = service.subServices
                                .slice(0, idx)
                                .reduce((acc, s) => acc + s.images.length, 0);

                              const scrollPos =
                                imageIndex *
                                (carouselRef.current?.clientWidth || 0);
                              carouselRef.current?.scrollTo({
                                left: scrollPos,
                                behavior: "smooth",
                              });
                            }}
                          >
                            {/* Animated Circle Icon */}
                            <motion.div
                              style={{
                                width: "1rem",
                                height: "1rem",
                                borderRadius: "9999px",
                                border: `2px solid ${service.textColor}`, // dynamic border color
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                              animate={{
                                scale: isActiveSub ? [1, 1.3, 1] : 1,
                                backgroundColor: isActiveSub
                                  ? `${service.textColor}CC` // same color with opacity (CC ~ 80%)
                                  : "transparent",
                                boxShadow: isActiveSub
                                  ? `0 0 10px 4px ${service.textColor}`
                                  : "none",
                              }}
                              transition={{
                                duration: 2,
                                repeat: isActiveSub ? Infinity : 0,
                              }}
                            />

                            <span className="text-slate-700 font-medium">
                              {sub.name}
                            </span>
                          </li>
                        );
                      })}
                    </motion.ul>
                  )}
                </motion.div>
              ))}
            </motion.div>

            {/* Right Side - Active Details */}
            <div
              className="relative overflow-hidden rounded-2xl shadow-xl border border-gray-200 p-5 h-full"
              ref={imageSectionRef}
            >
              <div
                className="flex overflow-x-auto hide-scrollbar scroll-smooth snap-x snap-mandatory h-full"
                ref={carouselRef}
              >
                {services[activeService].subServices.flatMap((sub, idx) =>
                  sub.images.map((img, i) => (
                    <div
                      key={`${idx}-${i}`}
                      className="min-w-full snap-start flex flex-col items-center"
                    >
                      <img
                        src={img}
                        alt={sub.name}
                        className="w-full h-[500px] object-cover"
                      />
                      <p className="mt-2 text-center text-xl font-semibold text-slate-700">
                        {sub.name}
                      </p>
                    </div>
                  ))
                )}
              </div>
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ zIndex: 99 }}
                className="absolute z-50 top-4 left-4 w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg"
              >
                <a href="tel:+916291176902" title="Call Now">
                  <Phone className="w-5 h-5" />
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>
      <BentoGridThirdDemo />
    </section>
  );
};

export default Services;
