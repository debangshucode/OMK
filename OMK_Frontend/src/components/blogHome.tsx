"use client";
import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Calendar,
  User,
  Eye,
  Heart,
  MessageSquare,
  ArrowRight,
  Clock,
  Tag,
  BookOpen,
  TrendingUp,
  Star,
  Youtube,
} from "lucide-react";

const BlogHome: React.FC = () => {
  const recentBlogs = [
    {
      id: 1,
      title: "Top 10 Wedding Photography Tips for Perfect Shots",
      slug: "wedding-photography-tips-perfect-shots",
      excerpt:
        "Discover essential tips and techniques for capturing stunning wedding moments that couples will treasure forever.",
      featuredImage:
        "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      author: "Alex Thompson",
      category: "Wedding Photography",
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
        "Learn the secrets of professional corporate event photography and how to capture the essence of business gatherings.",
      featuredImage:
        "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      author: "Sarah Mitchell",
      category: "Corporate Photography",
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
        "Explore creative techniques and ideas for memorable pre-wedding photography sessions that tell love stories.",
      featuredImage:
        "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      author: "Mike Johnson",
      category: "Pre-Wedding",
      publishDate: "2024-01-10",
      readTime: "6 min read",
      views: 1567,
      likes: 134,
      comments: 15,
      featured: false,
      hasVideo: true,
    },
  ];
  const router = useRouter();
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
    <section className="py-20 bg-gradient-to-br from-red-50 to-red-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-red-600 rounded-full"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-amber-500 rounded-full"></div>
        <div className="absolute bottom-32 left-40 w-20 h-20 bg-red-500 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-amber-400 rounded-full"></div>
      </div>

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <div className="flex items-center justify-center">
            <div className=" w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-700 via-red-600 to-amber-600 bg-clip-text text-transparent">
            Latest from Our
            <br />
            <span className="text-slate-800">Photography Blog</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Discover photography tips, behind-the-scenes stories, and creative
            inspiration from our team of professional photographers.
          </p>
        </motion.div>

        {/* Featured Blog */}
        <motion.div variants={itemVariants} className="mb-16">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Image */}
              <div className="relative aspect-[4/3] lg:aspect-auto">
                <img
                  src={recentBlogs[0].featuredImage}
                  alt={recentBlogs[0].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex space-x-2">
                  <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                    <Star className="w-3 h-3 fill-current" />
                    <span>Featured</span>
                  </span>
                  {recentBlogs[0].hasVideo && (
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      <Youtube className="w-3 h-3" />
                    </span>
                  )}
                </div>

                {/* Stats Overlay */}
                <div className="absolute bottom-4 left-4 flex space-x-4 text-white text-sm">
                  <span className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{recentBlogs[0].views}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Heart className="w-4 h-4" />
                    <span>{recentBlogs[0].likes}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <MessageSquare className="w-4 h-4" />
                    <span>{recentBlogs[0].comments}</span>
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
                    {recentBlogs[0].category}
                  </span>
                  <span className="text-slate-500 text-sm">
                    {recentBlogs[0].readTime}
                  </span>
                </div>

                <h3 className="text-3xl font-bold text-slate-800 mb-4 leading-tight">
                  {recentBlogs[0].title}
                </h3>

                <p className="text-slate-600 mb-6 leading-relaxed text-lg">
                  {recentBlogs[0].excerpt}
                </p>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">
                        {recentBlogs[0].author}
                      </p>
                      <p className="text-sm text-slate-500 flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{recentBlogs[0].publishDate}</span>
                      </p>
                    </div>
                  </div>
                </div>

                <motion.button
                  onClick={() => router.push("/blog")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 cursor-pointer"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recent Blog Posts Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {recentBlogs.slice(1).map((blog, index) => (
            <motion.div
              key={blog.id}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer"
            >
              {/* Image */}
              <div className="relative aspect-[16/9]">
                <img
                  src={blog.featuredImage}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

                {blog.hasVideo && (
                  <div className="absolute top-3 right-3">
                    <div className="bg-red-500 text-white p-1.5 rounded-full">
                      <Youtube className="w-4 h-4" />
                    </div>
                  </div>
                )}

                <div className="absolute bottom-3 left-3 flex space-x-3 text-white text-sm">
                  <span className="flex items-center space-x-1">
                    <Eye className="w-3 h-3" />
                    <span>{blog.views}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Heart className="w-3 h-3" />
                    <span>{blog.likes}</span>
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-medium">
                    {blog.category}
                  </span>
                  <span className="text-slate-500 text-xs flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{blog.readTime}</span>
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-800 mb-3 line-clamp-2 hover:text-red-600 transition-colors duration-300">
                  {blog.title}
                </h3>

                <p className="text-slate-600 mb-4 line-clamp-2 leading-relaxed">
                  {blog.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-800">
                        {blog.author}
                      </p>
                      <p className="text-xs text-slate-500">
                        {blog.publishDate}
                      </p>
                    </div>
                  </div>

                  <motion.button
                    onClick={() => router.push("/blog")}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors duration-300 cursor-pointer"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Blog Stats */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-2xl p-8 shadow-lg mb-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <BookOpen className="w-6 h-6 text-red-600" />
              </div>
              <h4 className="text-2xl font-bold text-slate-800 mb-1">50+</h4>
              <p className="text-slate-600 text-sm">Blog Posts</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Eye className="w-6 h-6 text-amber-600" />
              </div>
              <h4 className="text-2xl font-bold text-slate-800 mb-1">25K+</h4>
              <p className="text-slate-600 text-sm">Total Views</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Heart className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="text-2xl font-bold text-slate-800 mb-1">2.5K+</h4>
              <p className="text-slate-600 text-sm">Likes</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <MessageSquare className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="text-2xl font-bold text-slate-800 mb-1">500+</h4>
              <p className="text-slate-600 text-sm">Comments</p>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div variants={itemVariants} className="text-center">
          <motion.button
            onClick={() => router.push("/blog")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 mx-auto cursor-pointer"
          >
            <span>View All Blog Posts</span>
            <TrendingUp className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default BlogHome;
