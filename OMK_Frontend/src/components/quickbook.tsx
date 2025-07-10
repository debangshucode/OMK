import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { forwardRef, useImperativeHandle } from "react";
import {
  Heart,
  Star,
  MapPin,
  Calendar,
  User,
  Mail,
  Phone,
  Send,
  CheckCircle,
  Camera,
  Zap,
  Users,
  Award,
  Clock,
  Sparkles,
  Quote,
  ArrowRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
const Quickbook = forwardRef((props, ref) => {
  const formRef = useRef<HTMLDivElement | null>(null);
  const nameInputRef = useRef<HTMLInputElement | null>(null);

  const [selectedClient, setSelectedClient] = useState<FamilyMember | null>(
    null
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();
  const familyMembers = [
    {
      id: 1,
      name: "Sarah & Michael Johnson",
      service: "Wedding Photography",
      image:
        "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
      location: "New York",
      date: "October 2024",
      story:
        "Our wedding day was absolutely magical thanks to this incredible team. They captured every precious moment with such artistry and emotion.",
      rating: 5,
      highlight: "Perfect Wedding Memories",
      category: "wedding",
    },
    {
      id: 2,
      name: "Emma Rodriguez",
      service: "Pre-Wedding Shoot",
      image:
        "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
      location: "California",
      date: "September 2024",
      story:
        "The pre-wedding session was beyond our expectations. They made us feel so comfortable and natural throughout the entire shoot.",
      rating: 5,
      highlight: "Romantic Perfection",
      category: "pre-wedding",
    },
    {
      id: 3,
      name: "David Chen",
      service: "Corporate Photography",
      image:
        "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
      location: "Texas",
      date: "August 2024",
      story:
        "Professional, creative, and reliable. They delivered exceptional corporate headshots that elevated our entire brand image.",
      rating: 5,
      highlight: "Professional Excellence",
      category: "corporate",
    },
    {
      id: 4,
      name: "Lisa & James Wilson",
      service: "Anniversary Session",
      image:
        "https://images.pexels.com/photos/1024967/pexels-photo-1024967.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
      location: "Florida",
      date: "November 2024",
      story:
        "They captured the essence of our 10-year journey together beautifully. The photos tell our love story in the most wonderful way.",
      rating: 5,
      highlight: "Timeless Love",
      category: "anniversary",
    },
    {
      id: 5,
      name: "Maria Gonzalez",
      service: "Event Photography",
      image:
        "https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
      location: "Arizona",
      date: "July 2024",
      story:
        "The event coverage was absolutely stunning. Every important moment was captured with such attention to detail and creativity.",
      rating: 5,
      highlight: "Event Perfection",
      category: "event",
    },
    {
      id: 6,
      name: "Alex Thompson",
      service: "Portrait Session",
      image:
        "https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
      location: "Nevada",
      date: "June 2024",
      story:
        "The portrait session exceeded all my expectations. They brought out the best in me and created images I'll treasure forever.",
      rating: 5,
      highlight: "Stunning Portraits",
      category: "portrait",
    },
    {
      id: 7,
      name: "Taylor & Sam Kim",
      service: "Engagement Shoot",
      image:
        "https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
      location: "Washington",
      date: "May 2024",
      story:
        "Our engagement photos are absolutely breathtaking. They captured our love and excitement perfectly in every single shot.",
      rating: 5,
      highlight: "Engagement Bliss",
      category: "engagement",
    },
    {
      id: 8,
      name: "Jennifer Martinez",
      service: "Family Photography",
      image:
        "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
      location: "Colorado",
      date: "April 2024",
      story:
        "They made our family session so fun and relaxed. The kids were comfortable and the photos captured our family's true spirit.",
      rating: 5,
      highlight: "Family Joy",
      category: "family",
    },
  ];
  type FamilyMember = {
    id: number;
    name: string;
    service: string;
    image: string;
    location: string;
    date: string;
    story: string;
    rating: number;
    highlight: string;
    category: string;
  };

  const services = [
    "Wedding Photography",
    "Pre-Wedding Shoot",
    "Corporate Photography",
    "Event Photography",
    "Portrait Session",
    "Family Photography",
    "Engagement Shoot",
    "Anniversary Session",
  ];

  const stats = [
    {
      icon: Users,
      value: "500+",
      label: "Family Members",
      color: "text-red-600",
    },
    {
      icon: Heart,
      value: "1000+",
      label: "Love Stories",
      color: "text-pink-500",
    },
    {
      icon: Star,
      value: "5.0",
      label: "Average Rating",
      color: "text-amber-500",
    },
    {
      icon: Award,
      value: "50+",
      label: "Awards Won",
      color: "text-purple-600",
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  useImperativeHandle(ref, () => ({
    scrollToForm: () => {
      formRef.current?.scrollIntoView({ behavior: "smooth" });
      nameInputRef.current?.focus(); // optional: focus first input
    },
  }));
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });
    }, 3000);
  };

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
              Our Amazing Family
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-red-700 via-red-600 to-amber-600 bg-clip-text text-transparent">
              Meet Our
              <br />
              <span className="text-slate-800">Beautiful Family</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Every client becomes part of our extended family. Here are the
              amazing people who trusted us with their most precious moments and
              became lifelong friends.
            </p>
          </motion.div>
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center group"
              >
                <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-4 group-hover:shadow-xl transition-all duration-300">
                  <stat.icon className={`w-10 h-10 ${stat.color}`} />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Side - Family Members Grid */}
          <div className="lg:col-span-2">
            <motion.div
              className="grid md:grid-cols-2 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              {familyMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  variants={itemVariants}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
                  onClick={() => {
                    setSelectedClient(member);
                    setFormData((prev) => ({
                      ...prev,
                      service: member.service,
                    }));
                  }}
                >
                  {/* Image Section */}
                  <div className="relative overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Service Badge */}
                    <div className="absolute top-4 left-4">
                      <div className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                        {member.service}
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="absolute top-4 right-4">
                      <div className="flex items-center space-x-1 bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
                        {[...Array(member.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-3 h-3 fill-amber-400 text-amber-400"
                          />
                        ))}
                      </div>
                    </div>

                    {/* Quote Icon */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      className="absolute bottom-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                    >
                      <Quote className="w-6 h-6 text-white" />
                    </motion.div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-red-600 transition-colors duration-300">
                      {member.name}
                    </h3>

                    <p className="text-slate-600 text-sm mb-4 leading-relaxed line-clamp-2">
                      "{member.story.slice(0, 100)}..."
                    </p>

                    <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                      <span className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{member.location}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{member.date}</span>
                      </span>
                    </div>

                    {/* Highlight Badge */}
                    <div className="inline-block px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                      {member.highlight}
                    </div>

                    {/* Read More Button */}
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs text-slate-400">
                        Click to read full story
                      </span>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-red-600 transition-colors duration-300" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Join Family CTA */}
            <motion.div
              className="mt-16 text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={itemVariants}
            >
              <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-3xl p-12 text-white shadow-2xl">
                <div className="flex justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className=" w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mb-6"
                  >
                    <Sparkles className="w-10 h-10 text-white" />
                  </motion.div>
                </div>
                <h2 className="text-4xl font-bold mb-4">
                  Ready to Create Something{" "}
                  <span className="text-amber-300">Amazing Together?</span>
                </h2>
                <p className="text-red-100 text-lg mb-8 max-w-2xl mx-auto">
                  Let's discuss your vision and bring your story to life through
                  our creative lens.
                </p>
                <motion.button
                  onClick={() => router.push("/portfolio")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:cursor-pointer"
                >
                  View Portfolio
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Join Family Form */}
          <div className="lg:col-span-1">
            <motion.div
              ref={formRef}
              className="sticky top-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              <div className="bg-white rounded-3xl p-8 shadow-2xl border border-red-100">
                <motion.div
                  variants={itemVariants}
                  className="text-center mb-8"
                >
                  <div className="flex justify-center">
                    <div className=" w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                      <Heart className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2 hover:cursor-pointer">
                    Join Our Family
                  </h3>
                  <p className="text-slate-600">
                    Ready to create beautiful memories together? Let's start
                    your journey!
                  </p>
                </motion.div>

                {!isSubmitted ? (
                  <motion.form
                    variants={itemVariants}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    {/* Name */}
                    <div className="relative">
                      <User className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                      <input
                        ref={nameInputRef}
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your Name"
                        required
                        className="w-full pl-12 pr-4 py-4 border border-slate-200 rounded-xl text-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                      />
                    </div>

                    {/* Email */}
                    <div className="relative">
                      <Mail className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Your Email"
                        required
                        className="w-full pl-12 pr-4 py-4 border border-slate-200 rounded-xl text-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                      />
                    </div>

                    {/* Phone */}
                    <div className="relative">
                      <Phone className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Phone Number"
                        className="w-full pl-12 pr-4 py-4 border border-slate-200 rounded-xl text-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                      />
                    </div>

                    {/* Service */}
                    <div className="relative">
                      <Camera className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-12 pr-4 py-4 border border-slate-200 text-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 appearance-none bg-white"
                      >
                        <option value="">Select Service</option>
                        {services.map((service, index) => (
                          <option key={index} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div className="relative">
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us about your vision..."
                        rows={3}
                        className="w-full px-4 py-4 border border-slate-200 rounded-xl text-gray-600  focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:cursor-pointer hover:to-red-700 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-3 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          />
                          <span>Joining Family...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>Join Our Family</span>
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                ) : (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-8"
                  >
                    <div className="flex justify-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          delay: 0.2,
                          type: "spring",
                          stiffness: 200,
                        }}
                        className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                      >
                        <CheckCircle className="w-8 h-8 text-white" />
                      </motion.div>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-4">
                      Welcome to the Family!
                    </h3>
                    <p className="text-slate-600 mb-6">
                      We're excited to have you join our amazing family. We'll
                      contact you within 24 hours!
                    </p>
                    <div className="flex items-center justify-center space-x-2 text-red-500">
                      <Heart className="w-5 h-5 fill-current" />
                      <span className="font-medium">
                        Thank you for choosing us!
                      </span>
                      <Heart className="w-5 h-5 fill-current" />
                    </div>
                  </motion.div>
                )}

                {/* Trust Indicators */}
                <motion.div
                  variants={itemVariants}
                  className="mt-8 pt-6 border-t border-slate-100"
                >
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-red-600">
                        500+
                      </div>
                      <div className="text-xs text-slate-500">
                        Family Members
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-red-600">24h</div>
                      <div className="text-xs text-slate-500">
                        Response Time
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-red-600">5★</div>
                      <div className="text-xs text-slate-500">
                        Average Rating
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Client Story Modal */}
      <AnimatePresence>
        {selectedClient && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedClient(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative">
                <img
                  src={selectedClient.image}
                  alt={selectedClient.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-1">
                    {selectedClient.name}
                  </h3>
                  <p className="text-red-200">{selectedClient.service}</p>
                </div>
                <div className="absolute top-4 right-4 flex items-center space-x-1">
                  {[...Array(selectedClient.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <Quote className="w-8 h-8 text-red-600" />
                  <span className="text-lg font-semibold text-slate-800">
                    Their Story
                  </span>
                </div>

                <p className="text-slate-700 leading-relaxed mb-6 text-lg">
                  "{selectedClient.story}"
                </p>

                <div className="flex items-center justify-between text-sm text-slate-500 mb-6">
                  <span className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{selectedClient.location}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{selectedClient.date}</span>
                  </span>
                </div>

                <div className="text-center">
                  <button
                    onClick={() => {
                      setSelectedClient(null); // Close modal

                      setTimeout(() => {
                        formRef.current?.scrollIntoView({ behavior: "smooth" });
                        nameInputRef.current?.focus(); // Focus the first input
                      }, 300); // Delay to ensure scroll happens after modal closes
                    }}
                    className="inline-block px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full font-semibold transition hover:scale-105"
                  >
                    {selectedClient.highlight}
                  </button>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedClient(null)}
                className="absolute top-4 left-4 w-10 h-10 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/40 transition-colors duration-300"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

export default Quickbook;
