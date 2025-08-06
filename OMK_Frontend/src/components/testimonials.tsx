"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonials } from "../types/types";
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  Heart,
  Camera,
} from "lucide-react";
import Image from "next/image";
import axios from "axios";

const Testimonials = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [testimonials, setTestimonials] = useState<testimonials[]>([]);

  useEffect(() => {
    const fetchApprovedReviews = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/reviews/public-review`
        );
        setTestimonials(response.data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };

    fetchApprovedReviews();
  }, []);

  useEffect(() => {
    if (!isAutoPlaying || testimonials.length === 0) return;

    const interval = setInterval(() => {
      setActiveTestimonial((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials]);

  const nextTestimonial = () => {
    setActiveTestimonial((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delayChildren: 0.3, staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" as const },
    },
  };

  const cardVariants = {
    enter: { x: 300, opacity: 0, scale: 0.8 },
    center: { zIndex: 1, x: 0, opacity: 1, scale: 1 },
    exit: { zIndex: 0, x: -300, opacity: 0, scale: 0.8 },
  };

  const teamMembers = [
    {
      id: 1,
      name: "Sayani Pradhan",
      position: "Founder",
      image: "/images/weadingHome1.jpg",
      bio: "Oversees the creative process and ensures your story is told in the most captivating way.",
    },
    {
      id: 2,
      name: "Koushik Samanta",
      position: "Co-Founder",
      image: "/images/weadingHome2.jpg",
      bio: "Captures timeless moments with a keen eye for detail and emotion.",
    },
  ];

  return (
    <div
      id="testimonials"
      className="min-h-screen bg-gradient-to-br from-slate-50 to-red-50 py-20"
    >
      {/* Header Section */}
      <motion.section
        className="px-6 mb-20"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.div variants={itemVariants}>
            <span className="inline-block px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-medium mb-6">
              Client Stories
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-red-700 via-red-600 to-amber-600 bg-clip-text text-transparent">
              What Our
              <br />
              <span className="text-slate-800">Clients Say</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Real stories from real clients who trusted us to capture their
              most precious moments.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Testimonial Carousel */}
      {testimonials.length > 0 && (
        <motion.section
          className="px-6 mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <div className="max-w-6xl mx-auto">
            <div className="relative">
              <div className="relative h-[500px] overflow-hidden rounded-3xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTestimonial}
                    variants={cardVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.3 },
                      scale: { duration: 0.3 },
                    }}
                    className="absolute inset-0 bg-white rounded-3xl shadow-2xl p-12 flex items-center"
                    onMouseEnter={() => setIsAutoPlaying(false)}
                    onMouseLeave={() => setIsAutoPlaying(true)}
                  >
                    <div className="grid lg:grid-cols-2 gap-0 xl:gap-12 items-center w-full">
                      {/* Content */}
                      <div className="space-y-1 xl:space-y-6">
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 0.2, duration: 0.5 }}
                          className="w-8 h-8 xl:w-16 xl:h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg"
                        >
                          <Quote className="w-8 h-8 text-white" />
                        </motion.div>

                        <div className="flex items-center space-x-1">
                          {[
                            ...Array(testimonials[activeTestimonial].rating),
                          ].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{
                                delay: 0.3 + i * 0.1,
                                duration: 0.3,
                              }}
                            >
                              <Star className="w-2 h-2 xl:w-6 xl:h-6 fill-amber-400 text-amber-400" />
                            </motion.div>
                          ))}
                        </div>

                        <motion.p
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4, duration: 0.6 }}
                          className="text-sm xl:text-xl text-slate-700 leading-relaxed italic"
                        >
                          {testimonials[activeTestimonial].comment}
                        </motion.p>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5, duration: 0.6 }}
                          className="space-y-2"
                        >
                          <h3 className="text-md xl:text-2xl font-bold text-slate-800">
                            {testimonials[activeTestimonial].name}
                          </h3>
                         
                          <div className="flex items-center space-x-4 text-sm text-slate-500">
                            <span>
                              {new Date(
                                testimonials[activeTestimonial].createdAt
                              ).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                            <span>•</span>
                            <span>
                              {new Date(
                                testimonials[activeTestimonial].createdAt
                              ).toLocaleTimeString("en-US", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                        </motion.div>

                        
                      </div>

                      {/* Image and Badge */}
                      <div className="relative">
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.3, duration: 0.6 }}
                          className="relative"
                        >
                          <div className="w-25 h-25 mt-1 xl:w-80 xl:h-80 mx-auto rounded-full overflow-hidden shadow-2xl border-4 xl:border-8 border-white">
                            <img
                              src={testimonials[activeTestimonial].image}
                              alt={testimonials[activeTestimonial].name}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <motion.div
                            animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                            className="absolute -top-4 -right-4 w-8 h-8 xl:w-16 xl:h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg"
                          >
                            <Heart className="w-8 h-8 text-white fill-white" />
                          </motion.div>

                          <motion.div
                            animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                            transition={{
                              duration: 4,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: 1,
                            }}
                            className="absolute -bottom-4 -left-4 w-8 h-8 xl:w-16 xl:h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg"
                          >
                            <Camera className="w-6 h-6 text-white" />
                          </motion.div>
                        </motion.div>

                       
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation Arrows */}
              <motion.button
                onClick={prevTestimonial}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md z-10"
              >
                <ChevronLeft className="w-6 h-6 text-red-600" />
              </motion.button>

              <motion.button
                onClick={nextTestimonial}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md z-10"
              >
                <ChevronRight className="w-6 h-6 text-red-600" />
              </motion.button>

              {/* Dots */}
              <div className="flex justify-center space-x-3 mt-8">
                {testimonials.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-3 h-3 rounded-full ${
                      index === activeTestimonial
                        ? "bg-red-600 scale-125"
                        : "bg-red-200 hover:bg-red-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* Team Section */}
       <motion.section
      className="px-6 py-16 bg-[#fffaf3]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Left - Images */}
        <motion.div
  className="relative flex justify-center md:w-1/2"
  variants={itemVariants}
>
  {/* First Image (top layer) */}
  <div className="relative w-40 h-56 md:w-56 md:h-80 z-10">
    <Image
      src="/images/koushik.jpg"
      alt="Koushik"
      fill
      className="object-cover rounded-lg shadow-lg"
    />
  </div>

  {/* Second Image (behind and slightly shifted) */}
  <div className="relative w-40 h-56 md:w-56 md:h-80 -ml-10 md:-ml-16 mt-12 md:mt-16 z-0">
    <Image
      src="/images/sayani.jpg"
      alt="Sayani"
      fill
      className="object-cover rounded-lg shadow-lg"
    />
  </div>
</motion.div>

        {/* Right - Text */}
        <motion.div className="md:w-1/2" variants={itemVariants}>
          <h2 className="text-4xl text-center font-bold text-slate-800 mb-4">
            Celebrating Love <br />
            <span className="italic text-red-600">with Every Frame</span>
          </h2>
          <p className="text-slate-700 mb-4">
            At OurMoments Kolkata, we are not just photographers — we are passionate storytellers behind the lens. Founded by <strong>Sayani Pradhan</strong> and <strong>Koushik Samanta</strong>, two young creatives driven by a love for timeless memories and human connection, our journey began with one simple belief: every moment deserves to be immortalized beautifully. Whether it’s a wedding, birthday, engagement, or a candid celebration, we bring our heart and creativity into every frame. Our lens doesn’t just capture photos — it captures emotions, laughter, tears, and the unforgettable essence of your story. As young professionals in the middle of the lens, we strive to make your most special day feel cinematic, elegant, and deeply personal.
          </p>
          <p className="text-slate-700">
            We are in love — with lenses, lights, and the lovely people we meet. At OurMoments, we don’t just shoot events — we build connections. Our tagline speaks our soul:
“স্মৃতিরা গেছে পরবাস…… কথারা হয়েছে নিঝুম…. এ বুকে তবু বারো…মাস ভালোবাসারই মরশুম……”
Every shutter click carries our promise to make your memory eternal. When you choose us, you don’t just hire photographers — you invite two passionate visionaries who care about your story just as much as you do. So let your favorite moment live forever — with OurMoments Kolkata, where your love meets our lens.
          </p>
        </motion.div>
      </div>
      </motion.section>
    </div>
  );
};

export default Testimonials;
