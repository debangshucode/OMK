"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Camera,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Send,
  Calendar,
  User,
  MessageSquare,
  Heart,
  Star,
  Clock,
  CheckCircle,
  ArrowRight,
  Aperture,
} from "lucide-react";

const Footer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    service_types : "",
    date: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const services = [
    "Wedding Photography",
    "Pre-Wedding Shoot",
    "Corporate Photography",
    "Event Photography",
    "Portrait Session",
    "Videography",
    "Cinematography",
  ];
  const service_types = ["Single Side" , "Both Side"]

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
        service_types :"",
        date: "",
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
        ease: "easeOut",
      },
    },
  };

  const socialLinks = [
    {
      icon: Instagram,
      href: "#",
      label: "Instagram",
      color: "hover:text-pink-500",
    },
    {
      icon: Facebook,
      href: "#",
      label: "Facebook",
      color: "hover:text-blue-500",
    },
    {
      icon: Twitter,
      href: "#",
      label: "Twitter",
      color: "hover:text-blue-400",
    },
    { icon: Youtube, href: "#", label: "YouTube", color: "hover:text-red-500" },
  ];

  const contactInfo = [
    { icon: Phone, text: "+1 (555) 123-4567", href: "tel:+15551234567" },
    {
      icon: Mail,
      text: "hello@photostudio.com",
      href: "mailto:hello@photostudio.com",
    },
    {
      icon: MapPin,
      text: "123 Creative Street, Art District, NY 10001",
      href: "#",
    },
  ];

  const quickLinks = [
    "About Us",
    "Services",
    "Portfolio",
    "Testimonials",
    "Blog",
    "Contact",
  ];

  return (
    <footer id="contact" className="bg-gradient-to-br from-slate-900 via-slate-800 to-red-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-amber-300 rounded-full"></div>
        <div className="absolute bottom-32 left-40 w-20 h-20 bg-red-400 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-white rounded-full"></div>
      </div>

      {/* Main Footer Content */}
      <motion.div
        className="relative z-10 px-6 py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-3xl flex items-center justify-center mb-6 shadow-2xl">
                <Camera className="w-10 h-10 text-white" />
              </div>
            </div>

            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              Let's Create Something
              <br />
              <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                Beautiful Together
              </span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Ready to capture your special moments? Get in touch with us and
              let's discuss how we can bring your vision to life.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left Side - Contact Info & Links */}
            <motion.div variants={itemVariants} className="space-y-12">
              {/* Contact Information */}
              <div>
                <h3 className="text-2xl font-bold mb-6 flex items-center space-x-3">
                  <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <span>Get In Touch</span>
                </h3>
                <div className="space-y-4">
                  {contactInfo.map((contact, index) => (
                    <motion.a
                      key={index}
                      href={contact.href}
                      whileHover={{ x: 10 }}
                      className="flex items-center space-x-4 text-slate-300 hover:text-white transition-all duration-300 group"
                    >
                      <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center group-hover:bg-red-600 transition-colors duration-300">
                        <contact.icon className="w-5 h-5" />
                      </div>
                      <span className="text-lg">{contact.text}</span>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-2xl font-bold mb-6 flex items-center space-x-3">
                  <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                  <span>Quick Links</span>
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {quickLinks.map((link, index) => (
                    <motion.a
                      key={index}
                      href="#"
                      whileHover={{ x: 5 }}
                      className="text-slate-300 hover:text-amber-400 transition-all duration-300 flex items-center space-x-2"
                    >
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span>{link}</span>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="text-2xl font-bold mb-6 flex items-center space-x-3">
                  <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                  <span>Follow Us</span>
                </h3>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      whileHover={{ scale: 1.1, y: -5 }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-14 h-14 bg-slate-700 rounded-2xl flex items-center justify-center text-slate-300 ${social.color} transition-all duration-300 shadow-lg hover:shadow-2xl`}
                    >
                      <social.icon className="w-6 h-6" />
                    </motion.a>
                  ))}
                </div>
                <p className="text-slate-400 mt-4">
                  Follow us for daily inspiration and behind-the-scenes content
                </p>
              </div>
            </motion.div>

            {/* Right Side - Booking Form */}
            <motion.div variants={itemVariants}>
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center">
                    <div className=" w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                      <Calendar className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold mb-2">Book Your Session</h3>
                  <p className="text-slate-300">
                    Fill out the form below and we'll get back to you within 24
                    hours
                  </p>
                </div>

                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name and Email Row */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="relative">
                        <User className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your Name"
                          required
                          className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                        />
                      </div>
                      <div className="relative">
                        <Mail className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Your Email"
                          required
                          className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                        />
                      </div>
                    </div>

                    {/* Phone and Service Row */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="relative">
                        <Phone className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Phone Number"
                          className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                        />
                      </div>
                      <div className="relative">
                        <Camera className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                        <select
                          name="service"
                          value={formData.service}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 appearance-none"
                        >
                          <option value="" className="bg-slate-800">
                            Select Service
                          </option>
                          {services.map((service, index) => (
                            <option
                              key={index}
                              value={service}
                              className="bg-slate-800"
                            >
                              {service}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    {/* Types of Photography */}
                   <div className="relative">
                        <Aperture className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                        <select
                          name="service_types"
                          value={formData.service_types}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 appearance-none"
                        >
                          <option value="" className="bg-slate-800">
                            Select Service Type
                          </option>
                          {service_types.map((service, index) => (
                            <option
                              key={index}
                              value={service}
                              className="bg-slate-800"
                            >
                              {service}
                            </option>
                          ))}
                        </select>
                      </div>
                    

                    {/* Date */}
                    <div className="relative">
                      <Calendar className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                      />
                    </div>

                    {/* Message */}
                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us about your vision..."
                        rows={4}
                        className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-3 disabled:opacity-70 disabled:cursor-not-allowed"
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
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>Send Booking Request</span>
                        </>
                      )}
                    </motion.button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: 0.2,
                        type: "spring",
                        stiffness: 200,
                      }}
                      className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                      <CheckCircle className="w-10 h-10 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-4">Thank You!</h3>
                    <p className="text-slate-300 mb-6">
                      Your booking request has been sent successfully. We'll get
                      back to you within 24 hours.
                    </p>
                    <div className="flex items-center justify-center space-x-2 text-amber-400">
                      <Star className="w-5 h-5 fill-current" />
                      <span>We're excited to work with you!</span>
                      <Star className="w-5 h-5 fill-current" />
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Bottom Bar */}
      <motion.div
        className="relative z-10 border-t border-white/10 px-6 py-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                <Camera className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-lg">PhotoStudio</h4>
                <p className="text-slate-400 text-sm">
                  Capturing Life's Beautiful Moments
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-6 text-slate-400 text-sm">
              <span>© 2024 PhotoStudio. All rights reserved.</span>
              <div className="flex items-center space-x-4">
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-300"
                >
                  Privacy Policy
                </a>
                <span>•</span>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-300"
                >
                  Terms of Service
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-slate-400">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Available 24/7</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
