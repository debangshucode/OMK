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
  Play,
  Calendar,
  Clock,
  X,
  Video
} from 'lucide-react';

const VideosSection: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedVideos, setSelectedVideos] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const videos = [
    {
      id: 1,
      title: 'Wedding Highlights',
      category: 'Wedding',
      date: '2024-01-15',
      duration: '3:45',
      views: 2456,
      status: 'public',
      thumbnail: '/images/weadingHome.jpg',
      size: '125 MB'
    },
    {
      id: 2,
      title: 'Pre-Wedding Story',
      category: 'Pre-Wedding',
      date: '2024-01-12',
      duration: '2:30',
      views: 1834,
      status: 'public',
      thumbnail: '/images/weadingHome2.jpg',
      size: '89 MB'
    },
    {
      id: 3,
      title: 'Corporate Presentation',
      category: 'Corporate',
      date: '2024-01-10',
      duration: '5:20',
      views: 567,
      status: 'hidden',
      thumbnail: '/images/weadingHome4.jpg',
      size: '234 MB'
    },
    {
      id: 4,
      title: 'Event Coverage',
      category: 'Event',
      date: '2024-01-08',
      duration: '4:15',
      views: 1245,
      status: 'public',
      thumbnail: '/images/weadingHome6.jpg',
      size: '178 MB'
    },
    {
      id: 5,
      title: 'Behind the Scenes',
      category: 'BTS',
      date: '2024-01-05',
      duration: '1:45',
      views: 892,
      status: 'public',
      thumbnail: '/images/weadingHome5.jpg',
      size: '67 MB'
    },
    {
      id: 6,
      title: 'Cinematic Trailer',
      category: 'Cinematic',
      date: '2024-01-03',
      duration: '1:20',
      views: 3456,
      status: 'public',
      thumbnail: '/images/weadingHome1.jpg',
      size: '45 MB'
    }
  ];

  const categories = ['all', 'Wedding', 'Pre-Wedding', 'Corporate', 'Event', 'BTS', 'Cinematic'];
  const statuses = ['all', 'public', 'hidden'];

  const filteredVideos = videos.filter(video => {
    const categoryMatch = filterCategory === 'all' || video.category === filterCategory;
    const statusMatch = filterStatus === 'all' || video.status === filterStatus;
    return categoryMatch && statusMatch;
  });

  const toggleVideoSelection = (videoId: number) => {
    setSelectedVideos(prev => 
      prev.includes(videoId) 
        ? prev.filter(id => id !== videoId)
        : [...prev, videoId]
    );
  };

  const toggleVideoStatus = (videoId: number) => {
    console.log(`Toggle status for video ${videoId}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Videos</h2>
          <p className="text-gray-600">Manage your video collection</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span>Upload Videos</span>
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
              placeholder="Search videos..."
              className="pl-10 pr-4 py-2 border text-gray-900 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Filter Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors duration-200 ${
              showFilters 
                ? 'bg-purple-50 border-purple-200 text-purple-600' 
                : 'border-gray-300 text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </motion.button>

          {selectedVideos.length > 0 && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>{selectedVideos.length} selected</span>
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
                ? 'bg-purple-100 text-purple-600' 
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
                ? 'bg-purple-100 text-purple-600' 
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
                  className="w-full border border-gray-300 text-gray-900 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                  className="w-full border border-gray-300 text-gray-900 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>
                      {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Duration Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                <select className="w-full border text-gray-900 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option value="all">All Durations</option>
                  <option value="short">{"Short (< 2 min)"}</option>
                  <option value="medium">{"Medium (2-5 min)"}</option>
                  <option value="long">{"Long (> 5 min)"}</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Videos Grid/List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-all duration-300 flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center shadow-lg"
                    >
                      <Play className="w-8 h-8 text-gray-700 ml-1" />
                    </motion.div>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs font-medium">
                    {video.duration}
                  </div>

                  {/* Selection Checkbox */}
                  <div className="absolute top-2 left-2">
                    <input
                      type="checkbox"
                      checked={selectedVideos.includes(video.id)}
                      onChange={() => toggleVideoSelection(video.id)}
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                  </div>

                  {/* Status Badge */}
                  <div className="absolute top-2 right-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleVideoStatus(video.id)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${
                        video.status === 'public' 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-500 text-white'
                      }`}
                    >
                      {video.status === 'public' ? (
                        <Eye className="w-4 h-4" />
                      ) : (
                        <EyeOff className="w-4 h-4" />
                      )}
                    </motion.button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1 truncate">{video.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{video.category}</p>
                  
                  {/* Stats */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>{video.views}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{video.duration}</span>
                      </span>
                    </div>
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{video.date}</span>
                    </span>
                  </div>

                  {/* File Size */}
                  <div className="text-xs text-gray-500 mb-3">
                    Size: {video.size}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
                      >
                        <Edit className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
                      >
                        <Download className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-1 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredVideos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                {/* Checkbox */}
                <input
                  type="checkbox"
                  checked={selectedVideos.includes(video.id)}
                  onChange={() => toggleVideoSelection(video.id)}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />

                {/* Thumbnail */}
                <div className="relative">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-20 h-12 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-6 h-6 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                      <Play className="w-3 h-3 text-gray-700 ml-0.5" />
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{video.title}</h3>
                  <p className="text-sm text-gray-600">{video.category}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                    <span className="flex items-center space-x-1">
                      <Eye className="w-3 h-3" />
                      <span>{video.views} views</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{video.duration}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{video.date}</span>
                    </span>
                    <span>Size: {video.size}</span>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    video.status === 'public' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {video.status}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleVideoStatus(video.id)}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                  >
                    {video.status === 'public' ? (
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

export default VideosSection;