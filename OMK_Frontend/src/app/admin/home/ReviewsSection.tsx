"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, 
  Search, 
  Filter, 
  Eye, 
  EyeOff, 
  Edit, 
  Trash2,
  Calendar,
  User,
  X,
  ThumbsUp,
  MessageSquare,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';

const ReviewsSection: React.FC = () => {
  const [selectedReviews, setSelectedReviews] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filterRating, setFilterRating] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterService, setFilterService] = useState('all');

  const reviews = [
    {
      id: 1,
      clientName: 'Sarah Johnson',
      clientEmail: 'sarah@email.com',
      rating: 5,
      service: 'Wedding Photography',
      date: '2024-01-15',
      status: 'published',
      title: 'Absolutely Amazing Experience!',
      content: 'The photography team exceeded all our expectations. Every moment of our special day was captured beautifully. The attention to detail and professionalism was outstanding. We couldn\'t be happier with the results!',
      likes: 23,
      helpful: 18,
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      id: 2,
      clientName: 'Emma Rodriguez',
      clientEmail: 'emma@email.com',
      rating: 5,
      service: 'Pre-Wedding Shoot',
      date: '2024-01-12',
      status: 'published',
      title: 'Perfect Pre-Wedding Session',
      content: 'Our pre-wedding shoot was magical! The photographer made us feel so comfortable and natural. Every shot was perfectly composed, and the romantic atmosphere they created was beyond our expectations.',
      likes: 15,
      helpful: 12,
      avatar: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      id: 3,
      clientName: 'David Chen',
      clientEmail: 'david@email.com',
      rating: 4,
      service: 'Corporate Photography',
      date: '2024-01-10',
      status: 'hidden',
      title: 'Professional and Reliable',
      content: 'Great corporate headshots and event coverage. The team was professional and delivered high-quality results. Minor delay in delivery but overall satisfied with the service.',
      likes: 8,
      helpful: 6,
      avatar: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      id: 4,
      clientName: 'Lisa Wilson',
      clientEmail: 'lisa@email.com',
      rating: 5,
      service: 'Family Photography',
      date: '2024-01-08',
      status: 'published',
      title: 'Beautiful Family Memories',
      content: 'They captured our family\'s essence perfectly. The kids were comfortable throughout the session, and the final photos are absolutely stunning. Highly recommend!',
      likes: 19,
      helpful: 14,
      avatar: 'https://images.pexels.com/photos/1024967/pexels-photo-1024967.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      id: 5,
      clientName: 'Maria Gonzalez',
      clientEmail: 'maria@email.com',
      rating: 5,
      service: 'Event Photography',
      date: '2024-01-05',
      status: 'pending',
      title: 'Outstanding Event Coverage',
      content: 'The event photography was exceptional. Every important moment was captured with creativity and precision. The team was unobtrusive yet thorough.',
      likes: 0,
      helpful: 0,
      avatar: 'https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      id: 6,
      clientName: 'Alex Thompson',
      clientEmail: 'alex@email.com',
      rating: 3,
      service: 'Portrait Session',
      date: '2024-01-03',
      status: 'unlisted',
      title: 'Good but Room for Improvement',
      content: 'The portrait session was decent. Good lighting and composition, but felt rushed. Would appreciate more time for different poses and setups.',
      likes: 3,
      helpful: 2,
      avatar: 'https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    }
  ];

  const ratings = ['all', '5', '4', '3', '2', '1'];
  const statuses = ['all', 'published', 'hidden', 'pending', 'unlisted'];
  const services = ['all', 'Wedding Photography', 'Pre-Wedding Shoot', 'Corporate Photography', 'Family Photography', 'Event Photography', 'Portrait Session'];

  const filteredReviews = reviews.filter(review => {
    const ratingMatch = filterRating === 'all' || review.rating.toString() === filterRating;
    const statusMatch = filterStatus === 'all' || review.status === filterStatus;
    const serviceMatch = filterService === 'all' || review.service === filterService;
    return ratingMatch && statusMatch && serviceMatch;
  });

  const toggleReviewSelection = (reviewId: number) => {
    setSelectedReviews(prev => 
      prev.includes(reviewId) 
        ? prev.filter(id => id !== reviewId)
        : [...prev, reviewId]
    );
  };

  const updateReviewStatus = (reviewId: number, newStatus: string) => {
    console.log(`Update review ${reviewId} status to ${newStatus}`);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'hidden':
        return <EyeOff className="w-4 h-4 text-gray-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'unlisted':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Eye className="w-4 h-4 text-blue-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-700';
      case 'hidden':
        return 'bg-gray-100 text-gray-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'unlisted':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-blue-100 text-blue-700';
    }
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

      {/* Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-white p-3 lg:p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 lg:gap-4 flex-1">
          {/* Search */}
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search reviews..."
              className="w-full pl-10 pr-4 py-2 border text-gray-900 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm lg:text-base"
            />
          </div>

          {/* Filter Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center justify-center space-x-2 px-3 lg:px-4 py-2 rounded-lg border transition-colors duration-200 text-sm lg:text-base ${
              showFilters 
                ? 'bg-amber-50 border-amber-200 text-amber-600' 
                : 'border-gray-300 text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </motion.button>

          {selectedReviews.length > 0 && (
            <div className="flex items-center space-x-2 text-xs lg:text-sm text-gray-600">
              <span>{selectedReviews.length} selected</span>
              <button className="text-green-600 hover:text-green-700">Publish</button>
              <button className="text-gray-600 hover:text-gray-700">Hide</button>
              <button className="text-red-600 hover:text-red-700">Delete</button>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="flex items-center justify-between sm:justify-end space-x-4 lg:space-x-6 text-xs lg:text-sm text-gray-600 overflow-x-auto">
          <div className="flex items-center space-x-1 whitespace-nowrap">
            <CheckCircle className="w-3 h-3 lg:w-4 lg:h-4 text-green-600" />
            <span>{reviews.filter(r => r.status === 'published').length} Published</span>
          </div>
          <div className="flex items-center space-x-1 whitespace-nowrap">
            <Clock className="w-3 h-3 lg:w-4 lg:h-4 text-yellow-600" />
            <span>{reviews.filter(r => r.status === 'pending').length} Pending</span>
          </div>
          <div className="flex items-center space-x-1 whitespace-nowrap">
            <EyeOff className="w-3 h-3 lg:w-4 lg:h-4 text-gray-600" />
            <span>{reviews.filter(r => r.status === 'hidden').length} Hidden</span>
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-white p-3 lg:p-4 rounded-lg shadow-sm border border-gray-200 overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 text-sm lg:text-base">Filters</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4 lg:w-5 lg:h-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
              {/* Rating Filter */}
              <div>
                <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-2">Rating</label>
                <select
                  value={filterRating}
                  onChange={(e) => setFilterRating(e.target.value)}
                  className="w-full border border-gray-300 text-gray-900 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm lg:text-base"
                >
                  {ratings.map(rating => (
                    <option key={rating} value={rating}>
                      {rating === 'all' ? 'All Ratings' : `${rating} Stars`}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg text-gray-900 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm lg:text-base"
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>
                      {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Service Filter */}
              <div>
                <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-2">Service</label>
                <select
                  value={filterService}
                  onChange={(e) => setFilterService(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg text-gray-900 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm lg:text-base"
                >
                  {services.map(service => (
                    <option key={service} value={service}>
                      {service === 'all' ? 'All Services' : service}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Range */}
              <div>
                <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-2">Date Range</label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-lg text-gray-900 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm lg:text-base"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reviews List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 lg:p-6">
        <div className="space-y-4 lg:space-y-6">
          {filteredReviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-200 rounded-lg p-4 lg:p-6 hover:shadow-md transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row lg:items-start space-y-4 lg:space-y-0 lg:space-x-4">
                {/* Mobile: Header with checkbox and status */}
                <div className="flex items-center justify-between lg:hidden">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={selectedReviews.includes(review.id)}
                      onChange={() => toggleReviewSelection(review.id)}
                      className="w-4 h-4 text-amber-600  border-gray-300 rounded focus:ring-amber-500"
                    />
                    <img
                      src={review.avatar}
                      alt={review.clientName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">{review.clientName}</h3>
                      <p className="text-xs text-gray-500">{review.service}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(review.status)}`}>
                      {getStatusIcon(review.status)}
                      <span>{review.status}</span>
                    </span>
                  </div>
                </div>

                {/* Desktop: Checkbox */}
                <div className="hidden lg:block pt-1">
                  <input
                    type="checkbox"
                    checked={selectedReviews.includes(review.id)}
                    onChange={() => toggleReviewSelection(review.id)}
                    className="w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                  />
                </div>

                {/* Desktop: Avatar */}
                <img
                  src={review.avatar}
                  alt={review.clientName}
                  className="hidden lg:block w-12 h-12 rounded-full object-cover"
                />

                {/* Content */}
                <div className="flex-1">
                  {/* Desktop: Header */}
                  <div className="hidden lg:flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{review.title}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-sm font-medium text-gray-700">{review.clientName}</span>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-gray-500">{review.service}</span>
                      </div>
                    </div>
                    
                    {/* Status and Actions */}
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(review.status)}`}>
                        {getStatusIcon(review.status)}
                        <span>{review.status}</span>
                      </span>
                      
                      {/* Status Change Dropdown */}
                      <select
                        value={review.status}
                        onChange={(e) => updateReviewStatus(review.id, e.target.value)}
                        className="text-xs border border-gray-300 rounded  text-gray-900 px-2 py-1 focus:outline-none focus:ring-1 focus:ring-amber-500"
                      >
                        <option value="published">Published</option>
                        <option value="hidden">Hidden</option>
                        <option value="pending">Pending</option>
                        <option value="unlisted">Unlisted</option>
                      </select>
                    </div>
                  </div>

                  {/* Mobile: Title */}
                  <h3 className="lg:hidden font-semibold text-gray-900 mb-2">{review.title}</h3>

                  {/* Rating */}
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 lg:w-4 lg:h-4 ${
                            i < review.rating 
                              ? 'fill-amber-400 text-amber-400' 
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs lg:text-sm text-gray-600">({review.rating}/5)</span>
                  </div>

                  {/* Review Content */}
                  <p className="text-gray-700 mb-4 leading-relaxed text-sm lg:text-base">{review.content}</p>

                  {/* Footer */}
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-3 lg:space-y-0">
                    <div className="flex flex-wrap items-center gap-2 lg:gap-4 text-xs lg:text-sm text-gray-500">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3 lg:w-4 lg:h-4" />
                        <span>{review.date}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <User className="w-3 h-3 lg:w-4 lg:h-4" />
                        <span className="truncate max-w-32 lg:max-w-none">{review.clientEmail}</span>
                      </span>
                      {review.status === 'published' && (
                        <>
                          <span className="flex items-center space-x-1">
                            <ThumbsUp className="w-3 h-3 lg:w-4 lg:h-4" />
                            <span>{review.likes} likes</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <MessageSquare className="w-3 h-3 lg:w-4 lg:h-4" />
                            <span>{review.helpful} helpful</span>
                          </span>
                        </>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between lg:justify-end">
                      {/* Mobile: Status Change */}
                      <select
                        value={review.status}
                        onChange={(e) => updateReviewStatus(review.id, e.target.value)}
                        className="lg:hidden text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-amber-500"
                      >
                        <option value="published">Published</option>
                        <option value="hidden">Hidden</option>
                        <option value="pending">Pending</option>
                        <option value="unlisted">Unlisted</option>
                      </select>

                      <div className="flex items-center space-x-1 lg:space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-1.5 lg:p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                        >
                          <Eye className="w-3 h-3 lg:w-4 lg:h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-1.5 lg:p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                        >
                          <Edit className="w-3 h-3 lg:w-4 lg:h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-1.5 lg:p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="w-3 h-3 lg:w-4 lg:h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewsSection;