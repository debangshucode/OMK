"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight, Heart, Camera, MapPin, Calendar, CheckCircle, Sparkles } from 'lucide-react';

const Testimonials = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: "Sarah & Michael Johnson",
      role: "Wedding Couple",
      service: "Wedding Photography",
      rating: 5,
      text: "Absolutely breathtaking work! They captured every precious moment of our special day with such artistry and emotion. The photos tell our love story perfectly, and we couldn't be happier with the results.",
      image: "/images/weadingHome.jpg",
      location: "Hayderabad",
      date: "October 2024",
      highlight: "Perfect wedding memories"
    },
    {
      id: 2,
      name: "Emma Rodriguez",
      role: "Bride-to-be",
      service: "Pre-Wedding Shoot",
      rating: 5,
      text: "The pre-wedding session was magical! They made us feel so comfortable and natural. Every shot was perfectly composed, and the romantic atmosphere they created was beyond our expectations.",
      image: "/images/weadingHome1.jpg",
      location: "Maharashtra",
      date: "September 2024",
      highlight: "Romantic perfection"
    },
    {
      id: 3,
      name: "David Chen",
      role: "Business Owner",
      service: "Corporate Photography",
      rating: 5,
      text: "Professional, creative, and reliable. They delivered exceptional corporate headshots and event coverage that elevated our brand image. The attention to detail and quality is outstanding.",
      image: "/images/weadingHome2.jpg",
      location: "Pune",
      date: "August 2024",
      highlight: "Professional excellence"
    },
    {
      id: 4,
      name: "Lisa & James Wilson",
      role: "Anniversary Couple",
      service: "Couple Photography",
      rating: 5,
      text: "They captured the essence of our 10-year journey together beautifully. The photos are artistic, emotional, and tell our story in the most wonderful way. Highly recommended!",
      image: "/images/weadingHome3.jpg",
      location: "Kolkata",
      date: "November 2024",
      highlight: "Timeless memories"
    },
    {
      id: 5,
      name: "Maria Gonzalez",
      role: "Event Organizer",
      service: "Event Videography",
      rating: 5,
      text: "The videography work was cinematic and breathtaking. They captured every important moment and emotion, creating a beautiful film that we'll treasure forever. True professionals!",
      image: "/images/weadingHome4.jpg",
      location: "Kolkata",
      date: "July 2024",
      highlight: "Cinematic brilliance"
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => 
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

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
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    enter: {
      x: 300,
      opacity: 0,
      scale: 0.8
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: {
      zIndex: 0,
      x: -300,
      opacity: 0,
      scale: 0.8
    }
  };

    const clientShowcase = [
    {
      name: "Sarah & Michael",
      image: "/images/weadingHome3.jpg",
      service: "Wedding",
      location: "Kolkata"
    },
    {
      name: "Emma Rodriguez",
      image: "/images/weadingHome5.jpg",
      service: "Pre-Wedding",
      location: "Bangalore"
    },
    {
      name: "David Chen",
      image: "/images/weadingHome6.jpg",
      service: "Corporate",
      location: "Chennai"
    },
    {
      name: "Lisa & James",
      image: "/images/weadingHome4.jpg",
      service: "Anniversary",
      location: "Pune"
    },
    {
      name: "Maria Gonzalez",
      image: "/images/weadingHome2.jpg",
      service: "Event",
      location: "Panjub"
    },
    {
      name: "Alex Thompson",
      image: "/images/weadingHome.jpg",
      service: "Portrait",
      location: "Kolkata"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-red-50 py-20">
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
              Real stories from real clients who trusted us to capture their most precious moments. 
              Their joy and satisfaction inspire us every day.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Testimonial Carousel */}
      <motion.section 
        className="px-6 mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            {/* Main Testimonial Card */}
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
                    scale: { duration: 0.3 }
                  }}
                  className="absolute inset-0 bg-white rounded-3xl shadow-2xl p-12 flex items-center"
                  onMouseEnter={() => setIsAutoPlaying(false)}
                  onMouseLeave={() => setIsAutoPlaying(true)}
                >
                  <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
                    {/* Left Side - Content */}
                    <div className="space-y-6">
                      {/* Quote Icon */}
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg"
                      >
                        <Quote className="w-8 h-8 text-white" />
                      </motion.div>

                      {/* Rating Stars */}
                      <div className="flex items-center space-x-1">
                        {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.3 + i * 0.1, duration: 0.3 }}
                          >
                            <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
                          </motion.div>
                        ))}
                      </div>

                      {/* Testimonial Text */}
                      <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="text-xl text-slate-700 leading-relaxed italic"
                      >
                        "{testimonials[activeTestimonial].text}"
                      </motion.p>

                      {/* Client Info */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="space-y-2"
                      >
                        <h3 className="text-2xl font-bold text-slate-800">
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

                      {/* Service Badge */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6, duration: 0.4 }}
                        className="inline-block px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-medium"
                      >
                        {testimonials[activeTestimonial].service}
                      </motion.div>
                    </div>

                    {/* Right Side - Image and Highlight */}
                    <div className="relative">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="relative"
                      >
                        {/* Client Image */}
                        <div className="w-80 h-80 mx-auto rounded-full overflow-hidden shadow-2xl border-8 border-white">
                          <img 
                            src={testimonials[activeTestimonial].image}
                            alt={testimonials[activeTestimonial].name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Floating Elements */}
                        <motion.div
                          animate={{ 
                            y: [0, -10, 0],
                            rotate: [0, 5, 0]
                          }}
                          transition={{ 
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg"
                        >
                          <Heart className="w-8 h-8 text-white fill-white" />
                        </motion.div>

                        <motion.div
                          animate={{ 
                            y: [0, 10, 0],
                            rotate: [0, -5, 0]
                          }}
                          transition={{ 
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1
                          }}
                          className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg"
                        >
                          <Camera className="w-6 h-6 text-white" />
                        </motion.div>
                      </motion.div>

                      {/* Highlight Badge */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.5 }}
                        className="text-center mt-6"
                      >
                        <div className="inline-block px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full font-semibold shadow-lg">
                          {testimonials[activeTestimonial].highlight}
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-red-50 transition-colors duration-300 z-10"
            >
              <ChevronLeft className="w-6 h-6 text-red-600" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-red-50 transition-colors duration-300 z-10"
            >
              <ChevronRight className="w-6 h-6 text-red-600" />
            </motion.button>

            {/* Dots Indicator */}
            <div className="flex justify-center space-x-3 mt-8">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeTestimonial 
                      ? 'bg-red-600 scale-125' 
                      : 'bg-red-200 hover:bg-red-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section 
        className="px-6 mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div 
            variants={itemVariants}
            className="bg-gradient-to-r from-red-600 to-red-700 rounded-3xl p-12 shadow-2xl overflow-hidden relative"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full"></div>
              <div className="absolute top-32 right-20 w-16 h-16 bg-amber-300 rounded-full"></div>
              <div className="absolute bottom-20 left-32 w-12 h-12 bg-white rounded-full"></div>
              <div className="absolute bottom-10 right-10 w-24 h-24 bg-amber-300 rounded-full"></div>
            </div>

            <div className="relative z-10">
              <div className="text-center mb-12">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="inline-block w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center mb-6"
                >
                  <Sparkles className="w-8 h-8 text-white" />
                </motion.div>
                <h2 className="text-4xl font-bold text-white mb-4">
                  Our Amazing <span className="text-amber-300">Client Family</span>
                </h2>
                <p className="text-red-100 text-lg max-w-2xl mx-auto">
                  Meet some of the wonderful people who trusted us with their special moments. 
                  Each story is unique, each memory is precious.
                </p>
              </div>

              {/* Client Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {clientShowcase.map((client, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ 
                      scale: 1.05,
                      y: -5
                    }}
                    className="group text-center"
                  >
                    <div className="relative mb-4">
                      <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-4 border-white/20 group-hover:border-amber-300 transition-colors duration-300 shadow-lg">
                        <img 
                          src={client.image}
                          alt={client.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="absolute -bottom-1 -right-1 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center"
                      >
                        <CheckCircle className="w-4 h-4 text-white" />
                      </motion.div>
                    </div>
                    <h4 className="text-white font-semibold text-sm mb-1 group-hover:text-amber-300 transition-colors duration-300">
                      {client.name}
                    </h4>
                    <p className="text-red-200 text-xs mb-1">{client.service}</p>
                    <p className="text-red-300 text-xs flex items-center justify-center space-x-1">
                      <MapPin className="w-3 h-3" />
                      <span>{client.location}</span>
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Bottom CTA */}
              <motion.div
                variants={itemVariants}
                className="text-center mt-12 pt-8 border-t border-white/20"
              >
                <p className="text-red-100 mb-6">
                  Ready to join our family of satisfied clients?
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Start Your Journey
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* All Testimonials Grid */}
      <motion.section 
        className="px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              More <span className="text-red-600">Client Love</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Every client story matters to us. Here are more testimonials from our amazing clients.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                {/* Rating */}
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-slate-600 mb-6 leading-relaxed">
                  "{testimonial.text.slice(0, 120)}..."
                </p>

                {/* Client Info */}
                <div className="flex items-center space-x-4">
                  <img 
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-slate-800">{testimonial.name}</h4>
                    <p className="text-sm text-red-600">{testimonial.service}</p>
                  </div>
                </div>

                {/* Service Badge */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <span className="inline-block px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs font-medium">
                    {testimonial.location} • {testimonial.date}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Testimonials;