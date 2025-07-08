"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Search,
  Filter,
  Calendar,
  User,
  Eye,
  Heart,
  MessageSquare,
  Clock,
  Tag,
  ArrowRight,
  BookOpen,
  TrendingUp,
  Star,
  Youtube,
  X,
} from "lucide-react";

const Blog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const blogPosts = [
    {
      id: 1,
      title: "Top 10 Wedding Photography Tips for Perfect Shots",
      slug: "wedding-photography-tips-perfect-shots",
      excerpt:
        "Discover essential tips and techniques for capturing stunning wedding moments that couples will treasure forever. Learn about lighting, composition, and timing.",
      content:
        "Wedding photography is an art that requires skill, patience, and creativity...",
      featuredImage:
        "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      author: "Alex Thompson",
      category: "Wedding Photography",
      tags: ["wedding", "photography", "tips", "couples"],
      publishDate: "2024-01-15",
      readTime: "5 min read",
      views: 2456,
      likes: 189,
      comments: 23,
      featured: true,
      hasVideo: true,
    },
    {
      id: 2,
      title: "Behind the Scenes: Corporate Event Photography",
      slug: "behind-scenes-corporate-event-photography",
      excerpt:
        "Learn the secrets of professional corporate event photography and how to capture the essence of business gatherings with style and professionalism.",
      content:
        "Corporate events require a different approach to photography...",
      featuredImage:
        "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      author: "Sarah Mitchell",
      category: "Corporate Photography",
      tags: ["corporate", "events", "business", "professional"],
      publishDate: "2024-01-12",
      readTime: "7 min read",
      views: 1834,
      likes: 156,
      comments: 18,
      featured: false,
      hasVideo: false,
    },
    {
      id: 3,
      title: "The Art of Pre-Wedding Photography",
      slug: "art-pre-wedding-photography",
      excerpt:
        "Explore creative techniques and ideas for memorable pre-wedding photography sessions that tell love stories in the most beautiful way.",
      content: "Pre-wedding shoots are becoming increasingly popular...",
      featuredImage:
        "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      author: "Mike Johnson",
      category: "Pre-Wedding",
      tags: ["pre-wedding", "couples", "romance", "creativity"],
      publishDate: "2024-01-10",
      readTime: "6 min read",
      views: 1567,
      likes: 134,
      comments: 15,
      featured: false,
      hasVideo: true,
    },
    {
      id: 4,
      title: "Portrait Photography: Capturing Personality",
      slug: "portrait-photography-capturing-personality",
      excerpt:
        "Master the art of portrait photography with techniques for bringing out the best in your subjects and creating compelling character studies.",
      content:
        "Portrait photography is about more than just taking pictures...",
      featuredImage:
        "https://images.pexels.com/photos/1024967/pexels-photo-1024967.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      author: "Emma Davis",
      category: "Portrait",
      tags: ["portrait", "personality", "lighting", "composition"],
      publishDate: "2024-01-08",
      readTime: "4 min read",
      views: 1234,
      likes: 98,
      comments: 12,
      featured: false,
      hasVideo: false,
    },
    {
      id: 5,
      title: "Event Photography: Telling Stories Through Images",
      slug: "event-photography-telling-stories",
      excerpt:
        "Learn how to document events effectively, capturing both the big moments and intimate details that make each celebration unique.",
      content: "Event photography requires quick thinking and adaptability...",
      featuredImage:
        "https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      author: "David Wilson",
      category: "Event Photography",
      tags: ["events", "storytelling", "candid", "moments"],
      publishDate: "2024-01-05",
      readTime: "8 min read",
      views: 987,
      likes: 76,
      comments: 9,
      featured: false,
      hasVideo: true,
    },
    {
      id: 6,
      title: "Photography Equipment Guide for Beginners",
      slug: "photography-equipment-guide-beginners",
      excerpt:
        "A comprehensive guide to essential photography equipment for beginners, including cameras, lenses, and accessories to get you started.",
      content: "Starting your photography journey can be overwhelming...",
      featuredImage:
        "https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      author: "Lisa Chen",
      category: "Equipment",
      tags: ["equipment", "beginners", "cameras", "lenses"],
      publishDate: "2024-01-03",
      readTime: "10 min read",
      views: 2134,
      likes: 167,
      comments: 28,
      featured: false,
      hasVideo: false,
    },
  ];

  const categories = [
    "all",
    "Wedding Photography",
    "Corporate Photography",
    "Pre-Wedding",
    "Portrait",
    "Event Photography",
    "Equipment",
  ];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesCategory =
      selectedCategory === "all" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-red-50">
      {/* Hero Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-red-600 to-red-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full"></div>
          <div className="absolute top-40 right-32 w-24 h-24 bg-amber-300 rounded-full"></div>
          <div className="absolute bottom-32 left-40 w-20 h-20 bg-white rounded-full"></div>
        </div>

        <motion.div
          className="relative z-10 max-w-7xl mx-auto text-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <div className="flex justify-center">
              <div className=" w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-8 shadow-2xl">
                <BookOpen className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Photography
              <br />
              <span className="text-amber-300">Blog</span>
            </h1>
            <p className="text-xl text-red-100 max-w-3xl mx-auto leading-relaxed mb-8">
              Explore our collection of photography tips, tutorials,
              behind-the-scenes stories, and creative inspiration from
              professional photographers.
            </p>
            <div className="flex items-center justify-center space-x-6 text-red-200">
              <span className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5" />
                <span>{blogPosts.length} Articles</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-2">
                <Eye className="w-5 h-5" />
                <span>
                  {blogPosts
                    .reduce((sum, post) => sum + post.views, 0)
                    .toLocaleString()}{" "}
                  Views
                </span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-2">
                <Heart className="w-5 h-5" />
                <span>
                  {blogPosts.reduce((sum, post) => sum + post.likes, 0)} Likes
                </span>
              </span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Search and Filters */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="visible"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 mb-12"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search blog posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 text-gray-900"
                />
              </div>

              {/* Filter Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl border transition-all duration-300 cursor-pointer ${
                  showFilters
                    ? "bg-red-50 border-red-200 text-red-600"
                    : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Filter className="w-5 h-5" />
                <span>Categories</span>
              </motion.button>
            </div>

            {/* Category Filters */}
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                className="mt-6 pt-6 border-t border-gray-200 overflow-hidden"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">
                    Filter by Category
                  </h3>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {categories.map((category) => (
                    <motion.button
                      key={category}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-full transition-all duration-300 cursor-pointer ${
                        selectedCategory === category
                          ? "bg-red-600 text-white shadow-lg"
                          : "bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600"
                      }`}
                    >
                      {category === "all" ? "All Categories" : category}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Blog Posts Grid */}
          <motion.div
            key={selectedCategory + searchTerm}
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer group"
              >
                {/* Image */}
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex space-x-2">
                    {post.featured && (
                      <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                        <Star className="w-3 h-3 fill-current" />
                        <span>Featured</span>
                      </span>
                    )}
                    {post.hasVideo && (
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        <Youtube className="w-3 h-3" />
                      </span>
                    )}
                  </div>

                  {/* Stats Overlay */}
                  <div className="absolute bottom-4 left-4 flex space-x-4 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{post.views}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Heart className="w-4 h-4" />
                      <span>{post.likes}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <MessageSquare className="w-4 h-4" />
                      <span>{post.comments}</span>
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                    <span className="text-slate-500 text-sm flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime}</span>
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-slate-800 mb-3 line-clamp-2 group-hover:text-red-600 transition-colors duration-300">
                    {post.title}
                  </h2>

                  <p className="text-slate-600 mb-4 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-slate-100 text-slate-600"
                      >
                        <Tag className="w-2 h-2 mr-1" />
                        {tag}
                      </span>
                    ))}
                    {post.tags.length > 3 && (
                      <span className="text-xs text-slate-400">
                        +{post.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Author and Date */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-800">
                          {post.author}
                        </p>
                        <p className="text-xs text-slate-500 flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{post.publishDate}</span>
                        </p>
                      </div>
                    </div>
                    <Link href={`/blog/${post.slug}`}>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors duration-300 cursor-pointer"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {/* Load More */}
          {filteredPosts.length > 0 && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={itemVariants}
              className="text-center mt-16"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 mx-auto cursor-pointer"
              >
                <span>Load More Posts</span>
                <TrendingUp className="w-5 h-5" />
              </motion.button>
            </motion.div>
          )}

          {/* No Results */}
          {filteredPosts.length === 0 && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={itemVariants}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">
                No Posts Found
              </h3>
              <p className="text-slate-600 mb-8">
                Try adjusting your search terms or browse all categories.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 cursor-pointer"
              >
                Clear Filters
              </motion.button>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
