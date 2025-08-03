"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Link from "next/link";
import { format } from "date-fns";

import { Search, Filter,BookOpen,X } from "lucide-react";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  category: string;
  tags: string[];
  createdAt: string;
  readTime: string;
  views: number;
  likes: number;
  comments: number;
  featured: boolean;
  hasVideo: boolean;
}

const Blog: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<Blog[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs`,
          {
            withCredentials: true,
          }
        );
        setBlogPosts(res.data.blogs || res.data); // depends on API structure
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

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
  if (loading) {
    return (
      <div className="text-center py-24">
        <p className="text-gray-500 text-lg">Loading blogs...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-red-50 pt-16">
      {/* Header */}
      <div className="text-center py-5 xl:py-16  bg-gradient-to-br from-slate-50 to-white">
        <span className="inline-block px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-medium mb-6">
          Blog & Insights
        </span>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-red-700 via-red-600 to-amber-600 bg-clip-text text-transparent">
          Read Our <br />
          <span className="text-slate-800">Recent Blogs </span>
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          blog is a platform where we share our latest insights, tips, and
          stories from the world of photography. Whether you're a professional
          photographer or just starting out, you'll find valuable information to
          help you grow your skills and stay updated with the latest trends.
        </p>
        <div className="mt-6 flex justify-center">
          <BookOpen className="w-12 h-12 text-red-600" />
        </div>
      </div>

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
             <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                className="  overflow-hidden"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">
                    Filter by Category
                  </h3>
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
            </div>
          </motion.div>
          {/* Blog Posts Grid */}
          <motion.div
            key={selectedCategory + searchTerm}
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            className="grid md:grid-cols-2 gap-12"
          >
            {filteredPosts.map((post) => (
              <motion.article
                key={post._id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-[#f8f6f2] rounded-lg overflow-hidden shadow-md transition-all duration-500"
              >
                {/* Image */}
                <div className="w-full aspect-[3/2] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-3">
                    {post.title}
                  </h2>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {post.content.slice(0, 150)}...
                  </p>
                  {/* Read More */}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-sm text-red-500 font-medium flex items-center gap-1 hover:underline"
                  >
                    Read More →
                  </Link>
                  {/* Date */}
                  <p className="text-xs text-gray-500 mt-3">
                    {format(new Date(post.createdAt), "yyyy-MM-dd")}
                  </p>
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
                className="bg-red-800 hover:bg-red-900 text-white px-8 py-4 rounded-full text-lg font-medium shadow-md transition-all duration-300"
              >
                Load More Posts
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
