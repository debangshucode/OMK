"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Clock, Trash2 } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reviews`, {
          withCredentials: true,
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
      await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/reviews/${reviewId}`,
        { approved },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      toast.success("Review status updated.");
      setReviews((prev) => prev.map((r) => (r._id === reviewId ? { ...r, approved } : r)));
    } catch (error: any) {
      console.error("Update error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to update review.");
    }
  };

  const confirmDeleteReview = async () => {
    if (!deleteTarget) return;
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reviews/${deleteTarget}`, {
        withCredentials: true,
      });

      toast.success("Review deleted successfully.");
      setReviews((prev) => prev.filter((r) => r._id !== deleteTarget));
      setDeleteTarget(null);
    } catch (error: any) {
      console.error("Delete error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to delete review.");
    }
  };

  const getStatusIcon = (approved: boolean | null | undefined) => {
    if (approved === true) return <CheckCircle className="w-4 h-4 text-green-600" />;
    if (approved === false) return <XCircle className="w-4 h-4 text-red-600" />;
    return <Clock className="w-4 h-4 text-yellow-600" />;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Client Reviews</h2>
        <p className="text-gray-600 text-sm">View and manage submitted reviews</p>
      </div>

      <div className="bg-gray-50 rounded-lg border p-6 shadow">
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews found.</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="bg-white border rounded-lg p-4 shadow flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4"
              >
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-800 text-lg">{review.name}</h3>
                    {getStatusIcon(review.approved)}
                  </div>
                  <p className="text-sm text-yellow-600">
                    {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                    <span className="ml-1 text-gray-500">({review.rating}/5)</span>
                  </p>
                  <p className="text-gray-700 text-sm">{review.comment}</p>
                </div>

                <div className="flex space-x-2 min-w-fit">
                  <button
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                    onClick={() => handleReviewStatusChange(review._id, true)}
                    disabled={review.approved === true}
                  >
                    Approve
                  </button>
                  <button
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                    onClick={() => handleReviewStatusChange(review._id, false)}
                    disabled={review.approved === false}
                  >
                    Decline
                  </button>
                  <button
                    className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 text-sm"
                    onClick={() => setDeleteTarget(review._id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Confirm Deletion</h3>
            <p className="text-sm text-gray-600 mb-6">Are you sure you want to delete this review? This action cannot be undone.</p>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded text-gray-800"
                onClick={() => setDeleteTarget(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
                onClick={confirmDeleteReview}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewsSection;
