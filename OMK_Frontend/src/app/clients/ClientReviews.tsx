"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Star, 
  Plus, 
  Heart, 
  MessageSquare, 
  Calendar,
  User,
  Send,
  X
} from 'lucide-react';

const ClientReviews: React.FC = () => {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const reviews = [
    {
      id: 1,
      clientName: "Sarah Johnson",
      rating: 5,
      date: "2024-01-20",
      comment: "Absolutely amazing work! Every moment was captured perfectly. The team was professional and made us feel comfortable throughout the entire process.",
      service: "Wedding Photography",
      avatar: "/images/weadingHome1.jpg",
      likes: 23,
      replies: 3
    },
    {
      id: 2,
      clientName: "Emma Rodriguez",
      rating: 5,
      date: "2024-01-18",
      comment: "Professional and creative. Loved our pre-wedding shoot! The photos exceeded our expectations and the editing was flawless.",
      service: "Pre-Wedding Shoot",
      avatar: "/images/weadingHome2.jpg",
      likes: 18,
      replies: 2
    },
    {
      id: 3,
      clientName: "David Chen",
      rating: 4,
      date: "2024-01-15",
      comment: "Great corporate photography service. Very professional and delivered high-quality results on time.",
      service: "Corporate Photography",
      avatar: "/images/weadingHome3.jpg",
      likes: 12,
      replies: 1
    }
  ];

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating > 0 && reviewText.trim()) {
      // Handle review submission
      console.log('Review submitted:', { rating, reviewText });
      setShowReviewModal(false);
      setRating(0);
      setReviewText('');
    }
  };

  const renderStars = (currentRating: number, interactive: boolean = false) => {
    return [...Array(5)].map((_, index) => {
      const starValue = index + 1;
      return (
        <motion.button
          key={index}
          type={interactive ? "button" : undefined}
          whileHover={interactive ? { scale: 1.1 } : {}}
          whileTap={interactive ? { scale: 0.9 } : {}}
          onClick={interactive ? () => setRating(starValue) : undefined}
          onMouseEnter={interactive ? () => setHoverRating(starValue) : undefined}
          onMouseLeave={interactive ? () => setHoverRating(0) : undefined}
          className={`${interactive ? 'cursor-pointer' : 'cursor-default'} transition-colors duration-200`}
          disabled={!interactive}
        >
          <Star
            className={`w-5 h-5 ${
              starValue <= (interactive ? (hoverRating || rating) : currentRating)
                ? 'fill-amber-400 text-amber-400'
                : 'text-gray-300'
            }`}
          />
        </motion.button>
      );
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Reviews & Testimonials</h2>
          <p className="text-gray-600">Share your experience and see what others are saying</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowReviewModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 shadow-lg cursor-pointer"
        >
          <Plus className="w-5 h-5" />
          <span>Write Review</span>
        </motion.button>
      </div>

      {/* Reviews Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {reviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
          >
            <div className="flex items-center space-x-4 mb-4">
              <img 
                src={review.avatar}
                alt={review.clientName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <h4 className="font-bold text-gray-900">{review.clientName}</h4>
                <p className="text-sm text-blue-600">{review.service}</p>
              </div>
              <div className="flex items-center space-x-1">
                {renderStars(review.rating)}
              </div>
            </div>
            
            <p className="text-gray-700 mb-4 leading-relaxed">"{review.comment}"</p>
            
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{review.date}</span>
              </div>
              <div className="flex items-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-1 hover:text-red-600 cursor-pointer"
                >
                  <Heart className="w-4 h-4" />
                  <span>{review.likes}</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-1 hover:text-blue-600 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{review.replies}</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowReviewModal(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-xl p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Write a Review</h3>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowReviewModal(false)}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                <div className="flex space-x-1">
                  {renderStars(rating, true)}
                </div>
                {rating > 0 && (
                  <p className="text-sm text-gray-600 mt-2">
                    {rating === 1 && "Poor"}
                    {rating === 2 && "Fair"}
                    {rating === 3 && "Good"}
                    {rating === 4 && "Very Good"}
                    {rating === 5 && "Excellent"}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
                <textarea
                  rows={4}
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="w-full text-gray-900 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Share your experience with us..."
                  required
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={rating === 0 || !reviewText.trim()}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Review</span>
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default ClientReviews;