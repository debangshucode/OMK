"use client";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  Video,
  Heart,
  Film,
  ArrowRight,
  Images,
  Star,
  Search,
  ScanFace,
  Eye,
  Truck,
  Clock,
  Zap,
} from "lucide-react";
import Quickbook from "./quickbook";
import { useRouter } from "next/navigation";
import Book from "./book";
const Services = () => {
  const [activeService, setActiveService] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const quickbookRef = useRef<{ scrollToForm: () => void }>(null);

  const services = [
    {
      id: 0,
      icon: Camera,
      icon2: Camera,
      title: "Photography",
      subtitle: "Capturing Timeless Moments",
      title2: "Cinematography & Photography",
      subtitle2:
        "We capture moments with stunning cinematic style and creativity.",
      description:
        "Professional photography that tells your unique story through stunning visuals and artistic composition.",
      features: [
        "Portrait Sessions",
        "Event Coverage",
        "Commercial Shoots",
        "Fine Art Photography",
      ],

      features2: [
        "Wedding Films",
        "Couple & Engagement Shoots",
        "Event Videography",
        "Cinematic Edits",
      ],

      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50",
      textColor: "red-600",
      buttonColor: "from-red-600/80 to-red-700/50",
      image:
        "https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      price: "Starting at $299",
      duration: "2-4 hours",
    },
    {
      id: 1,
      icon: Video,
      icon2: Images,
      title: "Videography",
      subtitle: "Dynamic Visual Storytelling",
      title2: "Personalized albums crafted with moments",
      subtitle2:
        "We prioritize your vision and satisfaction, ensuring each project exceeds expectations.",
      description:
        "Cinematic videography that brings your vision to life with professional equipment and creative direction.",
      features: [
        "Event Videography",
        "Corporate Videos",
        "Promotional Content",
        "Documentary Style",
      ],

      features2: [
        "Customized Album Design",
        "Digital Album Options",
        "Premium Photo Printing",
        "Craft Memories",
      ],

      color: "from-red-600 to-red-700",
      bgColor: "bg-red-100",
      textColor: "red-700",
      buttonColor: "from-red-600/80 to-red-700/50",
      image:
        "https://images.pexels.com/photos/3062541/pexels-photo-3062541.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      price: "Starting at $599",
      duration: "4-8 hours",
    },
    {
      id: 2,
      icon: Heart,
      icon2: ScanFace,
      title: "Pre-Wedding",
      subtitle: "Romance in Every Frame",
      title2: " Smart Face Search in Albums",
      subtitle2: "Easily find faces and moments with smart album search tools",
      description:
        "Romantic pre-wedding sessions that capture the essence of your love story in beautiful locations.",
      features: [
        "Couple Sessions",
        "Engagement Shoots",
        "Save-the-Date",
        "Romantic Portraits",
      ],

      features2: [
        "Wedding & Event Albums",
        "Large Family or Group Events",
        "Easy search by faces",
        "Corporate Portfolios",
      ],

      color: "from-amber-500 to-amber-600",
      bgColor: "bg-amber-50",
      textColor: "amber-500",
      buttonColor: "from-amber-500/80 to-amber-600/50",
      image:
        "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      price: "Starting at $399",
      duration: "3-5 hours",
    },
    {
      id: 3,
      icon: Film,
      icon2: Truck,
      title: "Cinematography",
      subtitle: "Cinematic Excellence",
      title2: "Timely Delivery & Reliable Service",
      subtitle2:
        "On-time, high-quality delivery you can always count on , to track your delivery progress and get updates.",
      description:
        "Professional cinematography with cutting-edge equipment and artistic vision for your special moments.",
      features: [
        "Wedding Films",
        "Short Films",
        "Music Videos",
        "Cinematic Edits",
      ],

      features2: [
        "Fast Turnaround Times",
        "Online Previews & Delivery",
        "Dedicated Support",
        "Track Delivery Progress",
      ],

      color: "from-slate-600 to-slate-700",
      bgColor: "bg-slate-50",
      textColor: "slate-600",
      buttonColor: "from-slate-600/80 to-slate-700/50",
      image:
        "https://images.pexels.com/photos/3062541/pexels-photo-3062541.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      price: "Starting at $799",
      duration: "Full day",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };
  const router = useRouter();

  const detailRef = useRef<HTMLDivElement>(null);
  return (
    <div
      id="services"
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

      {/* Interactive Service Showcase */}
      <motion.section
        className="px-6 mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Service Navigation */}
            <motion.div variants={itemVariants} className="space-y-4">
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
                    if (window.innerWidth < 1024 && detailRef.current) {
                      detailRef.current.scrollIntoView({ behavior: "smooth" });
                    }
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
                        className={`text-xl font-bold text-${service.textColor} transition-colors duration-300`}
                      >
                        {service.title}
                      </h3>
                      <p className="text-slate-600 text-sm">
                        {service.subtitle}
                      </p>
                    </div>
                    <ArrowRight
                      className={`w-5 h-5 transition-all duration-300 ${
                        activeService === index
                          ? `${service.textColor} translate-x-2`
                          : "text-slate-400"
                      }`}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Right Side - Active Service Details */}
            <motion.div
              variants={itemVariants}
              className="relative"
              ref={detailRef}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-3xl p-8 shadow-2xl"
                >
                  <div className="relative mb-6 rounded-2xl overflow-hidden">
                    <img
                      src={services[activeService].image}
                      alt={services[activeService].title}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="flex items-center space-x-2 mb-2">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span className="text-sm font-medium">
                          Premium Service
                        </span>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-3xl font-bold text-slate-800 mb-3">
                    {services[activeService].title}
                  </h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    {services[activeService].description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {services[activeService].features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                        <span className="text-sm text-slate-600">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 justify-between pt-6 border-t border-gray-100">
                    <div>
                      <p className="text-xl xl:text-2xl font-bold text-slate-800">
                        {services[activeService].price}
                      </p>
                      <p className="text-sm text-slate-500">
                        {services[activeService].duration}
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => router.push("/portfolio")}
                      className={`text-sm px-2 py-2 xl:px-6 xl:py-3  bg-white border text-${services[activeService].textColor} border-${services[activeService].textColor} rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:cursor-pointer`}
                    >
                      Our Works
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        const contactSection =
                          document.getElementById("contact");
                        if (contactSection) {
                          contactSection.scrollIntoView({ behavior: "smooth" });
                          setTimeout(() => {
                            window.focusContactNameInput?.();
                          }, 600); // Wait for scroll animation to finish
                        }
                      }}
                      className={`text-sm px-2 py-2 xl:px-6 xl:py-3 bg-gradient-to-r ${services[activeService].buttonColor} text-white rounded-full font-semibold shadow-lg transition-all duration-300 hover:cursor-pointer`}
                    >
                      Book Now
                    </motion.button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <Book />

      {/* Service Cards Grid */}
      <motion.section
        className="px-6 mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Why Choose <span className="text-red-600">Our Services</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Professional quality, creative vision, and personalized service
              for every project.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                variants={cardVariants}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.3 },
                }}
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
                className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div
                    className={`w-full h-full bg-gradient-to-br ${service.color}`}
                  ></div>
                </div>

                {/* Floating Icon */}
                <motion.div
                  animate={
                    hoveredCard === index
                      ? {
                          rotate: [0, -10, 10, 0],
                          scale: [1, 1.1, 1],
                        }
                      : {}
                  }
                  transition={{ duration: 0.6 }}
                  className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                >
                  <service.icon2 className="w-8 h-8 text-white" />
                </motion.div>

                <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-red-600 transition-colors duration-300">
                  {service.title2}
                </h3>
                <p className="text-slate-600 text-sm mb-4 leading-relaxed h-[20%]">
                  {service.subtitle2}
                </p>

                {/* Feature List */}
                <div className="space-y-2 mb-6">
                  {service.features2.slice(0, 2).map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <Eye className="w-3 h-3 text-amber-500" />
                      <span className="text-xs text-slate-600">{feature}</span>
                    </div>
                  ))}
                </div>

                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={
                    hoveredCard === index
                      ? { scale: 1, opacity: 1 }
                      : { scale: 0, opacity: 0 }
                  }
                  className="absolute top-4 right-4"
                >
                  <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      {/* <motion.section
        className="px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-red-600 to-red-700 rounded-3xl p-12 text-center shadow-2xl"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Create Something
              <br />
              <span className="text-amber-300">Amazing Together?</span>
            </h2>
            <p className="text-xl text-red-100 mb-8 leading-relaxed">
              Let's discuss your vision and bring your story to life through our
              creative lens.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-red-600 px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:cursor-pointer hover:shadow-xl transition-all duration-300"
              >
                View Portfolio
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:cursor-pointer"
              >
                Get Quote
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.section> */}
    </div>
  );
};

export default Services;
