"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Quickbook from "./quickbook";
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  Heart,
  Camera,
} from "lucide-react";
import axios from "axios";

const Testimonials = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchApprovedReviews = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/reviews/public-review");
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
      name: "Arjun Mehta",
      position: "Creative Director",
      image: "/images/weadingHome1.jpg",
      bio: "Oversees the creative process and ensures your story is told in the most captivating way.",
    },
    {
      id: 2,
      name: "Sana Kapoor",
      position: "Lead Photographer",
      image: "/images/weadingHome2.jpg",
      bio: "Captures timeless moments with a keen eye for detail and emotion.",
    },
    {
      id: 3,
      name: "Ravi Singh",
      position: "Cinematographer",
      image: "/images/weadingHome3.jpg",
      bio: "Brings cinematic flair to every frame with technical mastery and passion.",
    },
    {
      id: 4,
      name: "Ravi Singh",
      position: "Cinematographer",
      image: "/images/weadingHome.jpg",
      bio: "Brings cinematic flair to every frame with technical mastery and passion.",
    },
  ];

  return (
    <div id="testimonials" className="min-h-screen bg-gradient-to-br from-slate-50 to-red-50 py-20">
      {/* Header Section */}
      <motion.section className="px-6 mb-20" initial="hidden" animate="visible" variants={containerVariants}>
        <div className="max-w-7xl mx-auto text-center">
          <motion.div variants={itemVariants}>
            <span className="inline-block px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-medium mb-6">
              Client Stories
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-red-700 via-red-600 to-amber-600 bg-clip-text text-transparent">
              What Our<br />
              <span className="text-slate-800">Clients Say</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Real stories from real clients who trusted us to capture their most precious moments.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Testimonial Carousel */}
      {testimonials.length > 0 && (
        <motion.section className="px-6 mb-20" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
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
                    transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.3 }, scale: { duration: 0.3 } }}
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
                          {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ delay: 0.3 + i * 0.1, duration: 0.3 }}
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
                          "{testimonials[activeTestimonial].text}"
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
                          <p className="text-red-600 font-medium">
                            {testimonials[activeTestimonial].role}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-slate-500">
                            <span>{testimonials[activeTestimonial].location}</span>
                            <span>•</span>
                            <span>{testimonials[activeTestimonial].date}</span>
                          </div>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.6, duration: 0.4 }}
                          className="inline-block px-1 py-1 xl:px-4 xl:py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-medium"
                        >
                          {testimonials[activeTestimonial].service}
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
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-4 -right-4 w-8 h-8 xl:w-16 xl:h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg"
                          >
                            <Heart className="w-8 h-8 text-white fill-white" />
                          </motion.div>

                          <motion.div
                            animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute -bottom-4 -left-4 w-8 h-8 xl:w-16 xl:h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg"
                          >
                            <Camera className="w-6 h-6 text-white" />
                          </motion.div>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7, duration: 0.5 }}
                          className="text-center mt-6"
                        >
                          <div className="inline-block px-3 py-2 xl:px-6 xl:py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full font-semibold shadow-lg">
                            {testimonials[activeTestimonial].highlight}
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation Arrows */}
              <motion.button onClick={prevTestimonial} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md z-10">
                <ChevronLeft className="w-6 h-6 text-red-600" />
              </motion.button>

              <motion.button onClick={nextTestimonial} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md z-10">
                <ChevronRight className="w-6 h-6 text-red-600" />
              </motion.button>

              {/* Dots */}
              <div className="flex justify-center space-x-3 mt-8">
                {testimonials.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-3 h-3 rounded-full ${index === activeTestimonial ? "bg-red-600 scale-125" : "bg-red-200 hover:bg-red-300"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* Team Section */}
      <motion.section className="px-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
        <div className="max-w-7xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Meet <span className="text-red-600">Our Team</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Passionate professionals delivering visual excellence.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 justify-items-center">
            {teamMembers.map((member) => (
              <motion.div key={member.id} variants={itemVariants} whileHover={{ scale: 1.05 }} className="text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border-4 border-red-100 shadow-md mx-auto mb-3"
                />
                <h4 className="text-base font-semibold text-slate-800">{member.name}</h4>
                <p className="text-sm text-red-600">{member.position}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Testimonials;
