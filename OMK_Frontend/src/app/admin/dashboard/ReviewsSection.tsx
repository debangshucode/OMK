"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Star,
  CheckCircle,
  EyeOff,
  Eye,
  XCircle,
  Clock
} from 'lucide-react';
import axios from 'axios';

const ReviewsSection: React.FC = () => {
  const [selectedReviews, setSelectedReviews] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filterRating, setFilterRating] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterService, setFilterService] = useState('all');
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/reviews", {
          withCredentials: true
        });
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  const handleReviewStatusChange = async (reviewId: string, approved: boolean) => {
    try {
      const response = await axios.patch(
        `http://localhost:4000/api/reviews/${reviewId}`,
        { approved },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Review status updated:", response.data);

      // Update local UI
      setReviews(prev =>
        prev.map(r =>
          r._id === reviewId ? { ...r, approved } : r
        )
      );
    } catch (error: any) {
      console.error("Failed to update review:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to update review.");
    }
  };

  const getStatusIcon = (approved: boolean | null | undefined) => {
    if (approved === true) return <CheckCircle className="w-4 h-4 text-green-600" />;
    if (approved === false) return <XCircle className="w-4 h-4 text-red-600" />;
    return <Clock className="w-4 h-4 text-yellow-600" />;
  };

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl lg:text-2xl font-bold text-gray-900">Reviews</h2>
          <p className="text-sm lg:text-base text-gray-600">Manage client reviews and testimonials</p>
        </div>
        <div className="flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-amber-600 hover:bg-amber-700 text-white px-3 lg:px-4 py-2 rounded-lg flex items-center space-x-2 shadow-lg text-sm lg:text-base"
          >
            <Star className="w-4 h-4 lg:w-5 lg:h-5" />
            <span className="hidden sm:inline">Request Review</span>
            <span className="sm:hidden">Request</span>
          </motion.button>
        </div>
      </div>

      {/* Reviews List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 lg:p-6">
        <div className="space-y-4">
          {reviews.length === 0 ? (
            <p className="text-gray-500">No reviews available.</p>
          ) : (
            reviews.map((review: any) => (
              <div
                key={review._id}
                className="border p-4 rounded-lg shadow-sm bg-white space-y-2"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg text-gray-800">{review.name}</h3>
                  <div>{getStatusIcon(review.approved)}</div>
                </div>

                <div className="flex items-center text-yellow-500">
                  {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                  <span className="ml-2 text-gray-600">({review.rating}/5)</span>
                </div>

                <p className="text-gray-700">{review.comment}</p>

                <div className='flex space-x-4 mt-4'>
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition duration-300"
                    onClick={() => handleReviewStatusChange(review._id, true)}
                    disabled={review.approved === true}
                  >
                    Approve
                  </button>

                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition duration-300"
                    onClick={() => handleReviewStatusChange(review._id, false)}
                    disabled={review.approved === false}
                  >
                    Decline
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewsSection;
