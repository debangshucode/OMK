"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Star, 
  Heart, 
  MessageSquare, 
  Calendar,
  Send,
} from 'lucide-react';
import axios from 'axios';
import Cookies from 'js-cookie';

const ClientReviews: React.FC = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [submitting, setSubmitting] = useState(false);

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

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating > 0 && reviewText.trim()) {
      try {
        setSubmitting(true);

        const token = Cookies.get("token");
        if (!token) {
          alert("Please login to submit a review.");
          return;
        }

        const response = await axios.post(
          "http://localhost:4000/api/reviews",
          {
            rating,
            comment: reviewText,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Review submitted:", response.data);
        alert("Thank you for your review!");
        setRating(0);
        setReviewText('');
      } catch (error: any) {
        console.error("Review submission failed:", error.response?.data || error.message);
        alert("Failed to submit review.");
      } finally {
        setSubmitting(false);
      }
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
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Reviews & Testimonials</h2>
          <p className="text-gray-600">Share your experience and see what others are saying</p>
        </div>
      </div>

      {/* Review Form */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 max-w-2xl mx-auto"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-6">Write a Review</h3>
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
            disabled={submitting || rating === 0 || !reviewText.trim()}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>{submitting ? "Submitting..." : "Submit Review"}</span>
          </motion.button>
        </form>
      </motion.div>

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
    </div>
  );
};

export default ClientReviews;
