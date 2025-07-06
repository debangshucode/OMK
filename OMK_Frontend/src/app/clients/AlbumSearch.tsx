"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  FolderOpen, 
  Calendar, 
  MapPin, 
  Eye, 
  Download,
  AlertCircle,
  CheckCircle,
  Camera,
  Video
} from 'lucide-react';

const AlbumSearch: React.FC = () => {
  const [albumId, setAlbumId] = useState('');
  const [searchResult, setSearchResult] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');

  // Mock album data
  const mockAlbums = {
    'WED-2024-001': {
      id: 'WED-2024-001',
      title: 'Sarah & Michael Wedding',
      type: 'Wedding',
      date: '2024-01-15',
      location: 'Central Park, NY',
      photoCount: 245,
      videoCount: 8,
      status: 'Ready',
      thumbnail: '/images/weadingHome1.jpg',
      description: 'Complete wedding photography and videography package'
    },
    'PRE-2024-002': {
      id: 'PRE-2024-002',
      title: 'Emma & David Pre-Wedding',
      type: 'Pre-Wedding',
      date: '2024-01-12',
      location: 'Malibu Beach, CA',
      photoCount: 89,
      videoCount: 3,
      status: 'Ready',
      thumbnail: '/images/weadingHome2.jpg',
      description: 'Romantic pre-wedding shoot by the ocean'
    },
    'COR-2024-003': {
      id: 'COR-2024-003',
      title: 'TechCorp Annual Event',
      type: 'Corporate',
      date: '2024-01-10',
      location: 'San Francisco, CA',
      photoCount: 156,
      videoCount: 5,
      status: 'Processing',
      thumbnail: '/images/weadingHome3.jpg',
      description: 'Corporate event photography and team photos'
    }
  };

  // Existing albums for the current user
  const userAlbums = [
    {
      id: 'WED-2024-001',
      title: 'Sarah & Michael Wedding',
      type: 'Wedding',
      date: '2024-01-15',
      location: 'Central Park, NY',
      photoCount: 245,
      videoCount: 8,
      status: 'Ready',
      thumbnail: '/images/weadingHome1.jpg'
    },
    {
      id: 'PRE-2024-004',
      title: 'Engagement Session',
      type: 'Engagement',
      date: '2024-01-05',
      location: 'Brooklyn Bridge, NY',
      photoCount: 67,
      videoCount: 2,
      status: 'Ready',
      thumbnail: '/images/weadingHome4.jpg'
    },
    {
      id: 'FAM-2024-005',
      title: 'Family Portraits',
      type: 'Family',
      date: '2023-12-20',
      location: 'Central Park, NY',
      photoCount: 34,
      videoCount: 1,
      status: 'Ready',
      thumbnail: '/images/weadingHome5.jpg'
    }
  ];

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!albumId.trim()) return;

    setIsSearching(true);
    setError('');
    setSearchResult(null);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const album = mockAlbums[albumId.toUpperCase() as keyof typeof mockAlbums];
    
    if (album) {
      setSearchResult(album);
    } else {
      setError('Album not found. Please check the Album ID and try again.');
    }

    setIsSearching(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Albums</h2>
        <p className="text-gray-600">Search for albums using Album ID or browse your existing albums</p>
      </div>

      {/* Search Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Search by Album ID</h3>
        <form onSubmit={handleSearch} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Album ID
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={albumId}
                onChange={(e) => setAlbumId(e.target.value)}
                placeholder="Enter Album ID (e.g., WED-2024-001)"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                required
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Album ID format: XXX-YYYY-NNN (e.g., WED-2024-001, PRE-2024-002)
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSearching}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 cursor-pointer"
          >
            {isSearching ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
                <span>Searching...</span>
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                <span>Search Album</span>
              </>
            )}
          </motion.button>
        </form>

        {/* Sample Album IDs */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="text-sm font-medium text-blue-900 mb-2">Sample Album IDs to try:</h4>
          <div className="flex flex-wrap gap-2">
            {Object.keys(mockAlbums).map((id) => (
              <motion.button
                key={id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setAlbumId(id)}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium hover:bg-blue-200 cursor-pointer"
              >
                {id}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3"
        >
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <p className="text-red-700">{error}</p>
        </motion.div>
      )}

      {/* Search Result */}
      {searchResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
        >
          <div className="flex items-center space-x-3 mb-4">
            <CheckCircle className="w-6 h-6 text-green-500" />
            <h3 className="text-lg font-semibold text-gray-900">Album Found!</h3>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Album Image */}
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <img
                src={searchResult.thumbnail}
                alt={searchResult.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <div className="flex items-center space-x-2 mb-2">
                  <FolderOpen className="w-5 h-5" />
                  <span className="font-medium">{searchResult.type}</span>
                </div>
              </div>
              <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium ${
                searchResult.status === 'Ready' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-yellow-500 text-white'
              }`}>
                {searchResult.status}
              </div>
            </div>

            {/* Album Details */}
            <div className="space-y-4">
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{searchResult.title}</h4>
                <p className="text-gray-600">{searchResult.description}</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>{searchResult.date}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{searchResult.location}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{searchResult.photoCount}</div>
                  <div className="text-sm text-blue-600">Photos</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{searchResult.videoCount}</div>
                  <div className="text-sm text-purple-600">Videos</div>
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                  <span>View Album</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Your Albums */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Your Albums</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userAlbums.map((album, index) => (
            <motion.div
              key={album.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className="group relative bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer"
            >
              <div className="relative aspect-[4/3]">
                <img
                  src={album.thumbnail}
                  alt={album.title}
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

                {/* Status Badge */}
                <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${
                  album.status === 'Ready' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-yellow-500 text-white'
                }`}>
                  {album.status}
                </div>

                {/* Content Count */}
                <div className="absolute bottom-3 left-3 flex space-x-2">
                  <div className="bg-black/75 text-white px-2 py-1 rounded text-xs font-medium flex items-center space-x-1">
                    <Camera className="w-3 h-3" />
                    <span>{album.photoCount}</span>
                  </div>
                  {album.videoCount > 0 && (
                    <div className="bg-black/75 text-white px-2 py-1 rounded text-xs font-medium flex items-center space-x-1">
                      <Video className="w-3 h-3" />
                      <span>{album.videoCount}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4">
                <h4 className="font-semibold text-gray-900 mb-1 truncate">{album.title}</h4>
                <p className="text-sm text-blue-600 mb-2">{album.type}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3" />
                    <span>{album.location}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{album.date}</span>
                  </span>
                </div>
                <div className="mt-2 text-xs text-gray-600 font-mono bg-gray-100 px-2 py-1 rounded">
                  ID: {album.id}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AlbumSearch;