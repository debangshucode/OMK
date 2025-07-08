"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';

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
  Quote
} from 'lucide-react';

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
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(0);

  // Mock blog post data
  const blogPost = {
    id: 1,
    title: 'Top 10 Wedding Photography Tips for Perfect Shots',
    slug: 'wedding-photography-tips-perfect-shots',
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
    featuredImage: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
    author: 'Alex Thompson',
    authorBio: 'Professional wedding photographer with over 8 years of experience capturing love stories around the world.',
    authorAvatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    category: 'Wedding Photography',
    tags: ['wedding', 'photography', 'tips', 'couples', 'professional'],
    publishDate: '2024-01-15',
    readTime: '5 min read',
    views: 2456,
    likes: 189,
    comments: 23,
    featured: true,
    hasVideo: true,
    youtubeUrl: 'https://www.youtube.com/watch?v=example'
  };

  const comments: Comment[] = [
    {
      id: 1,
      author: 'Sarah Johnson',
      avatar: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
      content: 'This is incredibly helpful! I\'m getting married next month and will definitely share these tips with our photographer.',
      date: '2024-01-16',
      likes: 12,
      replies: [
        {
          id: 2,
          author: 'Alex Thompson',
          avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
          content: 'Thank you Sarah! I\'m sure your photographer will appreciate the collaboration. Wishing you a beautiful wedding!',
          date: '2024-01-16',
          likes: 5
        }
      ]
    },
    {
      id: 3,
      author: 'Mike Davis',
      avatar: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
      content: 'As a fellow photographer, I can confirm these tips are spot on. The natural light advice especially resonates with me.',
      date: '2024-01-16',
      likes: 8
    },
    {
      id: 4,
      author: 'Emma Wilson',
      avatar: 'https://images.pexels.com/photos/1024967/pexels-photo-1024967.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
      content: 'Love the emphasis on candid moments! Those are always my favorite photos from weddings.',
      date: '2024-01-17',
      likes: 6
    }
  ];

  const relatedPosts = [
    {
      id: 2,
      title: 'Behind the Scenes: Corporate Event Photography',
      image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      readTime: '7 min read'
    },
    {
      id: 3,
      title: 'The Art of Pre-Wedding Photography',
      image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      readTime: '6 min read'
    }
  ];

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = blogPost.title;
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        break;
    }
    setShowShareMenu(false);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      console.log('New comment:', newComment);
      setNewComment('');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const // Ensure 'easeOut' is treated as a constant
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-red-50">
      {/* Hero Section */}
      <section className="relative py-20 px-6 bg-gradient-to-r from-red-600 to-red-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-amber-300 rounded-full"></div>
        </div>

        <motion.div 
          className="relative z-10 max-w-4xl mx-auto"
          initial="visible"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="mb-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 text-red-200 hover:text-white transition-colors duration-300 cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Blog</span>
            </motion.button>
          </motion.div>

          <motion.div variants={itemVariants} className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                {blogPost.category}
              </span>
              {blogPost.featured && (
                <span className="bg-amber-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-1">
                  <Star className="w-3 h-3 fill-current" />
                  <span>Featured</span>
                </span>
              )}
              {blogPost.hasVideo && (
                <span className="bg-red-400 text-white px-4 py-2 rounded-full text-sm font-medium">
                  <Youtube className="w-3 h-3" />
                </span>
              )}
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {blogPost.title}
            </h1>

            <div className="flex items-center justify-center space-x-6 text-red-200 mb-8">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>{blogPost.author}</span>
              </div>
              <span>•</span>
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>{blogPost.publishDate}</span>
              </div>
              <span>•</span>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>{blogPost.readTime}</span>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-8 text-red-200">
              <span className="flex items-center space-x-2">
                <Eye className="w-5 h-5" />
                <span>{blogPost.views} views</span>
              </span>
              <span className="flex items-center space-x-2">
                <Heart className="w-5 h-5" />
                <span>{likeCount} likes</span>
              </span>
              <span className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5" />
                <span>{blogPost.comments} comments</span>
              </span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="visible"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {/* Featured Image */}
            <motion.div variants={itemVariants} className="mb-12">
              <img
                src={blogPost.featuredImage}
                alt={blogPost.title}
                className="w-full aspect-[16/9] object-cover rounded-2xl shadow-2xl"
              />
            </motion.div>

            {/* YouTube Video */}
            {blogPost.hasVideo && (
              <motion.div variants={itemVariants} className="mb-12">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                  <div className="flex items-center space-x-3 mb-4">
                    <Youtube className="w-6 h-6 text-red-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Watch the Video Tutorial</h3>
                  </div>
                  <div className="aspect-video bg-gray-100 rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <Youtube className="w-16 h-16 text-red-600 mx-auto mb-4" />
                      <p className="text-gray-600">Video content would be embedded here</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Article Content */}
            <motion.div variants={itemVariants} className="bg-white rounded-2xl p-8 lg:p-12 shadow-lg border border-gray-200 mb-12">
              <div 
                className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: blogPost.content }}
              />

              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Tags</h4>
                <div className="flex flex-wrap gap-3">
                  {blogPost.tags.map(tag => (
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

            {/* Engagement Actions */}
            <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 mb-12">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6 flex-wrap ">
                  {/* Like Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLike}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 cursor-pointer ${
                      liked 
                        ? 'bg-red-100 text-red-600' 
                        : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
                    <span>{likeCount}</span>
                  </motion.button>

                  {/* Comment Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 cursor-pointer"
                  >
                    <MessageSquare className="w-5 h-5" />
                    <span>{blogPost.comments}</span>
                  </motion.button>

                  {/* Rating */}
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Rate:</span>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <motion.button
                          key={star}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setRating(star)}
                          className="cursor-pointer"
                        >
                          <Star
                            className={`w-4 h-4 ${
                              star <= rating 
                                ? 'fill-amber-400 text-amber-400' 
                                : 'text-gray-300 hover:text-amber-400'
                            } transition-colors duration-200`}
                          />
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Share Button */}
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className="flex items-center space-x-2 px-4 py-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-all duration-300 cursor-pointer"
                  >
                    <Share2 className="w-5 h-5" />
                    <span>Share</span>
                  </motion.button>

                  {/* Share Menu */}
                  {showShareMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-lg border border-gray-200 p-4 z-10"
                    >
                      <div className="flex space-x-3">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleShare('facebook')}
                          className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center cursor-pointer"
                        >
                          <Facebook className="w-5 h-5" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleShare('twitter')}
                          className="w-10 h-10 bg-blue-400 text-white rounded-full flex items-center justify-center cursor-pointer"
                        >
                          <Twitter className="w-5 h-5" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleShare('linkedin')}
                          className="w-10 h-10 bg-blue-700 text-white rounded-full flex items-center justify-center cursor-pointer"
                        >
                          <Linkedin className="w-5 h-5" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleShare('copy')}
                          className="w-10 h-10 bg-gray-600 text-white rounded-full flex items-center justify-center cursor-pointer"
                        >
                          <Link className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Author Bio */}
            <motion.div variants={itemVariants} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 mb-12">
              <div className="flex items-start space-x-6">
                <img
                  src={blogPost.authorAvatar}
                  alt={blogPost.author}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">About {blogPost.author}</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">{blogPost.authorBio}</p>
                  <div className="flex space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-red-600 hover:text-red-700 font-medium cursor-pointer"
                    >
                      View Profile
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
                    >
                      More Articles
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Comments Section */}
            <motion.div variants={itemVariants} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Comments ({comments.length})</h3>

              {/* Comment Form */}
              <form onSubmit={handleCommentSubmit} className="mb-8">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Share your thoughts..."
                      rows={3}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none text-gray-900"
                    />
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-sm text-gray-500">Be respectful and constructive</span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        disabled={!newComment.trim()}
                        className="bg-red-600 hover:bg-red-700 disabled:bg-gray-300 text-white px-6 py-2 rounded-full font-medium flex items-center space-x-2 cursor-pointer"
                      >
                        <Send className="w-4 h-4" />
                        <span>Post Comment</span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </form>

              {/* Comments List */}
              <div className="space-y-6">
                {comments.map((comment) => (
                  <div key={comment.id} className="border-b border-gray-100 pb-6 last:border-b-0">
                    <div className="flex items-start space-x-4">
                      <img
                        src={comment.avatar}
                        alt={comment.author}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-semibold text-gray-900">{comment.author}</h4>
                          <span className="text-sm text-gray-500">{comment.date}</span>
                        </div>
                        <p className="text-gray-700 leading-relaxed mb-3">{comment.content}</p>
                        <div className="flex items-center space-x-4">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center space-x-1 text-sm text-gray-500 hover:text-red-600 cursor-pointer"
                          >
                            <ThumbsUp className="w-4 h-4" />
                            <span>{comment.likes}</span>
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="text-sm text-gray-500 hover:text-blue-600 cursor-pointer"
                          >
                            Reply
                          </motion.button>
                        </div>

                        {/* Replies */}
                        {comment.replies && (
                          <div className="mt-4 ml-6 space-y-4">
                            {comment.replies.map((reply) => (
                              <div key={reply.id} className="flex items-start space-x-3">
                                <img
                                  src={reply.avatar}
                                  alt={reply.author}
                                  className="w-8 h-8 rounded-full object-cover"
                                />
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-1">
                                    <h5 className="font-medium text-gray-900 text-sm">{reply.author}</h5>
                                    <span className="text-xs text-gray-500">{reply.date}</span>
                                  </div>
                                  <p className="text-gray-700 text-sm leading-relaxed mb-2">{reply.content}</p>
                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center space-x-1 text-xs text-gray-500 hover:text-red-600 cursor-pointer"
                                  >
                                    <ThumbsUp className="w-3 h-3" />
                                    <span>{reply.likes}</span>
                                  </motion.button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Related Posts */}
            <motion.div variants={itemVariants} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h3>
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