"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { customItems } from "@/data/index";
import Image from "next/image";
import {
  Calendar,
  User,
  Eye,
  Heart,
  MessageSquare,
  Share2,
  Clock,
  Tag,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ThumbsUp,
  Send,
  Facebook,
  Twitter,
  Linkedin,
  Link,
  Youtube,
  Star,
  Quote,
} from "lucide-react";

interface Comment {
  id: number;
  author: string;
  avatar: string;
  content: string;
  date: string;
  likes: number;
  replies?: Comment[];
}
interface BlogPostProps {
  blogPost: any; // or define a proper Blog type
}
const BlogPost: React.FC = () => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(189);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(0);

  const imageItems = customItems.filter((item) => item.image);
  // Mock blog post data
  const blogPost = {
    id: 1,
    title: "Top 10 Wedding Photography Tips for Perfect Shots",
    slug: "wedding-photography-tips-perfect-shots",
    content: `
      <p>Wedding photography is an art that requires skill, patience, and creativity. As a professional photographer, I've captured hundreds of weddings, and each one teaches me something new. Today, I want to share my top 10 tips that will help you capture stunning wedding moments that couples will treasure forever.</p>

      <h2>1. Scout the Venue in Advance</h2>
      <p>Before the big day, visit the wedding venue to familiarize yourself with the lighting conditions, layout, and potential photo spots. This preparation allows you to plan your shots and identify the best locations for different parts of the ceremony and reception.</p>

      <h2>2. Master Natural Light</h2>
      <p>Natural light is your best friend in wedding photography. Learn to work with different lighting conditions throughout the day - from the soft morning light during preparation to the golden hour for romantic portraits. Avoid harsh midday sun when possible, or use it creatively with proper positioning.</p>

      <h2>3. Capture Candid Emotions</h2>
      <p>While posed shots are important, the most memorable wedding photos often capture genuine emotions and spontaneous moments. Keep your camera ready for tears of joy, laughter, and intimate glances between the couple and their loved ones.</p>

      <h2>4. Focus on Details</h2>
      <p>Don't forget to photograph the small details that make each wedding unique - the rings, flowers, decorations, and personal touches. These detail shots help tell the complete story of the day and are often cherished by couples.</p>

      <h2>5. Use Multiple Angles</h2>
      <p>Vary your shooting angles to create visual interest. Shoot from high above during the ceremony, get down low for dramatic perspectives, and use different focal lengths to capture both wide establishing shots and intimate close-ups.</p>
    `,
    featuredImage:
      "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
    author: "Alex Thompson",
    authorBio:
      "Professional wedding photographer with over 8 years of experience capturing love stories around the world.",
    authorAvatar:
      "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    category: "Wedding Photography",
    tags: ["wedding", "photography", "tips", "couples", "professional"],
    publishDate: "2024-01-15",
    readTime: "5 min read",
    views: 2456,
    likes: 189,
    comments: 23,
    featured: true,
    hasVideo: true,
    youtubeUrl: "https://www.youtube.com/watch?v=example",
  };

  const comments: Comment[] = [
    {
      id: 1,
      author: "Sarah Johnson",
      avatar:
        "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop",
      content:
        "This is incredibly helpful! I'm getting married next month and will definitely share these tips with our photographer.",
      date: "2024-01-16",
      likes: 12,
      replies: [
        {
          id: 2,
          author: "Alex Thompson",
          avatar:
            "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop",
          content:
            "Thank you Sarah! I'm sure your photographer will appreciate the collaboration. Wishing you a beautiful wedding!",
          date: "2024-01-16",
          likes: 5,
        },
      ],
    },
    {
      id: 3,
      author: "Mike Davis",
      avatar:
        "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop",
      content:
        "As a fellow photographer, I can confirm these tips are spot on. The natural light advice especially resonates with me.",
      date: "2024-01-16",
      likes: 8,
    },
    {
      id: 4,
      author: "Emma Wilson",
      avatar:
        "https://images.pexels.com/photos/1024967/pexels-photo-1024967.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop",
      content:
        "Love the emphasis on candid moments! Those are always my favorite photos from weddings.",
      date: "2024-01-17",
      likes: 6,
    },
  ];

  const relatedPosts = [
    {
      id: 2,
      title: "Behind the Scenes: Corporate Event Photography",
      image:
        "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      readTime: "7 min read",
    },
    {
      id: 3,
      title: "The Art of Pre-Wedding Photography",
      image:
        "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      readTime: "6 min read",
    },
  ];

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = blogPost.title;

    switch (platform) {
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${url}`,
          "_blank"
        );
        break;
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
          "_blank"
        );
        break;
      case "linkedin":
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
          "_blank"
        );
        break;
      case "copy":
        navigator.clipboard.writeText(url);
        break;
    }
    setShowShareMenu(false);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      console.log("New comment:", newComment);
      setNewComment("");
    }
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
        ease: "easeOut" as const, // Ensure 'easeOut' is treated as a constant
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-red-50 py-15">
      {/* Main Content */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="visible"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {/* Blog Heading */}
            <motion.div variants={itemVariants} className="mb-12 text-center">
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-6">
                {blogPost.title}
              </h1>
            </motion.div>
            {/* Featured Image */}
            <motion.div variants={itemVariants} className="mb-12">
              <img
                src={blogPost.featuredImage}
                alt={blogPost.title}
                className="w-full aspect-[16/9] object-cover rounded-2xl shadow-2xl"
              />
            </motion.div>
            {/* Author Info */}
            <motion.div variants={itemVariants} className="mb-12">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Author Segment
              </h3>
              <p className="text-md text-gray-800 ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
                eos expedita non ratione consequatur optio, nobis, est,
                consequuntur eius repellendus reiciendis aut debitis. Quos
                aperiam adipisci at nesciunt, sequi sint.
              </p>
            </motion.div>

            {/* YouTube Video */}
            {blogPost.hasVideo && (
              <motion.div variants={itemVariants} className="mb-12">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                  <div className="flex items-center space-x-3 mb-4">
                    <Youtube className="w-6 h-6 text-red-600" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      Watch the Video Tutorial
                    </h3>
                  </div>
                  <div className="aspect-video bg-gray-100 rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <Youtube className="w-16 h-16 text-red-600 mx-auto mb-4" />
                      <p className="text-gray-600">
                        Video content would be embedded here
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Article Content */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl p-8 lg:p-12 shadow-lg border border-gray-200 mb-12"
            >
              <div
                className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: blogPost.content }}
              />

              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Tags
                </h4>
                <div className="flex flex-wrap gap-3">
                  {blogPost.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-4 py-2 rounded-full text-sm bg-red-100 text-red-700 hover:bg-red-200 transition-colors duration-300 cursor-pointer"
                    >
                      <Tag className="w-3 h-3 mr-2" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Author Bio */}
           

            {/* Images related to blog */}
            <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="columns-3 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4">
                {imageItems.map((item, index) => (
                  <div
                    key={index}
                    className="break-inside-avoid cursor-pointer bg-white rounded-xl overflow-hidden shadow-sm"
                  >
                    <Image
                      src={item.image!}
                      alt={item.label!}
                      width={500}
                      height={500}
                      className="w-full h-auto object-contain"
                      unoptimized
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Related Posts */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-8">
                Related Articles
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {relatedPosts.map((post) => (
                  <motion.div
                    key={post.id}
                    whileHover={{ y: -5 }}
                    className="group cursor-pointer"
                  >
                    <div className="aspect-[16/9] rounded-xl overflow-hidden mb-4">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h4 className="font-semibold text-gray-900 group-hover:text-red-600 transition-colors duration-300 mb-2">
                      {post.title}
                    </h4>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{post.readTime}</span>
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors duration-300 cursor-pointer"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
