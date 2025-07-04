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
  FolderOpen,
  Calendar,
  Image,
  X,
  Users
} from 'lucide-react';

const AlbumsSection: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedAlbums, setSelectedAlbums] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const albums = [
    {
      id: 1,
      title: 'Sarah & Michael Wedding',
      category: 'Wedding',
      date: '2024-01-15',
      photoCount: 245,
      videoCount: 12,
      status: 'public',
      client: 'Sarah Johnson',
      coverImage: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      description: 'Beautiful wedding ceremony and reception photos'
    },
    {
      id: 2,
      title: 'Emma & David Pre-Wedding',
      category: 'Pre-Wedding',
      date: '2024-01-12',
      photoCount: 89,
      videoCount: 3,
      status: 'public',
      client: 'Emma Rodriguez',
      coverImage: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      description: 'Romantic pre-wedding shoot in the park'
    },
    {
      id: 3,
      title: 'TechCorp Annual Event',
      category: 'Corporate',
      date: '2024-01-10',
      photoCount: 156,
      videoCount: 8,
      status: 'hidden',
      client: 'TechCorp Inc.',
      coverImage: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      description: 'Corporate event photography and videography'
    },
    {
      id: 4,
      title: 'Wilson Family Portrait',
      category: 'Family',
      date: '2024-01-08',
      photoCount: 67,
      videoCount: 2,
      status: 'public',
      client: 'Wilson Family',
      coverImage: 'https://images.pexels.com/photos/1024967/pexels-photo-1024967.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      description: 'Family portrait session with three generations'
    },
    {
      id: 5,
      title: 'Birthday Celebration',
      category: 'Event',
      date: '2024-01-05',
      photoCount: 123,
      videoCount: 5,
      status: 'public',
      client: 'Maria Gonzalez',
      coverImage: 'https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      description: '50th birthday party celebration'
    },
    {
      id: 6,
      title: 'Alex Portrait Session',
      category: 'Portrait',
      date: '2024-01-03',
      photoCount: 45,
      videoCount: 1,
      status: 'public',
      client: 'Alex Thompson',
      coverImage: 'https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      description: 'Professional headshots and portraits'
    }
  ];

  const categories = ['all', 'Wedding', 'Pre-Wedding', 'Corporate', 'Family', 'Event', 'Portrait'];
  const statuses = ['all', 'public', 'hidden'];

  const filteredAlbums = albums.filter(album => {
    const categoryMatch = filterCategory === 'all' || album.category === filterCategory;
    const statusMatch = filterStatus === 'all' || album.status === filterStatus;
    return categoryMatch && statusMatch;
  });

  const toggleAlbumSelection = (albumId: number) => {
    setSelectedAlbums(prev => 
      prev.includes(albumId) 
        ? prev.filter(id => id !== albumId)
        : [...prev, albumId]
    );
  };

  const toggleAlbumStatus = (albumId: number) => {
    console.log(`Toggle status for album ${albumId}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Albums</h2>
          <p className="text-gray-600">Organize and manage your photo albums</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 shadow-lg hover:cursor-pointer"
        >
          <Plus className="w-5 h-5" />
          <span>Create Album</span>
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
              placeholder="Search albums..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Filter Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors duration-200 ${
              showFilters 
                ? 'bg-green-50 border-green-200 text-green-600 hover:cursor-pointer' 
                : 'border-gray-300 text-gray-600 hover:bg-gray-50 hover:cursor-pointer'
            }`}
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </motion.button>

          {selectedAlbums.length > 0 && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>{selectedAlbums.length} selected</span>
              <button className="text-red-600 hover:text-red-700 hover:cursor-pointer">Delete</button>
              <button className="text-blue-600 hover:text-blue-700 hover:cursor-pointer">Hide</button>
            </div>
          )}
        </div>

        {/* View Mode */}
        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg  ${
              viewMode === 'grid' 
                ? 'bg-green-100 text-green-600 hover:cursor-pointer ' 
                : 'text-gray-600 hover:bg-gray-100 hover:cursor-pointer'
            }`}
          >
            <Grid3X3 className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg  ${
              viewMode === 'list' 
                ? 'bg-green-100 text-green-600 hover:cursor-pointer' 
                : 'text-gray-900 hover:bg-gray-100 hover:cursor-pointer'
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
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 overflow-hidden "
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Filters</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="text-gray-400 hover:text-gray-600 hover:cursor-pointer"
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
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
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
                  className="w-full border border-gray-300 rounded-lg text-gray-900 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
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
                <label className="block text-sm font-medium text-gray-700 mb-2 ">Date Range</label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-lg text-gray-900 px-3 py-2 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Albums Grid/List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {filteredAlbums.map((album, index) => (
              <motion.div
                key={album.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-white rounded-lg overflow-hidden shadow-md hover:cursor-pointer hover:shadow-lg transition-all duration-300 border border-gray-200"
              >
                {/* Cover Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={album.coverImage}
                    alt={album.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <div className="w-12 h-12 bg-white bg-opacity-90 rounded-full flex items-center justify-center shadow-lg">
                        <FolderOpen className="w-6 h-6 text-gray-700" />
                      </div>
                    </motion.div>
                  </div>

                  {/* Selection Checkbox */}
                  <div className="absolute top-2 left-2">
                    <input
                      type="checkbox"
                      checked={selectedAlbums.includes(album.id)}
                      onChange={() => toggleAlbumSelection(album.id)}
                      className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                  </div>

                  {/* Status Badge */}
                  <div className="absolute top-2 right-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleAlbumStatus(album.id)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${
                        album.status === 'public' 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-500 text-white'
                      }`}
                    >
                      {album.status === 'public' ? (
                        <Eye className="w-4 h-4" />
                      ) : (
                        <EyeOff className="w-4 h-4" />
                      )}
                    </motion.button>
                  </div>

                  {/* Content Count */}
                  <div className="absolute bottom-2 left-2 flex space-x-2">
                    <div className="bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs font-medium flex items-center space-x-1">
                      <Image className="w-3 h-3" />
                      <span>{album.photoCount}</span>
                    </div>
                    {album.videoCount > 0 && (
                      <div className="bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs font-medium flex items-center space-x-1">
                        <span>🎥</span>
                        <span>{album.videoCount}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1 truncate">{album.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{album.category}</p>
                  <p className="text-xs text-gray-500 mb-3 line-clamp-2">{album.description}</p>
                  
                  {/* Client Info */}
                  <div className="flex items-center space-x-2 text-xs text-gray-500 mb-3">
                    <Users className="w-3 h-3" />
                    <span>{album.client}</span>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <div className="flex items-center space-x-3">
                      <span>{album.photoCount + album.videoCount} items</span>
                    </div>
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{album.date}</span>
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-1 text-gray-600 hover:cursor-pointer hover:text-gray-900 hover:bg-gray-100 rounded"
                      >
                        <Eye className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-1 text-gray-600 hover:cursor-pointer hover:text-gray-900 hover:bg-gray-100 rounded"
                      >
                        <Edit className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-1 text-gray-600 hover:cursor-pointer hover:text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      album.status === 'public' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {album.status}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAlbums.map((album, index) => (
              <motion.div
                key={album.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                {/* Checkbox */}
                <input
                  type="checkbox"
                  checked={selectedAlbums.includes(album.id)}
                  onChange={() => toggleAlbumSelection(album.id)}
                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />

                {/* Thumbnail */}
                <img
                  src={album.coverImage}
                  alt={album.title}
                  className="w-16 h-16 object-cover rounded-lg"
                />

                {/* Info */}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{album.title}</h3>
                  <p className="text-sm text-gray-600">{album.category}</p>
                  <p className="text-xs text-gray-500 mt-1">{album.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500 mt-2">
                    <span className="flex items-center space-x-1">
                      <Users className="w-3 h-3" />
                      <span>{album.client}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Image className="w-3 h-3" />
                      <span>{album.photoCount} photos</span>
                    </span>
                    <span>{album.videoCount} videos</span>
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{album.date}</span>
                    </span>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    album.status === 'public' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {album.status}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleAlbumStatus(album.id)}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                  >
                    {album.status === 'public' ? (
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

export default AlbumsSection;