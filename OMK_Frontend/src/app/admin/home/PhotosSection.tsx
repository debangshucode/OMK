"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  Eye, 
  EyeOff, 
  Edit, 
  Trash2, 
  Download,
  Heart,
  Calendar,
  Tag,
  X
} from 'lucide-react';

const PhotosSection: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedPhotos, setSelectedPhotos] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const photos = [
    {
      id: 1,
      title: 'Wedding Ceremony',
      category: 'Wedding',
      date: '2024-01-15',
      views: 1234,
      likes: 89,
      status: 'public',
      tags: ['wedding', 'ceremony', 'couple'],
      image: '/images/weadingHome.jpg'
    },
    {
      id: 2,
      title: 'Pre-Wedding Shoot',
      category: 'Pre-Wedding',
      date: '2024-01-12',
      views: 856,
      likes: 67,
      status: 'public',
      tags: ['pre-wedding', 'couple', 'outdoor'],
      image: '/images/weadingHome5.jpg'
    },
    {
      id: 3,
      title: 'Corporate Event',
      category: 'Corporate',
      date: '2024-01-10',
      views: 432,
      likes: 23,
      status: 'hidden',
      tags: ['corporate', 'event', 'business'],
      image: '/images/weadingHome4.jpg'
    },
    {
      id: 4,
      title: 'Portrait Session',
      category: 'Portrait',
      date: '2024-01-08',
      views: 678,
      likes: 45,
      status: 'public',
      tags: ['portrait', 'individual', 'studio'],
      image: '/images/weadingHome3.jpg'
    },
    {
      id: 5,
      title: 'Family Gathering',
      category: 'Family',
      date: '2024-01-05',
      views: 923,
      likes: 78,
      status: 'public',
      tags: ['family', 'gathering', 'celebration'],
      image: '/images/weadingHome2.jpg'
    },
    {
      id: 6,
      title: 'Engagement Photos',
      category: 'Engagement',
      date: '2024-01-03',
      views: 1567,
      likes: 134,
      status: 'public',
      tags: ['engagement', 'couple', 'romantic'],
      image: '/images/weadingHome1.jpg'
    }
  ];

  const categories = ['all', 'Wedding', 'Pre-Wedding', 'Corporate', 'Portrait', 'Family', 'Engagement'];
  const statuses = ['all', 'public', 'hidden'];

  const filteredPhotos = photos.filter(photo => {
    const categoryMatch = filterCategory === 'all' || photo.category === filterCategory;
    const statusMatch = filterStatus === 'all' || photo.status === filterStatus;
    return categoryMatch && statusMatch;
  });

  const togglePhotoSelection = (photoId: number) => {
    setSelectedPhotos(prev => 
      prev.includes(photoId) 
        ? prev.filter(id => id !== photoId)
        : [...prev, photoId]
    );
  };

  const togglePhotoStatus = (photoId: number) => {
    // In a real app, this would update the backend
    console.log(`Toggle status for photo ${photoId}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Photos</h2>
          <p className="text-gray-600">Manage your photo collection</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span>Upload Photos</span>
        </motion.button>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search photos..."
              className="pl-10 pr-4 py-2 border text-gray-900 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          {/* Filter Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors duration-200 ${
              showFilters 
                ? 'bg-red-50 border-red-200 text-red-600' 
                : 'border-gray-300 text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </motion.button>

          {selectedPhotos.length > 0 && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>{selectedPhotos.length} selected</span>
              <button className="text-red-600 hover:text-red-700">Delete</button>
              <button className="text-blue-600 hover:text-blue-700">Hide</button>
            </div>
          )}
        </div>

        {/* View Mode */}
        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg ${
              viewMode === 'grid' 
                ? 'bg-red-100 text-red-600' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Grid3X3 className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg ${
              viewMode === 'list' 
                ? 'bg-red-100 text-red-600' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <List className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Filters</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full border border-gray-300 text-gray-900 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg text-gray-900 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>
                      {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-lg px-3 text-gray-900 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Photos Grid/List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={photo.image}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-60 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg"
                      >
                        <Eye className="w-4 h-4 text-gray-700" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg"
                      >
                        <Edit className="w-4 h-4 text-gray-700" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg"
                      >
                        <Download className="w-4 h-4 text-gray-700" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Selection Checkbox */}
                  <div className="absolute top-2 left-2">
                    <input
                      type="checkbox"
                      checked={selectedPhotos.includes(photo.id)}
                      onChange={() => togglePhotoSelection(photo.id)}
                      className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                    />
                  </div>

                  {/* Status Badge */}
                  <div className="absolute top-2 right-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => togglePhotoStatus(photo.id)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${
                        photo.status === 'public' 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-500 text-white'
                      }`}
                    >
                      {photo.status === 'public' ? (
                        <Eye className="w-4 h-4" />
                      ) : (
                        <EyeOff className="w-4 h-4" />
                      )}
                    </motion.button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1 truncate">{photo.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{photo.category}</p>
                  
                  {/* Stats */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>{photo.views}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Heart className="w-3 h-3" />
                        <span>{photo.likes}</span>
                      </span>
                    </div>
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{photo.date}</span>
                    </span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {photo.tags.slice(0, 2).map(tag => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600"
                      >
                        <Tag className="w-2 h-2 mr-1" />
                        {tag}
                      </span>
                    ))}
                    {photo.tags.length > 2 && (
                      <span className="text-xs text-gray-400">+{photo.tags.length - 2}</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                {/* Checkbox */}
                <input
                  type="checkbox"
                  checked={selectedPhotos.includes(photo.id)}
                  onChange={() => togglePhotoSelection(photo.id)}
                  className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                />

                {/* Thumbnail */}
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="w-16 h-16 object-cover rounded-lg"
                />

                {/* Info */}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{photo.title}</h3>
                  <p className="text-sm text-gray-600">{photo.category}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                    <span className="flex items-center space-x-1">
                      <Eye className="w-3 h-3" />
                      <span>{photo.views} views</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Heart className="w-3 h-3" />
                      <span>{photo.likes} likes</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{photo.date}</span>
                    </span>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    photo.status === 'public' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {photo.status}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => togglePhotoStatus(photo.id)}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                  >
                    {photo.status === 'public' ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                  >
                    <Edit className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotosSection;