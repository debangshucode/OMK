"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Camera, 
  Video, 
  FolderOpen, 
  Download, 
  Eye, 
  Heart,
  Search,
  Filter,
  Grid3X3,
  List,
  Play,
  Calendar,
  MapPin
} from 'lucide-react';

const ClientGallery: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const galleryItems = [
    {
      id: 1,
      type: 'photo',
      title: 'Wedding Ceremony',
      count: 45,
      thumbnail: '/images/weadingHome1.jpg',
      date: '2024-01-15',
      location: 'Central Park',
      likes: 23,
      views: 156
    },
    {
      id: 2,
      type: 'video',
      title: 'Wedding Highlights',
      duration: '3:45',
      thumbnail: '/images/weadingHome2.jpg',
      date: '2024-01-15',
      location: 'Central Park',
      likes: 18,
      views: 89
    },
    {
      id: 3,
      type: 'album',
      title: 'Reception Moments',
      count: 67,
      thumbnail: '/images/weadingHome3.jpg',
      date: '2024-01-15',
      location: 'Plaza Hotel',
      likes: 31,
      views: 203
    },
    {
      id: 4,
      type: 'photo',
      title: 'Couple Portraits',
      count: 28,
      thumbnail: '/images/weadingHome4.jpg',
      date: '2024-01-15',
      location: 'Central Park',
      likes: 42,
      views: 178
    },
    {
      id: 5,
      type: 'video',
      title: 'First Dance',
      duration: '4:20',
      thumbnail: '/images/weadingHome5.jpg',
      date: '2024-01-15',
      location: 'Plaza Hotel',
      likes: 25,
      views: 134
    },
    {
      id: 6,
      type: 'album',
      title: 'Getting Ready',
      count: 34,
      thumbnail: '/images/weadingHome6.jpg',
      date: '2024-01-15',
      location: 'Bridal Suite',
      likes: 19,
      views: 98
    }
  ];

  const filteredItems = galleryItems.filter(item => {
    const matchesType = filterType === 'all' || item.type === filterType;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'photo': return Camera;
      case 'video': return Video;
      case 'album': return FolderOpen;
      default: return Camera;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Your Gallery</h2>
          <p className="text-gray-600">Browse and download your photos, videos, and albums</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 shadow-lg cursor-pointer"
        >
          <Download className="w-5 h-5" />
          <span>Download All</span>
        </motion.button>
      </div>

      {/* Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 flex-1">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search gallery..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border text-gray-900 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex space-x-2">
            {[
              { id: 'all', label: 'All', count: galleryItems.length },
              { id: 'photo', label: 'Photos', count: galleryItems.filter(i => i.type === 'photo').length },
              { id: 'video', label: 'Videos', count: galleryItems.filter(i => i.type === 'video').length },
              { id: 'album', label: 'Albums', count: galleryItems.filter(i => i.type === 'album').length }
            ].map((filter) => (
              <motion.button
                key={filter.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilterType(filter.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                  filterType === filter.id
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter.label} ({filter.count})
              </motion.button>
            ))}
          </div>
        </div>

        {/* View Mode */}
        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg cursor-pointer ${
              viewMode === 'grid' 
                ? 'bg-blue-100 text-blue-600' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Grid3X3 className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg cursor-pointer ${
              viewMode === 'list' 
                ? 'bg-blue-100 text-blue-600' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <List className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* Gallery Grid/List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => {
              const TypeIcon = getTypeIcon(item.type);
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  className="group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-all duration-200 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg cursor-pointer"
                        >
                          <Eye className="w-5 h-5 text-gray-700" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg cursor-pointer"
                        >
                          <Download className="w-5 h-5 text-gray-700" />
                        </motion.button>
                      </div>
                    </div>

                    {/* Type Badge */}
                    <div className="absolute top-3 right-3">
                      <div className="bg-black/50 backdrop-blur-sm text-white p-2 rounded-full">
                        <TypeIcon className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Play Button for Videos */}
                    {item.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <Play className="w-6 h-6 text-white ml-1" />
                        </div>
                      </div>
                    )}

                    {/* Count/Duration */}
                    <div className="absolute bottom-3 right-3 bg-black/75 text-white px-2 py-1 rounded text-xs font-medium">
                      {item.count ? `${item.count} items` : item.duration}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 truncate">{item.title}</h3>
                    
                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <span className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{item.location}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{item.date}</span>
                      </span>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span className="flex items-center space-x-1">
                          <Eye className="w-3 h-3" />
                          <span>{item.views}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Heart className="w-3 h-3" />
                          <span>{item.likes}</span>
                        </span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors duration-200 cursor-pointer"
                      >
                        <Download className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredItems.map((item, index) => {
              const TypeIcon = getTypeIcon(item.type);
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                >
                  {/* Thumbnail */}
                  <div className="relative">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="absolute top-1 right-1">
                      <TypeIcon className="w-4 h-4 text-white bg-black/50 rounded p-0.5" />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                      <span className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{item.location}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{item.date}</span>
                      </span>
                      <span>{item.count ? `${item.count} items` : item.duration}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientGallery;